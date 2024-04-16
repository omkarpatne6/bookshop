import { Injectable } from '@angular/core';
import { Books } from '../../types/book';
import { getAuth } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private router: Router) { }

  cartData: any

  fetchCart(): Array<Books> {
    const data = sessionStorage.getItem("items");
  
    if (data) {
      this.cartData = JSON.parse(data);
    } else {
      this.cartData = [];
    }
  
    return this.cartData;
  }
  
  totalPrice() {
    let total = 0;

    for (let i in this.cartData) {
      total += this.cartData[i].price;
    }

    return total;
  }

  addToCart(item: Books): void {

    const auth = getAuth();

    if (!auth.currentUser) {
      alert("Please log in first");
      this.router.navigate(['/login']);
      return;
    }

    let itemsString = sessionStorage.getItem('items');
    let items: Array<any> = itemsString ? JSON.parse(itemsString) : [];

    // check if item already exists in the cart or not
    const res = items.findIndex(book => book.isbn === item.isbn);

    // for cart quantity logic
    if (res === -1) {
      items.push({
        ...item,
        quantity: 1
      });
      alert("Item added to cart");
    } else {
      items[res]["price"] = items[res]["price"] / items[res]["quantity"]++ * items[res]["quantity"];
      alert("Item added to cart");
    }

    let updatedItemsString = JSON.stringify(items);

    sessionStorage.setItem('items', updatedItemsString);
  }

  removeItemFromCart(itemId: string): void {
    let itemsString = sessionStorage.getItem('items');
    let items: Array<any> = itemsString ? JSON.parse(itemsString) : [];

    // check if item already exists in the cart or not
    const res = items.filter((item) => item.isbn !== itemId);

    let updatedItemsString = JSON.stringify(res);

    sessionStorage.setItem('items', updatedItemsString);
  }

  alterQuantity(item: string, action: string): void {
    let itemsString = sessionStorage.getItem('items');
    let items: Array<any> = itemsString ? JSON.parse(itemsString) : [];

    // check if item already exists in the cart or not
    const res = items.findIndex(book => book.isbn === item);

    // for cart quantity logic
    if (action === "sub" && items[res]["quantity"] > 1) {
      items[res]["price"] = items[res]["price"] / items[res]["quantity"]-- * items[res]["quantity"];
      console.log(items[res].quantity);
    } else if (action === "add") {
      items[res]["price"] = items[res]["price"] / items[res]["quantity"]++ * items[res]["quantity"];
      console.log(items[res].quantity);
    } else if (action === "sub" && items[res].quantity === 1) {
      this.removeItemFromCart(item);
      return;
    }

    let updatedItemsString = JSON.stringify(items);

    sessionStorage.setItem('items', updatedItemsString);
  }
}
