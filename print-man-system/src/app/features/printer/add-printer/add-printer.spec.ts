import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPrinter } from './add-printer';

describe('AddPrinter', () => {
  let component: AddPrinter;
  let fixture: ComponentFixture<AddPrinter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPrinter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPrinter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
