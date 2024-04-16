import { Component, Input } from '@angular/core';
import { DatePipe, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Books } from '../../../types/book';
import { SellerService } from '../seller.service';

@Component({
  selector: 'app-seller-card',
  standalone: true,
  imports: [DatePipe, RouterLink, NgIf],
  templateUrl: './seller-card.component.html',
  styleUrl: './seller-card.component.css'
})
export class SellerCardComponent {
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

  constructor (private sellerService: SellerService) {}

  deleteBook (itemId: string) {
    
    this.sellerService.deleteBook(itemId);
  }

}
