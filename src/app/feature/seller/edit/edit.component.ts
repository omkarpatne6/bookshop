import { Component, OnInit } from '@angular/core';
import { BookService } from '../../books/book.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SellerService } from '../seller.service';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [DatePipe, FormsModule, NgIf],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  providers: [DatePipe]
})
export class EditComponent implements OnInit {

  data: any;
  itemId: any = "";

  form: any = {
    title: "",
    shortDescription: "",
    price: 0
  }

  constructor (private route: ActivatedRoute, private bookService: BookService, private sellerService: SellerService) {}

  ngOnInit(): void {
    this.itemId = this.route.snapshot.paramMap.get('id');

    this.data = this.bookService.getBookById(this.itemId);

    this.form = { ...this.form, title: this.data.title, shortDescription: this.data.shortDescription, price: this.data.price };

  }

  deleteBookById (itemId: string) {
    this.sellerService.deleteBook(itemId);
  }

  submit() {
    this.sellerService.submitEdit(this.form, this.itemId);
  }
}