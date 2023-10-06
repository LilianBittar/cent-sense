import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router,
    private authService: AuthService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['test@test.com', [Validators.email, Validators.required]], 
      password: ['123456', [Validators.minLength(6),Validators.required]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      this.authService.login(email, password).subscribe(
        { 
          next: () => {
            console.log('here')
            this.router.navigate(['/home/introduction']);
          },
          error: (err) => {
            this.errorMessage = err;
          }
        } 
      )
    }


    // Redirect to home page
    this.router.navigate(['/home']);
  }
}
