import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/cart.service';
import { Cart, Order } from '../../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  cartItems: Cart[] = [];
  orderMsg: string = '';
  totalPrice: number = 0;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadDetails();
  }

  loadDetails() {
    this.cartService.currentCart().subscribe((result) => {
      this.cartItems = result;
      this.totalPrice = this.cartService.getBilling(this.cartItems).total;
    });
  }

  orderNow(data: { email: string; address: string; contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;

    let orderData: Order = {
      ...data,
      totalPrice: this.totalPrice,
      userId,
      id: undefined,
    };

    this.cartItems?.forEach((item) => {
      setTimeout(() => {
        item.id && this.cartService.deleteCartItems(item.id);
      }, 700);
    });

    this.cartService.orderNow(orderData).subscribe((result) => {
      if (result) {
        this.orderMsg = 'Order has been placed';
        setTimeout(() => {
          this.orderMsg = '';
          this.router.navigate(['/my-orders']);
        }, 4000);
      }
    });
  }
}
