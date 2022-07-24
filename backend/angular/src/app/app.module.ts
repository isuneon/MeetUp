import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';
import { LoaderSpinnerComponent } from './component/loader-spinner/loader-spinner.component';
//import { LoginComponent } from './login/login.component';

import { MeetUpService } from './service/meetup.service';
import { BaseApiService } from './service/base_api.service';
import { LoaderService } from "./service/loader.service";
import { SharedService } from "./shared/services/shared.service";





import { routing } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    LoaderSpinnerComponent
    //LoginComponent
  ], 
  imports: [
    BrowserModule,
    HttpModule,
    NgxSpinnerModule,
    routing
  ],
  providers: [
    SharedService,
  	{ provide: MeetUpService , useClass: MeetUpService  },
    { provide: BaseApiService , useClass: BaseApiService  },
    { provide: LoaderService , useClass: LoaderService  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
