import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from '../firebase.service';
import { map } from 'rxjs/operators';
import { Customer, CustomerRoom } from './../Customer';
import { json } from 'ngx-custom-validators/src/app/json/validator';
declare var $: any;

@Component({
  selector: 'app-detail-info',
  templateUrl: './detail-info.component.html',
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
  hotelRooms?: any[] = [];
  currentproduct!: any;

  constructor(
    private route: ActivatedRoute,
    public db: FirebaseService,
    private router: Router
  ) {
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
          console.log(this.customers);
          this.updateCustomerArray();
        },
        (error) => {
          console.log(error);
        }
      );
  }

  updateCustomerArray() {
    console.log(this.customers);
    this.index = this.route.snapshot.paramMap.get('id');
    this.customers.map((customer) => {
      console.log(customer.key === this.index)
      console.log(this.index)
      if(customer.key === this.index){
        let tmp = customer.rooms;
        console.log(tmp)
        this.hotelRooms = tmp
        this.City = customer.City;
        this.HotelName = customer.name;
        this.HotelAddress = customer.HotelAddress;
        this.Description = customer.Descrption;
      }
    });
    console.log(this.hotelRooms);
  }

  ngOnInit(): void {

    $('#recipeCarousel').carousel({
      interval: 10000
    })

    $('.carousel .carousel-item').each(() =>{
        var minPerSlide = 3;
        var next = $(this).next();
        if (!next.length) {
        next = $(this).siblings(':first');
        }
        next.children(':first-child').clone().appendTo($(this));

        for (var i=0;i<minPerSlide;i++) {
            next=next.next();
            if (!next.length) {
              next = $(this).siblings(':first');
            }

            next.children(':first-child').clone().appendTo($(this));
          }
    });

  }

}

