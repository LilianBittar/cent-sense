import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { EventRelayService } from 'src/app/services/event-relay.service';
import { AuthActions } from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    private eventRelay: EventRelayService
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['test@test', [Validators.email, Validators.required]],
      password: ['Password1', [Validators.minLength(6), Validators.required]],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;
      this.eventRelay.emit('show_loading', '');
      this.store.dispatch(AuthActions.login({ email, password }));
    }

  }
}
