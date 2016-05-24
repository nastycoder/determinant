import { Component } from '@angular/core';

@Component({
  selector: 'messages',
  template: `
    <div class="message-area">
      <div class="messages spacer"></div>
    </div>
  `,
  styles: [`
    :host {}
  `]
})
export class MessagesComponent {

  constructor() {}

}
