import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Customer } from '../../accountClasses';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

  customer: Customer;
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCustomer();
  }

  getCustomer(): void {
 
    var u = this.route.snapshot.paramMap.get('u');
    if (this.auth.getCustomer(u).u != u) { alert('getting customer gave me ' + this.auth.getCustomer(u).u+' and u is '+u); }
    this.customer=this.auth.getCustomer(u);
  }

  goBack(): void {
    this.location.back();
  }


}
