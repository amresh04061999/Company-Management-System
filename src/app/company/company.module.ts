import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyFormComponent } from './company/company-form/company-form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CompanyComponent,
    CompanyListComponent,
    CompanyFormComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ReactiveFormsModule
  ]
})
export class CompanyModule { }
