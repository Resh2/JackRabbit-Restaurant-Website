import { menuItem } from './menuClasses';

export class Account {
  u: string;
  p: string;
  acctPerms: string;
};


export class Transaction {
    items: menuItem[];
    price: number;
    tax: number;
};

export class Customer extends Account {
  custStatus: string;
  favDish: number;
  favTable: number;
  transactionHistory: Transaction[];
};
//firebase stores password for me, no need for more storage of the password

export class CustList {
  list: Customer[];
};

export class AcctList {
  list: Account[];
}
