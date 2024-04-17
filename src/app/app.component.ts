import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { FeatureModule } from './feature/feature.module';
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../firebase.config';
import { HeaderComponent } from "./feature/header/header.component";
import { AuthModule } from './auth/auth.module';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { data } from './data/books.js';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [RouterOutlet, FeatureModule, RouterModule, RouterLink, RouterLinkActive, HeaderComponent, AuthModule, NgIf]
})
export class AppComponent implements OnInit {
  title = 'assignment1';

  route: any = Router;

  books: any;

  constructor(private authService: AuthService) {
    this.books = data;
   };

  ngOnInit(): void {
    const storedBooks = JSON.parse(localStorage.getItem("myArray") as string);
    if (!storedBooks) {
      localStorage.setItem('myArray', JSON.stringify(this.books));
    }

    initializeApp(firebaseConfig);
    this.authService.initAuthStateListener();
  }
}
