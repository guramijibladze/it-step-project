import { Component, OnInit, Input } from '@angular/core';
// import { }

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  @Input()item:any = [];
  
  constructor() { }

  ngOnInit(): void {
  }

}
