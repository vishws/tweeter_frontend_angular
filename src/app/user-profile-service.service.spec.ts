import { TestBed } from '@angular/core/testing';

import { UserProfileServiceService } from './user-profile-service.service';

describe('UserProfileServiceService', () => {
  let service: UserProfileServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProfileServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
