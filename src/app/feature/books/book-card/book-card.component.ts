import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Books } from '../../../types/book';
import { RouterLink } from '@angular/router';
import { CartService } from '../../cart/cart.service';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [DatePipe, RouterLink],
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

  constructor (private books: CartService) {};

  addToCart (item: Books): void {
    this.books.addToCart(item)
  }
}
