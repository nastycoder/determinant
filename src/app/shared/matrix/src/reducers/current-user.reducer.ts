import { Reducer, Action } from '@ngrx/store';
import { CurrentUser } from '../models';

export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';
export const TOKEN_REFRESH = 'TOKEN_REFRESH';
export const AUTH_FROM_STORE = 'AUTH_FROM_STORE'

export const currentUser: Reducer<CurrentUser> = (
  state: any = null,
  action: Action
) => {
  switch (action.type) {
    case AUTH_FROM_STORE:
    case LOGGED_IN:
      return Object.assign(new CurrentUser(), action.payload );
    case LOGGED_OUT:
      return null;
    case TOKEN_REFRESH:
      return Object.assign(new CurrentUser(), state, action.payload);
    default:
      return state;
  }
}