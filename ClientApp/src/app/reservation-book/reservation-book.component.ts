import { Component, OnInit } from '@angular/core';
import { Reservation, resList } from '../../resClasses';
import { RESSRC } from '../../resSrc';
import { AuthService } from '../auth.service';

declare var angular: any;

@Component({
  selector: 'app-reservation-book',
  templateUrl: './reservation-book.component.html',
  styleUrls: ['./reservation-book.component.css']
})
export class ReservationBookComponent implements OnInit {
  resDate: Date;
  isWheelchair: boolean;
  showHelpers: boolean;
  numReservations: number;
  occupiedTable: boolean[];//okay so each individual boolean value is its own table.
//this array is changed to whatever comes out of displayReservation whenever the button is actually clicked.

  

  constructor(private authservice: AuthService) { }

  ngOnInit() {
    this.showHelpers = false;
  }

  setDate() {
    this.occupiedTable = this.displayReservation(this.resDate);
    this.numReservations = this.amountReservations();
    this.showHelpers = true;
  }

  //This is the function that fulfills the requirement of having the number of open seats in the restaurant.
  //1.2.2.2 in fwbs
  amountReservations(): number
  {
    var i;
    var numReservations=0;
    for (i = 0; i < 200; i++) {
      if (this.occupiedTable[i]) { numReservations++; }
    }
    return numReservations;
  }

  //This is a helper function for functionalities 1.2.2, i.e. the reservation map.  You can see the occupied seats for each timeslot.
  displayReservation(resTime: Date): boolean[]
  {
    var occupied= [];
    var i;
    for (i = 0; i < 200; i++)
    {
      //what's happening here is that it checks each table to see if the seat is occupied.
      //if the seat is occupied, the table shows as red.  if not, the table shows as white.

      if (this.foundinSrc(resTime, i)) {
        occupied.push(true);
      }

      else {
        occupied.push(false);
      }
    }
    return occupied;
  }


  //This actually iterates through the reservation, so it can also pick up after reservations.
  //It exists to see whether or not a reservation exists so it can fill up the array in displayReservation
  //but it also does this.
  //20 minutes late, cancel all.
  //10 minutes late, cancel all non-super.
  //5 minutes late, cancel all irregular;
  //this is also unintentional insurance against hooligans making reservations in the past.
  foundinSrc(resTime: Date, table: number): boolean {
    var j;
    
    for (j = 0; j < RESSRC.length; j++)
    {
      if (RESSRC[j].time.getTime() + 1200000  < Date.now() ) {
        //over 20 minutes late.  bye.
        RESSRC.splice(j, 1);
      }
      else if (RESSRC[j].time.getTime() + 600000  < Date.now()  && this.authservice.getCustomer(RESSRC[j].reserver).custStatus != 'super')
      {
        //not a super customer, 10 minutes late.  also bye
        RESSRC.splice(j, 1);
      }

      else if (RESSRC[j].time.getTime() + 300000 < Date.now() && this.authservice.getCustomer(RESSRC[j].reserver).custStatus == 'irregular') {
        //awful person, also is 5 minutes late.
        RESSRC.splice(j, 1);
      }

      else if (RESSRC[j].tableNo == table && resTime.getTime() == RESSRC[j].time.getTime()) {
        return true;
      }
    }
    return false;
  }

  static addReservation(resTime: Date, table: number, Wheelchair: boolean, authservice: AuthService)
  {
    alert('Reservation made for ' + resTime + ' at table ' + table);
    RESSRC.push({tableNo: table, time: resTime, isWheelchair: Wheelchair, reserver: authservice.getUsername()});
    
  }

  static removeReservation(resTime: Date, table: number, authservice: AuthService) {
    var i;
    for (i = 0; i < RESSRC.length; i++)
    {
      if (RESSRC[i].reserver == authservice.getUsername() && resTime== RESSRC[i].time && table == RESSRC[i].tableNo)
      RESSRC.splice(i, 1);
    }

  }



}
