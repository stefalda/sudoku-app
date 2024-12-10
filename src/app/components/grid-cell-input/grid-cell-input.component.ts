import { Component, ElementRef, inject, input, output, viewChild } from '@angular/core';
import { NumberRestricDirective } from '../../directives/number.Restrict.directive';
import { SudokuService } from '../../services/sudoku.service';
import { Cell } from '../../services/sudokuGenerator';

@Component({
  selector: 'app-grid-cell-input',
  imports: [NumberRestricDirective],
  templateUrl: './grid-cell-input.component.html',
  styleUrl: './grid-cell-input.component.css'
})
export class GridCellInputComponent {
  sudokuService = inject(SudokuService);
  cell = input.required<Cell>();
  colIndex = input.required<number>();
  rowIndex = input.required<number>();

  inputText = viewChild<ElementRef>('thisCell');

  get verticalBorder() {
    return (this.colIndex() == 3 || this.colIndex() == 6);
  }

  get horizontalBorder() {
    return (this.rowIndex() == 2 || this.rowIndex() == 5);
  }



  updateCell = output<{ row: number, col: number, value: string }>();

  onUpdateCell(value: string) {
    let parsedValue = parseInt(value, 10);
    if (isNaN(parsedValue)) { parsedValue = 0 };
    // Clone the grid and check if the value can be used
    const clonedGrid = this.sudokuService.grid().slice();
    clonedGrid[this.rowIndex()][this.colIndex()].value = parsedValue;
    if (!this.sudokuService.isValidSudoku(clonedGrid)) {
      this.sudokuService.grid()[this.rowIndex()][this.colIndex()].value = 0;
      // Reset the cell content
      this.inputText()!.nativeElement.value = "";
      this.sudokuService.generateError(parsedValue);
    } else {
      this.updateCell.emit({ row: this.rowIndex(), col: this.colIndex(), value });
    }
  }
}
