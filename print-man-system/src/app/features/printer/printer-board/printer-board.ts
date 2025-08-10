import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrinterService} from '../../../core/services/';
import { Printer } from '../../../models';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PrinterItem } from '../printer-item/printer-item';
import { Observable, catchError, startWith, of } from 'rxjs'; // Import necessary RxJS operators
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-printer-board',
  standalone: true,
  imports: [PrinterItem, AsyncPipe],
  templateUrl: './printer-board.html',
  styleUrl: './printer-board.css'
})
export class PrinterBoard implements OnInit {
  
  
  printers$!: Observable<Printer[]>;


  constructor(private printerService: PrinterService) {}

  ngOnInit(): void {
  
    this.getAllPrinters();
  }

 
  getAllPrinters(): void {
    this.printers$ = this.printerService.getAllPrinters().pipe(
   startWith([]),
      catchError((err) => {
        console.error('Error fetching printers:', err);
      
        return of([]);
      })
    );
  }
}
