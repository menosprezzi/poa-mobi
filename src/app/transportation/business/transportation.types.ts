export interface Transportation {
  id: string;
  hash: string;
  name: string;
  type: TransportationType;
}

export type TransportationType = 'bus' | 'minibus';

export interface Itinerary {
  transportationId: string;
  transportationName: string;
  transportationHash: string;
  route: LatLng[];
}

export interface LatLng {
  lat: string;
  lng: string;
}
