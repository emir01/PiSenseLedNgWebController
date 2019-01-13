import { TestBed, inject } from '@angular/core/testing';

import { LedBoardService } from './led-board.service';

describe('LedBoardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LedBoardService]
    });
  });

  it('should be created', inject([LedBoardService], (service: LedBoardService) => {
    expect(service).toBeTruthy();
  }));
});
