import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterBoard } from './printer-board';

describe('PrinterBoard', () => {
  let component: PrinterBoard;
  let fixture: ComponentFixture<PrinterBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrinterBoard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrinterBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
