import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgFor, NgIf } from '@angular/common';
import { Books } from '../../types/book';
import { CartService } from './cart.service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DatePipe, NgFor, FormsModule, NgIf, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [DatePipe]
})
export class CartComponent implements OnInit {

  data: Array<Books> = [];
  couponCode: string = "";
  totalPrice: number = 0;
  finalDiscountedPrice: number = 0;
  discount: number = 0;

  bookCoupons: Array<any> = [
    { code: "BOOKSALE10", discount: 10 },
    { code: "READMORE15", discount: 15 },
    { code: "BOOKLOVER20", discount: 20 },
    { code: "PAGETURNER25", discount: 25 },
    { code: "BOOKWORM30", discount: 30 }
  ];

  constructor(private cart: CartService) {

  }

  ngOnInit(): void {
    this.data = this.cart.fetchCart();
    this.totalPrice = this.cart.totalPrice();
    this.finalDiscountedPrice = this.cart.totalPrice();
  }

  addItemQuantity(itemId: string): void {
    console.log(itemId);
    this.cart.alterQuantity(itemId, "add");
    this.data = this.cart.fetchCart();
    this.totalPrice = this.cart.totalPrice();
    this.finalDiscountedPrice = this.cart.totalPrice();
    this.applyCoupon();
  }

  reduceItemQuantity(itemId: string): void {
    console.log(itemId);
    this.cart.alterQuantity(itemId, "sub");
    this.data = this.cart.fetchCart();
    this.totalPrice = this.cart.totalPrice();
    this.finalDiscountedPrice = this.cart.totalPrice();
    this.applyCoupon();
  }

  removeFromCart(item: any): void {
    this.cart.removeItemFromCart(item);
    this.data = this.cart.fetchCart();
    this.totalPrice = this.cart.totalPrice();
    this.finalDiscountedPrice = this.cart.totalPrice();
    this.applyCoupon();
  }

  applyCoupon() {

    const couponObject = this.bookCoupons.find(coupon => coupon.code === this.couponCode);

    if (couponObject) {

      const discountAmount = (this.totalPrice * couponObject.discount) / 100;
      this.finalDiscountedPrice = this.totalPrice - discountAmount;
      this.discount = discountAmount;
    } else {
      console.log("Coupon code not found");
    }
  }
}
