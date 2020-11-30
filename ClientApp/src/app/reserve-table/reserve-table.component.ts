import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ReservationBookComponent } from '../reservation-book/reservation-book.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reserve-table',
  templateUrl: './reserve-table.component.html',
  styleUrls: ['./reserve-table.component.css']
})
export class ReserveTableComponent implements OnInit {
  //Simple component.  The client has already clicked on the given table at the given time, and so you have opened this menu.
  //All the fields are populated for them, and all you need is to confirm it.

  table: number;
  timeslot: Date;
  isWheelchair: boolean;


  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.getTable();
    this.getTime();
  }

  getTime(): void {
    const timeslot = +this.route.snapshot.paramMap.get('timeslot');
    this.timeslot = new Date(timeslot);
  }

  getTable(): void {
    const table = +this.route.snapshot.paramMap.get('table');
    this.table = table;
  }

  goBack(): void {
    this.location.back();
  }

  Reserve(resDate: Date, theTable: number, wheelchair: boolean): void {
    ReservationBookComponent.addReservation(resDate, theTable, wheelchair, this.authservice);
    this.goBack();
  }

}
