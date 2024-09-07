import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    CartComponent,
    HeaderComponent,
    HomeComponent,
    ProductComponent,
    ProductDetailsComponent,
    OrderSummaryComponent,
    SellerAuthComponent,
    SellerHomeComponent,
    SellerAddProductComponent,
    SellerUpdateProductComponent,
    SearchResultsComponent,
    UserAuthComponent,
    CheckoutComponent,
    MyOrdersComponent,
    NotFoundComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [HeaderComponent],
  providers: [provideHttpClient()],
})
export class SharedModule {}
