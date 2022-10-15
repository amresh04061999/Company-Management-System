import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/notification/notification.service';
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
  public status:string;
   // change status button variable
  statusbutton:string;

  // array  of selecter
  users = [
    { id: 'angular', name: 'angular' },
    { id: 'java', name: 'java' },
    { id: 'javascript', name: 'javascript' },
  ];
  url: any; 
	msg = "";
  constructor(
    private fb: FormBuilder,
    private companyServices: CompanyService,
    private router: Router,
    private activaterouter: ActivatedRoute,
    private notification:NotificationService
  ) {
    this.comanyID = 0;
    this.status='',
    this.statusbutton='',
    //  form validation
    this.companyform = this.fb.group({
      companyname: ['', [Validators.required]],
      companydescription: ['', [Validators.required]],
      selecttag: ['', [Validators.required]],
      imagefile: ['', [Validators.required]],
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
    // BUT TEXT CHANGE
    this.statusbutton = this.comanyID ? 'UPDATE' : 'ADD';
  }

  //add company details
  public saveCompany():void{
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
            error:()=>{
               this.notification.showError(' Edit data fail','Edit')
            },
            complete:()=>{
              this.notification.showSuccess(' Edit Data Successfully','Edit')
            }
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
          error:()=>{
            this.notification.showError(' Add Data fail','Add')
         },
         complete:()=>{
           this.notification.showSuccess(' Add Data Successfully','Add')
         }
        });
      }
    }
  }
  // get company list
  public getcompanydetailsById():void{
    this.companyServices.getCompanyId(this.comanyID).subscribe({
      next: (res) => {
      // value pach in form in edit time
        this.companyform.patchValue(res);
      },
    });
  }
  // reset function
  public reset():void{
    this.companyform.reset();
    this.issubmited = false;
  }

  // cencel edit
  public cancel(){
    const cancell = confirm('Are you sure you want to cancel?');
    if(this,cancell){
      this.router.navigate(['company']);
      this.notification.showSuccess("Cancel successfully",'Cancel')
    }
  }

  //selectFile(event) 
	selectFile(event: any) {
		// if(!event.target.files[0] || event.target.files[0].length == 0) {
		// 	this.msg = 'You must select an image';
		// 	return;
		// }
		var mimeType = event.target.files[0].type;
		if (mimeType.match(/image\/*/) == null) {
			this.msg = "Only images are supported";
			return;
		}
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		reader.onload = (_event) => {
			this.msg = "";
			this.url = reader.result; 
		}
	}
}
