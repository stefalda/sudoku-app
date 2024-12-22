import { Component, inject, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { SudokuService } from 'src/app/services/sudoku.service';
import { difficultyLevelKeys } from '../../services/sudokuGenerator';

@Component({
  selector: 'app-level-dialog',
  templateUrl: './level-dialog.component.html',
  styleUrls: ['./level-dialog.component.css'],
  imports: [MatDialogModule, MatButtonModule]
})
export class LevelDialogComponent {
  levels = difficultyLevelKeys;

  sudokuService = inject(SudokuService);

  constructor(
    public dialogRef: MatDialogRef<LevelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  selectLevel(level: string) {
    this.dialogRef.close(level); // Restituisce il livello selezionato
  }

  closeDialog() {
    this.dialogRef.close(); // Chiude il dialog senza selezione
  }

  getTranslatedLevel(level: string): string {
    return this.sudokuService.getTranslatedLevel(level);
  }
}
