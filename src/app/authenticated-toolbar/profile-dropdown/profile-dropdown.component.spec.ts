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
import { ProfileDropdownComponent } from './profile-dropdown.component';

describe('Component: ProfileDropdown', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [ProfileDropdownComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([ProfileDropdownComponent],
      (component: ProfileDropdownComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(ProfileDropdownComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(ProfileDropdownComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-profile-dropdown></app-profile-dropdown>
  `,
  directives: [ProfileDropdownComponent]
})
class ProfileDropdownComponentTestController {
}

