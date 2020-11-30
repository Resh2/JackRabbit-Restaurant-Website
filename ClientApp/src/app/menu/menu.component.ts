import { Component, OnInit } from '@angular/core';
import { menuItem, Nutrition } from '../../menuClasses';
import { menuService } from '../menu.service';
import { AuthService } from '../auth.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menu: menuItem[] = [];
  addedItem: menuItem;


  constructor(private MenuService: menuService,
    private authservice: AuthService) { }

  ngOnInit() {
    this.getMenu();
  }

  getMenu(): void {
    this.MenuService.getMenu().subscribe(menu => this.menu=menu);
  }

  addItemByFields(itemName: string, imgmaybe: string, theNutrition: Nutrition, thePrice: number ): void {
    //okay so this is restricted to admins only, and is the create operation.  you don't strictly need to have an image, although it certainly helps.
    this.menu.push({ id: this.menu.length + 1, name: itemName, imgpath: imgmaybe, itemNutrition: theNutrition, price: thePrice });
  }

  addItem(item: menuItem): void {
    this.MenuService.addItem(item);
  }

  removeMenuItem(id: number): void {
    var i;
    for (i = 0; i < this.menu.length; i++)
    {
      if (id = this.menu[i].id) { this.menu.splice(i, 1); }
    }
    return;
  }

}
