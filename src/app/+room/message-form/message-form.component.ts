import { Component, OnInit } from '@angular/core';
import { MdButton } from '@angular2-material/button';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';

@Component({
  selector: 'message-form',
  template: `
    <form>
      <md-input placeholder="Send some text" type="text"></md-input>
      <button md-raised-button type="submit">Send</button>
    </form>
  `,
  styles: [`
    form {
      align-self: flex-end;
      width: 100%;
      display: flex;
      flex: 0 0;
      flex-flow: row nowrap;
    }
    md-input {
      flex: 2;
      max-width: 90%;
    }
    button {
      margin-bottom: 11px;
      margin-left: 8px;
    }
  `],
  directives: [
    MD_INPUT_DIRECTIVES,
    MdButton
  ]
})
export class MessageFormComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
