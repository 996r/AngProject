import { Component, OnInit } from '@angular/core';
import { Printer } from '../../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrinterService } from '../../../core/services';
import { switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-printer',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './edit-printer.html',
  styleUrl: './edit-printer.css'
})
export class EditPrinter implements OnInit {
  printerForm: FormGroup;
  printerId: string | null = null;
  private apiBaseUrl = 'http://localhost:3000/api/printers';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private printerService: PrinterService // Assuming you have a service
  ) {
    this.printerForm = this.fb.group({
      _id: [''],
      model: ['', Validators.required],
      serialNumber: ['', Validators.required],
      address: ['', Validators.required],
      ipAddress: ['', [Validators.required, Validators.pattern(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/)]],
      macAddress: ['', Validators.required],
      totalCounter: [0, Validators.required],
      branch_code: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Get the printer ID from the URL
    this.route.paramMap.subscribe(params => {
      this.printerId = params.get('id');
      if (this.printerId) {
        this.loadPrinterData(this.printerId);
      }
    });
  }

  // Load the printer's existing data into the form
  loadPrinterData(id: string): void {
    this.printerService.getPrinterById(id).subscribe({
      next: (printer) => {
        // Use the patchValue method to set the form controls
        this.printerForm.patchValue(printer);
      },
      error: (err) => {
        console.error('Failed to load printer data', err);
        // Navigate back or show an error message
        this.router.navigate(['/printers']);
      }
    });
  }

  onSubmit(): void {
    if (this.printerForm.valid && this.printerId) {
      console.log('Attempting to update printer with ID:', this.printerId);
      
      // Use the service to make the PUT request
      this.printerService.updatePrinter(this.printerId, this.printerForm.value).subscribe({
        next: (updatedPrinter) => {
          console.log('Printer updated successfully', updatedPrinter);
          // Navigate back to the printer list
          this.router.navigate(['/printers']);
        },
        error: (err) => {
          console.error('Failed to update printer:', err);
          // Handle the error (e.g., show a user-friendly message)
        }
      });
    } else {
      console.error('Form is invalid or printer ID is missing.');
    }
  }
}
