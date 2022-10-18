import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [AppComponent, PageNotFoundComponent],
  imports: [BrowserModule, AppRoutingModule, CoreModule, BrowserAnimationsModule, ToastrModule.forRoot({
    closeButton: true,
    timeOut: 5000, // 15 seconds
    progressBar: true,
  }),

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
