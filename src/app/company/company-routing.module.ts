import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CompanyFormComponent } from './company/company-form/company-form.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,

    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'add'

      },
      {
        path: 'add',
        component: CompanyFormComponent,
      },
      {
        path: 'edit/:id',
        component: CompanyFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule { }
