import { Component, ElementRef, inject, input, viewChild } from '@angular/core';
import { SudokuService } from '../../services/sudoku.service';
import { Cell } from '../../services/sudokuGenerator';

@Component({
  selector: 'app-grid-cell',
  imports: [],
  templateUrl: './grid-cell.component.html',
  styleUrl: './grid-cell.component.css'
})
export class GridCellComponent {
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

  get isSelected() {
    const selectedCell = this.sudokuService.selectedCell();
    if (!selectedCell) return false;
    return this.rowIndex() == selectedCell.row && this.colIndex() == selectedCell.col;
  }

  get isInLine() {
    if (this.isSelected || this.sudokuService.isColorDisabled()) return false;
    const selectedCell = this.sudokuService.selectedCell();
    if (!selectedCell) return false;
    return this.rowIndex() == selectedCell.row || this.colIndex() == selectedCell.col ||
      this.sudokuService.isSameSquare(this.rowIndex(), this.colIndex(), selectedCell.row, selectedCell.col);
  }

  /**
   * Select the current cell for editing
   */
  select() {
    if (this.cell().fixed) {
      this.sudokuService.selectedCell.set(null);
      return;
    }
    this.sudokuService.selectedCell.set({ row: this.rowIndex(), col: this.colIndex() });
  }

}
