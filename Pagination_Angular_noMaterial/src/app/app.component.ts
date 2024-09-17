import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaginationService } from '../core/pagination.service';
import { AppService } from './app.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PaginationImportComponent } from './pagination-import/pagination-import.component';
import { PaginationImportService } from './pagination-import/pagination-import.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, PaginationImportComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

   currentPage = this.pageservice.page;
  itemsPerPage = this.pageservice.pageSize;
   totalItems: number = 100;
  startItemIndex : number = this.pageservice.startIndex;
  endtItemIndex : number = this.pageservice.endIndex;
  totalPages: any;

  title = 'Pagination_Angular_noMaterial';
  allItemList: any[] = [];
  slicedList: any[] = [];

  isLoading = true;


  
  // variables for imported pagination component
  currentPageim = 1;
  itemsPerPageim:number = 5;
  slicedListim: any[] = [];
  startindex =0;
  endindex: any;
  totalpgs=0;
  //end



  constructor(public pageservice: PaginationService,
    private _appService: AppService,
    private _imprtPageService: PaginationImportService
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
      
      this.isLoading = false;
      const sortColumnName = Object.keys(this.allItemList[0])[2];
      this.allItemList = this.pageservice.onSort(sortColumnName, this.allItemList);

      this.changePage(1);
      console.log("All Itme count: " + this.totalItems)


        //for import pagination
      if(this.allItemList.length>0){
        this.totalpgs = Math.ceil(this.allItemList.length / this.itemsPerPage);
        this.currentPageim= 1;
        const sortColumnName = Object.keys(this.allItemList[0])[2];
        this.allItemList = this._imprtPageService.onSort(sortColumnName, this.allItemList);
        this.slicedListim = this._imprtPageService.changePages(this.allItemList, this.itemsPerPageim, this.currentPageim);
        this.startindex = this._imprtPageService.startIndex;
        this.endindex = this._imprtPageService.endIndex;
     }
     //end
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



// methods for import pagination component
  get paginatedData(){

    this._imprtPageService.page= this.currentPageim;
    this.slicedListim= this._imprtPageService.changePages(this.allItemList,this.itemsPerPageim, this.currentPageim)
    this.startindex= this._imprtPageService.startIndex;
    this.endindex= this._imprtPageService.endIndex;
  
    return this.slicedList;
  }
  changePageImport(page: number) {
    this.currentPage = page;
  }

  getEmptyRowsImport(slicesize: number): any[] {
    return this._imprtPageService.getEmptyRows(slicesize);
  }
  //end

}
