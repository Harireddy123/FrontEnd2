import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterloginComponent } from './Components/registerlogin/registerlogin.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { BookdetailsComponent } from './Components/bookdetails/bookdetails.component';
import { BooksdataComponent } from './Components/booksdata/booksdata.component';
import { CartComponent } from './Components/cart/cart.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { OrderComponent } from './Components/order/order.component';
import { SuccessComponent } from './Components/success/success.component';

const routes: Routes = [
  { path: '', redirectTo: 'registerlogin', pathMatch: 'full' },
  { path: 'registerlogin', component: RegisterloginComponent },

  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: BooksdataComponent },
      { path: 'bookdetails/:id', component: BookdetailsComponent },
      { path: 'cart', component: CartComponent },
      { path: 'order', component: OrderComponent },
      { path: 'wishlist', component: WishlistComponent },
      { path: 'success', component: SuccessComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
