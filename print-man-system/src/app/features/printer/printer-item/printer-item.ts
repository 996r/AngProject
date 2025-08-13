import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Printer } from '../../../models';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-printer-item',
  imports: [RouterLink],
  templateUrl: './printer-item.html',
  styleUrl: './printer-item.css'
})
export class PrinterItem {
 @Input () printer!: Printer;
 @Input() isSelected: boolean = false;
 @Output() selectedChange = new EventEmitter<boolean>();
 @Output() editClicked = new EventEmitter<string>();
 @Output() deleteClicked = new EventEmitter<string>(); 

 constructor(private router: Router) { }

 

onCheckboxChange(event: any): void {
    const isChecked = event.target.checked;
    this.selectedChange.emit(isChecked);
  }

onEditClick(): void {
    if (this.printer && this.printer._id) {
          this.editClicked.emit(this.printer._id.toString());
    } else {
     
    }
}

onDeleteClick(): void {
    if (this.printer && this.printer._id) {
        this.deleteClicked.emit(this.printer._id.toString());
    } else {
      
    }
  }
}
