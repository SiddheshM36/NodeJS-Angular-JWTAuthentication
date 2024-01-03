import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { passwordMatchValidation } from '../validators/validators'
import { Router } from '@angular/router';
import { ApiService } from '../api.service'
//toaster
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  constructor(private router : Router, private toaster : ToastrService, private api : ApiService ){}

  registerForm = new FormGroup({
    name : new FormControl('', Validators.required),
    email : new FormControl(''),//, [Validators.required, Validators.email]),
    password : new FormControl(''),//, [Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)]),
    confirm_password : new FormControl(''),//,[Validators.required, Validators.pattern(/^(?=\D*\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}$/)])
}, [passwordMatchValidation("password", "confirm_password")])


onRegisterSubmit(){

  if(!this.registerForm.valid){
    return 
  }
  else{
  console.log(this.registerForm.value)
  
  this.api.createUser(this.registerForm.value).subscribe(res=>{
    console.log('user created')
    this.toaster.success('Register Successfully');
    this.router.navigate(['/login'])
  },
    (err)=>{
      const errorMsg = err.error
      console.log(err.error)
      this.toaster.error(errorMsg);
      this.router.navigate(['/register'])
    }
    )
  }
}

}
