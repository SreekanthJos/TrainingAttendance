import { TestBed, inject } from '@angular/core/testing';

import { HomeworkService } from './homework.service';

describe('HomeworkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeworkService]
    });
  });

  it('should be created', inject([HomeworkService], (service: HomeworkService) => {
    expect(service).toBeTruthy();
  }));
});
