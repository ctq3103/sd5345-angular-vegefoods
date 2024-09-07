import { Component, OnInit } from '@angular/core';
import { SellerService } from '../../core/seller.service';
import { SignUp } from '../../data-type';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrl: './seller-auth.component.css',
})
export class SellerAuthComponent implements OnInit {
  showLogin = true;
  authError: string = '';

  constructor(private sellerService: SellerService) {}

  ngOnInit(): void {
    this.sellerService.reloadSeller();
  }

  signUp(data: SignUp): void {
    console.warn(data);
    this.sellerService.sellerSignup(data);
  }

  login(data: SignUp): void {
    this.sellerService.sellerLogin(data);
    this.sellerService.isLoginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Email or password is not correct';
      }
    });
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignup() {
    this.showLogin = false;
  }
}
