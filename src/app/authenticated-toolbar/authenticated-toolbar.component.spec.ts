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
import { AuthenticatedToolbarComponent } from './authenticated-toolbar.component';

describe('Component: AuthenticatedToolbar', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [AuthenticatedToolbarComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([AuthenticatedToolbarComponent],
      (component: AuthenticatedToolbarComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(AuthenticatedToolbarComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(AuthenticatedToolbarComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-authenticated-toolbar></app-authenticated-toolbar>
  `,
  directives: [AuthenticatedToolbarComponent]
})
class AuthenticatedToolbarComponentTestController {
}

