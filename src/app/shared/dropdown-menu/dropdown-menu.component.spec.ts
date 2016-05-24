import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DropdownMenu } from './dropdown-menu.component';

describe('Component: DropdownMenu', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [DropdownMenu]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([DropdownMenu],
      (component: DropdownMenu) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(DropdownMenuTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(DropdownMenu));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <dropdown-menu></dropdown-menu>
  `,
  directives: [DropdownMenu]
})
class DropdownMenuTestController {
}

