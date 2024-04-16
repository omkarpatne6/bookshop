import { Injectable } from '@angular/core';
import { Books } from '../../types/book';
import { BookService } from '../books/book.service';

@Injectable({
  providedIn: 'root'
})
export class SellerService {

  constructor(private bookService: BookService) { }

  deleteBook(itemId: string) {
    // Retrieve the list of books from local storage
    let books = JSON.parse(localStorage.getItem('myArray') || '[]') as Array<Books>;

    // Filter out the book with the specified itemId
    books = books.filter((book) => book.isbn !== itemId);

    // Update the data in local storage
    localStorage.setItem('myArray', JSON.stringify(books));
    console.log("Deleted item successfully");

    // Notify the BookService of the update
    this.bookService.updateBooks(books);
  }

  submitEdit(form: any, itemId: string) {
    // Update the data in localStorage
    let books = JSON.parse(localStorage.getItem('myArray') || '[]') as Array<Books>;
    const index = books.findIndex((book) => book.isbn === itemId);
  
    if (index !== -1) {
      // Book exists, update it
      books[index] = { ...books[index], ...form };
      alert("Item updated successfully");

    } else {
      // Book does not exist, add it
      
      books.push({ ...form, isbn: itemId });
      alert("Book added to store");
    }
  
    localStorage.setItem('myArray', JSON.stringify(books));
  
    // Notify the BookService of the update
    this.bookService.updateBooks(books);
  }
  
}
