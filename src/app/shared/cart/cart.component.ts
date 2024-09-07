import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/cart.service';
import { Cart } from '../../data-type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: Cart[] = [];

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.loadDetails();
  }

  loadDetails() {
    this.cartService.currentCart().subscribe((result) => {
      this.cartItems = result;
    });
  }

  removeFromCart(cartItem: Cart) {
    cartItem.id &&
      this.cartItems &&
      this.cartService.removeFromCart(cartItem.id).subscribe((result) => {
        this.loadDetails();
      });
  }

  checkout() {
    this.router.navigate(['/checkout']);
  }
}
