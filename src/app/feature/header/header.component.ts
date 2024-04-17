import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { getAuth } from 'firebase/auth';
import { SearchService } from '../search/search.service';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  route: any;
  userEmail: any = "";
  cartSize: any;

  constructor(private router: Router, private authService: AuthService, private searchService: SearchService, private cartService: CartService) {
    this.route = router;
  }

  ngOnInit(): void {
      this.cartSize = this.cartService.getSize();
  }

  isAuthenticated(): boolean {
    const isAuth = this.authService.isAuthenticated;
    
    return isAuth;
  }

  logout(): any {
    this.authService.logout();
  }

  toggleSearch(): void {
    this.searchService.toggleSearch();
  }
}
