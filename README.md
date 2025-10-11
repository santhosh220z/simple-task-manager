# Simple Task Manager

A lightweight, cross-platform task manager designed for developers working across Windows and Linux environments. Features both a CLI interface and a GUI dashboard, with modular architecture and offline sync capabilities.

## Features

- **CLI Interface**: Node.js-based, minimal and import-free for quick operations.
- **GUI Dashboard**: React-based with Tailwind CSS for a modern interface.
- **Database**: SQLite for local storage, with optional MongoDB sync.
- **Export/Import**: Support for JSON and CSV formats.
- **Cross-Platform**: Compatible with CMD/PowerShell and Bash.
- **Modular**: Easy to extend with plugins, notifications, calendar views, etc.

## Installation

1. Clone the repository.
2. Run `npm install` to install root dependencies.
3. For CLI: `npm run install-cli` (if any).
4. For GUI: `npm run install-gui`.

## Usage

- CLI: `npm run cli`
- GUI: `npm run gui`

## Project Structure

- `cli/`: Node.js CLI code.
- `gui/`: React GUI application.
- `db/`: Database schemas and scripts.
- `shared/`: Common utilities.

## Contributing

Maintain modularity, clarity, and cross-platform compatibility.
