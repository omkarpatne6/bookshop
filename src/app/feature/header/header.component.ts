import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../auth/auth.service';
import { getAuth } from 'firebase/auth';
import { SearchService } from '../search/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  route: any;
  userEmail: any = "";

  constructor(private router: Router, private authService: AuthService, private searchService: SearchService) {
    this.route = router;
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
