import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { AuthActions } from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';
  show_toast: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['test@test.com', [Validators.email, Validators.required]],
      password: ['123456', [Validators.minLength(6), Validators.required]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.store.dispatch(AuthActions.login({ email, password }));
    }

    // Redirect to home page
    this.router.navigate(['/home']);
  }
}
