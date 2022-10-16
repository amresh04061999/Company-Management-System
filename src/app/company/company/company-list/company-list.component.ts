import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { Company } from '../../model/company.model';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss'],
})
export class CompanyListComponent implements OnInit {
  // getcompany list variable
  public companylist: Company[];
  //search variable
  public search: string;
  constructor(private router: Router, private companyServices: CompanyService,
    private notification:NotificationService
    ) {
    this.companylist = [];
    this.search = '';
  }

  ngOnInit(): void {
    //  get company list
    this.getCompanyDetails();

    // Update add record in table suing subject
    this.companyServices.listCompany.subscribe((Response: Company) => {
      this.companylist.push(Response);
    });

    //  Update edit record in table using subject
    this.companyServices.listUpdate.subscribe((result: Company) => {
      const i = this.companylist.findIndex(
        (value: any) => value.id === result.id
      );
      this.companylist.splice(i, 1, result);
    });
  }

  //  Get CompanyDetails
  public getCompanyDetails() {
    this.companyServices.getCompany().subscribe({
      next: (value) => {
        this.companylist = value;
      },
    });
  }

  //  Delete company details
  public deleteCompany(item:Company) {
    const deletePop = confirm(`Are you sure you want to delete this data? Delete ${item.companyname}`)
  
    if (deletePop) {
      this.companyServices.deleteCompany(Number(item.id)).subscribe({
        next: (value) => {
          // call get function
          this.getCompanyDetails(); 
        },
        error: (error) => {
          // this.notification.showError("fail Delete","delete")
        },
        complete: () => {
          this.notification.showSuccess(`Delete successfully ${item.companyname}`,"Delete")
          
        },
      });
    }
    else{
      this.notification.showInfo("Cancel successfully","Cancel")
    }
  }

  // Open form
  public editcomapny(item: Company): void {
    this.router.navigate(['company/edit', item.id]);
  }
  //  open form
  public addcompany() : void{
    this.router.navigate(['company/add']);
  }
}
