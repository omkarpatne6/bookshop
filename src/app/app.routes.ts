import { Routes } from '@angular/router';
import { BooksComponent } from './feature/books/books.component';
import { CartComponent } from './feature/cart/cart.component';
import { BookDetailsComponent } from './feature/book-details/book-details.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { SellerComponent } from './feature/seller/seller.component';

export const routes: Routes = [
    {
        path: '',
        component: BooksComponent,
        title: "Home Page"
    },
    {
        path: 'cart',
        component: CartComponent,
        title: "Cart",
        canActivate: [AuthGuard]
    },
    {
        path: 'details/:id',
        component: BookDetailsComponent,
        title: "Details"
    },
    {
        path: 'login',
        component: LoginComponent,
        title: "Login",
    },
    {
        path: 'register',
        component: RegisterComponent,
        title: "Register",
    },
    {
        path: 'seller',
        component: SellerComponent,
        title: "Seller",
    }
];
