import { Component, inject } from '@angular/core';
import { SudokuService } from '../../services/sudoku.service';

@Component({
  selector: 'app-game-control',
  imports: [],
  templateUrl: './game-control.component.html',
  styleUrl: './game-control.component.css'
})
export class GameControlComponent {
  sudokuService = inject(SudokuService);
  controls = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  get errors() {
    return this.sudokuService.errors();
  }

  get difficulty() {
    return this.sudokuService.difficulty;
  }

  click(value: number) {
    const currentCell = this.sudokuService.selectedCell();
    if (!currentCell) return;
    this.sudokuService.setCellValue(currentCell.row, currentCell.col, value);
  }

  toggleAnnotate() {
    this.sudokuService.annotateEnabled.set(!this.sudokuService.annotateEnabled());
  }


}
