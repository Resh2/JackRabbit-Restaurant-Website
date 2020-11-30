import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;
  username: string;
  password: string;
  logged: boolean;
  viewInv: boolean;
  viewCust: boolean;
  constructor(private authService: AuthService) {
    
  }
  ngOnInit() { this.logged = this.authService.isLoggedIn(); }

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  login() {
    this.logged = this.authService.login(this.username, this.password);
    this.viewInv = this.authService.isInvworker();
    this.viewCust = this.authService.isAdmin();
  }

  signup() {
    this.logged = this.authService.signup(this.username, this.password);
    
  }

  logout() {
    this.authService.logout();
    this.logged = false;
    this.viewInv = false;
    this.viewCust = false;
   
  }
}
