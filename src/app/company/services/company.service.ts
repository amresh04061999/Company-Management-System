import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { company } from '../model/company.model';

@Injectable()
export class CompanyService {
  // Create subject
  public listcompany: Subject<company>
  public listupdate: Subject<company>
  public baseURL: string;
  constructor(private _http: HttpClient) {
    this.baseURL = 'http://localhost:3000/';

    // Create subject
    this.listcompany = new Subject();

    this.listupdate = new Subject();
  }

  // add Company in jsonserver
  addcomapny(company: company): Observable<company> {
    const URL: string = `${this.baseURL}company`;
    return this._http.post<company>(URL, company);
  }

  // get Company in jsonserver
  getCompany(): Observable<company[]> {
    const URL: string = `${this.baseURL}company`;
    return this._http.get<company[]>(URL);
  }
  // get Company in jsonserver
  deleteCompany(id: number): Observable<company> {
    const URL: string = `${this.baseURL}company/` + id;
    return this._http.delete<company>(URL);
  }
  // getcompanybyid Company in jsonserver
  getCompanyId(id: number): Observable<company> {
    const URL: string = `${this.baseURL}company/` + id;
    return this._http.get<company>(URL);
  }
  // getcompanybyid Company in jsonserver
  editecomapny(company: company, id: number): Observable<company> {
    const URL: string = `${this.baseURL}company/` + id;
    return this._http.put<company>(URL, company);
  }

}
