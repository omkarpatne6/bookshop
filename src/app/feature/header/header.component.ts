import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  route: any;

  constructor(private router: Router, private authService: AuthService) {
    this.route = router;
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  logout (): any {
    this.authService.logout();
  }
 

}
