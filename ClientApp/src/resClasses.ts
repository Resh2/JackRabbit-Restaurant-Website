import { Account } from './accountClasses';

export class Reservation {
    tableNo: number;
    time: Date;
    isWheelchair: boolean;
    reserver: string;
};

export class resList {
  theList: Reservation[];
};
