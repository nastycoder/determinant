import { Component, OnInit } from '@angular/core';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MdButton } from '@angular2-material/button';
import { MdIcon } from '@angular2-material/icon';
import { MD_SIDENAV_DIRECTIVES } from '@angular2-material/sidenav';
import { MdToolbar } from '@angular2-material/toolbar';
import { MembersAreaComponent } from './members-area';
import { MessagesComponent } from './messages';
import { MessageFormComponent } from './message-form';

@Component({
  selector: 'room',
  directives: [
    MD_INPUT_DIRECTIVES,
    MdButton,
    MD_SIDENAV_DIRECTIVES,
    MdToolbar,
    MembersAreaComponent,
    MessagesComponent,
    MessageFormComponent,
    MdIcon
  ],
  template: `
    <md-sidenav-layout fullscreen>
      <md-sidenav #members
          align="end"
          mode="side">
        <members-area></members-area>
      </md-sidenav>

      <div class="content">
        <md-toolbar color="accent">
          <span class="spacer"></span>
          <span>{{ title }}</span>
          <span class="spacer"></span>
          <md-icon (click)="members.toggle()">
            keyboard_arrow_{{ (members.opened) ? 'left' : 'right' }}
          </md-icon>
        </md-toolbar>

        <messages></messages>
        <message-form></message-form>
      </div>
    </md-sidenav-layout>
  `,
  styles: [`
    :host {
      /*position: relative;*/
    }
    md-toolbar, message-form {
      flex: none;
    }
    messages {
      flex: 1;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .content {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  `]
})
export class RoomComponent {
  public title: string = "You're in this room";
  constructor() {}
}
