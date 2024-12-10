import { JsonPipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { GameControlComponent } from './components/game-control/game-control.component';
import { HeaderComponent } from './components/header/header.component';
import { SudokuGridComponent } from './components/sudoku-grid/sudoku-grid.component';
import { SudokuService } from './services/sudoku.service';

@Component({
  selector: 'app-root',
  imports: [SudokuGridComponent, HeaderComponent, JsonPipe, GameControlComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  sudokuService = inject(SudokuService);


  constructor() {
    effect(() => {
      const gameEnded = this.sudokuService.gameEnded();
      if (gameEnded) {
        alert("Congratulations! You've completed the sudoku");
        return;
      }
    });
  }

  ngOnInit(): void {
    this.generateNewGame();
  }

  generateNewGame() {
    this.sudokuService.generateNewGame();
  }

  resetGrid() {
    this.sudokuService.resetGrid();
  }

  validateGrid() {
    const grid = this.sudokuService.grid();
    if (!grid) return;
    if (this.sudokuService.isValidSudoku(grid)) {
      alert('Congratulations! The Sudoku is valid.');
    } else {
      alert('The Sudoku is invalid. Please check your entries.');
    }
  }

}
