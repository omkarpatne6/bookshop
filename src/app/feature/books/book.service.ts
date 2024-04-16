import { Injectable } from '@angular/core';
import { Books } from '../../types/book';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private booksSubject: BehaviorSubject<Array<Books>> = new BehaviorSubject<Array<Books>>([]);
  public books$ = this.booksSubject.asObservable();

  constructor(private router: Router) {
    this.loadBooksFromLocalStorage();
    window.addEventListener('storage', this.handleStorageEvent.bind(this));
  }

  private loadBooksFromLocalStorage() {
    const storedBooks = JSON.parse(localStorage.getItem("myArray") || "[]") as Array<Books>;
    this.booksSubject.next(storedBooks);
  }

  private handleStorageEvent(event: StorageEvent) {
    if (event.key === 'myArray') {
      this.loadBooksFromLocalStorage();
    }
  }

  updateBooks(books: Array<Books>) {
    localStorage.setItem('myArray', JSON.stringify(books));
    this.booksSubject.next(books);
  }

  getBooks() {
    return this.booksSubject.value;
  }

  getBookById(itemId: string) {
    return this.booksSubject.value.find((item) => item.isbn === itemId) || null;
  }
}
