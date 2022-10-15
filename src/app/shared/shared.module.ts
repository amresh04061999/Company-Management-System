import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipe/filter.pipe';
import { FcharactermargePipe } from './pipe/fcharactermarge.pipe';
import { NotificationService } from './notification/notification.service';

import { ToastrModule, } from 'ngx-toastr';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [FilterPipe, FcharactermargePipe],
  imports: [CommonModule, 
  
   
  ],
  providers:[NotificationService],
  exports: [FilterPipe, FcharactermargePipe],
})
export class SharedModule { }
