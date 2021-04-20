import { Customer } from './../../Customer';
import { FirebaseService } from './../../firebase.service';
import { CustomersService } from './../../customers.service';
import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  providers: [NgbRatingConfig]
})
export class TableComponent implements OnInit {
  // currentRate = 6;
  @Input() item: any = [];
  tableEdit: boolean = false;
  showCustomer!: Customer;
  id!:any;

  constructor(
    private modalService: NgbModal,
    public firebaseService: FirebaseService,
    private router: Router,
    config: NgbRatingConfig
  ) {
    config.max = 10;
    config.readonly = true;
  }

  openLg(content: any) {
    this.modalService.open(content, { size: 'lg' });
  }

  editTableRow(customer: Customer) {
    // console.log(customer)
    this.tableEdit = !this.tableEdit;
    this.showCustomer = customer
    if (!this.tableEdit) {
      var updatedCustomer = Object.assign({}, this.showCustomer);
      delete updatedCustomer.key;

      this.firebaseService
      .updateCustomer(this.showCustomer.key, updatedCustomer)
        .then(() => {
          // update customers list
          this.item.map((x: any) => {
            if (x.key == this.showCustomer.key) {
              x = this.showCustomer;
            }
          });
        });
      }
  }

  deleteCustomer(key: string) {
    this.firebaseService.deleteCustomer(key);
    // console.log(key);
  }

  ngOnInit(): void {
  }

  // get id in ordert to identify the product
  goDetailInfo(ind:number){
    this.router.navigate(['/detailInfo', ind]);
    // console.log(ind);
  }
}
