import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { map } from 'rxjs/operators';
import { Customer, CustomerRoom } from './../Customer';
import { json } from 'ngx-custom-validators/src/app/json/validator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./detail-info.component.css'],
})
export class DetailInfoComponent implements OnInit {
  index!: any;
  City!: any;
  HotelAddress!: any;
  HotelName!: any;
  Description!: any;
  hotelImages?: any[any] = [];

  customers: Array<Customer> = [];
  currentCustomer: any;
  hotelRooms?: any[] = [];
  chunkedHotelData: any[] = [];

  product: {
    roomNumber: any;
    roomPlaces: any;
    amenities: any[any];
    price: any;
    taken: boolean;
    roomPictures: any[any];
  } = {
    roomNumber: '',
    roomPlaces: '',
    amenities: [],
    price: '',
    taken: false,
    roomPictures: [],
  };

  constructor(
    private route: ActivatedRoute,
    public db: FirebaseService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.retrieveAllCustomers();
    // this.product = history.state;
  }

  openLg(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  retrieveAllCustomers() {
    this.db
      .getCustomersList()
      .snapshotChanges()
      .pipe(
        map((changes) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      )
      .subscribe(
        (customers) => {
          this.customers = customers;
          this.updateCustomerArray();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  updateCustomerArray() {
    this.index = this.route.snapshot.paramMap.get('id');
    this.customers.map((customer) => {
      if (customer.key === this.index) {
        this.hotelRooms = customer.rooms;
        this.currentCustomer = customer;
        if (this.hotelRooms) {
          let tmp: any[] = [...this.hotelRooms];
          this.chunkedHotelData = this.chunks(tmp);
        }
        if (customer.rooms) {
          let tmp: any[any];
          this.hotelImages = customer.rooms.map((room: any) =>{
              [tmp] = room.roomPictures;
              return tmp;
          });
          console.log(this.hotelImages);
        }
        this.City = customer.City;
        this.HotelName = customer.name;
        this.HotelAddress = customer.HotelAddress;
        this.Description = customer.Descrption;
      }
    });
  }

  chunks(array: any[]) {
    let results = [];
    results = [];
    while (array.length) {
      results.push(array.splice(0, 3));
    }
    return results;
  }

  addHotelRoom(roomPictures: any, roomAmenities: any) {
    if (roomPictures) {
      let tmp = roomPictures.split(' ');
      this.product.roomPictures = [...tmp];
    }
    if (roomAmenities) {
      let tmp = roomAmenities.split(',');
      this.product.amenities = [...tmp];
    }

    this.currentCustomer.rooms.push(this.product);
    this.db.addCustomerRoom(
      this.currentCustomer.rooms,
      this.currentCustomer.key
    );
    this.product = {
      roomNumber: '',
      roomPlaces: '',
      amenities: [],
      price: '',
      taken: false,
      roomPictures: [],
    };
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }

  ngOnInit() {}
}
