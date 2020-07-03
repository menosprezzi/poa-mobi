import { TestBed } from '@angular/core/testing';

import { TransportationWebRepository } from './transportation-web.repository';

describe('TransportationRepository', () => {
  let service: TransportationWebRepository;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportationWebRepository);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
