import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from '../api';
import { ApiOptions } from '../api-options';
import { Credentials, MatrixStore } from '../interfaces';
import { CurrentUser } from '../models';
import {
  LOGGED_IN,
  LOGGED_OUT,
  TOKEN_REFRESH
} from '../reducers/current-user.reducer';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

/**
 * Handles http requests related to [session management]
 * (https://matrix.org/docs/spec/client_server/r0.1.0.html#login).
 *
 * TODO
 * Add support for other authentication methods.
 */

@Injectable()
export class $mSession extends Api {
  private _urlBase: string;

  constructor(
    private _http: Http,
    private options: ApiOptions,
    private _store: Store<MatrixStore>
  ) {
    super();
    this._urlBase = `${options.identity_host}/_matrix/client/r0`;
  }

  /**
   * Authenticates the user using username/password, and issues an access token
   * they can use to authorize themself in subsequent requests.
   */
  public login({user, password}: Credentials): Observable<Action> {
    let observable =  this._http.post(
      `${this._urlBase}/login`,
      JSON.stringify({
        type: 'm.login.password',
        user: user,
        password: password
      }),
      { headers: this.headers }
    ).map(response => response.json())
     .map(json => (<Action>{ type: LOGGED_IN, payload: json }));

    this._subscribe(observable);

    return observable;
  }

  /**
   * Fires logout request.
   */
  public logout(): Observable<Action> {
    let observable =  this._http.post(
      `${this._urlBase}/logout`,
      null,
      {
        headers: this.headers,
        search: `access_token=${this._accessToken}`
      }
    ).map(response => (<Action>{ type: LOGGED_OUT }));

    this._subscribe(observable);

   return observable;
  }

  /**
   * Exchanges a refresh token for a new access token. This is intended to be
   * used if the access token has expired.
   */
  public tokenRefresh(): Observable<Action> {
    let observable = this._http.post(
      `${this._urlBase}/tokenrefresh`,
      JSON.stringify({ refresh_token: this._refreshToken }),
      {
        headers: this.headers,
        search: `access_token=${this._accessToken}`
      }
    ).map(response => response.json())
     .map(json => (<Action>{ type: TOKEN_REFRESH, payload: json }) )

    this._subscribe(observable);

    return observable;
  }

  private get _accessToken(): string {
    let user =  this._store.getState().currentUser;
    return (user) ? user.access_token : ''
  }

  private get _refreshToken(): string {
    let user =  this._store.getState().currentUser;
    return (user) ? user.refresh_token : ''
  }

  private _subscribe(observable: Observable<Action>): void {
    observable.subscribe(
      (action: Action) => this._store.dispatch(action),
      () => {} // Gotta have an error function for when things blow up.
    )
  }
}