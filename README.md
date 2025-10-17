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
4. For GUI: `cd gui && npm install`.

## Usage

- CLI: `node cli/index.js <command>` (e.g., `node cli/index.js add "New task"`)
- GUI: `cd gui && npm start`

## Deployment

### GUI (React App)
1. Build the app: `cd gui && npm run build`
2. The production build is in `gui/build/`.
3. Deploy to a static hosting service:
   - **Vercel**: Install Vercel CLI (`npm i -g vercel`), run `vercel` in the root, follow prompts.
   - **Netlify**: Drag the `gui/build` folder to netlify.com/drop.
   - **GitHub Pages**: Use `gh-pages` package: `cd gui && npm i gh-pages --save-dev`, add `"homepage": "https://<username>.github.io/simple-task-manager"` to `gui/package.json`, then `npm run deploy`.
4. The app will be served from the build folder.

### CLI (Node.js)
1. To make it globally available: Publish as npm package or use `npx` with a published package.
2. For local use: Run directly with `node cli/index.js`.
3. Cross-platform: Tested on Windows (CMD/PowerShell) and Linux (Bash).

Note: Database (SQLite) is local; for production, consider cloud sync with MongoDB.

## Project Structure

- `cli/`: Node.js CLI code.
- `gui/`: React GUI application.
- `db/`: Database schemas and scripts.
- `shared/`: Common utilities.

## Contributing

Maintain modularity, clarity, and cross-platform compatibility.
removed some commits 
