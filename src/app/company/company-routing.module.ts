import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiResolverResolver } from '../shared/resolver/api-resolver.resolver';
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
        redirectTo: 'add',
      },
      {
        path: 'add',
        component: CompanyFormComponent, data: { breadcrumb: 'ADD COMPANY' }
      },
      {
        path: 'edit/:id',
        component: CompanyFormComponent,resolve: { company: ApiResolverResolver }, data: { breadcrumb: 'EDIT COMPANY' },
      
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule { }
