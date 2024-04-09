import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Books } from '../../../../types';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.css',
  providers: [DatePipe]
})

export class BookCardComponent {
  @Input() book: Books = {
    title: '',
    isbn: '',
    price: 0,
    publishedDate: { $date: ''},
    thumbnailUrl: '',
    status: '',
    authors: [],
    categories: []
  };

  setCartData(item: Books): void {
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
      console.log(items[res]?.quantity);
    } else {
      items[res]["quantity"]++;
      console.log(items[res].quantity);
    }

    let updatedItemsString = JSON.stringify(items);

    sessionStorage.setItem('items', updatedItemsString);
  }
}
