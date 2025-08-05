import { Component, Input } from '@angular/core';
import { Printer } from '../../../models';

@Component({
  selector: 'app-printer-item',
  imports: [],
  templateUrl: './printer-item.html',
  styleUrl: './printer-item.css'
})
export class PrinterItem {
 @Input () printer!: Printer;
}
