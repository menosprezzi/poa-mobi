import { Observable } from 'rxjs';

import { Itinerary, LatLng, Transportation } from './transportation.types';
import { TransportationRepository } from './transportation.repository';


export class TransportationBusiness {

  constructor(
    private transportationRepository: TransportationRepository
  ) { }

  listAll(): Observable<Transportation[]> {
    return this.transportationRepository.list();
  }

  getItineraryFrom(params: GetItineraryFromTransportationParams): Observable<Itinerary> {
    return this.transportationRepository.getItineraryFrom(params.id);
  }

  generateGoogleMapsUrlFrom(params: LatLng): string {
    return `https://www.google.com/maps/?q=${params.lat},${params.lng}`;
  }

  searchBy(params: SearchByParams): Observable<Transportation[]> {
    return this.transportationRepository.list(params);
  }

}

interface GetItineraryFromTransportationParams {
  id: number;
}

interface SearchByParams {
  nameLike: string;
}
