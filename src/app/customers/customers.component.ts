import { Component, OnInit } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  closeResult!: string;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openLg(content:any) {
    this.modalService.open(content, { size: 'lg' });
  }


}
