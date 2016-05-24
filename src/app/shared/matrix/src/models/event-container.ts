import { mEvent } from './event.model';
export class EventContainer {
  private _events: mEvent[];

  get events(): mEvent[] { return this._events; }
  set events(value) {
    this._events = [];

    value.forEach( (event) => {
      this._events.push( Object.assign(new mEvent(), event) )
    });
  }
}