import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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

    console.log(this.array)
  }

}
