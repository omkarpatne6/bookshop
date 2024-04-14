import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../books/book.service';
import { Books } from '../../types/book';
import { CartService } from '../cart/cart.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './book-details.component.html',
  styleUrl: './book-details.component.css',
  providers: [DatePipe]
})
export class BookDetailsComponent implements OnInit {
  itemId: any = "";
  data: any;
  
  constructor(private route: ActivatedRoute, private bookService: BookService, private cartService: CartService) {}

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');

    this.data = this.bookService.getBookById(this.itemId);

  }

  addToCart (item: Books): void {
    this.cartService.addToCart(item);
  }
}