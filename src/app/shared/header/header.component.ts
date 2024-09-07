import { Component, OnInit } from '@angular/core';
import { CartService } from '../../core/cart.service';
import { Router } from '@angular/router';
import { ProductsService } from '../../core/products.service';
import { Product } from '../../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default';
  sellerName: string = '';
  userName: string = '';
  searchResult: undefined | Product[];
  cartItems = 0;
  searchText: string = '';

  constructor(
    private router: Router,
    private productService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          let seller = localStorage.getItem('seller');
          this.sellerName = seller && JSON.parse(seller).name;
          this.menuType = 'seller';
        } else if (localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
          this.cartService.getCartList(userData.id);
        } else {
          this.menuType = 'default';
        }
      }
    });

    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length;
    }
    this.cartService.cartData.subscribe((items) => {
      this.cartItems = items.length;
    });
  }

  logout() {
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  userLogout() {
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
    this.cartService.cartData.emit([]);
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      this.productService.searchProduct(element.value).subscribe((result) => {
        if (result.length > 5) {
          result.length = length;
        }
        this.searchResult = result;
      });
    }
  }

  hideSearch() {
    this.searchResult = undefined;
  }

  redirectToDetails(id: number) {
    this.router.navigate(['/details/' + id]);
  }

  submitSearch(val: string) {
    console.warn(val);
    this.router.navigate([`search/${val}`]);
  }
}
