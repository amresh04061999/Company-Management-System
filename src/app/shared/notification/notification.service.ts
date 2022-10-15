import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable(
    
)
export class NotificationService {

  constructor(private toastr: ToastrService){ }

  // showSuccess function
  showSuccess(message: string, title: string): void{
    this.toastr.success(message, title)
  }
// showError function
  showError(message: string, title: string): void{
    this.toastr.error(message, title)
  }
  // showinfo function
   showInfo(message: string, title: string): void {
    this.toastr.info(message, title);
  }
}
