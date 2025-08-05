import { Component, Input } from '@angular/core';
import { Branch } from '../../../models';

@Component({
  selector: 'app-branch-item',
  imports: [],
  templateUrl: './branch-item.html',
  styleUrl: './branch-item.css'
})
export class BranchItem {
  @Input() branch!: Branch;
}
