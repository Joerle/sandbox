# Drag and Drop Talent Order

A small, dependency-light (jQuery + native HTML5 Drag and Drop API) demo for organizing "talents" into Selected/Available columns, grouped by category and level.

## Files

- `order.html` - the page markup, styles, and all behavior (rendering, drag and drop, save/reset).
- `talents.js` - the talent data, exposed as a global `TALENTS` array and loaded via a `<script>` tag.
- `talents.json` - the same data in plain JSON form, kept for reference / possible use if served over HTTP.

## Running

Open `order.html` directly in a browser (double-click, or `file://...`). No build step or server required.

> **Why `talents.js` instead of `talents.json`?** Fetching a local `.json` file with `fetch`/`$.getJSON` from a `file://` URL is blocked by the browser's Same-Origin Policy (notably in Firefox). Loading data via a `<script src="talents.js">` tag is not subject to that restriction, so the same data is duplicated there as a JS variable (`TALENTS`) instead of being fetched at runtime. If you serve this folder over HTTP (e.g. VS Code's Live Server, `npx serve`, `python -m http.server`), you could switch back to fetching `talents.json` directly.

## How it works

- **Talents** are rendered from `TALENTS`, each with an `id`, `text`, `type` (`utility` or `infusion`), `level` (`one`/`two`/`three`), and a `default` column (`selected` or `available`).
- **Layout**: each type gets a group (`#utility`, `#infusion`) with a `Selected` and `Available` column, each split into three level sections.
- **Drag and drop**: talents can only be dropped into a `.level` section that matches their own `type` and `level`. Dragging is tracked in a JS variable rather than relying on `dataTransfer.getData()` during `dragover`, since browsers only expose the real payload on `dragstart`/`drop`.
- **Save**: the `Save` button snapshots which column each talent currently sits in and writes it to `localStorage`.
- **Reset**: the `Reset` button clears the saved state and re-renders the default layout from `TALENTS`.
- On page load, the default layout is rendered first, then any saved `localStorage` state is restored on top of it.
