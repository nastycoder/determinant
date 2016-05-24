import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MdToolbar } from '@angular2-material/toolbar';
import { MdSidenav } from '@angular2-material/sidenav';
import { MdIcon } from '@angular2-material/icon';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'unauthenticated-toolbar',
  template: `
    <md-toolbar color="primary">
      <span style="flex: 1 1 auto;"></span>
      <nav>
        <a [routerLink]="['login']">Login</a>
      </nav>
    </md-toolbar>
  `,
  styles: [],
  directives: [
    MdToolbar,
    MdIcon,
    ROUTER_DIRECTIVES
  ]
})
export class UnauthenticatedToolbarComponent {
  @Input('menu') menu: MdSidenav;

  constructor() {}
}
