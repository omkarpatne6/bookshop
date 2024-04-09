import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksComponent } from './books/books.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BooksComponent
  ],
  exports: [BooksComponent]
})
export class FeatureModule { }
