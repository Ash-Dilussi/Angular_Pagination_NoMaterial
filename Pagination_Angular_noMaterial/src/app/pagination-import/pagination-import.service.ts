import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationImportService {

  pageSize: any = 5;
  page: any = 1;
  direction: any = 'asc';
  startIndex: number = 1;
  endIndex: number = 4;
  filterlist: any[]=[];
  slicelist: any[]=[];

  constructor(){}

  
  // Pagination
  changePages(alldata: any[], pageSize: any, page: any) {
      const startItem = (page - 1) * pageSize + 1;
      const endItem = (page - 1) * pageSize + pageSize;
      this.startIndex = startItem;
      this.endIndex = endItem;
      if (this.endIndex > alldata.length) {
          this.endIndex = alldata.length;
      }
      
      return alldata.slice(startItem - 1, endItem);
  }

 

  // Sort Data
  onSort(column: any, dataList: any[]) {
      // if (this.direction == 'asc') {
      //     this.direction = 'desc';
      // } else {
      //     this.direction = 'asc';
      // }
      const sortedArray = [...dataList]; // Create a new array
      sortedArray.sort((a, b) => {
          const res = this.compare(a[column], b[column]);
          return this.direction === 'asc' ? res : -res;
      });
      return dataList = sortedArray;
  }
  compare(v1: string | number, v2: string | number) {
      return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  getEmptyRows(slicesize: number) :any[]{
      const rowsNeeded = this.pageSize - slicesize;
      return new Array(rowsNeeded).fill(null);
    }
}
