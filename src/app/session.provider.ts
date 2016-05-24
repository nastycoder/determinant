import { provide, Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import {
  MatrixStore,
  AUTH_FROM_STORE,
  CurrentUser
} from './shared/matrix';

/**
 * Automatically handles storage and retrieval of session data from
 * `localStorage` by subscribing to the Redux stores.
 *
 * Shouldn't be any reason to interact with this service other than injecting
 * it into the root component so that it can begin working.
 */
@Injectable()
export class Session {
  private _userKey: string = 'user-data';

  constructor(store: Store<MatrixStore>) {

    if (this._getUser()) {
      store.dispatch(<Action>{
        type: AUTH_FROM_STORE,
        payload: this._getUser()
      });
    }

    store.select('currentUser').subscribe(
      (value: CurrentUser) => this._storeUser(value)
    );
  }

  private _getUser(): any {
    return JSON.parse(localStorage.getItem(this._userKey));
  }

  private _storeUser(user: CurrentUser): void {
    (user && user.access_token) ?
      localStorage.setItem(this._userKey, JSON.stringify(user)) :
      localStorage.removeItem(this._userKey);
  }
}

/**
 * Provides the {@link Session} injectable.
 */
export const SessionProvider: any = provide(Session, {
  useFactory: (
    store: Store<MatrixStore>
  ) => new Session(store),
  deps: [Store]
});
