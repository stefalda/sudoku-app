import { DifficultyLevel, Grid } from "../services/sudokuGenerator";

export class SudokuState {
  grid!: Grid;
  solvedGrid!: Grid;
  originalGrid!: Grid;
  elapsedTime!: number;
  errors!: number;
  level!: DifficultyLevel;
  constructor(options: { grid: Grid, solvedGrid: Grid, originalGrid: Grid, elapsedTime: number, errors: number, level: DifficultyLevel }) {
    this.grid = options.grid;
    this.solvedGrid = options.solvedGrid;
    this.originalGrid = options.originalGrid;
    this.elapsedTime = options.elapsedTime;
    this.errors = options.errors;
    this.level = options.level;
  }
}
