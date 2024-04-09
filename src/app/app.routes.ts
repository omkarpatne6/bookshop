import { Routes } from '@angular/router';
import { BooksComponent } from './feature/books/books.component';
import { CartComponent } from './feature/cart/cart.component';

export const routes: Routes = [
    {
        path: '',
        component: BooksComponent,
        title: "Home Page"
    },
    {
        path: 'cart',
        component: CartComponent,
        title: "Cart"
    }
];
