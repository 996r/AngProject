import { Component, OnInit } from '@angular/core';
import { Printer } from '../../../models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PrinterService } from '../../../core/services';
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
  
    this.route.paramMap.subscribe(params => {
      this.printerId = params.get('id');
      if (this.printerId) {
        this.loadPrinterData(this.printerId);
      }
    });
  }

  
  loadPrinterData(id: string): void {
    this.printerService.getPrinterById(id).subscribe({
      next: (printer) => {
       
        this.printerForm.patchValue(printer);
      },
      error: (err) => {
       
        this.router.navigate(['/printer-board']);
      }
    });
  }

  onSubmit(): void {
    if (this.printerForm.valid && this.printerId) {
     
      this.printerService.updatePrinter(this.printerId, this.printerForm.value).subscribe({
        next: (updatedPrinter) => {
            this.router.navigate(['/printer-board']);
        },
        error: (err) => {
         
        }
      });
    } else {
    
    }
  }
}
