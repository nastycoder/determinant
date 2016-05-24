import { AccountData } from './account-data.model';
import { UnreadNotifcations } from './unread_notifications.model';
import { State } from './state.model';
import { Ephemeral } from './ephemeral.model';
import { Timeline } from './timeline.model';
export class Room {
  private _account_data: AccountData;
  private _ephemeral: Ephemeral;
  private _timeline: Timeline;
  private _state: State;
  private _unread_notifications: UnreadNotifcations;

  id: string;

  get account_data(): AccountData { return this._account_data; }
  set account_data(value) {
    this._account_data = Object.assign(new AccountData(), value);
  }

  get ephemeral(): Ephemeral { return this._ephemeral; }
  set ephemeral(value) {
    this._ephemeral = Object.assign(new Ephemeral(), value);
  }

  get timeline(): Timeline { return this._timeline; }
  set timeline(value) {
    this._timeline = Object.assign(new Timeline(), value);
  }

  get state(): State { return this._state; }
  set state(value) {
    this._state = Object.assign(new State(), value);
  }

  get unread_notifications(): UnreadNotifcations { return this._unread_notifications; }
  set unread_notifications(value) {
    this._unread_notifications = Object.assign(new UnreadNotifcations(), value);
  }
}