import { menuItem, Nutrition } from './menuClasses';


export const MOCKMENU: menuItem[]=[
  { id: 1, name: 'Item 1', imgpath: 'https://ichef.bbci.co.uk/news/660/cpsprodpb/1325A/production/_88762487_junk_food.jpg', itemNutrition: { kcal: 100, gramsFat: 0, gramsSugar: 0, lbsBeef: 1, lbsPork: 0, lbsChicken: 0 } ,price: 20.05},
  { id: 2, name: 'Item 2', imgpath: 'https://upload.wikimedia.org/wikipedia/commons/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg', itemNutrition: { kcal: 100, gramsFat: 0, gramsSugar: 0, lbsBeef: 0, lbsPork: 0, lbsChicken: 1 },price: 60.00},
  { id: 3, name: 'Item 3', imgpath: 'https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/6/0/FN_snapchat_coachella_wingman%20.jpeg.rend.hgtvcom.616.462.suffix/1523633513292.jpeg', itemNutrition: { kcal: 100, gramsFat: 0, gramsSugar: 0, lbsBeef: 0, lbsPork: 1, lbsChicken: 0 },price: 19.95}
];
