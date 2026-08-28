# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working style

These rules override the default "just do it" behavior. They apply to every task in this
repo unless the user explicitly says to skip them for a given task.

### Explain what and why

Before any file edit, file creation, file deletion, or command you ask the user to run,
state:

- **What** — the concrete change, named per file: which file, what goes in it.
- **Why** — what the change accomplishes and why it's needed *now*, in this step.

This applies to config files, `package.json`, and one-line changes too. "Obvious" edits
are exactly the ones that get skipped over, and they're where silent assumptions hide.

Never justify a change with only its own restatement ("adding a CalendarGrid component so
the app has a CalendarGrid component"). The why should connect to something the user
wants.

### Work in small increments

Break work into logical steps and **stop after each one for approval before writing any
code**. A step is a group of tightly related edits that only make sense together — for
example, creating a component *and* wiring it into the page that renders it. Unrelated
work belongs in a separate step.

At each pause:

1. Say which step this is out of how many (`Step 2 of 4: …`).
2. List every file the step touches, each with its own what/why.
3. Name any command the user will need to run, and why.
4. Stop. Wait for the user to ask questions or say go.

Do not implement step N+1 while presenting step N. If a step turns out to be bigger than
described once you start, stop and re-present it rather than expanding it silently.

Read-only exploration (reading files, grep, `git log`) does not need a pause — do it
freely to inform the step you're about to propose.

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
