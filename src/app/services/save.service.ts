import { effect, inject, Injectable } from "@angular/core";
import { SudokuState } from "../models/sudoku_state";
import { SudokuService } from "./sudoku.service";

@Injectable({
  providedIn: 'root'
})
export class SaveService {
  sudokuService = inject(SudokuService);

  constructor() {
    // When the signal change...
    effect(() => {
      if (this.sudokuService.shouldSave()) {
        this.save();
      }
    })
  }

  save() {
    const state = new SudokuState({
      grid: this.sudokuService.grid(),
      solvedGrid: this.sudokuService.solvedGrid,
      originalGrid: this.sudokuService.originalGrid,
      elapsedTime: 0, // not yet supported,
      errors: this.sudokuService.errors(),
      level: this.sudokuService.difficulty
    });
    localStorage.setItem("sudoku_app_state", JSON.stringify(state));
    this.sudokuService.shouldSave.set(false);
  }

  async restore() {
    const savedState = localStorage.getItem("sudoku_app_state");
    if (!savedState) {
      await this.sudokuService.generateNewGame();
      return;
    }
    const state = JSON.parse(savedState);
    this.sudokuService.originalGrid = state.originalGrid;
    this.sudokuService.solvedGrid = state.solvedGrid;
    this.sudokuService.grid.set(state.grid);
    this.sudokuService.errors.set(state.errors);
    // elapsed
    this.sudokuService.difficulty = state.level;

  }
}
