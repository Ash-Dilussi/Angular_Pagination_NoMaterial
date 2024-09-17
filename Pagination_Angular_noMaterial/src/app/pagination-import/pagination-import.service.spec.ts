import { TestBed } from '@angular/core/testing';

import { PaginationImportService } from './pagination-import.service';

describe('PaginationImportService', () => {
  let service: PaginationImportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaginationImportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
