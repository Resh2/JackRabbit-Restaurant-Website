import { Component, OnInit } from '@angular/core';
import { Customer, Account } from '../../accountClasses';
import { CUSTLIST } from '../../accountList';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-customer-ops',
  templateUrl: './customer-ops.component.html',
  styleUrls: ['./customer-ops.component.css']
})
export class CustomerOpsComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private authservice: AuthService) {
  }

  ngOnInit() {
    this.customers = CUSTLIST;
  }

  

 
}
