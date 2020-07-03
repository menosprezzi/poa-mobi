import { Observable } from 'rxjs';

import { Itinerary, Transportation } from './transportation.types';

export abstract class TransportationRepository {
  abstract list(filter?: TransportationListFilter): Observable<Transportation[]>;
  abstract getItineraryFrom(id: number): Observable<Itinerary>;
}

export interface TransportationListFilter {
  nameLike: string;
}
