import { Customer,Account } from './accountClasses'

export const ACCTLIST: Account[] = [
  { u: 'dumbgreedybusinessman',p:'abc123', acctPerms: 'admin' },
  { u: 'clkrisnik',p:'abc123', acctPerms: 'inventory' },
  { u: 'customerexample', p: 'abc123', acctPerms: 'customer' },
  { u: 'customerexample2', p: 'abc123', acctPerms: 'customer' },
  { u: 'customerexample3', p: 'abc123', acctPerms: 'customer' }
];

export const CUSTLIST: Customer[] = [
  { u: 'customerexample',p:'abc123', acctPerms: 'customer', custStatus: 'super', favDish: 1, favTable: 200, transactionHistory: [] },
  { u: 'customerexample2', p: 'abc123', acctPerms: 'customer', custStatus: 'regular', favDish: 1, favTable: 200, transactionHistory: []  },
  { u: 'customerexample3', p: 'abc123', acctPerms: 'customer', custStatus: 'irregular', favDish: 1, favTable: 200, transactionHistory: []  }
];
