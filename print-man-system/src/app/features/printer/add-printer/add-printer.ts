import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PrinterService,BranchService} from '../../../core/services';
import { Printer, Branch } from '../../../models';
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
  branches: Branch[] = [];
   isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private printerService: PrinterService,
    private branchService: BranchService, 
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

  ngOnInit(): void {
     this.isLoading = true;
    this.branchService.getAllBranches().subscribe({
      next: (branches) => {
         console.log('✅ Branches successfully fetched:', branches);
        this.branches = branches;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching branches:', error);
        this.errorMessage = 'Failed to load branches. Please try again.';
        this.isLoading = false;
      },
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
          this.router.navigate(['/printer-board']);
        },
        error: (error) => {
         
          this.errorMessage = 'Failed to create printer. Please try again.';
        },
      });
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }
}
