import { Customer } from './../Customer';
import { AngularFireDatabase } from '@angular/fire/database';
import { CustomersService } from './../customers.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { servicesVersion } from 'typescript';
import { FirebaseService } from '../firebase.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from  '@angular/router';

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
    Image: string;
    id: any;
  } = {
    name: '',
    HotelAddress: '',
    City: '',
    Descrption: '',
    Image: '',
    id: +Math.floor(Math.random() * 1000),
  };

  constructor(
    private modalService: NgbModal,
    public firebaseService: FirebaseService,
    private router: Router
  ) {
  }


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
    this.firebaseService.logout()
    this.router.navigate(['/'])
    .then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });
  }

  ngAfterContentChecked() {
    this.allCustomers = this.customers.length

  }

  ngOnInit(): void {
    this.retrieveAllCustomers();
  }

  searchHotel(input: string) {
    if (input === '') {
      this.retrieveAllCustomers();
    }else{
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
    console.log(this.product);
    this.firebaseService.addCustomer(this.product);
    this.product = {
      name: '',
      HotelAddress: '',
      City: '',
      Descrption: '',
      Image: '',
      id: null,
    };
  }

  openVerticallyCentered(deleteContent: any) {
    this.modalService.open(deleteContent, { centered: true });
  }

  deleteArrIem(deleteItem: any) {
    // deleteItem - 1;
    // if (this.customers.length == 0) {
    //   alert('list is empty');
    // } else {
    //   // this.array.splice(deleteItem, 1);
    //   delete this.customers[deleteItem];
    //   deleteItem = '';
    // }
    // console.log(deleteItem);
  }
}
