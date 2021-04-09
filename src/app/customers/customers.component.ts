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
  allCustomers: number = 0;
  customers: any = [];
  product:{name:string, HotelAddress:string, City:string, Descrption:string, Image: string, id: any} =
  {name:'', HotelAddress: '', City:'', Descrption:'', Image: '', id: +Math.floor(Math.random()*1000) }

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
    // this.array.push(this.product);
    // this.product = { name:"", HotelAddress:"", City:"", Descrption:"", Image: '' }
    // this.allCustomers = this.array.length
    // console.log(this.array.length)

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
