# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Vite dev server with HMR
npm run build    # production build to dist/
npm run preview  # serve the built dist/
npm run lint     # ESLint flat config; ignores dist/
```

No test framework is installed and there is no `test` script — there is currently no way
to run tests, single or otherwise. Don't invent one; if tests are needed, pick a runner
with the user first.

## Stack

React 19 + Vite 8, plain JSX (no TypeScript), ESM (`"type": "module"`). Vite config is
the default `@vitejs/plugin-react` setup with no path aliases.

**react-router v8: import from `react-router`, not `react-router-dom`.** Most docs and
examples still say `react-router-dom`; every import in this repo uses `react-router`,
and that is the correct path for v8. Match it.

## Routing

The router is split across two files:

- `src/main.jsx` — mounts the app and wraps `<App/>` in `<BrowserRouter>`.
- `src/App.jsx` — holds the `<Routes>` table. New routes are added here.

Current routes, one page component each under `src/pages/`:

| path             | component        |
| ---------------- | ---------------- |
| index (`/`)      | `HomePage`       |
| `calendar/month` | `MonthViewPage`  |
| `calendar/day`   | `DayViewPage`    |

There is no week view — `WeekViewPage.jsx` was removed in bf85330.

## Current state

The repo is close to bare scaffolding, so don't read intent into what's already there:

- `MonthViewPage` and `DayViewPage` are one-line placeholders; `HomePage` is a stub.
- `src/index.css` is empty — no styling approach (CSS modules, Tailwind, etc.) has been
  chosen yet.
- `public/icons.svg` (social-icon sprite) and `README.md` are unmodified Vite template
  leftovers, referenced by nothing in `src/`.
