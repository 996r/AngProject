import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PrinterService } from '../../../core/services';
import { Printer } from '../../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-printer',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-printer.html',
  styleUrl: './add-printer.css',
})
export class AddPrinter {
  printerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private printerService: PrinterService,
    private router: Router
  ) {
    this.printerForm = this.fb.group({
      model: ['', Validators.required],
      serialNumber: ['', Validators.required],
      address: ['', Validators.required],
      ipAddress: ['', Validators.required],
      macAddress: ['', Validators.required],
      totalCounter: [0, Validators.required],
      branch_code: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.printerForm.valid) {
      const newPrinter: Printer = {
        ...this.printerForm.value,
        branch: [],
        totalCounter: Number(this.printerForm.value.totalCounter),
      };

      this.printerService.createPrinter(newPrinter).subscribe({
        next: (response) => {
          console.log('Printer created successfully', response);
          this.router.navigate(['/printer-board']);
        },
        error: (error) => {
          console.error('Error creating printer', error);
          this.errorMessage = 'Failed to create printer. Please try again.';
        },
      });
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }
}
