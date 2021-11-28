import { TestBed } from '@angular/core/testing';

import { NetworkingManagerService } from './networking-manager.service';

describe('NetworkingManagerService', () => {
  let service: NetworkingManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkingManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
