import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import { ApiAdapterService } from 'src/app/services/api-adapter.service';
import { PlansActions } from './plans.actions';

@Injectable()
export class PlansEffects {
  constructor(
    private actions$: Actions,
    private apiAdapter: ApiAdapterService
  ) {}

  plansLoad$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PlansActions.PlansLoadAction),
      exhaustMap(() =>
        this.apiAdapter.getPlans().pipe(
          map((data: any) => {
            return PlansActions.PlansLoadSuccessAction({ payload: data.plans });
          }),
          catchError((error) => EMPTY)
        )
      )
    )
  );
}
