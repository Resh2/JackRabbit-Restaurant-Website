import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { MenuItemDetailComponent } from './menu-item-detail/menu-item-detail.component';
import { TakeOutOrderComponent } from './take-out-order/take-out-order.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { StorageBucket } from '@angular/fire/storage';
import { ReservationBookComponent } from './reservation-book/reservation-book.component';
import { ReserveTableComponent } from './reserve-table/reserve-table.component';
import { CustomerOpsComponent } from './customer-ops/customer-ops.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ViewreservationsComponent } from './viewreservations/viewreservations.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    ReservationBookComponent,
    MenuComponent,
    MenuItemDetailComponent,
    TakeOutOrderComponent,
    InventoryListComponent,
    ReserveTableComponent,
    CustomerOpsComponent,
    CustomerDetailComponent,
    AboutUsComponent,
    ViewreservationsComponent,
    
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    DlDateTimeDateModule, 
    DlDateTimePickerModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'menu', component: MenuComponent },
      { path: 'detail/:id', component: MenuItemDetailComponent },
      { path: 'takeout', component: TakeOutOrderComponent },
      { path: 'reservation', component: ReservationBookComponent },
      { path: 'inventory', component: InventoryListComponent },
      { path: 'reservation/:timeslot/:table', component: ReserveTableComponent },
      { path: 'client', component: CustomerOpsComponent },
      { path: 'client/:u', component: CustomerDetailComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'my-reservations', component: ViewreservationsComponent }
    ])
  ],
  providers: [{ provide: StorageBucket, useValue: 'product-image-bucket' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
