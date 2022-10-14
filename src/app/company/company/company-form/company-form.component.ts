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
  public issubmited = false;
  public id: any;
  constructor(
    private fb: FormBuilder,
    private companyServices: CompanyService,
    private router: Router,
    private activaterouter: ActivatedRoute
  ) {
    this.companyform = this.fb.group({
      companyname: ['', [Validators.required]],
      companydescription: ['', [Validators.required]],
      selecttag: ['', [Validators.required]],
    });

    this.activaterouter.params.subscribe((res) => {
      this.id = res['id'];
      if (this.id) {
        this.getcompanydetailsById();
      }
    });
  }

  get validator(): { [key: string]: AbstractControl<any> } {
    return this.companyform.controls;
  }
  ngOnInit(): void {}
  //add company details
  public saveCompany() {
    this.issubmited = true;
    if (this.companyform.valid) {
      if (this.id) {
        this.companyServices
          .editecomapny(this.companyform.value, this.id)
          .subscribe((res) => {});
      }
    } else {
      this.companyServices.addcomapny(this.companyform.value).subscribe({
        next: (value) => {
          console.log(value);
          this.reset();
          this.issubmited = false;
        },
      });
    }
  }

  public getcompanydetailsById() {
    this.companyServices.getCompanyId(this.id).subscribe({
      next: (res) => {
        this.companyform.patchValue(res);
        console.log(res);
      },
    });
  }
  public reset() {
    this.companyform.reset();
    this.issubmited = true;
  }
}
