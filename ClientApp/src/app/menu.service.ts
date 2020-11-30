import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { menuItem, Nutrition } from '../menuClasses';
import { MOCKMENU } from '../mockMenu';

@Injectable({
  providedIn: 'root'
})
export class menuService {

  constructor() { }

  getMenu(): Observable<menuItem[]> {
    return of(MOCKMENU);
  }

  getItem(id: number): Observable<menuItem> {
    return of(MOCKMENU.find(item => item.id === id));
  }

  addItem(item: menuItem): void
  { MOCKMENU.push(item); }
}
