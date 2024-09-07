import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/products.service';
import { Product } from '../../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css',
})
export class SellerAddProductComponent implements OnInit {
  addProductMessage: string = '';
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {}

  submit(data: Product) {
    this.productService.addProduct(data).subscribe((result) => {
      console.warn(result);
      if (result) {
        this.addProductMessage = 'Product is added successfully';
      }
    });

    setTimeout(() => {
      this.addProductMessage = '';
    }, 3000);
  }
}
