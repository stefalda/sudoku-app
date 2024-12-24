import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LocalizedStringPipe } from 'src/app/pipes/localizedString.pipe';
import { ThemeService } from 'src/app/services/theme.service';
import { SudokuService } from '../../services/sudoku.service';
import { LevelDialogComponent } from '../level-dialog/level-dialog.component';

@Component({
  selector: 'app-controls',
  imports: [MatDialogModule, LocalizedStringPipe, AsyncPipe],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.css'
})
export class ControlsComponent {

  sudokuService = inject(SudokuService);
  themeService = inject(ThemeService);
  constructor(private dialog: MatDialog) {

  }

  reset() {
    this.sudokuService.resetGrid();
  }


  newGame() {
    this.openLevelDialog();
  }

  openLevelDialog() {
    const dialogRef = this.dialog.open(LevelDialogComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container',
      data: {} // Passa eventuali dati qui
    });

    dialogRef.afterClosed().subscribe(async (selectedLevel) => {
      if (selectedLevel) {
        await this.sudokuService.generateNewGame(selectedLevel);
      } else {
        console.log('Nessun livello selezionato');
      }
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}
