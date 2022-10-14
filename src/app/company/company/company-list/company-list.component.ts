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
  public companylist: company[];
  public search = '';
  constructor(
    private router: Router,
    private companyServices: CompanyService
  ) {
    this.companylist = []
  }

  ngOnInit(): void {
    this.getCompanyDetails();

    // Update add record in table
    this.companyServices.listcompany.subscribe((Response: company) => {
      this.companylist.push(Response)
    })

    // Update Record
    this.companyServices.listupdate.subscribe((result: company) => {
      const i = this.companylist.findIndex((value: any) => value.id === result.id)
      this.companylist.splice(i, 1, result)
    })
  }

  //  Get CompanyDetails
  public getCompanyDetails() {
    this.companyServices.getCompany().subscribe({
      next: (value) => {
        console.log(value);
        this.companylist = value;
        this.router.navigate(['company']);
      },
    });
  }

  //  Delete company details
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

  // Open form
  public editcomapny(item: company): void {
    this.router.navigate(['company/edit', item.id]);
  }

  //  open form
  public addcompany() {
    this.router.navigate(['company/add']);
  }
}
