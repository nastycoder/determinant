import { Request, RequestOptions, Response } from '@angular/http';
import { CurrentUser } from './models';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

/**
 * Interface for options to construct a [ApiOptions] instance.
 */
export interface ApiOptionsArgs {
  identity_host: string
  home_host: string
}

/**
 * Interface defining expected credential properties.
 */
export interface Credentials {
  user: string
  password: string
}

/**
 * Interface describing the redux store.
 */
export interface MatrixStore {
  currentUser: CurrentUser
}