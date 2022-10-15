import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss'],
})
export class CompanyFormComponent implements OnInit {
  public companyform: FormGroup;
  // form validation variable
  public issubmited = false;
  // companyid variable
  public comanyID: number;
  // change status variable
  public status = '';
  // array  of selecter
  users = [
    { id: 'angular', name: 'angular' },
    { id: 'java', name: 'java' },
    { id: 'javascript', name: 'javascript' },
  ];
  constructor(
    private fb: FormBuilder,
    private companyServices: CompanyService,
    private router: Router,
    private activaterouter: ActivatedRoute
  ) {
    this.comanyID = 0;
    //  form validation
    this.companyform = this.fb.group({
      companyname: ['', [Validators.required]],
      companydescription: ['', [Validators.required]],
      selecttag: ['', [Validators.required]],
    });

    // get comapny Id
    this.activaterouter.params.subscribe((res) => {
      this.comanyID = res['id'];
      if (this.comanyID) {
        this.getcompanydetailsById();
      }
    });
  }
  // geter function
  get validator(): { [key: string]: AbstractControl<any> } {
    return this.companyform.controls;
  }

  ngOnInit(): void {
    // tag name change
    this.status = this.comanyID ? 'EDIT COMPANY' : 'ADD COMPANY';
  }

  //add company details
  public saveCompany() {
    this.issubmited = true;
    if (this.companyform.valid) {
      if (this.comanyID) {
        this.companyServices
          .editeComapny(this.companyform.value, this.comanyID)
          .subscribe({
            next: (value) => {
              this.reset();
              this.issubmited = false;
              this.companyServices.listUpdate.next(value);
              this.router.navigate(['company']);
            },
          });
      } else {
        // edite company
        this.companyServices.addComapny(this.companyform.value).subscribe({
          next: (value) => {
            this.companyServices.listCompany.next(value);
            this.reset();
            this.issubmited = false;
            this.router.navigate(['company']);
          },
        });
      }
    }
  }
  // get company list
  public getcompanydetailsById() {
    this.companyServices.getCompanyId(this.comanyID).subscribe({
      next: (res) => {
        // value pach in form in edit time
        this.companyform.patchValue(res);
      
      },
    });
  }
  // reset function
  public reset() {
    this.companyform.reset();
  }
}
