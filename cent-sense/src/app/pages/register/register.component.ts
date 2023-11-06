import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent  implements OnInit {
  registerForm!: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.minLength(6),Validators.required]],
    });
  }

  register() {
    if (this.registerForm.valid) {
      const name = this.registerForm.get('name')?.value;
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;
      this.authService.register(name, email, password)
      .subscribe(
        {
          next: () => {
            this.router.navigate(['login']);
          },
          error: (err) => {
            this.errorMessage = err;
          }
        }
      );
  }
  
  }

}
