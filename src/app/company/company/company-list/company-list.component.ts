import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { company } from '../../model/company.model';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent implements OnInit {
  public companylist: any;
  public search = '';
  constructor(
    private router: Router,
    private companyServices: CompanyService
  ) { }

  ngOnInit(): void {
    this.getCompanyDetails();
  }

  //  get CompanyDetails
  public getCompanyDetails() {
    this.companyServices.getCompany().subscribe({
      next: (value) => {
        console.log(value);
        this.companylist = value;
        this.router.navigate(['company']);
      },
    });
  }

  //  delete company details
  public deleteCompany(id: number) {
    const deletePop = confirm('are you sure you want to delet this data?')
    if (deletePop) {

      this.companyServices.deleteCompany(id).subscribe({
        next: (value) => {
          console.log(value);
          this.getCompanyDetails();
        },
        error: (error) => {
          alert('fail');
        },
        complete: () => {
          alert('delete  Successfully');
        },
      });
    }
  }

  public editcomapny(item: company): void {
    this.router.navigate(['company/edit', item.id]);
  }

  //  open form
  public addcompany() {
    this.router.navigate(['company/add']);
  }
}
