import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  private showSearch = new BehaviorSubject<boolean>(false);
  showSearch$ = this.showSearch.asObservable();

  private searchQuery = new BehaviorSubject<{ author: string, title: string }>({ author: '', title: '' });
  searchQuery$ = this.searchQuery.asObservable();

  toggleSearch(): void {
    this.showSearch.next(!this.showSearch.value);
  }

  setSearchQuery(author: string, title: string): void {
    this.searchQuery.next({author, title});
  }
}
