import { createReducer, on } from '@ngrx/store';
import { User } from './user.model';
import { UserActions } from './user.actions';

export const userFeatureKey = 'user';

export interface UserState {
  user?: User;
}

export const initialState: UserState = {
  user: undefined,
};

export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsersSuccess, (state, { user }) => ({ ...state, user })),
  on(UserActions.loadUsersFailure, (state) => ({ ...state, user: undefined }))
);
