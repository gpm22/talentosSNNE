import { TestBed } from '@angular/core/testing';

import { GateGuardian } from './guard.guard';

describe('GuardGuard', () => {
  let guard: GateGuardian;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(GateGuardian);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
