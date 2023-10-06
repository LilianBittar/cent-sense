import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  login(email: any, password: any) {
    return of('success')
  }

  constructor() { }
}
