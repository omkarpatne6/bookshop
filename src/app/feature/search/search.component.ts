import { Component } from '@angular/core';
import { SearchService } from './search.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  constructor (private searchService: SearchService) {}

  filterResults(author: string, title: string): void {
    this.searchService.setSearchQuery(author, title);
  }

}