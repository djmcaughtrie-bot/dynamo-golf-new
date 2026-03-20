# UI/UX Overhaul — Design Spec
**Date:** 2026-03-20
**Approach:** B — Colour + Structure Overhaul
**Scope:** `index.html`, `css/styles.css`, `js/app.js`

---

## Goals

1. Fix structural HTML bugs that break semantics and scroll behaviour
2. Make the Aston Villa colour identity obvious and intentional — not just a thin border accent
3. Create clear visual rhythm between the 11 sections
4. Add a working responsive navigation with active section indicator
5. Keep all feature logic (JS data, interactive modules) untouched

---

## 1. HTML Structure Fixes

**Problem:** `</main>` closes after the Short Game section (line 119). Nine sections (Putting, Bunker, Swing Faults, Strategy, Rules, Routine, Practice, Excuses) are outside `<main>`. The Excuses section is rendered after `</footer>`.

**Fix:**
- Remove the premature `</main>` after Short Game
- Move `</main>` to close after the Practice section (last content section before the shot panel)
- Move the Excuses section inside `<main>`, before `</main>`
- Footer becomes the final element in `<body>` (after `</main>` and the shot panel/modal overlays)

No visual change — correctness and semantics only.

---

## 2. Navigation

### Desktop
- Reduce nav link `gap` from `2.5rem` to `1.25rem`
- Bump nav link `font-size` from `0.68rem` to `0.7rem`
- Active section indicator: replace the current hairline `::after` with a `4px × 4px` claret circle dot centred below the active link
- Wire an `IntersectionObserver` in `app.js` that watches each `<section>` with `threshold: 0.35` and sets `data-active` on the matching nav `<a>` (removing it from others). This replaces the non-functional current implementation.
- Brand (logo + "Golf App") stays left; links stay right

### Mobile (≤768px)
- Hide the `nav ul` link list
- Show a hamburger button (☰) top-right — `32×32px`, no bg, claret icon colour
- On open:
  - Full-screen overlay (`position: fixed; inset: 0; z-index: 200; background: rgba(11,8,18,0.97); backdrop-filter: blur(12px)`)
  - Links stacked vertically, centred, Cormorant Garamond `2rem`, `letter-spacing: 2px`
  - Close button (✕) top-right in same position as hamburger
  - Tap a link or tap outside to close
  - Body scroll locked while open (`overflow: hidden` on `body`)
- Hamburger/close button uses a single `<button id="navToggle">` that toggles between ☰ and ✕

---

## 3. Colour Story

### Section alternation
Sections alternate between two backgrounds to create scroll rhythm:

| Sections (by order) | Background |
|---|---|
| Shots, Putting, Swing Faults, Rules, Practice | `--bg: #0B0812` (existing) |
| Short Game, Bunker, Strategy, Routine, Excuses | `--bg-alt: #0F0618` (new — warm purple-claret tint) |

Hero stays on `--bg`. Implementation: add `class="alt-section"` to the even sections in HTML, add `section.alt-section { background: var(--bg-alt); }` in CSS.

### Section header accent bar
Each section header gets a left-anchored vertical accent: a `3px × 56px` claret bar (`background: var(--claret)`) on the left of the `h2`. This replaces the current `.section-rule` (a faint horizontal line positioned absolute-right that is barely visible).

Implementation: remove `.section-rule` elements from HTML and the `.section-rule` CSS rule. Add a `::before` pseudo-element on `.shots-header h2, .sg-header h2, .strategy-header h2` etc. that draws the bar.

### Colour role assignments

**Claret `#95003A`** — identity and primary actions:
- Section accent bars
- Active nav dot
- Active filter tab background
- Card top borders (shape category, default)
- CTA buttons (existing, keep)
- Shot panel left-border accent (existing, keep)

**Sky blue `#3D7CC9`** — interactive and informational:
- Ghost button hover border (existing, keep)
- Control category cards and badges (existing, keep)
- Focus rings on all interactive elements (`outline: 2px solid var(--blue-mid)`)
- Hover state on nav links changes from `var(--text)` to `var(--blue)` (subtle upgrade)

**Gold `#C8A95A`** — highlights and callouts:
- Watch Out warning panels in shot detail (change from claret-tinted to gold-tinted: `background: rgba(200,169,90,0.06); border-color: rgba(200,169,90,0.2)`)
- `.watchout-label` colour changes from `var(--claret-light)` to `var(--gold)`
- Routine completion screen (already gold — keep)
- Short game category badges (existing, keep)

### Hero updates
- Ghost text `-webkit-text-stroke` opacity: `0.08` → `0.13` (more present)
- Left radial glow: opacity `0.7` → `0.85`
- Subtitle text: *"Shot library. Short game. Strategy. Rules. Practice plans. Everything you need on the course."*
- Hero pills: `11 sections · AI practice · 14 shots`

---

## 4. Typography

- All labels currently at `0.58rem` bumped to `0.68rem`
- `.section-tag` bumped from `0.65rem` to `0.7rem`
- `.watchout-label`, `.thought-label`, `.panel-section-title`, `.rc-when-label`, `.dt-result-label` all bumped from `0.58rem` to `0.68rem`
- No changes to display/heading sizes

---

## 5. Section Rhythm and Spacing

- Normalise all section `padding` to `7rem 2rem` top/bottom (currently varies: 6rem, 9rem, inconsistent)
- Sections that lack a `border-top: 1px solid var(--border)` separator get one added
- All content grids confirm `max-width: 1200px; margin-left: auto; margin-right: auto`

---

## 6. Scroll-to-Top Button

The `#scrollTop` button exists in HTML. Ensure full styling:
- `position: fixed; bottom: 2rem; right: 2rem; z-index: 90`
- `width: 44px; height: 44px; border-radius: 50%`
- `background: rgba(11,8,18,0.85); border: 1px solid var(--claret); color: var(--claret)`
- Hidden by default (`opacity: 0; pointer-events: none`)
- Fades in after 300px scroll (`opacity: 1; pointer-events: auto`)
- Hover: `background: var(--claret); color: #fff`
- JS: `window.addEventListener('scroll', ...)` toggling a `.visible` class

---

## Implementation Order

1. HTML structure fixes (no visual impact, safe first)
2. CSS token additions (`--bg-alt`, label size bumps, scroll-top styling)
3. Section alternation (`alt-section` class + CSS rule)
4. Section header accent bar (replace `.section-rule` with `::before` approach)
5. Colour role assignments (watch-out panel, hero updates)
6. Navigation — desktop active indicator (CSS + JS IntersectionObserver)
7. Navigation — mobile hamburger (HTML button + CSS overlay + JS toggle)
8. Normalise section padding/borders

---

## Files Changed

| File | Changes |
|---|---|
| `index.html` | Fix `</main>` placement, move Excuses before footer, add `alt-section` classes, add `#navToggle` button, remove `section-rule` spans, update hero text |
| `css/styles.css` | Add `--bg-alt` token, label size bumps, `alt-section` rule, section accent bar, nav mobile overlay, hamburger button, scroll-top styles, watch-out gold recolour, hero opacity bumps |
| `js/app.js` | IntersectionObserver for active nav, nav toggle open/close, scroll-top show/hide |

---

## Out of Scope

- No changes to JS data arrays (SHOTS, BUNKER_SHOTS, PUTTING_TOPICS, etc.)
- No changes to any interactive feature logic (shot panel, decision tree, routine module, practice planner, excuses)
- No changes to font choices or the overall glassmorphism card aesthetic
- No new sections or content
