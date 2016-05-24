import { Component } from '@angular/core';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';

@Component({
  selector: 'members-area',
  template: `
    <div class="member-search">
      <md-input placeholder="Search for someone" type="text"></md-input>
    </div>
    <p> Members list goes here <p>
  `,
  styles: [`
    .message-area {
      display: flex;
      flex-direction: column;
      width: 100%;
      flex: 1;
    }
  `],
  directives: [
    MD_INPUT_DIRECTIVES
  ]
})

export class MembersAreaComponent {
  constructor() {}
}
