import { Reservation } from './resClasses';
import { AuthService } from './app/auth.service';


export const RESSRC: Reservation[]=[
  { tableNo: 50, time: new Date('April 30, 2019 16:30:00 GMT -0500'), isWheelchair: false, reserver: 'customerexample1' },
  { tableNo: 10, time: new Date('April 30, 2019 16:30:00 GMT -0500'), isWheelchair: false, reserver: 'customerexample2' },
  { tableNo: 20, time: new Date('April 30, 2019 16:30:00 GMT -0500'), isWheelchair: true, reserver: 'customerexample3' }
];


