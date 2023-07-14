import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { ActivityService } from './activity.service';
import { AppActions } from '../../app.action';
import { ActivityActions } from './activity.actions';

@Injectable()
export class ActivityEffects {
  loadActivities$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AppActions.initApp),
      concatMap(() =>
        this.ActivityService.fetchActivities().pipe(
          map((activities) =>
            ActivityActions.loadActivitiesSuccess({ activities })
          ),
          catchError((error) =>
            of(ActivityActions.loadActivitiesFailure({ error }))
          )
        )
      )
    );
  });

  constructor(
    private actions$: Actions,
    private ActivityService: ActivityService
  ) {}
}
