import { Component, Input } from '@angular/core';
import { MdToolbar } from '@angular2-material/toolbar';
import { MdSidenav } from '@angular2-material/sidenav';
import { MdIcon } from '@angular2-material/icon';
import { ProfileDropdownComponent } from './profile-dropdown';

@Component({
  selector: 'authenticated-toolbar',
  template: `
    <md-toolbar color="primary">
      <md-icon (click)="menu.open()">menu</md-icon>
      <span style="flex: 1 1 auto;"></span>
      <profile-dropdown></profile-dropdown>
    </md-toolbar>
  `,
  styles: [],
  directives: [
    MdToolbar,
    MdIcon,
    ProfileDropdownComponent
  ]
})
export class AuthenticatedToolbarComponent {
  @Input('menu') menu: MdSidenav;

  constructor() {}
}
