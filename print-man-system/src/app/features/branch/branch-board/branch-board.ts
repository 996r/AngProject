import { Component, OnDestroy, OnInit } from '@angular/core';
import { BranchService } from '../../../core/services';
import { Branch } from '../../../models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-branch-board',
  imports: [],
  templateUrl: './branch-board.html',
  styleUrl: './branch-board.css'
})
export class BranchBoard implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  branch: Branch[] = [];
  constructor(private branchService: BranchService){
}
ngOnInit(): void {
  this.subscriptions.push(
    this.branchService.getBranches().subscribe((branch: Branch[]) => {
      this.branch = branch;
    })
  );
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
