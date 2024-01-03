import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  
  constructor(private api : ApiService, private router : Router){}
  onLogout(){
    console.log('logout called');
    this.api.logout();
    this.router.navigate(['/login'])
  }
}
