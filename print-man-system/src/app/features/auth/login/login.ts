import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router} from '@angular/router'


@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {
username: string = '';
password: string = '';

constructor(
    private authService: AuthService,
    private router: Router
  ) { }


onLogin(formValue: any){
    console.log('Form submited', formValue);

     this.authService.login(formValue).subscribe({
      next: (response) => {
      
        console.log('Login successful!', response);
     
      },
      error: (err) => {
      
        console.error('Login failed:', err);
       
        alert('Login failed. Please check your username and password.');
      }
    });
}
}
