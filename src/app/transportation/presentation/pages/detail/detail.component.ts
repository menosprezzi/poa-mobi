import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { TransportationBusiness } from '@app/transportation/business/transportation.business';
import { Itinerary, LatLng } from '@app/transportation/business/transportation.types';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  private $destroy = new Subject<void>();
  transportationItinerary?: Itinerary;

  constructor(
    private route: ActivatedRoute,
    private transportation: TransportationBusiness
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.transportation.getItineraryFrom({ id: params.id })
        .pipe(takeUntil(this.$destroy))
        .subscribe(itinerary => this.transportationItinerary = itinerary);
    });
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  generateGoogleMapsUrl(geopoint: LatLng): string {
    return this.transportation.generateGoogleMapsUrlFrom(geopoint);
  }

}
