import { Injectable, Output } from '@angular/core';
import { ACCTLIST, CUSTLIST } from '../accountList';
import { Customer,Account } from '../accountClasses';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  static user: Account;
  static acctList: Account[];
  static custList: Customer[];
  email: string;

  constructor() {
    AuthService.user = null;
    AuthService.acctList = ACCTLIST;
    AuthService.custList = CUSTLIST;
  }

  signup(username: string, password: string): boolean{
    AuthService.acctList.push({ u: username, p: password, acctPerms: 'customer' });
    AuthService.user = this.match(username, password);
    
    return this.isLoggedIn();
  }

  login(username: string, password: string): boolean {
    AuthService.user = this.match(username, password);
    
    return this.isLoggedIn();
  }

  logout(){
    AuthService.user = null;
    
  }

  isLoggedIn(): boolean {
    return (AuthService.user != null);
  }

  getUsername(): string {
    return AuthService.user.u;
  }

 static getAccountWithUsername(username: string): Account {
    var i;
    var found = false;
    for (i = 0; i < AuthService.acctList.length && found == false; i++) {
      if (username == AuthService.acctList[i].u) { found = true; }
    }
    if (found == false) { return null; }
    return AuthService.acctList[i];
  }

  getAccount(): Account {
    var username = this.getUsername();
    var i;
    var found = false;
    for (i = 0; i < AuthService.acctList.length && found == false; i++) {
      if (username == AuthService.acctList[i].u) { found = true; }
    }
    if (found == false) { return null; }
    return AuthService.acctList[i];
  }


  match(username: string, password: string): Account {
    var i;
    var found = false;
    //okay so this is where you see if there's a match
    //if not, null
    //if so, return true.
    for (i = 0; i < AuthService.acctList.length && found == false; i++) {
      if (username == AuthService.acctList[i].u && password == AuthService.acctList[i].p) { found = true; }
    }
    if (found == false) { return null; }
    return AuthService.acctList[i-1];
  }

  isInvworker(): boolean {
    //okay so this makes you see the inventory interface whenever you got an inventory worker.
    //come to think of it, admins should be able to do it as well.
    return (AuthService.user.acctPerms == 'inventory' || AuthService.user.acctPerms=='admin');
  }

  isAdmin(): boolean {
    //and this lets you modify things when you're an admin like menus.
    var isittrue = AuthService.user.acctPerms == 'admin';
    return isittrue;
  }

  getStatus(username: string): string {
    //this allows you to see customers' reservation status
    var isittrue = this.getCustomer(username).custStatus;
    return isittrue;

  }

  getCustomer(username: string): Customer
  {
    var i;
    var found = false;
    for (i = 0; i < AuthService.custList.length && found == false; i++) {
      if (username == AuthService.custList[i].u) { found = true; }
    }
    if (found == false) { return null; }
    return AuthService.custList[i-1];
  }

  changeStatus(username: string, status: string): void {
    var i;
    var found = false;
    for (i = 0; i < AuthService.custList.length && found == false; i++) {
      if (username == AuthService.custList[i].u) {
        found = true;
        AuthService.custList[i].custStatus = status;
      }
    }
  }
}
