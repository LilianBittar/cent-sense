import {  Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { of } from 'rxjs';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.login),
            exhaustMap((action: any) =>
                this.authService.login(action.username, action.password).pipe(
                    map((user: any) => AuthActions.loginSuccess(user)),
                    catchError((error) => of(AuthActions.loginFailure({ error })))
                )
            )
        )
    );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            exhaustMap(() =>
                this.authService.logout().pipe(
                    map(() => AuthActions.logoutSuccess()),
                    catchError((error) => of(AuthActions.logoutFailure({ error })))
                )
            )
        )
    );

    constructor(
        private actions$: Actions,
        private authService: AuthService
    ) {}

}
