import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, map, tap } from 'rxjs';
// import 'rxjs/add/operator/map';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = 'http://localhost:8000/user'
  loginURL = 'http://localhost:8000/user/login'

  constructor(private http : HttpClient) {  }
  email_from_JWT: string | undefined;

  //register api
  createUser(user: Partial<{ name: string | null; email: string | null; password: string | null; confirm_password: string | null; }>):Observable<any>{
    return this.http.post(`${this.url}`, user)
    }

  // login api
  loginUser(users: Partial<{ email: string | null; password: string | null; }>):Observable<any>{
    return this.http.post<any>(`${this.loginURL}`, users)
    // .pipe(tap(response=>{
    //   // let res = response
    //   // if(res){
    //     localStorage.setItem('token', response.data.token)
    //   // }
    //   // const token = JSON.stringify(result)
    //   console.log('apiservice: ', response.data.token)}
    //   ))      
    }



    //get token
    getToken() {
      return localStorage.getItem('token');
    }



    isLoggedIn() {
      return !!this.getToken();
    }
  

    logout() {
      localStorage.removeItem('token');
    }
    
   


  //dashboard api
  // gotDashboard(){
    
  //   const token = this.getToken()
  //   console.log('gotodashboard: ', token)
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
  //   return this.http.get(`${this.url}/dashboard`, {headers : headers}).subscribe((data: any) => {
  //     this.email_from_JWT = data.email;
  //     // this.email = data.email;
  //   });
  // }


}
