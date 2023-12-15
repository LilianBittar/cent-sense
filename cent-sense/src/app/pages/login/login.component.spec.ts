import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import {  StoreModule } from '@ngrx/store';
import { authReducer } from 'src/app/store/auth/auth.reducer';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideMockStore } from '@ngrx/store/testing';


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  const initialState = { loggedIn: false};

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: 
      [ 
        LoginComponent
      ],
      imports: [
        IonicModule.forRoot(), ReactiveFormsModule, StoreModule.forRoot({ auth: authReducer})
      ],
      providers: [
        provideMockStore({ initialState }),
      ]
    }).compileComponents();


    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a login form', () => {
    expect(component.loginForm).toBeTruthy();
  }
  );

  it('form should be invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  }
  );

  it('email field validity', () => {
    let email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();

     // test email field with invalid email
    email.setValue("test");
    expect(email.hasError('email')).toBeTruthy();

    // set email to valid email
    email.setValue("test@example.com");
    expect(email.errors).toBeNull();
  }
  );

});
