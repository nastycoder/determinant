import { Component, OnInit } from '@angular/core';
import { MdIcon } from '@angular2-material/icon';
import { DROPDOWN_MENU_DIRECTRIVES, $mSession } from '../../shared';

@Component({
  selector: 'profile-dropdown',
  template: `
    <dropdown-menu>
      <md-icon (click)="content.toggle()">arrow_drop_down</md-icon>
      <dropdown-menu-content #content width="2.8">
        <dropdown-menu-item>
          <div (click)="logout()">
            Log out
          </div>
        </dropdown-menu-item>
      </dropdown-menu-content>
    </dropdown-menu>
  `,
  styles: [],
  directives: [
    MdIcon,
    DROPDOWN_MENU_DIRECTRIVES
  ]
})
export class ProfileDropdownComponent implements OnInit {

  constructor(private _$mSession: $mSession) {}

  ngOnInit() {}

  logout(): void {
    this._$mSession.logout();
  }
}
