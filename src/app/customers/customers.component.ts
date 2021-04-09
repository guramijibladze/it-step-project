import { CustomersService } from './../customers.service';
import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { servicesVersion } from 'typescript';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})

export class CustomersComponent implements OnInit {
  // closeResult!: string;
  // name!:string;
  // HotelAddress!:string;
  // City!:string;
  // Descrption!:string;
  // array:any = [];
  product:{name:string, HotelAddress:string, City:string, Descrption:string, Image: string, id: any} =
  {name:'', HotelAddress: '', City:'', Descrption:'', Image: '', id: +Math.floor(Math.random()*1000) }
  customers: any = [];

  constructor(private modalService: NgbModal, public service: CustomersService) {
    this.customers = service.getCustomers();
    // this.array = this.customers;
   }

   ngAfterViewChecked(): void{
    this.customers = this.service.getCustomers();
    console.log("sadasd")
   }


  ngOnInit(): void {
  }

  openLg(content:any) {
    this.modalService.open(content, { size: 'lg' });
  }

  addFile(){
    console.log(this.product)
    // this.array.push(this.product);
    this.service.setCustomers(this.product);
    this.product = { name:"", HotelAddress:"", City:"", Descrption:"", Image: '', id: null }
    console.log(this.customers)
  }

}
