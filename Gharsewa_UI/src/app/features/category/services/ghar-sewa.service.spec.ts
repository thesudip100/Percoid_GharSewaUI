import { TestBed } from '@angular/core/testing';

import { GharSewaService } from './ghar-sewa.service';

describe('GharSewaService', () => {
  let service: GharSewaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GharSewaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
