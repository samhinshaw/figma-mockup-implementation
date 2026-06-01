# Material Dashboard — Scaffold

A from-scratch front-end scaffold for recreating the **Dashboard** page of the
[Material Dashboard (shadcn) Figma template](https://www.figma.com/design/MCNCut8rdsckn4cK49tFfw/Material-Dashboard-Shadcn---Free-Admin-Template--Community---Copy-?node-id=93070-17).

This repo contains **no Dashboard implementation yet** — it is the wired-up,
verified foundation you build on. `pnpm dev` serves a minimal placeholder page
that proves the toolchain renders.

> Package manager: **pnpm** (not npm). Node **≥ 20** (developed on v24).

---

## Quick start

```bash
pnpm install
pnpm dev          # Vite dev server  → http://localhost:5173
```

Other scripts:

| Script                   | What it does                                            |
| ------------------------ | ------------------------------------------------------- |
| `pnpm dev`               | Start the Vite dev server                               |
| `pnpm build`             | Type-check (`tsc -b`) then production build with Vite   |
| `pnpm preview`           | Preview the production build                            |
| `pnpm lint`              | Run ESLint                                              |
| `pnpm format`            | Format with Prettier                                    |
| `pnpm codegen`           | Generate typed GraphQL operations (see GraphQL section) |
| `pnpm storybook`         | Run Storybook on port 6006                              |
| `pnpm build-storybook`   | Build the static Storybook                              |

---

## Tech stack

| Concern              | Choice                                                                 |
| -------------------- | --------------------------------------------------------------------- |
| Build / dev server   | **Vite 6** + `@vitejs/plugin-react`                                    |
| Language             | **TypeScript** (strict), `@/*` path alias → `src/*`                    |
| UI runtime           | **React 19**                                                          |
| Styling              | **Tailwind CSS v4** (via `@tailwindcss/vite`)                          |
| Component library    | **shadcn/ui** (`radix-nova` preset, neutral, CSS variables)           |
| Extra components     | **DiceUI** (composable shadcn-style data components)                   |
| Primitives           | **Radix UI** (`radix-ui` unified package)                              |
| Data fetching        | **TanStack Query** (React Query)                                       |
| GraphQL              | **graphql-request** client + **GraphQL Code Generator** (typed ops)   |
| Routing              | **TanStack Router**                                                   |
| Tables               | **TanStack Table**                                                    |
| Forms + validation   | **TanStack Form** + **Zod**                                            |
| Client state         | **Zustand**                                                          |
| Charts               | **Recharts** (shadcn charts) + **Visx** (custom viz)                  |
| Component workshop    | **Storybook** (react-vite builder)                                    |
| Linting / formatting  | **ESLint** + **Prettier**                                             |

Stack decisions (resolved with the requester):

- **dice/ui → DiceUI** (diceui.com) — installed alongside shadcn/ui.
- **Recharts + Visx** — both; Recharts for the standard dashboard charts,
  Visx kept available for bespoke visualizations.
- **GraphQL — tooling only** — no live backend. A sample `schema.graphql`
  lets `pnpm codegen` produce typed operations offline; point it at a real
  endpoint when one exists.
- **TanStack** — Router + Table + Form (React Query is "TanStack Query").

---

## Project structure

```
src/
  components/
    ui/          # shadcn/ui + DiceUI primitives (generated)
    charts/      # Recharts / Visx chart wrappers
    layout/      # app shell: sidebar, header
    dashboard/   # Dashboard-specific sections (hero, stat cards, table, charts)
  routes/        # TanStack Router route tree
  lib/           # cn() util, graphql client, query client
  graphql/       # .graphql operations + generated/ types
  stores/        # Zustand stores
  hooks/         # shared hooks
  styles/
    globals.css  # Tailwind v4 entry + theme tokens
  App.tsx        # placeholder page (replace during implementation)
  main.tsx       # React entry
components.json  # shadcn/ui config
codegen.ts       # GraphQL Code Generator config
.storybook/      # Storybook config
```

---

## The design being built

The Dashboard page (left sidebar + main content) is composed of:

- **Sidebar** navigation + **top bar**
- A **"Build Amazing Teams"** hero banner
- Three **stat cards** with mini bar charts (Website Views, Daily Sales, Completed Tasks)
- A **Projects** table — avatars, budget, completion progress bars
- **Sales Overview** area chart (`$87,982.80`)
- **User Activity** line chart
- **Traffic Sources** donut chart
- **Quarterly Performance** bar chart

Use the Figma dev-mode link in the design file to pull exact tokens/specs.

---

## How to start implementing

1. Add any missing shadcn primitives: `pnpm dlx shadcn@latest add <name>`.
2. Build the shell in `src/components/layout/` (sidebar + header), then mount it
   in a TanStack Router route under `src/routes/`.
3. Compose Dashboard sections in `src/components/dashboard/`, fed by
   TanStack Query hooks in `src/graphql/` (run `pnpm codegen` after writing
   `.graphql` operations).
4. Build charts in `src/components/charts/` with Recharts (or Visx).
5. Develop components in isolation with `pnpm storybook`.

---

## Setup log

Progress is committed incrementally. See git history for each step.

- **Base toolchain** — Vite 6, React 19, TypeScript (strict), `@/*` alias.
- **Tailwind CSS v4** — `@tailwindcss/vite`, `src/styles/globals.css`.
- **shadcn/ui** — `radix-nova` preset, neutral base, CSS variables; core
  components generated into `src/components/ui/`.
