export interface TransportationWebDTO {
  id: string;
  codigo: string;
  nome: string;
}

export interface ItineraryWebDTO extends Array<LatLngWebDTO> {
  idlinha: string;
  nome: string;
  codigo: string;
}

export interface LatLngWebDTO {
  lat: string;
  lng: string;
}
