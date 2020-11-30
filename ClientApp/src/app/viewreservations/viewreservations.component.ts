import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RESSRC } from '../../resSrc';
import { Reservation } from 'src/resClasses';
import { ReservationBookComponent } from '../reservation-book/reservation-book.component';

@Component({
  selector: 'app-viewreservations',
  templateUrl: './viewreservations.component.html',
  styleUrls: ['./viewreservations.component.css']
})

  //This component allows a user to see their reservations.
export class ViewreservationsComponent implements OnInit {
  res: Reservation;
  myReservations: Reservation[];
  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.myReservations = [];
    this.getReservations();
  }

  getReservations() {
    var i;
    for (i = 0; i < RESSRC.length; i++) {
      if (RESSRC[i].reserver == this.authService.getUsername()) {
        this.myReservations.push(RESSRC[i]);
      }
    }
  }

  cancelReservation(resTime: Date, tableNo: number, index: number) {
    ReservationBookComponent.removeReservation(resTime, tableNo, this.authService);
    this.myReservations.splice(index-1, 1);
  }
  


}
