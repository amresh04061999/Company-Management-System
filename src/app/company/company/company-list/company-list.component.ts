import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  public companylist: any
  constructor(
    private router: Router,
    private companyServices: CompanyService,


  ) { }

  ngOnInit(): void {
    this.getCompanyDetails()
  }


  //  get CompanyDetails
  public getCompanyDetails() {
    this.companyServices.getCompany().subscribe({
      next: (value) => {
        console.log(value)
        this.companylist = value;
        this.router.navigate(['company'])

      }
    })

  }
  //  open form
  public addcompany() {
    this.router.navigate(['company/add'])


  }
}
