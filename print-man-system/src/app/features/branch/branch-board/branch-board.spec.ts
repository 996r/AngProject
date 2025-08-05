import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchBoard } from './branch-board';

describe('BranchBoard', () => {
  let component: BranchBoard;
  let fixture: ComponentFixture<BranchBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
