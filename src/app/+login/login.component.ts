import { AfterViewInit, ViewChild, Component } from '@angular/core';
import { ControlGroup } from '@angular/common';
import { Store } from '@ngrx/store';
import { OnActivate, Router } from '@angular/router';

import { LoginFormComponent } from './login-form';
import { $mSession, Credentials, CurrentUser, MatrixStore } from '../shared';

@Component({
  selector: 'login',
  template: `
    <span class="spacer"></span>
    <span class="center">
      <span class="spacer half-grow"></span>
      <login-form></login-form>
      <span class="spacer"></span>
    </span>
    <span class="spacer"></span>
  `,
  styles: [`
    :host {
      display: flex;
      flex-flow: row nowrap;
      height: 100%;
    }
    .center {
      display: flex;
      flex-direction: column;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .half-grow {
      flex-grow: 0.5;
    }
  `],
  directives: [ LoginFormComponent ]
})

export class LoginComponent implements AfterViewInit, OnActivate {
  @ViewChild(LoginFormComponent) private _form: LoginFormComponent;

  constructor(
    private _router: Router,
    private _$mSession: $mSession,
    private _store: Store<MatrixStore>
  ) {}

  ngAfterViewInit() {
    this._form.onSubmit.subscribe(
      (creds: Credentials) => this._login(creds)
    )
  }

  routerOnActivate() {
    if (this._store.getState().currentUser) {
      this._navHome();
    }
  }

  //TODO actually do something useful with this error
  private _login(creds: Credentials): void {
    this._$mSession.login(creds).subscribe(
      () => this._navHome(),
      (error) => console.debug('login failed', error)
    );
  }

  private _navHome() {
    this._router.navigateByUrl('/');
  }
}
