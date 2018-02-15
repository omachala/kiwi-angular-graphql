import { TestBed, inject } from '@angular/core/testing';

import { KiwiClientService } from './kiwi-client.service';

describe('KiwiClientService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KiwiClientService]
    });
  });

  it('should be created', inject([KiwiClientService], (service: KiwiClientService) => {
    expect(service).toBeTruthy();
  }));
});
