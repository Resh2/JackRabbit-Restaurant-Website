import { Component, OnInit } from '@angular/core';
import { TakeOutOrder, TakeOutList } from '../../takeoutClasses'
import { menuItem } from '../../menuClasses'
import { AuthService } from '../auth.service';
import { Transaction, Customer } from 'src/accountClasses';

@Component({
  selector: 'app-take-out-order',
  templateUrl: './take-out-order.component.html',
  styleUrls: ['./take-out-order.component.css']
})
export class TakeOutOrderComponent implements OnInit {
  list: TakeOutList;
  makeNowList: TakeOutList;
  myOrders: menuItem[];

  receiptNo: number;
  constructor(private authservice: AuthService) { }

  ngOnInit() {
    this.createOrder();
    this.myOrders = this.MyOrder();
  }

  createOrder(): void {
    
    //this is basically constructing an order, with no items
    this.list.orders.push({ receiptNo: null, date: new Date(Date.now()), foodList: null, username: this.authservice.getUsername(), finalPrice: 0.00 });
  }

  addToOrder(theFood: menuItem) {
    //menu item is passed in, and is added to the user's take-out order
    var i;
    var escapefromloop=false;
    for (i = 0; i < this.list.orders.length && escapefromloop==false; i++) {
      if (this.list.orders[i].username == this.authservice.getUsername())
      { this.list.orders[i].foodList.push(theFood); }
      }
    if (i >= this.list.orders.length) {
      this.createOrder();
      this.addToOrder(theFood);
      //it'll only require one layer of recursion at max since it literally has to have a take-out order with that user email now.
      //i dont even think this block will be used but its like whatever
    }
  }

  pushOrder() {
    //current take-out order gets taken off list and onto makeNowList
    //the admin view of take out orders will go through makeNowList.
    
    var escapefromloop = false;
    var i;
    for (i = 0; i < this.list.orders.length && escapefromloop==false; i++) {
      if (this.list.orders[i].username == this.authservice.getUsername()) {
        this.list.orders[i].receiptNo=this.receiptNo++;
        this.makeNowList.orders.push(this.list.orders[i]);
        this.list.orders.splice(i, 1);
      }
    }
  }


  fulfilledItem(orderID: number): void {
    //this method is called for removing takeout orders that have been fulfilled, and putting them into the client's transaction history.
    for (var i = 0; i < this.list.orders.length; i++) {
      if(this.list[i].id==orderID)
      {
        this.addOrderHistory(this.makeNowList[i], this.authservice.getCustomer(this.authservice.getUsername()));
        this.makeNowList.orders.splice(i, 1);
      }
    }
  }

  deleteUnfulfilledItem(orderID: number): void {
    //and this one is for ones that aren't fulfilled for whatever reason.
    for (var i = 0; i < this.list.orders.length; i++) {
      if (this.list[i].id == orderID) {
        this.list.orders.splice(i, 1);
      }
    }
  }

  addOrderHistory(foodlist: menuItem[],consumer: Customer)
  {
    let currenttransaction: Transaction;
    var i;
    var totalspent=0;
    currenttransaction.items = foodlist;
    currenttransaction.price = 0;
    for (i = 0; i < foodlist.length; i++)
    {
      currenttransaction.price += foodlist[i].price;
    }
    currenttransaction.tax = currenttransaction.price * .07;
    consumer.transactionHistory.push(currenttransaction);
    for (i = 0; i < consumer.transactionHistory.length; i++) {
      totalspent += consumer.transactionHistory[i].price;
    }
    if (totalspent > 800 && consumer.custStatus != 'super') { consumer.custStatus = 'regular' }
    if (totalspent > 1800) { consumer.custStatus = 'super' }
  }

  MyOrder(): menuItem[] {
    var i;
    var j;
    let mystuff: menuItem[] = []; 
    for (i = 0; i < this.list.orders.length; i++) {
      if (this.list.orders[i].username == this.authservice.getUsername())
      {
        for (j = 0; j < this.list.orders[i].foodList.length; j++)
        { mystuff.push(this.list.orders[i].foodList[j]); }

      }
    }

    return mystuff;
    
  }


}
