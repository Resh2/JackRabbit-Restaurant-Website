import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { menuService } from '../menu.service';
import { menuItem } from '../../menuClasses';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-menu-item-detail',
  templateUrl: './menu-item-detail.component.html',
  styleUrls: ['./menu-item-detail.component.css']
})
export class MenuItemDetailComponent implements OnInit {

  item: menuItem;
  viewcrud: boolean;

  constructor(
    private route: ActivatedRoute,
    private MenuService: menuService,
    private location: Location,
    private authservice: AuthService
  ) { }

  ngOnInit(): void {
    this.getItem();
    this.viewcrud = this.authservice.isAdmin();
  }

  getItem(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.MenuService.getItem(id).subscribe(item => this.item = item);
  }

  goBack(): void {
    this.location.back();
  }

  

}
