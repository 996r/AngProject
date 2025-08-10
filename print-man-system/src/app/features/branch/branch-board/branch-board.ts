import { Component, OnDestroy, OnInit } from '@angular/core';
import { BranchService } from '../../../core/services';
import { Branch } from '../../../models';
import { Observable, catchError, startWith, of } from 'rxjs'; 
import { BranchItem } from '../branch-item/branch-item';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-branch-board',
  standalone: true,
  imports: [BranchItem, AsyncPipe],
  templateUrl: './branch-board.html',
  styleUrl: './branch-board.css',
})
export class BranchBoard implements OnInit {
  branches$!: Observable<Branch[]>;

  constructor(private branchService: BranchService) {}

  ngOnInit(): void {
    this.getAllBranches();
  }

  getAllBranches(): void {
    this.branches$ = this.branchService.getAllBranches().pipe(
      startWith([]),
      catchError((err) => {
        console.error('Error fetching branches:', err);

        return of([]);
      })
    );
  }
}
