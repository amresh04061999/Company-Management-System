import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanyComponent } from './company.component';
import { CompanyResolver } from './company.resolver';
import { CompanyFormComponent } from './company/company-form/company-form.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,

    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'add',
      },
      {
        path: 'add',
        component: CompanyFormComponent, data: { breadcrumb: 'Add company' }
      },
      {
        path: 'edit/:id',
        component: CompanyFormComponent, resolve: { company: CompanyResolver },

      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule { }
