import { Component } from '@angular/core';
import { Books } from '../../types/book';
import { Subscription } from 'rxjs';
import { BookService } from '../books/book.service';
import { SearchService } from '../search/search.service';
import { SearchComponent } from '../search/search.component';
import { NgFor, NgIf } from '@angular/common';
import { SellerCardComponent } from './seller-card/seller-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-seller',
  standalone: true,
  imports: [SearchComponent, SellerCardComponent, NgFor, NgIf, RouterLink],
  templateUrl: './seller.component.html',
  styleUrl: './seller.component.css'
})
export class SellerComponent {
  data: Array<Books> = [];
  filteredData: any = [];
  showSearch = false;
  private booksSubscription!: Subscription;
  isbn: any;

  searchQuery = '';
  constructor(private books: BookService, private searchService: SearchService) { };

  ngOnInit(): void {
    this.isbn = Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
    this.booksSubscription = this.books.books$.subscribe((books) => {
      this.data = books;
      this.filteredData = books;
    });

    this.searchService.showSearch$.subscribe(showSearch => {
      this.showSearch = showSearch;
    });

    this.searchService.searchQuery$.subscribe(query => {
      this.filterResults(query.author, query.title);

      // console.log(query.author, query.title)
    });
  }

  filterResults(author: string, book: string) {
    console.log(author);
    if (!author && !book) {
      this.filteredData = this.books.getBooks();
      return;
    }

    if (author) {
      this.filteredData = this.books.getBooks().filter((item: Books) => {
        return item?.authors[0].toLowerCase().includes(author.toLowerCase());
      });
    } else if (book) {
      this.filteredData = this.books.getBooks().filter((item: Books) => {
        return item?.title.toLowerCase().includes(book.toLowerCase());
      }
      );
    }
  }

  ngOnDestroy(): void {
    this.booksSubscription.unsubscribe();
  }

  isbnGenerator () {
    return Math.floor(Math.random() * (9999999999 - 1000000000 + 1)) + 1000000000;
  }
}
