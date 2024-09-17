import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination-import',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination-import.component.html',
  styleUrl: './pagination-import.component.scss'
})
export class PaginationImportComponent implements OnInit {

  @Input() currentPage: number = 1;
  @Input() itemsPerPage = 5;
  @Input() totalItems: number = 0;
  @Input() startItemIndex: number = 1;
  @Input() endItemIndex: number = 0;
  @Input() totalPages: number = 0;

  @Output() pageChanged: EventEmitter<number> = new EventEmitter<number>();

  slicedList: any[] = [];
  filteredItems: any[] = [];


  ngOnInit(): void {

  }


  changePage(pno: number) {

    this.currentPage = pno;
    this.pageChanged.emit(pno);

  }

}
