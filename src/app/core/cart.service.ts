import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cart, Order, Product } from '../data-type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartData = new EventEmitter<Product[] | []>();
  cartUrl = 'http://localhost:3000/cart';
  orderUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) {}

  localAddToCart(data: Product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  removeItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: Product[] = JSON.parse(cartData);
      items = items.filter((item: Product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items));
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: Cart) {
    return this.http.post(this.cartUrl, cartData);
  }
  getCartList(userId: number) {
    return this.http
      .get<Product[]>(`${this.cartUrl}?userId=` + userId, {
        observe: 'response',
      })
      .subscribe((result) => {
        if (result && result.body) {
          this.cartData.emit(result.body);
        }
      });
  }
  removeFromCart(cartId: number) {
    return this.http.delete(this.cartUrl + '/' + cartId);
  }
  currentCart() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Cart[]>(`${this.cartUrl}?userId=` + userData.id);
  }

  deleteCartItems(cartId: number) {
    return this.http.delete(this.cartUrl + cartId).subscribe((result) => {
      this.cartData.emit([]);
    });
  }

  getBilling(cartItems: any) {
    let billingDetails = {
      price: 0,
      discount: 0,
      delivery: 0,
      total: 0,
    };

    cartItems.forEach((item: Cart) => {
      billingDetails.price =
        billingDetails.price + item.price * (item.quantity ?? 1);
      billingDetails.discount =
        billingDetails.discount +
        (item.discount / 100) * item.price * (item.quantity ?? 1);
      billingDetails.price >= 500
        ? (billingDetails.delivery = 0)
        : (billingDetails.delivery = 5);
    });
    billingDetails.total =
      billingDetails.price - billingDetails.discount + billingDetails.delivery;
    return billingDetails;
  }

  orderNow(data: Order) {
    return this.http.post(this.orderUrl, data);
  }

  orderList() {
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<Order[]>(`${this.orderUrl}?userId=` + userData.id);
  }

  cancelOrder(orderId: number) {
    return this.http.delete(this.orderUrl + '/' + orderId);
  }
}
