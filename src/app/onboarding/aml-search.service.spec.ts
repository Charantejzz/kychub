import { TestBed } from '@angular/core/testing';

import { AmlSearchService } from './aml-search.service';

describe('AmlSearchService', () => {
  let service: AmlSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmlSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
