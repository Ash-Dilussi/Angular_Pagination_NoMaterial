import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  _baseURL: string = 'https://localhost:7297/';

  constructor(private _http: HttpClient) { }

  getAllItemList():Observable<any[]>{
    return this._http.get<any>(this._baseURL + 'api/MItem/GetAllItemData');
  }

}
