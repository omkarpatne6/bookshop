import { Injectable } from '@angular/core';
import { LoginForm, RegisterForm } from '../types/auth';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  route: any

  constructor(private router: Router) {
    this.route = router;
  }

  isAuthenticated: boolean = false;
  isLoading: boolean = false;

  login(form: LoginForm) {
    const auth = getAuth();
    this.isLoading = true;

    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;

        this.isAuthenticated = true;

        this.route.navigate(['/'])

        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

      }).finally(() => this.isLoading = false
      )

  }

  register(form: RegisterForm) {

    if (form.password !== form.cpassword) {
      alert("Confirm password does not match");
      return;
    }

    const auth = getAuth();
    this.isLoading = true;

    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        const user = userCredential.user;

        this.isAuthenticated = true;

        this.route.navigate(['/'])

        console.log(user)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log(errorCode, errorCode);
      }).finally (() => {
        this.isLoading = false;

      });

  }

  initAuthStateListener(): Promise<void> {
    return new Promise<void>((resolve) => {
      const auth = getAuth();
  
      // Check if user is already signed in
      if (auth.currentUser) {
        console.log('User is already signed in');
        this.isAuthenticated = true;
        resolve();
      }
  
      // Listen for auth state changes
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in.
          console.log('User is signed in');
          this.isAuthenticated = true;
        } else {
          // No user is signed in.
          console.log('No user is signed in');
          this.isAuthenticated = false;
        }
        resolve();
      });
    });
  }
  

  logout(): any {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log("user logged out successfully");
      alert("Logged out successfully");
      sessionStorage.clear();
      this.route.navigate(['/login']);
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }

  getEmail () {
    const auth = getAuth();

    return auth.currentUser?.email
  }
}
