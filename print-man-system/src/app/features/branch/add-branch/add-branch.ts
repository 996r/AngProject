import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchService } from '../../../core/services';
import { Router } from '@angular/router';
import { Branch } from '../../../models';

@Component({
  selector: 'app-add-branch',
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-branch.html',
  styleUrl: './add-branch.css',
})
export class AddBranch {
  branchForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private branchService: BranchService,
    private router: Router
  ) {
    this.branchForm = this.fb.group({
      branch_name: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      branch_code: ['', Validators.required],
      numberOfPrinters: [0, Validators.required],
      numberOfPeoples: [0, Validators.required],
    });
  }

  onSubmit(): void {
    if (this.branchForm.valid) {
      const newBranch: Branch = {
        ...this.branchForm.value,

        numberOfPrinters: Number(this.branchForm.value.numberOfPrinters),
      };

      this.branchService.createBranch(newBranch).subscribe({
        next: (response) => {
          console.log('Branch created successfully', response);

          this.router.navigate(['/branch-board']);
        },
        error: (error) => {
          console.error('Error creating branch', error);
          this.errorMessage = 'Failed to create brach. Please try again.';
        },
      });
    } else {
      this.errorMessage = 'Please fill out all required fields correctly.';
    }
  }
}
