import { Component, OnInit } from '@angular/core';
import { Product } from '../../data-type';
import { ProductsService } from '../../core/products.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css',
})
export class SellerHomeComponent implements OnInit {
  productList: undefined | Product[];
  productMessage: undefined | string;
  isModalOpen: boolean = true;
  productIdToDelete: number | null = null;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.list();
  }

  openDeleteModal(productId: number) {
    this.productIdToDelete = productId;
  }

  // This gets called when the user clicks "OK" in the modal
  confirmDelete() {
    if (this.productIdToDelete !== null) {
      this.deleteProduct(this.productIdToDelete);
    }
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'Product is deleted';
        this.list();
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  list() {
    this.productService.getAllProducts().subscribe((result) => {
      if (result) {
        this.productList = result;
        console.log('products', this.productList);
      }
    });
  }
}
