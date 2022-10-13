import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { company } from '../model/company.model';

@Injectable()
export class CompanyService {

  public baseURL: string;
  constructor(private _http: HttpClient) {
    this.baseURL = 'http://localhost:3000/'
  }



  // add Company in jsonserver
  addcomapny(company: company): Observable<company> {
    const URL: string = `${this.baseURL}company`;
    return this._http.post<company>(URL, company)
  }


  // get Company in jsonserver
  getCompany(): Observable<company[]> {
    const URL: string = this.baseURL + 'company';
    return this._http.get<company[]>(URL)
  }
}
