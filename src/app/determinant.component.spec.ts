import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { DeterminantAppComponent } from '../app/determinant.component';

beforeEachProviders(() => [DeterminantAppComponent]);

describe('App: Determinant', () => {
  it('should create the app',
      inject([DeterminantAppComponent], (app: DeterminantAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'determinant works!\'',
      inject([DeterminantAppComponent], (app: DeterminantAppComponent) => {
    expect(app.title).toEqual('determinant works!');
  }));
});
