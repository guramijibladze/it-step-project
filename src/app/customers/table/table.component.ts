import { CustomersService } from './../../customers.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';

// import { }

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() item: any = [];
  tableEdit:boolean = false;

  constructor(private modalService: NgbModal, public service: CustomersService) {}

  openLg(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  editTableRow(){
    this.tableEdit = !this.tableEdit;
  }

  deleteCustomer(id:number){
    this.service.deleteCustomer(id)
  }

  ngOnInit(): void {}
}
