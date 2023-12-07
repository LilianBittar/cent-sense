import { createReducer, on } from '@ngrx/store';

import { PlansActions } from './plans.actions';

export interface PlansState {
    plans: any;
}

export const initialState: PlansState = {
    plans: [],
};

export const plansReducer = createReducer(
    initialState,
    on(PlansActions.PlansLoadAction, (state) => {
        return {
            ...state,
        };
    }),
    on(PlansActions.PlansLoadSuccessAction, (state, action) => {
        localStorage.setItem('plans', JSON.stringify(action.payload));
        return {
            ...state,
            plans: action.payload,
        };
    }),
    on(PlansActions.PlanSaveAction, (state, action) => {
        return {
            ...state,
        };
    }),
    on(PlansActions.PlanSaveSuccessAction, (state, action) => {
        return {
            ...state,
        };
    }),
);