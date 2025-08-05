import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrinterItem } from './printer-item';

describe('PrinterItem', () => {
  let component: PrinterItem;
  let fixture: ComponentFixture<PrinterItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrinterItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrinterItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
