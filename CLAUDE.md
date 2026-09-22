# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The starter project for a Claude Code course. A React expense tracker that intentionally has a bug, poor UI, and messy code — meant to be fixed up over the course of the exercises. Don't "clean up" issues preemptively; they're likely the point of an upcoming exercise unless the user asks directly.

## Commands

```bash
npm install
npm run dev       # Vite dev server at http://localhost:5173
npm run build      # production build
npm run preview    # preview the production build
npm run lint        # eslint over the whole project
```

No test runner is configured.

## Architecture

Standard Vite + React (no router, no state management library, no backend). The entire app lives in one component:

- `src/App.jsx` — all state (transactions array, form fields, filters) and all logic (totals, filtering, add-transaction handler) live in this single component via `useState`. There is no data persistence — transactions reset on reload, seeded from a hardcoded array at the top of the component.
- `src/main.jsx` — standard React root mount, wraps `<App />` in `StrictMode`.
- Styling is plain CSS (`src/App.css`, `src/index.css`), no CSS framework.
