import { Component, inject } from '@angular/core';
import { SudokuService } from '../../services/sudoku.service';
import { LocalizedStringPipe } from 'src/app/pipes/localizedString.pipe';

@Component({
  selector: 'app-game-control',
  imports: [LocalizedStringPipe],
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
    return this.sudokuService.getTranslatedLevel(this.sudokuService.difficulty);
  }

  isClickable(value: number) {
    return !this.sudokuService.isValueCompleted(value);
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
