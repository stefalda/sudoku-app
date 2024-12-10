import { Component, inject } from '@angular/core';
import { SudokuService } from '../../services/sudoku.service';
import { GridCellComponent } from '../grid-cell/grid-cell.component';

@Component({
  selector: 'app-sudoku-grid',
  imports: [GridCellComponent],
  templateUrl: './sudoku-grid.component.html',
  styleUrl: './sudoku-grid.component.css'
})
export class SudokuGridComponent {

  sudokuService = inject(SudokuService);


}
