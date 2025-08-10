import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable,throwError } from "rxjs";
import { Printer } from "../../models";
import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class PrinterService {
  private apiUrl = 'http://localhost:3000/api/printers';
  
  constructor(private http: HttpClient, private authService: AuthService) { }

  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (!token) {
    
      throw new Error('Authentication token is missing.');
    }
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

    getAllPrinters(): Observable<Printer[]> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.get<Printer[]>(`${this.apiUrl}`, { headers: headers });
    } catch (error: any) {
    
      return throwError(() => new Error(error.message));
    }
  }

 
  createPrinter(printer: Printer): Observable<Printer> {
    try {
      const headers = this.getAuthHeaders();
      return this.http.post<Printer>(`${this.apiUrl}`, printer, {headers: headers });
    } catch (error: any) {
    
      return throwError(() => new Error(error.message));
    }
  }
}

  