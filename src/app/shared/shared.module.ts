import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortPipe } from './sort.pipe';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SortPipe
  ],
  exports: [
    SortPipe
  ]
})
export class SharedModule { }
