import { Component } from '@angular/core';
import {  FormGroup, FormControl, Validators} from '@angular/forms'
// import { HttpClient } from '@angular/common/http'
import { ApiService } from '../api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(private api : ApiService, private router : Router) {}
  
  loginForm = new FormGroup({
    email : new FormControl(''),//, [Validators.required, Validators.email]),
    password : new FormControl('', [Validators.required])
  })

  
 onLoginSubmit(){

    console.log(this.loginForm.value)
    // this.api.createUser(this.registerForm.value).subscribe(res=>{
    this.api.loginUser(this.loginForm.value).subscribe(res=>{
      console.log(res);
      
      const token = res.data
      if(token){
        localStorage.setItem('token', res.data.token)
        this.router.navigate(['/dashboard'])
        console.log('login success')
      }
      else{
        // this.router.navigate[('/login')]
        console.log('Not authenticated');
        
      }
            
        

      
    })
    
  }

}
