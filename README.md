# Wyze Security System Builder

A single-page **e-commerce configurator**. A 4-step builder on the left lets a
shopper assemble a home-security system; a live "Your security system" review
panel on the right updates in real time. It also includes a dedicated
**product detail page** and a **checkout form** flow.

The catalog is served by a tiny **Express** backend (a local JSON file over
HTTP — no database), fetched with **React Query + Axios**, held in a single
**Zustand** store, and the shopper's selections persist to **localStorage**.

![Desktop design reference](design-reference/desktop.png)

> The image above is the **design reference** this app implements. Tablet and
> mobile references are in [`/design-reference`](design-reference); the app
> matches all three and stays coherent down to ~375px.

---

## Quick start (clean clone → running in ~1 min)

**Prerequisite:** Node.js **18+** (developed and verified on Node 24) and npm.

```bash
git clone <repository-url>
cd ecomexperts-assignment
npm install        # one install covers the frontend AND the backend
npm run dev        # starts the API and the web app together
```

Then open **http://localhost:5173**.

- `npm run dev` runs the Express API on **:5174** and the Vite app on **:5173**
  concurrently. The Vite dev server proxies `/api/*` to the backend, so there's
  no CORS setup and nothing else to configure.
- ⚠️ Open **:5173** (the app), not :5174 (that's only the data API — visiting
  its root just shows a pointer back to :5173).

### What to try (a 60-second tour for reviewers)

1. **Build a system** — expand the accordion steps; add cameras; pick a colour.
2. **Variant logic** — on *Wyze Cam Floodlight v2* add 2× **White**, then click
   **Black**: the card stepper resets to **0** (Black's count) while the review
   panel still lists **White ×2**. Add a Black and both appear as separate lines.
3. **Two-way sync** — change a quantity in the review panel; the matching card
   updates instantly, and vice-versa. The **total** recalculates live.
4. **Product page** — click **"Learn More"** on any card → `/product/:id`.
   Changing quantity/colour there stays in sync with the builder; **Back to
   builder** returns with everything intact.
5. **Checkout** — click **Checkout** in the review panel to open the checkout
   **form modal** (UI demo — submitting shows an order-confirmed screen).
6. **Save & restore** — click **"Save my system for later"**, reload the page,
   and your configuration is restored exactly.

---

## Scripts

| Script            | What it does                                       |
| ----------------- | -------------------------------------------------- |
| `npm run dev`     | API + web together (via `concurrently`)            |
| `npm run dev:web` | Vite app only (`:5173`)                            |
| `npm run dev:api` | Express API only (`:5174`)                         |
| `npm run build`   | Type-check (`tsc -b`) + production build to `dist` |
| `npm run preview` | Preview the production build                       |
| `npm run lint`    | ESLint (also enforces arrow-function style)        |
| `npm run format`  | Prettier write                                     |

---

## Tech stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4** via `@tailwindcss/vite` (`@import "tailwindcss";` — no
  `tailwind.config.js`)
- **React Router** — `/` (builder) and `/product/:productId` (detail page)
- **Zustand** — one store, the single source of truth (state + actions only)
- **TanStack Query (React Query)** + **Axios** — data fetching
- **Express** — minimal backend serving `data.json` (no database)
- **framer-motion** — tasteful animation, reduced-motion aware
- **lucide-react** icons · **ESLint + Prettier**

---

## Features

- **4-step accordion builder** — "STEP X OF 4" eyebrow, icon, title, an
  "_N_ selected" counter, and a "Next: …" button; step 1 open on load.
- **Data-driven product cards** — image, badge, description, "Learn More",
  colour chips, quantity stepper, and struck-through + active pricing.
- **Per-variant quantities** — each colour is tracked separately; the card's
  stepper is bound to the active variant; the review panel lists every variant
  with qty > 0 as its own line.
- **Live review panel** — grouped by Cameras / Sensors / Accessories / Plan,
  with its own steppers, shipping row, guarantee badge, financing line, total
  (pre-discount struck through), savings callout, checkout, and save-for-later.
- **Cents-based math** — `total = Σ(price×qty)`, `savings = preDiscount − total`;
  no floating-point drift.
- **Product detail page** — fetched from `GET /api/products/:id`, bound to the
  same store so it stays in sync; clean "not found" state on a bad id.
- **Checkout form modal** — accessible dialog with a full checkout form and an
  order-confirmed success state (UI only; no payment is processed).
- **Persistence** — explicit "Save my system for later" → versioned
  localStorage; restored on reload.
- **Responsive, accessible, animated** — desktop / tablet / mobile layouts,
  full keyboard + ARIA support, responsive skeletons, and motion that respects
  `prefers-reduced-motion`.

---

## Project structure

The Vite app lives at the root; the backend sits alongside in `/server`
(one `package.json`, one `npm install`). The frontend is **feature-based**.

