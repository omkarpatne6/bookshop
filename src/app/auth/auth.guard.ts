import { Injectable } from '@angular/core';
import { CanActivate, GuardResult, MaybeAsync, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {
  }
  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    await this.authService.initAuthStateListener();

    if (this.authService.isAuthenticated) {
      return true;
    }
    // Redirect to login page
    this.router.navigate(['/login']);
    return false;

  }

}