import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { DatePipe } from '@angular/common';
import { OnInit } from '@angular/core';
import { BookCardComponent } from './book-card/book-card.component';
import { Books } from '../../types/book';
import { BookService } from './book.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [NgFor, DatePipe, BookCardComponent, FormsModule],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css',
  providers: [DatePipe]
})

export class BooksComponent implements OnInit {

  data: Array<Books> = [];
  filteredData: Array<Books> = [];

  constructor(private books: BookService) { };

  ngOnInit(): void {
    this.data = this.books.getBooks();
    this.filteredData = this.books.getBooks();
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredData = this.books.getBooks();
      return;
    }

    this.filteredData = this.books.getBooks().filter((item: Books) => {
      return item?.title.toLowerCase().includes(text.toLowerCase()) || item?.authors[0].toLowerCase().includes(text.toLowerCase())
    }
    );
  }
}
