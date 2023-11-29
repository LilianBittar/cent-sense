import {  Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';
import { EventRelayService } from 'src/app/services/event-relay.service';
import { ApiAdapterService } from 'src/app/services/api-adapter.service';

@Injectable()
export class AuthEffects {

    
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            exhaustMap((action: any) =>
                this.authService.login(action.email, action.password).pipe(
                    map((user: any) => {
                        this.eventRelay.emit('login_success', '');
                        this.eventRelay.emit('hide_loading', '');
                        this.router.navigate(['/auth/plans']);
                        return AuthActions.loginSuccess(user);
                    }),
                    catchError((error) => {
                        this.eventRelay.emit('login_failure', '');
                        this.eventRelay.emit('hide_loading', '');
                        return of(AuthActions.loginFailure({ error }));
                    })
                )
            )
        )
    );



    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            exhaustMap(() =>
                this.authService.logout().pipe(
                    map(() => {
                        AuthActions.logoutSuccess()
                        return AuthActions.logoutSuccess()
                    }),
                    catchError((error) => of(AuthActions.logoutFailure({ error })))
                )
            )
        )
    );


    register$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.register),
            exhaustMap((action: any) =>
                this.authService.register(action.name, action.email, action.password).pipe(
                    map((user: any) => {
                        this.eventRelay.emit('registration_success', '');
                        this.router.navigate(['/login']);
                        return AuthActions.registerSuccess(user);
                    }),
                    catchError((error) => {
                        this.eventRelay.emit('registration_failure', '');
                        return of(AuthActions.registerFailure({ error }));
                    })
                )
            )
        )
    );

    editUserInfo$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.updateUserInfo),
            exhaustMap((action: any) =>
                this.apiAdapter.updateUserInfo(action.zip_code, action.radius).pipe(
                    map((user: any) => {
                        this.eventRelay.emit('update_user_info_success', '');
                        return AuthActions.updateUserInfoSuccess(user);
                    }),
                    catchError((error) => {
                        this.eventRelay.emit('update_user_info_failure', '');
                        return of(AuthActions.updateUserInfoFailure({ error }));
                    })
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private authService: AuthService,
        private eventRelay: EventRelayService,
        private router: Router,
        private apiAdapter: ApiAdapterService
    ) {}

}
