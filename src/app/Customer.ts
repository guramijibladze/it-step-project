import { NamedTupleMember } from "typescript";

export interface Customer {
    name?: string;
    HotelAddress?: string;
    City?: string;
    Descrption?: string;
    Image?: string;
    date?: string;
    key: any;
    rating?: number;
    rooms?: any[];
}

export interface CustomerRoom{
      roomNumber: any;
      roomPlaces: any;
      Amenities: any[];
      price: any;
      taken: boolean;
}
