import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TransportationBusiness } from './business/transportation.business';
import { TransportationRepository } from './business/transportation.repository';

import { TransportationRoutingModule } from './transportation-routing.module';
import { ListComponent } from './presentation/pages/list/list.component';
import { DetailComponent } from './presentation/pages/detail/detail.component';




@NgModule({
  declarations: [
    ListComponent,
    DetailComponent
  ],
  imports: [
      CommonModule,
      TransportationRoutingModule,
      FormsModule
  ],
  providers: [
    {
      provide: TransportationBusiness,
      useFactory: (repository: TransportationRepository) => new TransportationBusiness(repository),
      deps: [ TransportationRepository ]
    }
  ],
})
export class TransportationModule { }
