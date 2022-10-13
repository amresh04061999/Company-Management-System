import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CompanyPipePipe } from './shared/pipe/company-pipe.pipe';
import { CoreModule } from './core/core.module';
import { CompanyService } from './company/services/company.service';


@NgModule({
  declarations: [
    AppComponent,
    CompanyPipePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
