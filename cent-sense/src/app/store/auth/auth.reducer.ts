import { createReducer, on } from '@ngrx/store';
import { login, logout, loginSuccess } from './auth.actions';

export interface AuthState {
    user: any;
}

export const initialState: AuthState = {
    user: null,
};

export const authReducer = createReducer(
    initialState,
    on(login, (state, action) => {
        return {
            ...state,
        };
    }),
    on(logout, (state, action) => {
        return {
            ...state,
            user: null,
        };
    }),
    on(loginSuccess, (state, action:any) => {
        localStorage.setItem('user', JSON.stringify(action.user));
        localStorage.setItem('token', action.token);
        return {
            ...state,
            user: action.payload,
        };
    }),
);
