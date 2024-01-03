import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { ApiService } from './api.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private api: ApiService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('token');
    console.log('interceptor wala token: ', token)
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    return next.handle(request);
  }
}