```
server/
  data.json          # the catalog + seeded defaults (served over HTTP)
  index.mjs          # Express: /api/system, /api/products/:id (no database)
public/images/       # product images (referenced by the catalog by URL)
design-reference/    # desktop / tablet / mobile design targets
src/
  app/               # App (routes), BuilderPage, Providers, ErrorState
  api/               # typed fetch functions (system.ts, products.ts)
  lib/               # axios instance, queryClient
  hooks/             # generic shared hooks (useQuantity)
  components/        # shared UI: QuantityStepper, Modal, Skeleton, Badge,
                     #   Button, Pricing, StepIcon
  features/
    configurator/    # domain shared by every page
      store.ts            # zustand: catalog + selections + actions
      selectors.ts        # derived data (review lines, counts)
      pricing.ts          # pure cents math (totals, formatMoney)
      persistence.ts      # versioned localStorage (selections only)
      hooks.ts            # store-bound derived hooks
      useSystemQuery.ts   # React Query + store initialization
      configurator.types.ts
    builder/         # left column: AccordionStep, ProductCard, VariantSelector…
    review/          # right column: ReviewPanel, ReviewLineItem, CheckoutModal…
    product/         # /product/:id: ProductPage, ProductDetail, useProductQuery…
  styles/index.css   # Tailwind v4 @theme tokens + skeleton shimmer
```

---

## Backend & API (local JSON, no database)

A tiny Express server reads [`server/data.json`](server/data.json) and serves
it over HTTP. There is **no database**.

| Endpoint               | Purpose                                            |
| ---------------------- | -------------------------------------------------- |
| `GET /api/system`      | Full catalog (products, steps, UI config) + seed   |
| `GET /api/products/:id`| A single product; **404** when the id is unknown   |
| `GET /api/health`      | `{ ok: true }`                                      |

Product **images** are referenced by URL path (`/images/…`) and served from
`public/images/`, because the catalog is delivered as JSON (Vite `import` only
applies to bundled code, not backend JSON).

---

## Architecture notes

**Fetch + store + persistence (the crux of the data layer):**

1. The **catalog** always comes from `GET /api/system` via React Query.
2. `useSystemQuery` then initializes the Zustand store. If **saved selections
   exist in localStorage**, they **win** over the API's seeded defaults;
   otherwise the seed is used.
3. localStorage stores only the user's **selections**
   (`{ version, quantities, activeVariant, openStep }`) — never the catalog.
4. Loading / error / success are each handled explicitly (skeletons / retry /
   the UI).

**Logic / UI separation** — components render; logic lives in modules: pricing
math (`pricing.ts`), derived data (`selectors.ts`), persistence
(`persistence.ts`), and reusable behaviour in hooks. The store holds **state +
actions only**; nothing derived is stored.

**Accessibility** — accordion headers are real buttons with `aria-expanded` /
`aria-controls` and labelled `region`s (`inert` when collapsed); variant chips
are an arrow-key `radiogroup`; steppers are labelled buttons with an
`aria-live` value and an announced order total; the checkout modal is a
focus-trapped `role="dialog"` with ESC/backdrop close and restored focus.
Visible focus rings throughout; real image `alt` text.

**Performance** — primitive-returning Zustand selectors + `React.memo` on
`ProductCard` / `ReviewLineItem` mean a single quantity change re-renders only
the affected card/line (verify with the React DevTools Profiler). Explicit
image dimensions + `loading="lazy"` avoid layout shift.

**Animation** — accordion, selected-card border, quantity/total flips, review
list add/remove, modal, and skeleton shimmer — all gated by
`prefers-reduced-motion` (`<MotionConfig reducedMotion="user">` + a global CSS
reduced-motion rule).

---

## Production build (single origin, optional)

```bash
npm run build               # outputs dist/
node server/index.mjs       # serves the built app AND the API on :5174
```

When a `dist/` build is present, the Express server also serves the compiled
frontend (with SPA fallback) — so the whole app runs from a single origin on
`:5174`. In development just use `npm run dev` (Vite on :5173).

---

## Notes, decisions & tradeoffs

- **No database** — the backend serves a local `data.json` over HTTP, by design.
- **Pan v3 pricing** — the design references are internally inconsistent for
  this product (card $39.98→$34.98 vs. review $57.98→$47.98 at qty 2). Since
  cards and the review share one store key (one unit price), the unit price was
  chosen to reproduce the headline figures exactly: total **$187.89**,
  pre-discount **$238.81**, savings **$50.92**.
- **Checkout is UI only** — the form has HTML-level validation (`required`,
  field types, `autocomplete`) but no JS validation/formatting and submits
  nowhere; it flips to a confirmation screen. Ready to wire to a real endpoint.
- **Deep-linking** `/product/:id` directly (not via the builder) triggers the
  `/api/system` fetch as well, so the store is initialized for sync/persistence;
  navigating from the builder uses the cached result.
- A few review-panel thumbnails for products not provided as standalone assets
  are clean SVG/rendered stand-ins rather than placeholders.

---

## Requirements coverage

- [x] Local `data.json` served over HTTP by Express; **no database**
- [x] Clean clone runs both processes with `npm install` + `npm run dev`
- [x] Data fetched via React Query + Axios; loading / error / success handled
- [x] Saved localStorage selections win over API defaults; catalog from API
- [x] Per-variant quantities; add 2× then switch colour → stepper 0, review keeps the first colour
- [x] Review ↔ card stepper sync; live, cents-based totals & savings
- [x] "N selected" counts distinct products per step
- [x] Save → reload → exact restoration (versioned payload)
- [x] Product detail page from `GET /api/products/:id`; clean 404 / not-found
- [x] Checkout opens an accessible form modal with a success state
- [x] Feature-based `src`; logic outside components; arrow functions (ESLint-enforced)
- [x] Keyboard + ARIA on accordion, chips, steppers, dialog; changes announced
- [x] Responsive skeletons (no layout shift); animations respect reduced motion
- [x] Matches desktop / tablet / mobile references; coherent down to ~375px
```
