import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../core/products.service';
import { Product } from '../../data-type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  products: Product[] | undefined;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe((res) => {
      this.products = res;
    });
  }
}
