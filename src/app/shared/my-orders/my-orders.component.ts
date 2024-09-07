import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/cart.service';
import { Order } from '../../data-type';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css',
})
export class MyOrdersComponent implements OnInit {
  orderData: Order[] | undefined;
  orderIdToCancel: number | undefined = undefined;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.getOrderList();
  }

  openCancelModal(orderId: number | undefined) {
    this.orderIdToCancel = orderId;
  }

  confirmCancelOrder() {
    if (this.orderIdToCancel !== undefined) {
      this.cancelOrder(this.orderIdToCancel);
    }
  }

  cancelOrder(orderId: number | undefined) {
    orderId &&
      this.cartService.cancelOrder(orderId).subscribe((result) => {
        if (result) {
          this.getOrderList();
        }
      });
  }
  getOrderList() {
    this.cartService.orderList().subscribe((result) => {
      this.orderData = result;
    });
  }
}
