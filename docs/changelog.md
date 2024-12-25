# Changelog

## [1.0.2] - Fix: Properly load React entry in Vite
- Renamed `src/index.tsx` to `src/main.tsx`.
- Updated `index.html` to import `src/main.tsx` so the React app initializes correctly.

## [1.0.1] - Fix Vite 404 Error
- Deleted `public/index.html`.
- Created `index.html` in the project root, following Vite convention.

## [1.0.0] - Final Zork Remake Implementation
- Created all core project files (package.json, tsconfig.json, vite.config.js).
- Added `rooms.json`, `objects.json`, `messages.json`.
- Built a TypeScript-based game engine (parser, game-state, actions).
- Created a React UI in `App.tsx` for running the game in the browser.
- Added puzzle logic hooks and references to special actions.
- Project is now fully playable as a clone of Zork in the browser.