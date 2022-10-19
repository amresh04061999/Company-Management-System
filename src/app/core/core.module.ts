import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CompanyModule } from '../company/company.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, RouterModule,
    SharedModule, CompanyModule
  ],
  exports: [HeaderComponent],
})
export class CoreModule { }
