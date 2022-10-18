import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Company } from '../model/company.model';

@Injectable()
export class CompanyService {
  // Create subject add
  public listCompany: Subject<Company>;
  // Create subject wdit
  public listUpdate: Subject<Company>;

  public baseURL: string;
  constructor(private _http: HttpClient) {
    // json url
    this.baseURL = 'http://localhost:3000/';

    // Create subject add list update
    this.listCompany = new Subject();
    // Create subject edit list update
    this.listUpdate = new Subject();
  }
  /**
   *  add Company in jsonserver
   * @param company
   * @returns array
   */

  addComapny(company: Company): Observable<Company> {
    const URL: string = `${this.baseURL}company`;
    return this._http.post<Company>(URL, company);
  }

  // get Company in jsonserver
  getCompany(): Observable<Company[]> {
    const URL: string = `${this.baseURL}company`;
    return this._http.get<Company[]>(URL);
  }
  // get Company in jsonserver
  deleteCompany(id: number): Observable<Company> {
    const URL: string = `${this.baseURL}company/` + id;
    return this._http.delete<Company>(URL);
  }
  // getcompanybyid Company in jsonserver
  getCompanyId(id: number): Observable<Company> {
    const URL: string = `${this.baseURL}company/` + id;
    return this._http.get<Company>(URL);
  }
  // getcompanybyid Company in jsonserver
  editeComapny(company: Company, id: number): Observable<Company> {
    const URL: string = `${this.baseURL}company/` + id;
    return this._http.put<Company>(URL, company);
  }
}
