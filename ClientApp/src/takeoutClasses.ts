import { menuItem } from "./menuClasses";

export class TakeOutOrder {
    receiptNo: number;
    date: Date;
    foodList: menuItem[];
    username: string;
    finalPrice: number;
}

export class TakeOutList {
  orders: TakeOutOrder[];
}
