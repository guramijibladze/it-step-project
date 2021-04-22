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
  hotelRooms?: any[] = [];
  currentproduct!: any;

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
  }

  // {
//   roomNumber: 2,
//   roomPlaces: 2,
//   amenities: ['tv', 'conditioner', 'kitchen'],
//   price: 400,
//   taken: true
// },


  constructor(
    private route: ActivatedRoute,
    public db: FirebaseService,
    private router: Router,
    private modalService: NgbModal
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
          // console.log(this.customers);
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
      // console.log(customer.key === this.index)
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

  openVerticallyCentered(content:any) {
    this.modalService.open(content, { centered: true });
  }

  addRoom(){
    // console.log(this.db)
    
    this.customers.map((customer) => {
      if(customer.key === this.index){
        let data = [];
        data.push(this.RoomDetail);
        this.db.addCustomer(data);
      }
    });

    this.RoomDetail = {
      roomNumber: '',
      roomGuest: '',
      Amenities: [],
      price: '',
      token: false
    };
  }

}
