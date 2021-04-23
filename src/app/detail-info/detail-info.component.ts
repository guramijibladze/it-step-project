import { Component, OnInit,ViewEncapsulation } from '@angular/core';
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
  images = [944, 1011, 984].map(
    (n) => `https://picsum.photos/id/${n}/1200/500`
  );
  index!: any;
  obj: any = [];
  City!: any;
  HotelAddress!: any;
  HotelName!: any;
  Description!: any;

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
  } = {
    roomNumber: '',
    roomPlaces: '',
    amenities: [],
    price: '',
    taken: false,
  };

  RoomDetail: {
    roomNumber: any,
    roomGuest: any,
    Amenities: any[],
    price: any,
    token:boolean
  } = {
    roomNumber: '',
    roomGuest: '',
    Amenities: [],
    price: '',
    token: false
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
        this.currentCustomer = customer
        if (this.hotelRooms) {
          let tmp:any[] = [...this.hotelRooms];
          this.chunkedHotelData = this.chunks(tmp);
        }
        this.City = customer.City;
        this.HotelName = customer.name;
        this.HotelAddress = customer.HotelAddress;
        this.Description = customer.Descrption;
      }
    });
    console.log(this.hotelRooms);
  };

  chunks(array: any[]) {
    let results = [];
    results = [];
    while (array.length) {
      results.push(array.splice(0, 3));
    }
    return results;
  };

  addHotelRoom() {
    this.currentCustomer.rooms.push(this.product)
    this.db.addCustomerRoom(this.currentCustomer.rooms, this.index);
    this.product = {
      roomNumber: '',
      roomPlaces: '',
      amenities: [],
      price: '',
      taken: false,
    };
  };

  openVerticallyCentered(content:any) {
    this.modalService.open(content, { centered: true });
  };

  ngOnInit(){};

}
