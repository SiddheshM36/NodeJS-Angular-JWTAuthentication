import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from './api.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private api : ApiService, private router : Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      const isLoggedIn = this.api.isLoggedIn();
      if (isLoggedIn) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }
  }
  