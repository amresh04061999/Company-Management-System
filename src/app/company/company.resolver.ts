import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Company } from './model/company.model';
import { CompanyService } from './services/company.service';

@Injectable()
export class CompanyResolver implements Resolve<Company> {
  constructor(private companyServices: CompanyService) { }
  resolve(route: ActivatedRouteSnapshot,): Observable<Company> {

    let id = route.params['id'];
    console.log("get resolver")
    return this.companyServices.getCompanyId(id)
  }
}
