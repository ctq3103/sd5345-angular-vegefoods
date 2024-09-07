import { Component, Input, OnChanges } from '@angular/core';
import { CartService } from '../../core/cart.service';
import { Cart } from '../../data-type';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css',
})
export class OrderSummaryComponent implements OnChanges {
  @Input() cartItems: Cart[] = [];
  cartItemsPrice: number = 0;
  cartItemsDiscount: number = 0;
  deliveryCharge: number = 0;
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnChanges(): void {
    this.getBillingDetails();
    this.cartService.currentCart().subscribe((items) => {
      this.cartItems = items;
      this.getBillingDetails();
    });
  }

  getBillingDetails() {
    let billingDetails = this.cartService.getBilling(this.cartItems);
    this.cartItemsPrice = billingDetails.price;
    this.cartItemsDiscount = billingDetails.discount;
    this.deliveryCharge = billingDetails.delivery;
    this.total = billingDetails.total;
  }
}
