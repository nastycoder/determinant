import { EventContent } from './event-content.model';
export class mEvent {
  private _content: EventContent;
  type: string;

  get content(): EventContent { return this._content; }
  set content(value) {
    this._content = Object.assign(new EventContent(), value);
  }
}