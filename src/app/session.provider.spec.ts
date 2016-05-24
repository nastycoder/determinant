import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { Session } from './session.provider';

describe('Session', () => {
  beforeEachProviders(() => [Session]);

  it('should ...',
      inject([Session], (service: Session) => {
    expect(service).toBeTruthy();
  }));
});
