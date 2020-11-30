import { inventoryItem } from './invClasses'

export const INVENTORY: inventoryItem[] = [
  { barcode: 1, expDate: new Date(1560000000), meatType: 'beef',quantity: 28.5},
  { barcode: 2, expDate: new Date(1560000000), meatType: 'pork', quantity: 30.8 },
  { barcode: 3, expDate: new Date(1560000000), meatType: 'chicken', quantity: 28.7 },
  { barcode: 4, expDate: new Date(1560000000), meatType: 'beef', quantity: 199 },
  { barcode: 5, expDate: new Date(1560000000), meatType: 'pork', quantity: 199 },
  { barcode: 6, expDate: new Date(1560000000), meatType: 'chicken', quantity: 199 }
];
