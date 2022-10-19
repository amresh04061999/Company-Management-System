import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyFormComponent } from './company/company-form/company-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CompanyService } from './services/company.service';
import { SharedModule } from '../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { CompanyResolver } from './company.resolver';

@NgModule({
  declarations: [CompanyComponent, CompanyListComponent, CompanyFormComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    NgSelectModule,


  ],


  providers: [CompanyService, CompanyResolver],
})
export class CompanyModule { }
