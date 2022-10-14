import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterPipe } from './pipe/filter.pipe';
import { FcharactermargePipe } from './pipe/fcharactermarge.pipe';

@NgModule({
  declarations: [FilterPipe, FcharactermargePipe],
  imports: [CommonModule],
  exports: [FilterPipe, FcharactermargePipe],
})
export class SharedModule { }
