# Sudoku App

A sleek and user-friendly Sudoku web application developed using Angular.
Challenge yourself with Sudoku puzzles of varying difficulty levels and track
your progress.

## Play

You can play it now here:

[https://stefalda.github.io/sudoku-app/](https://stefalda.github.io/sudoku-app/)

## Features

- **Responsive Design**: Fully responsive interface, optimized for desktop,
  tablet, and mobile devices.
- **Difficulty Levels**: Choose from Easy, Medium, Hard, and Expert puzzles.
- **Autosave**: Automatically saves your progress so you can resume anytime.

### Not yet implemented

- **Timer and Scoring**: Keep track of your solving time and improve your
  scores.
- **Hints System**: Get hints when you're stuck (optional).
- **Theming**: Light and Dark mode support for comfortable gameplay.
- **Validation**: Validate your moves in real-time or check the board's
  correctness when you're ready.

## Demo

[Add a link here if hosted online, e.g., via GitHub Pages or a hosting service.]

## Tech Stack

- **Frontend**: [Angular](https://angular.io/)
- **Components** [Angular Material UI](https://material.angular.io/)

- **Libraries** [Sudoku.js](https://github.com/robatron/sudoku.js/tree/master) -
  No more used, in favour of the library
  [qqwing](https://qqwing.com/download.html) exposed via web service.

## Installation and Setup

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 or higher recommended)
- [Angular CLI](https://angular.io/cli) (v17 or higher recommended)

### Steps to Run Locally

1. Clone this repository:
   ```bash
   git clone https://github.com/stefalda/sudoku-app.git
   cd sudoku-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   ng serve
   ```

4. Open the app in your browser:
   ```
   http://localhost:4200
   ```

### Production Build

To build the app for production:

```bash
ng build --prod
```

The production-ready files will be available in the `dist/` directory.

## Folder Structure

```plaintext
src/
├── app/
│   ├── components/         # Angular components
│   ├── services/           # Shared services (e.g., Sudoku logic, timer)
│   ├── models/             # Interfaces and models
│   ├── directives/         # Custom Angular directives 
|   └── lib/                # External libs, like the sudoku generator
├── assets/                 # Static files (images, puzzles)
├── environments/           # Environment configurations
├── styles.css              # Global styles
```

## Contribution

Contributions are welcome! If you'd like to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add a new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or suggestions, feel free to contact me at
[stefano.falda@gmail.com].
