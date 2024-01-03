import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  url = 'http://localhost:8000/user'
  email_from_JWT: string | undefined;


  constructor(private api : ApiService, private http : HttpClient){
    
    const token = this.api.getToken()
    console.log('gotodashboard: ', token)
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    // this.http.get(`${this.url}/dashboard`, {headers : headers})
    this.http.get(`${this.url}/dashboard`).subscribe((data: any) => {
    this.email_from_JWT = data.email;
      // this.email = data.email;
    });


    

  }
 
  
  

  // if(localStorage.getItem('token')){
  //   this.api.gotDashboard()
    
  // }

  // if(localStorage.getItem('token')){
    
  }
  
// }
