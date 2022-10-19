import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  ActivatedRouteSnapshot,
  ActivatedRoute,
  RouterStateSnapshot
} from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { Company } from 'src/app/company/model/company.model';
import { CompanyService } from 'src/app/company/services/company.service';

@Injectable()

export class ApiResolverResolver implements Resolve<Company> {

  constructor(private companyServices: CompanyService) { }

  /**
  * resolve method
  * @param route
  * @param state
  */
  resolve(route: ActivatedRouteSnapshot): Observable<Company> {
    let id = route.params['id'];
    console.log("get resolver")
    return this.companyServices.getCompanyId(id)
  }

}
