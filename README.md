# Material Dashboard

A from-scratch front-end recreation of the **Dashboard** page of the
[Material Dashboard (shadcn) Figma template](https://www.figma.com/design/MCNCut8rdsckn4cK49tFfw/Material-Dashboard-Shadcn---Free-Admin-Template--Community---Copy-?node-id=93070-17).

The Dashboard is **fully implemented** — `pnpm dev` serves the complete page
(responsive app shell, hero banner, four stat cards, a projects table, and four
charts), responsive down to mobile with a slide-in nav drawer. The brief was
_~90% frontend_: every section is driven by **local mock data**, there is no
real API, and the sidebar links are placeholders. See
[The Dashboard](#the-dashboard) for the breakdown.

> Package manager: **pnpm** (not npm). Node **≥ 20** (developed on v24).

---

## Quick start

```bash
pnpm install
pnpm dev          # Vite dev server  → http://localhost:5173
```

Other scripts:

| Script                 | What it does                                            |
| ---------------------- | ------------------------------------------------------- |
| `pnpm dev`             | Start the Vite dev server                               |
| `pnpm build`           | Type-check (`tsc -b`) then production build with Vite   |
| `pnpm preview`         | Preview the production build                            |
| `pnpm lint`            | Run ESLint                                              |
| `pnpm format`          | Format with Prettier                                    |
| `pnpm codegen`         | Generate typed GraphQL operations (see GraphQL section) |
| `pnpm storybook`       | Run Storybook on port 6006                              |
| `pnpm build-storybook` | Build the static Storybook                              |

---

## Tech stack

| Concern              | Choice                                                              |
| -------------------- | ------------------------------------------------------------------- |
| Build / dev server   | **Vite 6** + `@vitejs/plugin-react`                                 |
| Language             | **TypeScript** (strict), `@/*` path alias → `src/*`                 |
| UI runtime           | **React 19**                                                        |
| Styling              | **Tailwind CSS v4** (via `@tailwindcss/vite`)                       |
| Component library    | **shadcn/ui** (`radix-nova` preset, neutral, CSS variables)         |
| Extra components     | **DiceUI** (composable shadcn-style data components)                |
| Primitives           | **Radix UI** (`radix-ui` unified package)                           |
| Data fetching        | **TanStack Query** (React Query)                                    |
| GraphQL              | **graphql-request** client + **GraphQL Code Generator** (typed ops) |
| Mock backend         | **MSW** (Mock Service Worker) — intercepts GraphQL in the browser   |
| Routing              | **TanStack Router**                                                 |
| Tables               | **TanStack Table**                                                  |
| Forms + validation   | **TanStack Form** + **Zod**                                         |
| Client state         | **Zustand**                                                         |
| Charts               | **Recharts** (shadcn charts) + **Visx** (custom viz)                |
| Avatars              | **DiceBear** (`personas`) — offline, deterministic SVG avatars      |
| Component workshop   | **Storybook** (react-vite builder)                                  |
| Linting / formatting | **ESLint** + **Prettier**                                           |

Stack decisions (resolved with the requester):

- **dice/ui → DiceUI** (diceui.com) — installed alongside shadcn/ui.
- **Recharts + Visx** — both; Recharts for the standard dashboard charts,
  Visx kept available for bespoke visualizations.
- **GraphQL — mocked, no live server** — a sample `schema.graphql` lets
  `pnpm codegen` produce typed operations offline, and **MSW** stands in for the
  backend so the real graphql-request → TanStack Query path runs end to end
  (genuine loading/error/refetch states) with no server. Point it at a real
  endpoint when one exists. See "Mock backend" below.
- **TanStack** — Router + Table + Form (React Query is "TanStack Query").

---

## Project structure

```
src/
  components/
    ui/             # shadcn/ui + DiceUI primitives (Button, Card, Table, Avatar, Chart, Checkbox, …)
    brand-logos.tsx # inline SVG brand marks (Figma/GitHub/Discord/Slack) for the projects table
    layout/         # app shell — app-shell.tsx, app-sidebar.tsx, page-footer.tsx
    dashboard/      # Dashboard sections — hero-card, stat-card + mini-bar-chart,
                    #   orders-overview-card, projects-table, the four *-chart components,
                    #   and the stat-cards-row / charts-grid composers
  data/             # FRONTEND mock layer (no real API):
                    #   types.ts (models) · mock.ts (fixtures) · queries.ts (TanStack Query hooks)
  routes/           # TanStack Router — __root.tsx wraps <AppShell>, index.tsx = the Dashboard page
  lib/              # cn() · format.ts (currency/number) · avatars.ts (DiceBear) · graphql client · query client
  graphql/          # .graphql operations + generated/ types — NOT used by the page (kept for a real API)
  mocks/            # MSW mock backend — NOT used by the page (kept for a real GraphQL API)
  stores/           # Zustand — ui.ts (sidebar drawer state)
  styles/
    globals.css     # Tailwind v4 entry + theme tokens + brand design tokens (from the Figma variables)
  main.tsx          # React entry (Query + Router providers)
  routeTree.gen.ts  # generated by the router plugin
components.json     # shadcn/ui config
codegen.ts          # GraphQL Code Generator config
eslint.config.js    # ESLint flat config
.storybook/         # Storybook config
```

> **Two data paths, deliberately.** The Dashboard renders from the simple
> `src/data/` mock layer (typed fixtures served through TanStack Query hooks with
> a small artificial latency, so loading skeletons are real). The
> `src/graphql/` + `src/mocks/` (MSW) scaffold is left intact but unused by the
> page — wire the sections to it when a real API exists.

---

## The Dashboard

The page (`src/routes/index.tsx`) renders inside a responsive **app shell**
(`components/layout/`): a sticky sidebar on desktop that collapses to a hamburger
+ slide-in drawer on mobile, with the content in a rounded white panel. Sections,
top to bottom:

| Section | Component | Notes |
| ------- | --------- | ----- |
| **Sidebar** | `app-sidebar.tsx` | Active **Dashboard** pill, nav groups, _Auth Pages_, Documentation — all dummy `#` links |
| **"Build Amazing Teams"** hero | `hero-card.tsx` | Dark grainy banner, glassy CTA, overlapping cluster of illustrated avatars |
| **Stat cards** ×3 | `stat-card.tsx` + `mini-bar-chart.tsx` | Website View / Daily Sales / Completed Tasks — 7-bar charts with one highlighted day |
| **Orders Overview** | `orders-overview-card.tsx` | List card (bell / cart items) + a green trend badge |
| **Projects** table | `projects-table.tsx` | Brand logos, member avatar groups, budget, team badges, completion bars, row selection + pagination |
| **Sales vs Expenses** | `sales-expenses-chart.tsx` | Area chart, `$87,982.80` headline |
| **User Activity** | `user-activity-chart.tsx` | Dual line chart |
| **Traffic Sources** | `traffic-sources-chart.tsx` | Donut chart |
| **Quarterly Performance** | `quarterly-performance-chart.tsx` | Grouped bar chart |

Charts use **Recharts** via the shadcn `chart` wrapper; entry animations are
disabled (the page has its own staggered section reveal). Colors, radii, fonts,
and the hero grain come from **design tokens** pulled out of the Figma variables
and added to `src/styles/globals.css` (`--brand-*`).

---

## How it works (architecture)

- **Mock data layer (`src/data/`).** `types.ts` defines the models, `mock.ts`
  holds the fixtures (mirroring the Figma content), and `queries.ts` exposes one
  TanStack Query hook per section (`useHero`, `useProjects`, `useSalesExpenses`,
  …). Each resolves its fixture after a short, slightly staggered delay so the
  loading → reveal experience is real. **Edit `mock.ts` to change what the page
  shows.**
- **Smart vs. presentational.** Section components (hero, charts, table, the
  rows) call their own query hook and render their own skeleton; small pieces
  (`stat-card`, `mini-bar-chart`, `orders-overview-card`, `brand-logos`) are pure
  props.
- **Avatars** are generated offline and deterministically with **DiceBear**
  (`@dicebear/*`, `personas` style) via `src/lib/avatars.ts` — same seed → same
  face, no network.
- **Develop components in isolation** with `pnpm storybook`.

---

## Setup log

Progress is committed incrementally. See git history for each step.

- **Base toolchain** — Vite 6, React 19, TypeScript (strict), `@/*` alias.
- **Tailwind CSS v4** — `@tailwindcss/vite`, `src/styles/globals.css`.
- **shadcn/ui** — `radix-nova` preset, neutral base, CSS variables; core
  components generated into `src/components/ui/`.
- **DiceUI** — added via its shadcn registry (`combobox` as a starter).
- **Data / state** — TanStack Query (provider in `main.tsx`), Zustand store
  (`src/stores/ui.ts`), Zod.
- **Routing** — TanStack Router (file-based via `@tanstack/router-plugin`).
  Routes live in `src/routes/`; `src/routeTree.gen.ts` is generated (committed).
  Router + Query devtools are mounted in dev only.
- **GraphQL** — graphql-request client (`src/lib/graphql.ts`) + GraphQL Code
  Generator (`codegen.ts`, client preset). Sample `schema.graphql` +
  `src/graphql/operations/dashboard.graphql` → `pnpm codegen` →
  `src/graphql/generated/`.
- **Mock backend (MSW)** — `src/mocks/` holds the in-browser mock that stands in
  for a real GraphQL server, so nothing else in the data layer changes:
  - `fixtures.ts` — canned data, typed as the generated `DashboardOverviewQuery`
    (so it can't drift from the schema). **Edit this to change what the app shows.**
  - `handlers.ts` — matches by GraphQL operation name and returns the fixture
    after a small `delay()` (makes loading states visible).
  - `browser.ts` — `setupWorker(...)`; `public/mockServiceWorker.js` is the
    generated Service Worker (regenerate with `npx msw init public/`).
  - Started by `enableMocking()` in `main.tsx`, gated on `VITE_ENABLE_MOCKS`
    (dynamic import keeps MSW out of production builds). The flag is set to
    `true` in the committed `.env.development`, so **`pnpm dev` serves mocked
    data out of the box**. Unset it (or override in `.env.local`) to talk to a
    real `VITE_GRAPHQL_ENDPOINT`. Add a query: write the operation → `pnpm
    codegen` → add one handler.
- **Tables / forms** — TanStack Table, TanStack Form (with Zod).
- **Charts** — shadcn `chart` (Recharts) component; Visx packages installed.
- **Lint / format** — ESLint flat config (typescript-eslint, react-hooks,
  react-refresh) + Prettier (with Tailwind class sorting). `pnpm lint` clean;
  `pnpm format` normalizes the tree.
- **Storybook** — Storybook 10, `@storybook/tanstack-react` framework, with the
  a11y + docs addons. Config in `.storybook/`; global styles are loaded in
  `preview.tsx` so stories are Tailwind-styled. Sample story at
  `src/components/ui/button.stories.tsx`. `pnpm build-storybook` verified.
  (The default init's Vitest + Playwright browser-test layer was removed to keep
  the scaffold lean — add it back with `pnpm dlx storybook add @storybook/addon-vitest`
  if you want component testing.)
- **Dashboard page** — the full Material-Shadcn Dashboard, recreated from Figma.
  - **Foundation** — `--brand-*` design tokens + hero grain in `globals.css`;
    `src/data/` mock layer (types + fixtures + per-section TanStack Query hooks);
    `lib/format.ts`, `lib/avatars.ts` (DiceBear); `components/brand-logos.tsx`;
    a `ui/checkbox.tsx` primitive.
  - **Sections** — `components/layout/` (responsive `app-shell` + `app-sidebar`
    + `page-footer`) and `components/dashboard/` (hero, stat cards, orders,
    projects table, four Recharts charts, and the `stat-cards-row` / `charts-grid`
    composers). `__root.tsx` mounts the shell; `index.tsx` composes the sections
    with a staggered entrance.
  - **Added dep** — `@dicebear/core` + `@dicebear/collection` for offline,
    deterministic avatars.
  - Verified: `pnpm exec tsc -b`, `pnpm lint` (0 warnings), and `pnpm build` all
    pass; spot-checked in the browser at desktop and mobile widths.
