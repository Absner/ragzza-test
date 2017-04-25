import { TestBed, inject } from '@angular/core/testing';

import { ApiRestService } from './api-rest.service';

describe('ApiRestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiRestService]
    });
  });

  it('should ...', inject([ApiRestService], (service: ApiRestService) => {
    expect(service).toBeTruthy();
  }));
});
