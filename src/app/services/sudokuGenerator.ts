import * as sudoku from "sudoku";
const DIFFICULTY_LEVELS = {
  EASY: 36,
  MEDIUM: 32,
  HARD: 28,
  VERY_HARD: 24,
  EXPERT: 20,
};

export type DifficultyLevel = keyof typeof DIFFICULTY_LEVELS;
export const difficultyLevelKeys: DifficultyLevel[] = Object.keys(DIFFICULTY_LEVELS) as DifficultyLevel[];


export type Grid = Array<Array<Cell>>;
export type CellValue = number;// 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export class Cell {
  constructor(public value: CellValue = 0) { }
  fixed = false;
  invalid = false;
  notes: Array<number> = [];
};


/**
 * Generates an empty 9x9 Sudoku grid.
 * @returns {number[][]} A 9x9 grid filled with zeros.
 */
function createEmptyGrid() {
  return Array.from({ length: 9 }, () => Array.from({ length: 9 }, () => new Cell(0)));
}

/**
 * Checks if placing a number at a specific location is valid.
 * @param {number[][]} grid - The current Sudoku grid.
 * @param {number} row - Row index.
 * @param {number} col - Column index.
 * @param {number} num - Number to check.
 * @returns {boolean} True if valid, otherwise false.
 */
function isValidPlacement(grid: Grid, row: number, col: number, num: number) {
  for (let i = 0; i < 9; i++) {
    if (grid[row][i].value === num || grid[i][col].value === num ||
      (grid[3 * Math.floor(row / 3) + Math.floor(i / 3)][3 * Math.floor(col / 3) + (i % 3)]).value === num) {
      return false;
    }
  }
  return true;
}

/**
 * Fills the grid with numbers using a backtracking algorithm.
 * @param {number[][]} grid - The Sudoku grid to fill.
 * @returns {boolean} True if solved, otherwise false.
 */
function fillGrid(grid: Grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col].value === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValidPlacement(grid, row, col, num)) {
            grid[row][col].value = num;
            if (fillGrid(grid)) {
              return true;
            }
            grid[row][col].value = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

/**
 * Removes numbers from the grid based on the difficulty level.
 * @param {number[][]} grid - The full Sudoku grid.
 * @param {number} clues - Number of clues to retain.
 */
function removeNumbers(grid: Grid, clues: number) {
  const positions = Array.from({ length: 81 }, (_, i) => [Math.floor(i / 9), i % 9]);
  for (let i = 0; i < 81 - clues; i++) {
    const randomIndex = Math.floor(Math.random() * positions.length);
    const [row, col] = positions.splice(randomIndex, 1)[0];
    grid[row][col].value = 0;
  }
}

function markFixedCells(grid: Grid) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      grid[row][col].fixed = grid[row][col].value !== 0;
    }
  }
}

/**
 * Checks if the given Sudoku grid has a unique solution.
 * @param {Grid} grid - The Sudoku grid to check.
 * @returns {boolean} True if the grid has a unique solution, otherwise false.
 */
function isUniqueSolution(grid: Grid): boolean {
  let solutions = 0;

  /**
   * Helper function to count the number of solutions.
   * @param {Grid} currentGrid - The current Sudoku grid.
   * @returns {boolean} True if more than one solution is found.
   */
  function solveWithCounter(currentGrid: Grid): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (currentGrid[row][col].value === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValidPlacement(currentGrid, row, col, num)) {
              currentGrid[row][col].value = num;
              if (solveWithCounter(currentGrid)) {
                return true; // Stop early if more than one solution is found.
              }
              currentGrid[row][col].value = 0;
            }
          }
          return false; // No valid number was found for this cell.
        }
      }
    }
    solutions++;
    return solutions > 1; // Stop if more than one solution is found.
  }

  // Make a deep copy of the grid to avoid modifying the original
  const gridCopy = grid.map(row => row.map(cell => new Cell(cell.value)));

  solveWithCounter(gridCopy);
  return solutions === 1;
}


/**
 * Generates a Sudoku puzzle based on the difficulty level.
 * DON'T USE IN REALTIME FOR > MEDIUM DIFFICULTIES (too slow)
 * @param {string} level - Difficulty level ("EASY", "MEDIUM", "HARD", "VERY_HARD", "EXPERT").
 * @returns {number[][]} A 9x9 Sudoku puzzle.
 */
export function generateSudoku(level: DifficultyLevel): { grid: Grid, solvedGrid: Grid } {
  let grid: Grid;
  let solvedGrid: Grid;
  do {
    grid = createEmptyGrid();
    fillGrid(grid);
    // Clone the grid
    solvedGrid = structuredClone(grid);
    const clues = DIFFICULTY_LEVELS[level] || DIFFICULTY_LEVELS.EASY;

    removeNumbers(grid, clues);
    // Check there's only one solution
  } while (!isUniqueSolution(grid));
  // Mark fixed cells
  markFixedCells(grid);
  return { grid, solvedGrid };
}


function convertDifficultyLevel(level: DifficultyLevel): string {
  switch (level) {
    case "EASY":
    case "MEDIUM":
    case "HARD":
      return level.toLowerCase();
    case "VERY_HARD":
      return "very-hard";
    case "EXPERT":
      return "insane";
  }
}

/**
 * Generate a sudoku using an external library
 * "quite" faster for more complex schemas...
 * @param level
 * @returns
 */
export function generateSudokuOptimized(level: DifficultyLevel) {
  const sudokuString = sudoku.generate(convertDifficultyLevel(level), true);
  const solvedSudokuString = sudoku.solve(sudokuString);
  const grid = convertBoardToGrid(sudokuString);
  const solvedGrid = convertBoardToGrid(solvedSudokuString);
  console.log(grid);
  return { grid, solvedGrid };
}

/**
 * Convert the string to a Grid
 * @param board
 * @returns
 */
function convertBoardToGrid(board: string): Grid {
  const grid = createEmptyGrid();
  let idx = 0;
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const val = board[idx];
      if (val !== '.') {
        grid[row][col].fixed = true;
        grid[row][col].value = parseInt(val);
      }
      idx++;
    }
  }
  return grid;
}
