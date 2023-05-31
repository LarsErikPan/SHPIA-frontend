import { TestBed } from '@angular/core/testing';

import { BarDataService } from './bar-data.service';

describe('BarDataService', () => {
  let service: BarDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
