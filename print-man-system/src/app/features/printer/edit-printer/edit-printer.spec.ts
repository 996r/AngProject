import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrinter } from './edit-printer';

describe('EditPrinter', () => {
  let component: EditPrinter;
  let fixture: ComponentFixture<EditPrinter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditPrinter]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPrinter);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
