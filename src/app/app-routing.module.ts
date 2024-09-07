import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { CartComponent } from './shared/cart/cart.component';
import { SellerAuthComponent } from './shared/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './shared/seller-home/seller-home.component';
import { AuthGuard } from '../auth.guard';
import { SellerAddProductComponent } from './shared/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './shared/seller-update-product/seller-update-product.component';
import { SearchResultsComponent } from './shared/search-results/search-results.component';
import { ProductDetailsComponent } from './shared/product-details/product-details.component';
import { UserAuthComponent } from './shared/user-auth/user-auth.component';
import { CheckoutComponent } from './shared/checkout/checkout.component';
import { MyOrdersComponent } from './shared/my-orders/my-orders.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'seller-auth',
    component: SellerAuthComponent,
  },
  {
    component: SellerHomeComponent,
    path: 'seller-home',
    canActivate: [AuthGuard],
  },
  {
    component: SellerAddProductComponent,
    path: 'seller-add-product',
    canActivate: [AuthGuard],
  },
  {
    component: SellerUpdateProductComponent,
    path: 'seller-update-product/:id',
    canActivate: [AuthGuard],
  },
  {
    component: UserAuthComponent,
    path: 'user-auth',
  },
  {
    component: SearchResultsComponent,
    path: 'search/:query',
  },
  {
    component: ProductDetailsComponent,
    path: 'details/:productId',
  },
  {
    component: CartComponent,
    path: 'cart',
  },
  {
    component: CheckoutComponent,
    path: 'checkout',
  },
  {
    component: MyOrdersComponent,
    path: 'my-orders',
  },
  {
    component: NotFoundComponent,
    path: '**',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
