import { JsonPipe } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { GameControlComponent } from './components/game-control/game-control.component';
import { GameDialogComponent } from './components/game-dialog/game-dialog.component';
import { HeaderComponent } from './components/header/header.component';
import { SudokuGridComponent } from './components/sudoku-grid/sudoku-grid.component';
import { SaveService } from './services/save.service';
import { StringsService } from './services/strings.service';
import { SudokuService } from './services/sudoku.service';

@Component({
  selector: 'app-root',
  imports: [SudokuGridComponent, HeaderComponent, JsonPipe, GameControlComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  sudokuService = inject(SudokuService);
  saveService = inject(SaveService);
  stringsService = inject(StringsService);
  dialog = inject(MatDialog);

  constructor() {
    effect(() => {
      const gameEnded = this.sudokuService.gameEnded();
      if (gameEnded) {
        this.dialog.open(GameDialogComponent, {
          data: {
            title: this.stringsService.getString('congratulations'),
            message: this.stringsService.getString('sudokuCompleted')
          }
        });
        return;
      }
    });
  }

  ngOnInit(): void {
    // Restore an existing game or start from scratch
    this.saveService.restore();
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
      this.dialog.open(GameDialogComponent, {
        data: {
          title: this.stringsService.getString('congratulations'),
          message: this.stringsService.getString('sudokuValid')
        }
      });
    } else {
      this.dialog.open(GameDialogComponent, {
        data: {
          title: this.stringsService.getString('error'),
          message: this.stringsService.getString('sudokuInvalid')
        }
      });
    }
  }
}
