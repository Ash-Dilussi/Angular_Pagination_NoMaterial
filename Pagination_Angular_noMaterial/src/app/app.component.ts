import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaginationService } from '../core/pagination.service';
import { AppService } from './app.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  @Input() currentPage = this.pageservice.page;
  @Input() itemsPerPage = this.pageservice.pageSize;
  @Input() totalItems: number = 100;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  totalPages: any;

  title = 'Pagination_Angular_noMaterial';
  allItemList: any[] = [];
  slicedList: any[] = [];


  constructor(public pageservice: PaginationService,
    private _appService: AppService
  ) { }


  ngOnInit(): void {
    this.fetchData();


  }


  changePage(pno: number) {
    console.log("nexxt pressed");
    this.pageservice.page = pno;
    this.slicedList = this.pageservice.changePage(this.allItemList);
    this.currentPage = pno;


  }


  fetchData() {
    this._appService.getAllItemList().subscribe((data: any) => {
      this.allItemList = [...data];


      this.totalItems = this.allItemList.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      //const columnNames = this.getColumnNames(this.allItemList);
      //this.allItemList = this.pageservice.onSort(columnNames[2], this.allItemList);
      
      const sortColumnName = Object.keys(this.allItemList[0])[2];
      this.allItemList = this.pageservice.onSort(sortColumnName, this.allItemList);

      this.changePage(1);
      console.log("All Itme count: " + this.totalItems)
    })
  }
  getEmptyRows() :any[]{
    const rowsNeeded = this.itemsPerPage - this.slicedList.length;
    return new Array(rowsNeeded).fill(null);
  }
  

  getColumnNames(data: any[]): string[] {
    if (data.length === 0) return [];
    return Object.keys(data[0]);
  }

}
