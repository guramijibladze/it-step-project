import { CustomersService } from './../customers.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { servicesVersion } from 'typescript';
import { FirebaseService } from '../firebase.service';
import { Router } from  '@angular/router';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit {
  @Output() isLogout = new EventEmitter<void>()
  allCustomers: number = 0;
  customers: any = [];
  product:{name:string, HotelAddress:string, City:string, Descrption:string, Image: string, id: any} =
  {name:'', HotelAddress: '', City:'', Descrption:'', Image: '', id: +Math.floor(Math.random()*1000) }

  constructor(private modalService: NgbModal, public service: CustomersService, public firebaseService: FirebaseService,private router: Router) {
    this.customers = service.getCustomers();
    this.allCustomers = this.customers.length;
   }

   logout(){
    this.firebaseService.logout()
    this.router.navigate(['/'])
    .then(nav => {
      console.log(nav); // true if navigation is successful
    }, err => {
      console.log(err) // when there's an error
    });
  }


   /* lifecycle method for updating DOM, after customer is deleted or edited */
   ngAfterContentChecked(){
    // console.log('ngAfterContentChecked');
      this.customers = this.service.getCustomers();
   }

   ngAfterViewChecked(){
    //  console.log('ngAfterViewChecked')
   }

  ngOnInit(): void {
  }

  searchHotel(input: string){
    if(input === ''){
      this.customers = this.service.getCustomers();
    }

    let searchFilter = this.customers.filter((customer:any) => {
      return customer.name.toLowerCase().match(input.toLowerCase())
    });
    this.customers = searchFilter;
    console.log(this.customers)
  }

  openLg(content:any) {
    this.modalService.open(content, { size: 'lg' });
  }

  addFile(){
    console.log(this.product)
    this.service.setCustomers(this.product);
    this.product = { name:"", HotelAddress:"", City:"", Descrption:"", Image: '', id: null }
    console.log(this.customers)
  }


  openVerticallyCentered(deleteContent:any) {
    this.modalService.open(deleteContent, { centered: true });
  }


  deleteArrIem(deleteItem:any){
    deleteItem - 1;
    if(this.customers.length == 0){
      alert('list is empty')
    }else{
      // this.array.splice(deleteItem, 1);
      delete this.customers[deleteItem];
      deleteItem = "";
    }
    // console.log(deleteItem);
  }

}
