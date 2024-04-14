import { Injectable } from '@angular/core';
import { Books } from '../../types/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor() { }

  books: any;

  getBooks() {
    const storedBooks = JSON.parse(localStorage.getItem("myArray") as string);
    if (storedBooks) {
      this.books = storedBooks;
    } else {
      this.books = [];
    }
    
    return this.books;
  }

  getBookById (itemId: string) {
    const storedBooks: Array<Books> = JSON.parse(localStorage.getItem("myArray") as string);
    if (storedBooks) {

      return storedBooks.find((item) => item.isbn === itemId);
    } else {
      return {};
    }
  }
}
