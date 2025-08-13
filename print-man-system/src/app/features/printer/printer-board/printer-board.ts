import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrinterService} from '../../../core/services/';
import { Printer } from '../../../models';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PrinterItem } from '../printer-item/printer-item';
import { Observable, catchError, startWith, of } from 'rxjs'; // Import necessary RxJS operators
import { AsyncPipe, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-printer-board',
  standalone: true,
  imports: [PrinterItem, AsyncPipe, CommonModule],
  templateUrl: './printer-board.html',
  styleUrl: './printer-board.css'
})
export class PrinterBoard implements OnInit {
  
  
  printers$!: Observable<Printer[]>;
    selectedPrinters: Set<string> = new Set();


  constructor(private router: Router,private printerService: PrinterService) {}

  ngOnInit(): void {
  
    this.getAllPrinters();
  }

   isSelected(id: string): boolean {
    return this.selectedPrinters.has(id);
  }
 
  getAllPrinters(): void {
    this.printers$ = this.printerService.getAllPrinters().pipe(
   startWith([]),
      catchError((err) => {
       return of([]);
      })
    );
  }

   onSelectedChange(id: string, isChecked: boolean): void {
    if (isChecked) {
      this.selectedPrinters.add(id);
    } else {
      this.selectedPrinters.delete(id);
    }
  }

  onEditPrinter(printerId: string): void {
   
    this.router.navigate(['/edit-printer', printerId]);
  }

   onDeletePrinter(printerId: string): void {
    if (printerId) {
      
      this.printerService.deletePrinter(printerId).subscribe({
        next: () => {
         
          this.getAllPrinters(); 
        },
        error: (error) => console.error('Error deleting printer:', error) });
    } else {
      
    }
  }
  
}
