import { TestBed } from '@angular/core/testing';

import { ShowprouductService } from './showprouduct.service';

describe('ShowprouductService', () => {
  let service: ShowprouductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowprouductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
