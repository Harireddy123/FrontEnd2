import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterloginComponent } from './Components/registerlogin/registerlogin.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BookdetailsComponent } from './Components/bookdetails/bookdetails.component';
import { BooksdataComponent } from './Components/booksdata/booksdata.component';
import { CartComponent } from './Components/cart/cart.component';
import { MatBadgeModule } from '@angular/material/badge';
import { OrderComponent } from './Components/order/order.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { SuccessComponent } from './Components/success/success.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterloginComponent,
    DashboardComponent,
    BookdetailsComponent,
    BooksdataComponent,
    CartComponent,
    OrderComponent,
    WishlistComponent,
    SuccessComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatOptionModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatExpansionModule,
  ],
  providers: [provideClientHydration(withEventReplay()), provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
