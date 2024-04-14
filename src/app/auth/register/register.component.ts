import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterForm } from '../../types/auth';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form: RegisterForm = {
    email: "",
    password: "",
    cpassword: ""
  };
  
  constructor (private authService: AuthService) {}

  // Inside your component class
  togglePasswordVisibility() {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  };

  submit() {
    this.authService.register(this.form);
  }

  isLoading (): boolean {
    return this.authService.isLoading
  }

}
