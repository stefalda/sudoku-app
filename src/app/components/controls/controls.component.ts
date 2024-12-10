import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LevelDialogComponent } from '../../level-dialog/level-dialog.component';
import { SudokuService } from '../../services/sudoku.service';

@Component({
  selector: 'app-controls',
  imports: [MatDialogModule],
  templateUrl: './controls.component.html',
  styleUrl: './controls.component.css'
})
export class ControlsComponent {

  sudokuService = inject(SudokuService);

  constructor(private dialog: MatDialog) {

  }

  reset() {
    this.sudokuService.resetGrid();
  }


  newGame() {
    this.openLevelDialog();
    //this.sudokuService.generateNewGame();
  }

  openLevelDialog() {
    const dialogRef = this.dialog.open(LevelDialogComponent, {
      width: '400px',
      panelClass: 'custom-dialog-container',
      data: {} // Passa eventuali dati qui
    });

    dialogRef.afterClosed().subscribe((selectedLevel) => {
      if (selectedLevel) {
        this.sudokuService.generateNewGame(selectedLevel);
      } else {
        console.log('Nessun livello selezionato');
      }
    });
  }
}
