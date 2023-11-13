import { createAction, props } from '@ngrx/store';


export const login = createAction(
    '[Auth] Login',
    props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{ payload: any }>()
);

export const loginFailure = createAction(
    '[Auth] Login Failure',
    props<{ error: any }>()
);

export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

export const logoutFailure = createAction(
    '[Auth] Logout Failure',
    props<{ error: any }>()
);

export const register = createAction(
    '[Auth] Register',
    props<{ name:string, email: string; password: string }>()
);

export const registerSuccess = createAction(
    '[Auth] Register Success',
    props<{ payload: any }>()
);

export const registerFailure = createAction(
    '[Auth] Register Failure',
    props<{ error: any }>()
);


export const AuthActions = {
    login,
    loginSuccess,
    loginFailure,
    logout,
    logoutSuccess,
    logoutFailure,
    register,
    registerSuccess,
    registerFailure,
};
