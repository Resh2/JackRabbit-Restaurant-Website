export class inventoryItem {
    barcode: number;
    expDate: Date;
    meatType: string;
    quantity: number;
};
export class usedItem {
  usedDate: Date;
  meatType: string;
  quantity: number;
};

export class itemBacklog {
  theBacklog: usedItem[];
};

export class inventoryList {
    fullinv: inventoryItem[];
};





