import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchItem } from './branch-item';

describe('BranchItem', () => {
  let component: BranchItem;
  let fixture: ComponentFixture<BranchItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BranchItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BranchItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
