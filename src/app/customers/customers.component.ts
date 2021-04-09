import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  allCustomers: number = 0;
  array:any = [];
  product:{name:string, HotelAddress:string, City:string, Descrption:string, Image: string} =
  {name:'', HotelAddress: '', City:'', Descrption:'', Image: ''}


  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {

  }

  openLg(content:any) {
    this.modalService.open(content, { size: 'lg' });
  }

  addFile(){
    this.array.push(this.product);
    this.product = { name:"", HotelAddress:"", City:"", Descrption:"", Image: '' }
    this.allCustomers = this.array.length
    // console.log(this.array.length)
  }


  openVerticallyCentered(deleteContent:any) {
    this.modalService.open(deleteContent, { centered: true });
  }


  deleteArrIem(deleteItem:any){
    deleteItem - 1;
    if(this.array.length == 0){
      alert('list is empty')
    }else{
      // this.array.splice(deleteItem, 1);
      delete this.array[deleteItem];
      deleteItem = "";
    }
    // console.log(deleteItem);
    
  }

}
