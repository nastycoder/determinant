import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatrixStore, Room } from '../../shared';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'room-list',
  template: `
    <ul>
      <li *ngFor="let room of rooms | async">
        {{ room.id }}
      </li>
    </ul>
  `,
  styles: []
})
export class RoomListComponent implements OnInit {
  rooms: Observable<Room[]>

  constructor(private _store: Store<MatrixStore>) {}

  ngOnInit() {
    this.rooms = this._store.select<Room[]>('rooms')
  }

}
