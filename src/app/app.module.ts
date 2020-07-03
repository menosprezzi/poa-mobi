import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

//
// App modules
// ------------------------------

import { CoreModule } from '@app/core/core.module';
import { TRANSPORTATION_WEB_API_URL } from '@app/transportation/transportation.tokens';


//
// Module sources
// ------------------------------

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransportationRepository } from '@app/transportation/business/transportation.repository';
import { TransportationWebRepository } from '@app/transportation/infraestructure/transportation-web.repository';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    CoreModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: TRANSPORTATION_WEB_API_URL, useValue: 'http://www.poatransporte.com.br/php/facades/process.php' },
    { provide: TransportationRepository, useExisting: TransportationWebRepository },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
