import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationImportComponent } from './pagination-import.component';

describe('PaginationImportComponent', () => {
  let component: PaginationImportComponent;
  let fixture: ComponentFixture<PaginationImportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationImportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginationImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
