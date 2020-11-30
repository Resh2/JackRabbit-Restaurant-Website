export class menuItem {
    id: number;
    name: string;
    imgpath: string;//only non-self explanatory one, it's the path to the wonderful picture of the food
    itemNutrition: Nutrition;
    price: number;
};

export class Nutrition {
    kcal: number;
    gramsFat: number;
    gramsSugar: number;
    lbsBeef: number; //these last three assist in helping smart inventory deplete items
    lbsPork: number;
    lbsChicken: number;
};

