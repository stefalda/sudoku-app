import { Injectable, signal, WritableSignal } from '@angular/core';
import { Cell, DifficultyLevel, generateSudokuOptimized, Grid } from './sudokuGenerator';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {
  difficulty: DifficultyLevel = 'EASY';
  errors = signal(0);
  gameEnded = signal(false);
  shouldSave = signal(false);

  grid: WritableSignal<Grid> = signal({} as Grid);
  // Copies
  solvedGrid!: Grid;
  originalGrid!: Grid;

  selectedCell = signal<{ row: number, col: number } | null>(null);
  annotateEnabled = signal(false);
  isColorDisabled = signal(false);

  getSudoku(level: DifficultyLevel): { grid: Grid, solvedGrid: Grid } {
    return generateSudokuOptimized(level);
  }

  /**
   * Validates the Sudoku grid.
   * @param grid - The current Sudoku grid.
   * @returns True if valid, otherwise false.
   */
  isValidSudoku(grid: Grid): boolean {
    // Validate rows
    for (const row of grid) {
      if (!this.isValidGroup(row)) {
        return false;
      }
    }

    // Validate columns
    for (let col = 0; col < 9; col++) {
      const column = grid.map(row => row[col]);
      if (!this.isValidGroup(column)) {
        return false;
      }
    }

    // Validate 3x3 subgrids
    for (let boxRow = 0; boxRow < 3; boxRow++) {
      for (let boxCol = 0; boxCol < 3; boxCol++) {
        const subgrid: Cell[] = [];
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 3; col++) {
            subgrid.push(grid[boxRow * 3 + row][boxCol * 3 + col]);
          }
        }
        if (!this.isValidGroup(subgrid)) {
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Checks if a group of 9 numbers (row, column, or subgrid) is valid.
   * @param group - An array of 9 numbers.
   * @returns True if valid, otherwise false.
   */
  private isValidGroup(values: Cell[]): boolean {
    const group = values.map(cell => cell.invalid ? 0 : cell.value).filter(Boolean) as number[];
    const seen = new Set<number>();
    for (const num of group) {
      if (num === 0) continue;
      if (num < 1 || num > 9) {
        return false; // Invalid number
      }
      if (seen.has(num)) {
        return false; // Duplicate number
      }
      seen.add(num);
    }
    return true;
  }


  generateNewGame(difficulty?: DifficultyLevel) {
    if (difficulty) {
      this.difficulty = difficulty;
    }
    this.errors.set(0);
    this.gameEnded.set(false);
    const { grid, solvedGrid } = this.getSudoku(this.difficulty);
    this.solvedGrid = solvedGrid;
    this.originalGrid = structuredClone(grid);
    this.grid.set(grid);
    this.selectedCell.set(null);
    this.shouldSave.set(true);
  }



  resetGrid() {
    this.errors.set(0);
    this.grid.set(structuredClone(this.originalGrid));
    this.gameEnded.set(false);
    this.selectedCell.set(null);
    this.shouldSave.set(true);
  }

  generateError(value: number) {
    console.log(`Value ${value} cannot be written there!`);
    this.errors.update(errors => errors + 1);
  }

  isSameSquare(row1: number, col1: number, row2: number, col2: number) {
    // Calcola il quadrato di appartenenza dividendo riga e colonna per 3
    const square1Row = Math.floor(row1 / 3);
    const square1Col = Math.floor(col1 / 3);
    const square2Row = Math.floor(row2 / 3);
    const square2Col = Math.floor(col2 / 3);

    // Confronta se i quadrati sono uguali
    return square1Row === square2Row && square1Col === square2Col;
  }

  setCellValue(row: number, col: number, value: number) {
    // If we're in annotation mode toggle the annotation...
    if (this.annotateEnabled()) {
      return this.setAnnotationValue(row, col, value);
    }
    this.grid()[row][col].value = value;
    this.grid()[row][col].invalid = false;
    // Verify if the cell value is correct
    const clonedGrid = structuredClone(this.grid());

    //clonedGrid[currentCell.row][currentCell.col].value = parsedValue;
    if (!this.isValidSudoku(clonedGrid)) {
      this.grid()[row][col].invalid = true;
      this.generateError(value);
    } else {
      // Valid move -- check if it's ended
      if (this.isCompleted()) {
        this.gameEnded.set(true);
      }
    }
    this.shouldSave.set(true);

  }

  /**
   * Add or remove the annotation if already present
   * @param row
   * @param col
   * @param value
   * @returns
   */
  setAnnotationValue(row: number, col: number, value: number) {
    // Ignore 0
    if (!value) return;
    const annotations = this.grid()[row][col].notes;
    // Check if contains
    const index = annotations.indexOf(value);
    if (index === -1) {
      annotations.push(value); // Add the number if not present
    } else {
      annotations.splice(index, 1); // Remove the number if present
    }
    // Sort the annotations
    annotations.sort((a, b) => a - b);
    this.shouldSave.set(true);
  }

  /**
   * Check if all the cells are completed
   */
  isCompleted(): boolean {
    const grid = this.grid();
    const completed = true;
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col].value === 0) {
          return false;
        }
      }
    }
    return completed;
  }
}

