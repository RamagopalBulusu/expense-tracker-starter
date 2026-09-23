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

Standard Vite + React (no router, no state management library, no backend). No data persistence — transactions reset on reload, seeded from a hardcoded array in `App.jsx`.

- `src/App.jsx` — owns the `transactions` array (the only piece of state lifted above the leaf components) and passes it down along with `handleAddTransaction`/`handleDeleteTransaction`.
- `src/Summary.jsx` — derives income/expense/balance totals from `transactions` via `.filter`/`.reduce`. Purely presentational, no local state.
- `src/TransactionForm.jsx` — owns its own form-field state (`description`, `amount`, `type`, `category`) and calls `onAddTransaction` on submit.
- `src/TransactionList.jsx` — owns its own filter state (`filterType`, `filterCategory`) and renders the filtered table, calling `onDeleteTransaction` per row.
- `src/main.jsx` — standard React root mount, wraps `<App />` in `StrictMode`.
- Styling is plain CSS (`src/App.css`, `src/index.css`), no CSS framework.
