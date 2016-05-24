import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import { ControlGroup, FORM_DIRECTIVES  } from '@angular/common';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MdButton } from '@angular2-material/button';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'login-form',
  template: `
    <md-card>
      <md-toolbar color="primary">Sign in to Determinant</md-toolbar>
      <form #f="ngForm" (ngSubmit)="onSubmit.emit(f.value)">
        <md-card-content>
          <md-input placeholder="Email or Username"
                    type="text"
                    ngControl="user">
          </md-input>

          <md-input placeholder="Password"
                    type="password"
                    ngControl="password">
          </md-input>


        </md-card-content>
        <md-card-actions align="end">
          <button md-raised-button type="submit">Sign in</button>
        </md-card-actions>
      </form>
    </md-card>
  `,
  styles: [`
    md-input {
      width: 100%;
    }
  `],
  directives: [
    MdButton,
    MD_CARD_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    FORM_DIRECTIVES
  ]
})
export class LoginFormComponent {

  constructor() {}

  @Output('submit') onSubmit = new EventEmitter<ControlGroup>();

}
