import { Component } from '@angular/core';

import { RoomActionsComponent } from './room-actions';
import { RoomListComponent } from './room-list';
import { RoomSearchComponent } from './room-search';

@Component({
  selector: 'sidenav',
  template: `
    <room-search></room-search>
    <room-list></room-list>
    <room-actions></room-actions>
  `,
  styles: [`
    :host {
      width: 200px;
      height: 100%;
      margin: 10px;
      display: flex;
      flex-direction: column;
    }
    room-list {
      flex: 1 1 auto;
    }
    room-actions {
      align-self: flex-end;
    }
  `],
  directives: [
    RoomActionsComponent,
    RoomListComponent,
    RoomSearchComponent
  ]
})
export class SidenavComponent {
  constructor() {}
}
