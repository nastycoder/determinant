import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Api } from '../api';
import { ApiOptions } from '../api-options';
import { Credentials, MatrixStore } from '../interfaces';
import { CurrentUser } from '../models';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {
  SEED_ROOMS,
  UPDATE_ROOMS
} from '../reducers';


/**
 * Handles [Sync](https://matrix.org/docs/spec/client_server/r0.1.0.html#get-matrix-client-r0-sync)
 * requests.
 */
@Injectable()
export class $mSync extends Api {
  private _nextBatch: string;
  private _timeout: number = 30000;

  constructor(
    private _http: Http,
    private _options: ApiOptions,
    private _store: Store<MatrixStore>
  ) {
    super();

    _store.select('currentUser').subscribe((value: CurrentUser) => {
      if (value) {
        this._sync();
      } else {
        this._nextBatch = null;
      }
    });
  }

  private _sync(): void {
    let user = this._store.getState().currentUser

    if (!user) { return; }

    this._perform({
      access_token: user.access_token,
      full_state: !(!!this._nextBatch),
      since: this._nextBatch,
      set_presence: user.presence,
      timeout: this._timeout
    });
  }

  private _buildActions(json: any): Action[] {
    let actions: Action[] = [],
        isInitial: boolean = !!this._nextBatch;

    this._nextBatch = <string>json.next_batch;

    if (json.rooms && json.rooms.join) {
      actions.push({
        type: isInitial ? SEED_ROOMS : UPDATE_ROOMS,
        payload: json.rooms.join
      });
    }
    return actions;
  }

  private _perform(params): void {
    this._http.get(
      `${this._options.home_host}/_matrix/client/r0/sync`,
      { headers: this.headers, search: this._buildSearch(params)}
    ).map( response => response.json() )
     .map( (json) => this._buildActions(json) )
     .subscribe( (actions: Action[]) => {
       actions.forEach( action => this._store.dispatch(action) );
       this._sync();
     })
  }

  private _buildSearch(params): string {
    let search = '';
    Object.keys(params).forEach( (key, idx, keys )=> {
      if (!params[key]) { return; }
      search = `${search}${key}=${params[key]}${(idx < keys.length -1) ? '&' : ''}`;
    });
    return search;
  }
}