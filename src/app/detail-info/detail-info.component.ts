import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FirebaseService } from '../firebase.service';
import { map } from 'rxjs/operators';
import { Customer } from './../Customer';
import { json } from 'ngx-custom-validators/src/app/json/validator';


@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
  styleUrls: ['./detail-info.component.css']
})
export class DetailInfoComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/1200/500`);
  index!:any;
  obj: any = [];
  City!:any;
  HotelAddress!:any;
  HotelName!:any;
  Description!:any;

  customers: Array<Customer> = [];
  currentproduct!:any;

  constructor( private route: ActivatedRoute, public db: FirebaseService, private router:Router ) { 
    this.retrieveAllCustomers();
    // this.product = history.state;
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
          this.ngOnInit()
        },
        (error) => {
          console.log(error);
        }
      );
  }


  ngOnInit(): void {
    this.index = this.route.snapshot.paramMap.get("id");
    // this.obj = JSON.parse(this.id);
    // this.obj.push(this.customers[this.index]);
    console.log(this.customers[this.index].City)
    this.City = this.customers[this.index].City;
    this.HotelName = this.customers[this.index].name;
    this.HotelAddress = this.customers[this.index].HotelAddress;
    this.Description = this.customers[this.index].Descrption;
  }

}
