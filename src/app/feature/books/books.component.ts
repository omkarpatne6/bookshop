import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { DatePipe } from '@angular/common';
import { OnInit } from '@angular/core';
import { BookCardComponent } from './book-card/book-card.component';
import { Books } from '../../types/book';
import { BookService } from './book.service';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from '../search/search.component';
import { SearchService } from '../search/search.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [NgFor, DatePipe, BookCardComponent, FormsModule, SearchComponent, NgIf],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
  providers: [DatePipe]
})

export class BooksComponent implements OnInit {

  data: Array<Books> = [];
  filteredData: any = [];
  showSearch = false;
  private booksSubscription!: Subscription;

  searchQuery = '';
  constructor(private books: BookService, private searchService: SearchService) { };

  ngOnInit(): void {
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

  clearLocalStorage () {
    localStorage.setItem('myArray', JSON.stringify([]));
  }

}