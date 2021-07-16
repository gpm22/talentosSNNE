import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharingModule } from './sharing/sharing.module';
import { HeaderComponent } from './sharing/components/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RequestLoadingComponent } from './sharing/components/request-loading/request-loading.component';
import { RequestLoadingInterceptor } from './sharing/components/request-loading/request-loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RequestLoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    SharingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestLoadingInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
