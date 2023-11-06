import { createReducer, on } from '@ngrx/store';
import { login, logout, loginSuccess, loginFailure, logoutSuccess } from './auth.actions';

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
    on(loginSuccess, (state, action) => {
        console.log('loginSuccess', action.payload);
        localStorage.setItem('user', JSON.stringify(action.payload));
        return {
            ...state,
            user: action.payload,
        };
    }),
);