import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input
} from '@angular/core';

import { Routes , ROUTER_DIRECTIVES } from '@angular/router';
import { CurrentUser, MatrixStore, $mSync } from './shared';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { Session } from './session.provider';

import { LoginComponent } from './+login';
import { RoomComponent } from './+room';

import { AuthenticatedToolbarComponent } from './authenticated-toolbar';
import { UnauthenticatedToolbarComponent } from './unauthenticated-toolbar';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { SidenavComponent } from './sidenav';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'user-test',
  template: `
    <h2>{{ user.user_id }}</h2>
  `
})
class UserTest {
  @Input('user') user: CurrentUser;
}


@Component({
  selector: 'home',
  template: `
    <div *ngIf="hasUser">
      <user-test [user]="currentUser | async"></user-test>
    </div>
    <div *ngIf="!hasUser">
      Please go login.
    </div>
  `,
  directives: [UserTest]
})
export class Home  implements OnInit {
  currentUser: Observable<CurrentUser>;
  hasUser: boolean = false;

  constructor(private _store: Store<MatrixStore>) {}

  ngOnInit() {
    this.currentUser = this._store.select<CurrentUser>('currentUser')
    this.currentUser.subscribe(
      (value) => { this.hasUser = !!value; },
      () => {}
    );
  }
}


@Component({
  selector: 'determinant-app',
  template: `
    <a [routerLink]="['/']"></a>
    <md-sidenav-layout fullscreen>
      <md-sidenav #menu (click)="menu.close()">
        <sidenav *ngIf="userPresent"></sidenav>
      </md-sidenav>
      <div class="content">
        <authenticated-toolbar *ngIf="userPresent" [menu]="menu">
        </authenticated-toolbar>
        <unauthenticated-toolbar *ngIf="!userPresent">
        </unauthenticated-toolbar>

        <router-outlet></router-outlet>
        {{ userPresent }}
      </div>
    </md-sidenav-layout>
  `,
  styles: [`
    :host {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 100%;
    }
    :host /deep/ md-content {
      height: 100%;
    }
  `],
  directives: [
    MD_SIDENAV_DIRECTIVES,
    ROUTER_DIRECTIVES,
    AuthenticatedToolbarComponent,
    UnauthenticatedToolbarComponent,
    SidenavComponent
  ]
})

@Routes([
  { path: '/', component: Home },
  { path: '/login', component: LoginComponent },
  { path: '/room', component: RoomComponent },
  { path: '*', component: Home }
])

export class DeterminantAppComponent implements OnInit {
  title = 'determinant works!';
  userPresent: boolean;
  constructor(
    session: Session,
    $mSync: $mSync,
    private _store: Store<MatrixStore>
  ) {}

  ngOnInit() {
    this._store.select('currentUser').subscribe(
      (value: CurrentUser) => this._setUserPresent(value),
      () => {}
    );
  }

  private _setUserPresent(user: CurrentUser): void {
    this.userPresent = !!user;
  }
}
