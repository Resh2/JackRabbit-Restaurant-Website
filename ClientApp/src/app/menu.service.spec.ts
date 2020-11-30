import { TestBed, inject } from '@angular/core/testing';

import { menuService } from './menu.service';

describe('MenuServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [menuService]
    });
  });

  it('should be created', inject([menuService], (service: menuService) => {
    expect(service).toBeTruthy();
  }));
});
