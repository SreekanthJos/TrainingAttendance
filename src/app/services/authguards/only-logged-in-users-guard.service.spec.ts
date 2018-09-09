import { TestBed, inject } from '@angular/core/testing';

import { OnlyLoggedInUsersGuard } from './only-logged-in-users-guard.service';

describe('OnlyLoggedInUsersGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OnlyLoggedInUsersGuard]
    });
  });

  it('should be created', inject([OnlyLoggedInUsersGuard], (service: OnlyLoggedInUsersGuard) => {
    expect(service).toBeTruthy();
  }));
});
