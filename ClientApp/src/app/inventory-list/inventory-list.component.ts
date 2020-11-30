import { Component, OnInit } from '@angular/core';
import { inventoryItem, inventoryList, itemBacklog } from '../../invClasses';
import { INVENTORY } from '../../inventoryFilling';
import { AuthService } from '../auth.service';
import { InvmessageService } from '../invmessage.service';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {
  selectedItem: inventoryItem;
  static orderBacklog: itemBacklog;
  porkFloor: number;
  porkCapacity: number;
  beefFloor: number;
  beefCapacity: number;
  chickenFloor: number;
  chickenCapacity: number;
  immediateBeef: number;
  immediatePork: number;
  immediateChicken: number;
  beefArr: inventoryItem[];
  porkArr: inventoryItem[];
  chickenArr: inventoryItem[];
  canView: boolean;
  constructor(private authservice: AuthService) { }

  ngOnInit() {

    this.beefArr = this.allBeef();
    this.chickenArr = this.allChicken();
    this.porkArr = this.allPork();
    this.canView = this.authservice.isInvworker();
  }

  onSelect(theItem: inventoryItem): void {
    this.selectedItem = theItem;
  }


  lbsBeef(): number {
    var i = 0;
    var lbs = 0;
    for (i = 0; i < INVENTORY.length; i++) {
      if (INVENTORY[i].meatType === 'beef') { lbs = lbs + INVENTORY[i].quantity; }
    }
    return lbs;
  }

  lbsPork(): number {
    var i = 0;
    var lbs = 0;
    for (i = 0; i < INVENTORY.length; i++) {
      if (INVENTORY[i].meatType === 'pork') { lbs = lbs + INVENTORY[i].quantity; }
    }
    return lbs;
  }

  lbsChicken(): number {
    var i = 0;
    var lbs = 0;
    for (i = 0; i < INVENTORY.length; i++) {
      if (INVENTORY[i].meatType === 'chicken') { lbs = lbs + INVENTORY[i].quantity; }
    }
    return lbs;
  }

  modifyFloors(beef: number, pork: number, chicken: number): void {
    //change the floors of the  meats for need-based replenishment
    this.beefFloor = beef;
    this.porkFloor = pork;
    this.chickenFloor = chicken;
  }

  modifyCapacities(beef: number, pork: number, chicken: number): void {
    //and change capacities
    this.beefCapacity = beef;
    this.porkCapacity = pork;
    this.chickenCapacity = chicken;
  }
  //Ordering operations!  An amount of meat is purchased and pushed into inventory.
  orderBeef(amount: number): void {
    //okay so i'm going to say the max sized individual package is like 20 pounds.
    //so only 20 pounds max can be popped off into the immediately available amount of meat.
    var amountLeft = amount;
    var qty;
    while (amountLeft > 0) {
      if (amountLeft > 20) {
        qty = 20;
        amountLeft -= 20;
      }
      else {
        qty = amountLeft;
        amountLeft = 0;
      }
      INVENTORY.push({ barcode: INVENTORY[INVENTORY.length - 1].barcode + 1, expDate: new Date(Date.now() + 1814400000), meatType: 'beef', quantity: qty });
      //takes three weeks for meat to expire.
    }
  }
  orderPork(amount: number): void {
    var amountLeft = amount;
    var qty;
    while (amountLeft > 0) {
      if (amountLeft > 20) {
        qty = 20;
        amountLeft -= 20;
      }
      else {
        qty = amountLeft;
        amountLeft = 0;
      }
      INVENTORY.push({ barcode: INVENTORY[INVENTORY.length - 1].barcode + 1, expDate: new Date(Date.now() + 1814400000), meatType: 'pork', quantity: qty });
      //takes three weeks for meat to expire.
    }
  }
  orderChicken(amount: number): void {
    var amountLeft = amount;
    var qty;
    while (amountLeft > 0) {
      if (amountLeft > 20) {
        qty = 20;
        amountLeft -= 20;
      }
      else {
        qty = amountLeft;
        amountLeft = 0;
      }
      INVENTORY.push({ barcode: INVENTORY[INVENTORY.length - 1].barcode + 1, expDate: new Date(Date.now() + 1814400000), meatType: 'chicken', quantity: qty });
      //takes three weeks for meat to expire.
    }
  }

  //Backlog operations!  Go through the last 2 weeks of backlog and determine how much meat was used.
  //Return value is the amount of the meat used in pounds.

  beefLastTwoWeeks(): number {
    var i;
    var lbs = 0;
    for (i = 0; i < InventoryListComponent.orderBacklog.theBacklog.length; i++) {
      if (InventoryListComponent.orderBacklog.theBacklog[i].meatType === 'beef' && Date.now() > InventoryListComponent.orderBacklog.theBacklog[i].usedDate.getTime() + 1209600000) { lbs = lbs + InventoryListComponent.orderBacklog.theBacklog[i].quantity; }
    }
    return lbs;
  }

  porkLastTwoWeeks(): number {
    var i;
    var lbs = 0;
    for (i = 0; i < InventoryListComponent.orderBacklog.theBacklog.length; i++) {
      if (InventoryListComponent.orderBacklog.theBacklog[i].meatType === 'pork' && Date.now() > InventoryListComponent.orderBacklog.theBacklog[i].usedDate.getTime() + 1209600000) { lbs = lbs + InventoryListComponent.orderBacklog.theBacklog[i].quantity; }
    }
    return lbs;
  }

  chickenLastTwoWeeks(): number {
    var i;
    var lbs = 0;
    for (i = 0; i < InventoryListComponent.orderBacklog.theBacklog.length; i++) {
      if (InventoryListComponent.orderBacklog.theBacklog[i].meatType === 'chicken' && Date.now() > InventoryListComponent.orderBacklog.theBacklog[i].usedDate.getTime() + 1209600000) { lbs = lbs + InventoryListComponent.orderBacklog.theBacklog[i].quantity; }
    }
    return lbs;
  }
  removeTopBeef(): void {
    //the design of this array in js is basically a queue.
    //we can push elements onto the top of them whenever we order a new one, as well as take elements from the front.
    //therefore, we can just take the first beef in this array.
    var i;
    var foundmeat = false;
    for (i = 0; foundmeat === false && i < INVENTORY.length; i++) {
      if (INVENTORY[i].meatType === 'beef') { foundmeat = true; }
    }
    InvmessageService.add('Remove item with barcode ' + INVENTORY[i].barcode);
    this.immediateBeef += INVENTORY[i].quantity;
    InventoryListComponent.orderBacklog.theBacklog.push({ usedDate: new Date(Date.now()), meatType: 'beef', quantity: INVENTORY[i].quantity });
    INVENTORY.splice(i, 1);
    if (this.lbsBeef() < this.beefFloor) {
      this.orderBeef(this.beefLastTwoWeeks());
    }

  }
  removeTopPork(): void {
    var i;
    var foundmeat = false;
    for (i = 0; foundmeat === false && i < INVENTORY.length; i++) {
      if (INVENTORY[i].meatType === 'pork') { foundmeat = true; }
    }
    InvmessageService.add('Remove item with barcode ' + INVENTORY[i].barcode);
    this.immediatePork += INVENTORY[i].quantity;
    InventoryListComponent.orderBacklog.theBacklog.push({ usedDate: new Date(Date.now()), meatType: 'pork', quantity: INVENTORY[i].quantity });
    INVENTORY.splice(i, 1);
    if (this.lbsPork() < this.porkFloor) {
      this.orderPork(this.porkLastTwoWeeks());
    }
  }
  removeTopChicken(): void {
    var i;
    var foundmeat = false;
    for (i = 0; foundmeat === false && i < INVENTORY.length; i++) {
      if (INVENTORY[i].meatType === 'chicken') { foundmeat = true; }
    }
    InvmessageService.add('Remove item with barcode ' + INVENTORY[i].barcode);
    this.immediateChicken += INVENTORY[i].quantity;
    InventoryListComponent.orderBacklog.theBacklog.push({ usedDate: new Date(Date.now()), meatType: 'chicken', quantity: INVENTORY[i].quantity });
    INVENTORY.splice(i, 1);
    if (this.lbsChicken() < this.chickenFloor) {
      this.orderChicken(this.chickenLastTwoWeeks());
    }
  }


  //Price-based replenishment!  
  priceReplenishment(): void {
    //okay so here's what i'm doing
    //the prices are modelled after these here functions
    //beef: (.25*sin((x-1555557251224)/31536000000)+2.9)*1.03((x-1555557251224)/31536000000)
    //pork: (.25*sin((x-1555557251224)/31536000000)+1.2)*1.03((x-1555557251224)/31536000000)
    //chicken: (.25*sin((x-1555557251224)/31536000000)+.8)*1.03((x-1555557251224)/31536000000)
    //i.e. the price deviates over the year by -.25 to +.25.  for every year since april 17 2019, inflation
    //this'll prolly be an hourly cron job

    var beefPrice = this.priceBeef(Date.now() - 1555557251224);
    var chickenPrice = this.priceChicken(Date.now() - 1555557251224);
    var porkPrice = this.pricePork(Date.now() - 1555557251224);

     //this basically means that if price is increasing for next 5 hrs
    if (this.priceBeef(Date.now() - 1555553651224) > beefPrice && this.priceBeef(Date.now() - 1555550051224) > beefPrice && this.priceBeef(Date.now() - 1555546451224) > beefPrice && this.priceBeef(Date.now() - 1555542851224) > beefPrice && this.priceBeef(Date.now() - 1555539251224) > beefPrice)
    { this.orderBeef(this.beefCapacity - this.beefFloor * .75); }

    //and same for every other item...
    if (this.priceChicken(Date.now() - 1555553651224) > chickenPrice && this.priceChicken(Date.now() - 1555550051224) > chickenPrice && this.priceChicken(Date.now() - 1555546451224) > chickenPrice && this.priceChicken(Date.now() - 1555542851224) > chickenPrice && this.priceChicken(Date.now() - 1555539251224) > chickenPrice) { }
    { this.orderChicken(this.chickenCapacity - this.chickenFloor * .75); }

    if (this.pricePork(Date.now() - 1555553651224) > porkPrice && this.pricePork(Date.now() - 1555550051224) > porkPrice && this.pricePork(Date.now() - 1555546451224) > porkPrice && this.pricePork(Date.now() - 1555542851224) > porkPrice && this.pricePork(Date.now() - 1555539251224) > porkPrice) { }
    { this.orderBeef(this.porkCapacity - this.porkFloor * .75); }



  }


  //all of these price formulas have different base prices
  //the base time that will be used is Date.now() - 1555557251224, or MS ELAPSED SINCE APRIL 17.
  //the time elapsed will be the input to the sine function
  priceBeef(time: number): number {
    return ((.25 * Math.sin(time) / 31536000000) + 2.9)*1.03*(time / 31536000000);
  }

  pricePork(time: number): number {
    return ((.25 * Math.sin(time) / 31536000000) + 1.2) * 1.03*(time / 31536000000);
  }

  priceChicken(time: number): number {
    return ((.25 * Math.sin(time) / 31536000000) + .8) * 1.03*(time / 31536000000);
  }

  //these are little helper functions that display all instances of a certain type of inventory order.
  allBeef(): inventoryItem[] {
    let beef: inventoryItem[];
    var i;
    for (i = 0; i < INVENTORY.length; i++) {
      if (INVENTORY[i].meatType === 'beef') {
        beef.push(INVENTORY[i]);
      }
    }

    return beef;
  }

  allPork(): inventoryItem[] {
    let pork: inventoryItem[];
    var i;
    for (i = 0; i < INVENTORY.length; i++) {
      if (INVENTORY[i].meatType === 'pork') {
        pork.push(INVENTORY[i]);
      }
    }

    return pork;
  }

  allChicken(): inventoryItem[] {
    let chicken: inventoryItem[];
    var i;
    for (i = 0; i < INVENTORY.length; i++) {
      if (INVENTORY[i].meatType === 'chicken') {
        chicken.push(INVENTORY[i]);
      }
    }

    return chicken;
  }

}
