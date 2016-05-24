/**
 * @module
 * @description
 * The matrix module provides services to perform http requests to a Matrix
 * Client-Server API. These services follow the APIs documented [here]{@link
 https://matrix.org/docs/api/client-server/#/}.
 */
import { provide } from '@angular/core';
import { Http } from '@angular/http';
import { provideStore, Store } from '@ngrx/store';

import {
  AUTH_FROM_STORE,
  ApiOptions,
  ApiOptionsArgs,
  BaseApiOptions,
  Credentials,
  MatrixStore,
  currentUser,
  rooms,
  $mSession,
  $mSync
} from './src';

export {
  AUTH_FROM_STORE,
  ApiOptions,
  ApiOptionsArgs,
  Credentials,
  MatrixStore,
  $mSession,
  $mSync
};

export * from './src/models';

export const MATRIX_PROVIDERS: any[] = [
  provide($mSession, {
    useFactory: (
      http: Http,
      options: ApiOptions,
      store: Store<MatrixStore>
    ) => new $mSession(http, options, store),
    deps: [Http, ApiOptions, Store]
  }),
  provide($mSync, {
    useFactory: (
      http: Http,
      options: ApiOptions,
      store: Store<MatrixStore>
    ) => new $mSync(http, options, store),
    deps: [Http, ApiOptions, Store]
  }),
  provide(ApiOptions, { useClass: BaseApiOptions }),
  provideStore({ currentUser, rooms })
];