import { Customer } from './../Customer';
import { AngularFireDatabase } from '@angular/fire/database';
import { CustomersService } from './../customers.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { servicesVersion } from 'typescript';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  @Output() isLogout = new EventEmitter<void>();
  allCustomers: number = 0;
  customers: Array<Customer> = [];
  showCustomer?: Customer;
  returnedMessage?: string;

  product: {
    name: string;
    HotelAddress: string;
    City: string;
    Descrption: string;
    hotelImages: any[];
    date: string;
    rating?: number;
    rooms?: any[];
  } = {
    name: '',
    HotelAddress: '',
    City: '',
    Descrption: '',
    hotelImages: [],
    date: '',
    rating: 0,
    rooms: [
      {
        roomNumber: 1,
        roomPlaces: 4,
        amenities: ['tv', 'conditioner'],
        price: 24,
        taken: false,
        roomPictures: [
          'https://www.swissotel.com/assets/0/92/3686/3768/3770/6442451433/ae87da19-9f23-450a-8927-6f4c700aa104.jpg',
          'https://www.swissotel.com/assets/0/92/3686/3768/3770/6442451433/ae87da19-9f23-450a-8927-6f4c700aa104.jpg',
        ],
      },
      {
        roomNumber: 2,
        roomPlaces: 2,
        amenities: ['tv', 'conditioner', 'kitchen'],
        price: 400,
        taken: true,
        roomPictures: [
          'https://www.swissotel.com/assets/0/92/3686/3768/3770/6442451433/ae87da19-9f23-450a-8927-6f4c700aa104.jpg',
          'https://www.swissotel.com/assets/0/92/3686/3768/3770/6442451433/ae87da19-9f23-450a-8927-6f4c700aa104.jpg',
        ],
      },
      {
        roomNumber: 2,
        roomPlaces: 2,
        amenities: ['tv', 'conditioner', 'kitchen'],
        price: 400,
        taken: true,
        roomPictures: [
          'https://www.swissotel.com/assets/0/92/3686/3768/3770/6442451433/ae87da19-9f23-450a-8927-6f4c700aa104.jpg',
          'https://www.swissotel.com/assets/0/92/3686/3768/3770/6442451433/ae87da19-9f23-450a-8927-6f4c700aa104.jpg',
        ],
      },
      {
        roomNumber: 1,
        roomPlaces: 4,
        amenities: ['tv', 'conditioner'],
        price: 24,
        taken: false,
        roomPictures: [
          'https://www.swissotel.com/assets/0/92/3686/3768/3770/6442451433/ae87da19-9f23-450a-8927-6f4c700aa104.jpg',
          'https://www.swissotel.com/assets/0/92/3686/3768/3770/6442451433/ae87da19-9f23-450a-8927-6f4c700aa104.jpg',
        ],
      },
    ],
  };

  constructor(
    private modalService: NgbModal,
    public firebaseService: FirebaseService,
    private router: Router
  ) {}

  // download data from firebase
  retrieveAllCustomers() {
    this.firebaseService
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
        },
        (error) => {
          console.log(error);
        }
      );
  }

  logout() {
    this.firebaseService.logout();
    this.router.navigate(['/']).then(
      (nav) => {
        console.log(nav); // true if navigation is successful
      },
      (err) => {
        console.log(err); // when there's an error
      }
    );
  }

  ngAfterContentChecked() {
    this.allCustomers = this.customers.length;
  }

  ngOnInit(): void {
    this.retrieveAllCustomers();
  }

  searchHotel(input: string) {
    if (input === '') {
      this.retrieveAllCustomers();
    } else {
      let searchFilter = this.customers.filter((customer: any) => {
        return customer.name.toLowerCase().match(input.toLowerCase());
      });
      this.customers = searchFilter;
    }
  }

  openLg(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  addFile() {
    let date = new Date();
    var dd = date.getDate().toString();
    var mm = String(date.getMonth() + 1);
    var yyyy = date.getFullYear();

    this.product.date = String(mm + '/' + dd + '/' + yyyy);
    this.firebaseService.addCustomer(this.product);
    this.product = {
      name: '',
      HotelAddress: '',
      City: '',
      Descrption: '',
      hotelImages: [],
      date: '',
      rating: 0,
      rooms: [],
    };
    // this.arrRating.push(this.rating)
    // localStorage.setItem('arrRating', JSON.stringify(this.arrRating));
    // console.log(this.arrRating)
    // this.rating = '';
  }

  openVerticallyCentered(deleteContent: any) {
    this.modalService.open(deleteContent, { centered: true });
  }
}
