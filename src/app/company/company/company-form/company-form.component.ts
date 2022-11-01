import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
import { Company } from '../../model/company.model';
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
  public status: string;
  // change status button variable
  statusbutton: string;
  public products: any;
  public companyId: string;
  // image
  public base64String: any;
  public imagePath: any;
  public imageFile!: File;
  public isImagevalue: boolean;
  public company_name!: string;
  // array  of selecter
  subject = [
    { id: '1', name: 'angular' },
    { id: '2', name: 'java' },
    { id: '3', name: 'javascript' },
  ];
  url: any;
  msg = "";
  constructor(
    private fb: FormBuilder,
    private companyServices: CompanyService,
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private notification: NotificationService,
    private _sanitizer: DomSanitizer

  ) {
    this.comanyID = 0;
    this.status = '',
      this.statusbutton = '',
      this.base64String = '';
      this.imagePath = '';
      this.isImagevalue = false;
      this.companyId = "";
      //  form validation
      this.companyform = this.fb.group({
        companyname: ['', [Validators.required]],
        companydescription: ['', [Validators.required]],
        selecttag: ['', [Validators.required]],
        imagefile: ['', [Validators.required]],
        companyPath: [''],
        companyLogoName: ['']
      });

    // get comapny Id
    this.activatedRouter.params.subscribe((res) => {
      this.comanyID = res['id'];
      if (this.comanyID) {
        // this.getcompanydetailsById();
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
    // BUT TEXT CHANGE
    this.statusbutton = this.comanyID ? 'UPDATE' : 'ADD';

    /**
      *  Patchv Value in form
      * * @param activatedRouter
      *  return
      */
        this.activatedRouter.data.subscribe((res) => {
        this.companyform.patchValue(res['company']);
        this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.companyform.get('companyPath')?.value);
    })
  }
  //add company details
  public saveCompany(): void {
    this.issubmited = true;
    if (this.companyform.valid) {
      if (this.comanyID) {
        /**
         * Function for call the HTTP put service method
         */
        this.companyform.controls['companyPath'].setValue(this.base64String);
        this.companyform.controls['companyLogoName'].setValue(this.imageFile.name);
        this.companyServices
          .editeComapny(this.companyform.value, this.comanyID)
          .subscribe({
            next: (value) => {
              this.reset();
              this.issubmited = false;
              this.companyServices.listUpdate.next(value);
              this.router.navigate(['company']);
            },
            error: () => {
              this.notification.showError(' Edit data fail', 'Edit')
            },
            complete: () => {
              this.notification.showSuccess(' Edit Data Successfully', 'Edit')
            }
          });
      } else {
        /**
        * Function for call the HTTP post service method
        */
        this.companyform.controls['companyLogoName'].setValue(this.imageFile.name);
        this.companyform.controls['companyPath'].setValue(this.base64String);
       
        this.companyServices.addComapny(this.companyform.value).subscribe({
          next: (value) => {
            this.companyServices.listCompany.next(value);
            this.reset();
            this.issubmited = false;
            this.router.navigate(['company']);
          },
          error: () => {
            this.notification.showError(' Add Data fail', 'Add')
          },
          complete: () => {
            this.notification.showSuccess(' Add Data Successfully', 'Add')
          }
        });
      }
    }
  }

  // // get company list
  // public getcompanydetailsById(): void {
  //   this.companyServices.getCompanyId(Number(this.comanyID)).subscribe({
  //     next: (res) => {
  //       // value pach in form in edit time
  //       this.companyform.patchValue(res);
  //     },
  //   });
  // }

  // reset function
  public reset(): void {
    this.companyform.reset();
    this.issubmited = false;
  }
  // cencel edit
  public cancel() {
    const cancell = confirm('Are you sure you want to cancel?');
    if (this, cancell) {
      this.router.navigate(['company']);
      this.notification.showSuccess("Cancel successfully", 'Cancel')
    }
  }
/**
   * Function for company logo uploading
   * @param event 
   */
  selectFile(event: any) {
// show message
    let mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = "Only images are supported";
      return;
    }
      /**
       * image priview and convert base64
       */
      
       if (event.target.files.length > 0) {
        this.imageFile = event.target.files[0];

      }
      
    let reader = new FileReader();
    reader.onload = () => {
      // convert base64
      this.base64String = String(reader.result).replace("data:", "")
      .replace(/^.+,/, "");
      this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/png;base64,' + this.base64String);
      // show message or image in form
      this.msg = "";
      this.url = reader.result;
    }
    reader.readAsDataURL(this.imageFile);
    if (this.imageFile) {
      this.isImagevalue = true;
    }
  }
}
