import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipe/filter.pipe';
import { FcharactermargePipe } from './pipe/fcharactermarge.pipe';
import { NotificationService } from './notification/notification.service';
import { CompanyService } from '../company/services/company.service';
import { ApiResolverResolver } from './resolver/api-resolver.resolver';



@NgModule({
  declarations: [FilterPipe, FcharactermargePipe],
  imports: [CommonModule,
    
  ],
  providers: [NotificationService,ApiResolverResolver],
  exports: [FilterPipe, FcharactermargePipe],
})
export class SharedModule { }
