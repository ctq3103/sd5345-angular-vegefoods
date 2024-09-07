import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../data-type';
import { ProductsService } from '../../core/products.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css',
})
export class SellerUpdateProductComponent implements OnInit {
  productData: undefined | Product;
  updateProductMessage: string = '';
  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.warn(productId);
    productId &&
      this.productService.getProduct(productId).subscribe((data) => {
        console.warn(data);
        this.productData = data;
      });
  }

  submit(data: any) {
    if (this.productData) {
      data.id = this.productData.id;
    }
    this.productService.updateProduct(data).subscribe((result) => {
      if (result) {
        this.updateProductMessage = 'Product has updated';
      }
    });
    setTimeout(() => {
      this.updateProductMessage = '';
    }, 3000);
    console.warn(data);
  }
}
