import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgFor } from '@angular/common';
import { Books } from '../../../types';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [DatePipe, NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [DatePipe]
})
export class CartComponent implements OnInit {

  data: Array<Books> = [];

  ngOnInit(): void {
      const cartData = JSON.parse(sessionStorage.getItem("items") as string);

      if (cartData) {
        this.data = cartData;
      }

      console.log(this.data);
  }

  addItemQuantity (itemId: string): void {
    console.log(itemId);
  }

  removeFromCart (item: any): void {
    console.log(item)
  }
}
