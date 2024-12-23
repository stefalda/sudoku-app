# Sudoku Generator

A sudoku generator service that generates a sudoku board using the
[qqwing](https://qqwing.com/download.html) java library.

The service returns a JSON object with the following properties:

- `sudokuString`: a 2D array of strings representing the sudoku board
- `solutionString`: a 2D array of strings representing the solution to the
  sudoku board
- `level`: the level of the sudoku board (1-5)

The service is packed as a Docker container (sfalda/sudoku_generator) and is
accessible at `https://sudoku_generator.sfalda.com/`.

## Example

```
curl "https://sudoku_generator.sfalda.com/?level=2"

{
  "sudokuString":"....7.1.....9....2..7.6..9.9.5.3....3..7.6.4.....5...37.9..1.2......475....39.6..","solutionString":"894275136631948572257163498915432867328716945476859213769581324183624759542397681",
  "level":2}
```
