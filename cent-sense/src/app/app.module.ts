import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { RegisterComponent } from './pages/register/register.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { authReducer } from './store/auth/auth.reducer';
import {
  StoreModule,
} from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { PlansEffects } from './store/plans/plans.effects';
import { plansReducer } from './store/plans/plans.reducer';


@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [
    StoreModule.forRoot({
     auth: authReducer, 
     plans: plansReducer
    }),
    EffectsModule.forRoot([AuthEffects, PlansEffects]),
    BrowserModule, 
    IonicModule.forRoot(),
    AppRoutingModule, 
    ReactiveFormsModule,
    HttpClientModule],
  providers: [AuthService, 
  { 
    provide: RouteReuseStrategy, 
    useClass: IonicRouteStrategy
  }],
  bootstrap: [AppComponent],
})
export class AppModule {}
