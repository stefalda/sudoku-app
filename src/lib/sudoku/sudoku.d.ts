declare module "sudoku" {
  export const DIFFICULTY: any;

  export function generate(difficulty: string, unique?: boolean): string;
  export function solve(board: string, reverse?: boolean): string;
  export function board_string_to_grid(board: string): Array<Array<string>>;
  export function board_grid_to_string(board: Array<Array<string>>): string;
  export function get_candidates(board: string): Array<Array<string>>;

}
