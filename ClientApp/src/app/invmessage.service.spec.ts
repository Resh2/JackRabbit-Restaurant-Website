import { TestBed, inject } from '@angular/core/testing';

import { InvmessageService } from './invmessage.service';

describe('InvmessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvmessageService]
    });
  });

  it('should be created', inject([InvmessageService], (service: InvmessageService) => {
    expect(service).toBeTruthy();
  }));
});
