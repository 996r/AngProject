import { Component, OnDestroy, OnInit } from '@angular/core';
import { PrintersService } from '../../../core/services';
import { Printer } from '../../../models';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-printer-board',
  imports: [],
  templateUrl: './printer-board.html',
  styleUrl: './printer-board.css'
})
export class PrinterBoard implements OnInit, OnDestroy{
  subscriptions: Subscription [] = [];
  printer: Printer[] = [];
  constructor(private printerService: PrintersService){

  }
  ngOnInit(): void {
    this.subscriptions.push(
      this.printerService.getPrinters().subscribe((printer: Printer[]) => {
        this.printer = printer;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
