import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridCellInputComponent } from './grid-cell-input.component';

describe('GridCellComponent', () => {
  let component: GridCellInputComponent;
  let fixture: ComponentFixture<GridCellInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridCellInputComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GridCellInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
