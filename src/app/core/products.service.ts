import { HttpClient } from '@angular/common/http';
import { EventEmitter, inject, Injectable, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Cart, Order, Product } from '../data-type';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productsUrl = 'http://localhost:3000/products';
  cartUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get<Product[]>(this.productsUrl);
  }

  addProduct(data: Product) {
    return this.http.post(this.productsUrl, data);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.productsUrl}/${id}`);
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.productsUrl}/${id}`);
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(`${this.productsUrl}/${product.id}`, product);
  }

  searchProduct(query: string) {
    return this.http.get<Product[]>(`${this.productsUrl}?q=${query}`);
  }
}
