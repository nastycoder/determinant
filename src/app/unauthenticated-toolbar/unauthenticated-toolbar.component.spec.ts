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
import { UnauthenticatedToolbarComponent } from './unauthenticated-toolbar.component';

describe('Component: UnauthenticatedToolbar', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [UnauthenticatedToolbarComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([UnauthenticatedToolbarComponent],
      (component: UnauthenticatedToolbarComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(UnauthenticatedToolbarComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(UnauthenticatedToolbarComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-unauthenticated-toolbar></app-unauthenticated-toolbar>
  `,
  directives: [UnauthenticatedToolbarComponent]
})
class UnauthenticatedToolbarComponentTestController {
}

