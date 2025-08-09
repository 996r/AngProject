// src/app/core/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User,RegisterUser } from '../../models';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:3000/api/auth';
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {
    
    this.token = localStorage.getItem('token');
  }

 
  register(userData: RegisterUser): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

 
  login(credentials: any): Observable<any> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          this.token = response.token;
          localStorage.setItem('token', response.token);
          this.router.navigate(['/printer-board']); 
        })
      );
  }


  logout(): void {
    this.token = null;
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

 
  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

 
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
