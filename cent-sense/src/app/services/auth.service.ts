import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  login(email: any, password: any) {
    
    return this.http.post(environment.apiUrl + '/login', {
      email: email,
      password: password
    },
    {})
  }

  register(name: string, email: any, password: any) {
    return this.http.post(environment.apiUrl + '/register', { 
      name: name,
      email: email,
      password: password
    },
    {})
  }

  logout() {
    return of(true);
  }
  
}
