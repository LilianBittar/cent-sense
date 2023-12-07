import { createAction, props } from '@ngrx/store';


export const PlansLoadAction = createAction(
    '[Plans] Load'
);

export const PlansLoadSuccessAction = createAction(
    '[Plans] Load Success',
    props<{ payload: any }>()
);

export const PlanSaveAction = createAction(
    '[Plans] Save',
    props<{ payload: any }>()
);

export const PlanSaveSuccessAction = createAction(
    '[Plans] Save Success',
    props<{ payload: any }>()
);

export const PlansActions = {
    PlansLoadAction,
    PlansLoadSuccessAction,
    PlanSaveAction,
    PlanSaveSuccessAction,
};
