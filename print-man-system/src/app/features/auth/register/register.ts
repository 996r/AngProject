import { Component } from '@angular/core';
import { AuthService } from '../../../core/services';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
 
  username: string = '';
  email: string = '';
  branch_code: string = '';
  password: string = '';
  rePassword: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  
  onRegister(formValue: any): void {
  
    if (formValue.password !== formValue.rePassword) {
      alert('Passwords do not match. Please try again.');
      return; 
    }
    
    this.authService.register({
      username: formValue.username,
      email: formValue.email,
      branch_code: formValue.branch_code,
      password: formValue.password
    }).subscribe({
      next: (response) => {
      
        alert('Registration successful! You can now log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
      
        alert('Registration failed. ' + (err.error?.message || 'Server error.'));
      }
    });
  }
}
