import { Mapper } from '@app/utils/architecture/mapper';
import { Bind } from '@app/utils/lang/bind';

import { Itinerary, LatLng, Transportation, TransportationType } from '../business/transportation.types';
import { ItineraryWebDTO, TransportationWebDTO } from './transportation-web.types';


export class TransportationWebMapper implements Mapper<TransportationWebDTO, Transportation> {

  constructor(
    private type: TransportationType
  ) { }

  @Bind
  mapFrom(param: TransportationWebDTO): Transportation {
    return {
      id: param.id,
      hash: param.codigo,
      name: param.nome,
      type: this.type
    };
  }

}

export class ItineraryWebMapper implements Mapper<ItineraryWebDTO, Itinerary> {

  @Bind
  mapFrom(param: ItineraryWebDTO): Itinerary {
    const { idlinha, codigo, nome, ...rest } = param;
    const arrayCorrection: LatLng[] = [];

    return {
      transportationId: idlinha,
      transportationHash: codigo,
      transportationName: nome,
      route: Object.assign(arrayCorrection, rest),
    };
  }

}
