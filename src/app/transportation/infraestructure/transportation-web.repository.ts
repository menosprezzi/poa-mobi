import {Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Itinerary, Transportation } from '../business/transportation.types';
import { TransportationListFilter, TransportationRepository } from '../business/transportation.repository';
import { TRANSPORTATION_WEB_API_URL } from '../transportation.tokens';

import { ItineraryWebMapper, TransportationWebMapper } from './transportation-web.mappers';
import { ItineraryWebDTO, TransportationWebDTO } from './transportation-web.types';



@Injectable({
  providedIn: 'root'
})
export class TransportationWebRepository extends TransportationRepository {
  private transportationCache?: Transportation[];

  constructor(
    private http: HttpClient,
    @Inject(TRANSPORTATION_WEB_API_URL) private webApiUrl: string,
  ) {
    super();
  }

  getItineraryFrom(id: number): Observable<Itinerary> {
    const itineraryMapper = new ItineraryWebMapper();
    return this.http.get<ItineraryWebDTO>(this.webApiUrl, {
        params: { a: 'il', p: id.toString() }
      })
      .pipe(map(itineraryMapper.mapFrom));
  }

  list(filter?: TransportationListFilter): Observable<Transportation[]> {
    let $transportation: Observable<Transportation[]>;

    if (!this.transportationCache) {
      const minibusMapper = new TransportationWebMapper('minibus');
      const minibusList = this.http.get<TransportationWebDTO[]>(this.webApiUrl, {
        params: {a: 'nc', t: 'l'}
      })
        .pipe(map(x => x.map(minibusMapper.mapFrom)));

      const busMapper = new TransportationWebMapper('minibus');
      const busList = this.http.get<TransportationWebDTO[]>(this.webApiUrl, {
        params: {a: 'nc', p: '%', t: 'o'}
      })
        .pipe(map(x => x.map(busMapper.mapFrom)));

      $transportation = forkJoin({ minibusList, busList })
        .pipe(map(x => [ ...x.minibusList, ...x.busList ]))
        .pipe(map(x => this.transportationCache = x));
    } else {
      $transportation = of(this.transportationCache);
    }

    return $transportation
      .pipe(map(x =>
        !!filter?.nameLike ?
          x.filter(transportation => new RegExp(`${filter.nameLike.toLowerCase()}`).test(transportation.name.toLowerCase()))
        : x
      ));
  }
}
