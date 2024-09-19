import { Component,  OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaginationService } from '../core/pagination.service';
import { AppService } from './app.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PaginationImportComponent } from './pagination-import/pagination-import.component';
import { PaginationImportService } from './pagination-import/pagination-import.service';
import {
  NgbToastModule, NgbProgressbarModule, NgbNavChangeEvent, NgbNavModule,
} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    HttpClientModule,
    PaginationImportComponent,
    NgbNavModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  activeTabId: number = 1;
  requestStatus: any = 0;


  currentPage = this.pageservice.page;
  itemsPerPage = this.pageservice.pageSize;
  totalItems: number = 100;
  startItemIndex: number = this.pageservice.startIndex;
  endtItemIndex: number = this.pageservice.endIndex;
  totalPages: any;

  title = 'Pagination_Angular_noMaterial';
  filteredItems: any[] = [];
  slicedList: any[] = [];

  isLoading = true;



  // variables for imported pagination component
  currentPageim = 1;
  itemsPerPageim: number = 5;
  slicedListim: any[] = [];
  startindex = 0;
  endindex: any;
  totalpgs = 0;
  //end



  constructor(public pageservice: PaginationService,
    private _appService: AppService,
    private _imprtPageService: PaginationImportService
  ) { }


  ngOnInit(): void {
    this.fetchAllData();


  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
    this.filteredItems = [];
    console.log(changeEvent);
    


    switch (changeEvent.nextId) {
      case 1:
        this.isLoading =true;
        this.requestStatus = 0;
        this.fetchAllData();
        break;
      case 2:

      this.isLoading = true;
        this.requestStatus = 2; 
        this.fetchDataByStatus(this.requestStatus);
        break;

      default:
        break;
    }
  }




  changePage(pno: number) {
  
    this.pageservice.page = pno;
    this.slicedList = this.pageservice.changePage(this.filteredItems);
    this.currentPage = pno;


  }


  fetchAllData() {
    this._appService.getAllItemList().subscribe((data: any) => {
      this.filteredItems = [...data];


      this.totalItems = this.filteredItems.length;
      this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
      //const columnNames = this.getColumnNames(this.filteredItems);
      //this.filteredItems = this.pageservice.onSort(columnNames[2], this.filteredItems);

      this.isLoading = false;
      const sortColumnName = Object.keys(this.filteredItems[0])[2];
      this.filteredItems = this.pageservice.onSort(sortColumnName, this.filteredItems);

      this.changePage(1);
      console.log("All Itme count: " + this.totalItems)
      console.log(this.slicedList)


    })
  }

  fetchDataByStatus(status: any): void {
    this.isLoading = true;
    this._appService.getDataByStatus(status).subscribe(data => {
      switch (status) {
        case 2:

          this.filteredItems = [...data];
          this.isLoading = false;
          break;
        default:
          break;

      }


      //for import pagination
      if (this.filteredItems.length > 0) {
        this.totalpgs = Math.ceil(this.filteredItems.length / this.itemsPerPage);
        this.currentPageim = 1;
        const sortColumnName = Object.keys(this.filteredItems[0])[2];
        this.filteredItems = this._imprtPageService.onSort(sortColumnName, this.filteredItems);
        this.slicedListim = this._imprtPageService.changePages(this.filteredItems, this.itemsPerPageim, this.currentPageim);
        this.startindex = this._imprtPageService.startIndex;
        this.endindex = this._imprtPageService.endIndex;
      }
      //end

      console.log(this.slicedListim)



    });
  }
  getEmptyRows(): any[] {
    const rowsNeeded = this.itemsPerPage - this.slicedList.length;
    return new Array(rowsNeeded).fill(null);
  }


  getColumnNames(data: any[]): string[] {
    if (data.length === 0) return [];
    return Object.keys(data[0]);
  }



  // methods for import pagination component
  get paginatedData() {

    this._imprtPageService.page = this.currentPageim;
    this.slicedListim = this._imprtPageService.changePages(this.filteredItems, this.itemsPerPageim, this.currentPageim)
    this.startindex = this._imprtPageService.startIndex;
    this.endindex = this._imprtPageService.endIndex;

    return this.slicedListim;
  }
  changePageImport(page: number) {
    this.currentPageim = page;
  }

  getEmptyRowsImport(slicesize: number): any[] {
    return this._imprtPageService.getEmptyRows(slicesize);
  }
  //end

}
