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
  

     this.authService.login(formValue).subscribe({
      next: (response) => {

         },
      error: (err) => {
        alert('Login failed. Please check your username and password.');
      }
    });
}
}
