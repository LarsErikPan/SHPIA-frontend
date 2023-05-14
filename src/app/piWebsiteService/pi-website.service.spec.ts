import { TestBed } from '@angular/core/testing';

import { PiWebsiteService } from './pi-website.service';

describe('PiWebsiteService', () => {
  let service: PiWebsiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PiWebsiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
