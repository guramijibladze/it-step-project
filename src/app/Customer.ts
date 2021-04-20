export interface Customer {
    name?: string;
    HotelAddress?: string;
    City?: string;
    Descrption?: string;
    Image?: string;
    id?: any;
    key: any;
    rooms?: any[];
}

export interface CustomerRoom{
      roomNumber: any;
      roomPlaces: any;
      Amenities: any[];
      price: any;
      taken: boolean;
}
