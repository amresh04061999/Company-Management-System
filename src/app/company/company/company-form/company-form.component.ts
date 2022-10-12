import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss']
})
export class CompanyFormComponent implements OnInit {
  public companyform: FormGroup;
  public issubmited = false
  constructor(
    private fb: FormBuilder,
  ) {

    this.companyform = this.fb.group({
      companyname: ['', [Validators.required]],
      companydescription: ['', [Validators.required]],
      selecttag: ['', [Validators.required]],
    })
  }


  get validator(): { [key: string]: AbstractControl<any> } {
    return this.companyform.controls;

  }
  ngOnInit(): void {
  }
  //add/edit Company  function
  public saveCompany() {
    this.issubmited = true;

  }

  public reset() {
    this.companyform.reset()
    this.issubmited = true;
  }
}
