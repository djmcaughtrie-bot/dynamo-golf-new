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

**Fix — exact element order after change:**

```
<body>
  .grain
  <header> ... </header>
  <main>
    #hero
    #shots
    #short-game
    #putting
    #bunker
    #swing-faults
    #strategy
    #rules
    #routine
    #practice
    #excuses          ← moved from after </footer>
  </main>
  .shot-panel / .panel-overlay   ← remain outside <main>
  <footer> ... </footer>         ← now true last content element
  .api-modal / .api-modal-overlay ← remain outside <main>
  #scrollTop button              ← remains outside <main>, before </body>
  <script src="js/app.js">
</body>
```

No visual change — correctness and semantics only.

---

## 2. Navigation

### Desktop
- Reduce nav link `gap` from `2.5rem` to `1.25rem` (CSS line 83: `nav ul { gap: 2.5rem }`)
- Bump nav link `font-size` from `0.68rem` to `0.7rem` (CSS line 88)
- Active section indicator: replace the current hairline `::after` pseudo-element on `nav ul a[data-active]` with a `4px × 4px` claret circle dot centred below the active link:
  ```css
  nav ul a[data-active]::after {
    content: ''; position: absolute; bottom: -6px;
    left: 50%; transform: translateX(-50%);
    width: 4px; height: 4px; border-radius: 50%;
    background: var(--claret);
  }
  ```
- Hover colour for nav links changes from `var(--text)` to `var(--blue)`
- Brand (logo + "Golf App") stays left; links stay right

### Active Nav — IntersectionObserver

The current `app.js` has a partially-broken observer implementation: there is dead code on approximately lines 765–772 (`.observe` called without argument), plus a per-section observer loop below it that partially works. **Replace both** with a single clean implementation:

```js
const navLinks = document.querySelectorAll('nav ul a[href^="#"]');
const sections = document.querySelectorAll('main section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => delete a.dataset.active);
      const link = document.querySelector(`nav ul a[href="#${entry.target.id}"]`);
      if (link) link.dataset.active = '';
    }
  });
}, { rootMargin: '-10% 0px -60% 0px' }); // rootMargin fires when section top enters the middle viewport band — no threshold needed

sections.forEach(s => navObserver.observe(s));
```

Using `rootMargin: '-10% 0px -60% 0px'` rather than a bare threshold avoids the tall-section problem where a section taller than the viewport never reaches a 35% intersection ratio. The rootMargin approach fires when the section's top edge enters the middle 30% band of the viewport, regardless of section height.

### Mobile (≤768px)
- Hide `nav ul` at `≤768px`
- Add `<button id="navToggle" aria-label="Open navigation" aria-expanded="false">` to the `<nav>` element, positioned absolutely top-right within the nav container. Contains the text `☰` initially.
- On open:
  - Toggle `aria-expanded="true"` on the button, change its text to `✕`
  - Add class `nav-open` to `<body>`
  - CSS for `body.nav-open`: a full-screen overlay is shown via a `#navOverlay` div (added to the nav in HTML):
    ```
    position: fixed; inset: 0; z-index: 200;
    background: rgba(11,8,18,0.97); backdrop-filter: blur(12px);
    display: flex; align-items: center; justify-content: center;
    ```
  - Inside `#navOverlay`: a static HTML duplicate of the nav links (written into `index.html`, not JS-generated), stacked vertically, Cormorant Garamond `2rem`, `letter-spacing: 2px`, centred. JS only handles show/hide of the overlay.
  - `body.nav-open { overflow: hidden }` — locks scroll
- Close on: link tap, tap outside, or button press
- `#navToggle` is hidden on desktop (`display: none` at `>768px`)

---

## 3. Colour Story

### Section alternation

Add `--bg-alt: #0F0618` to the `:root` token block.

The following section IDs get `class="alt-section"` in the HTML:
- `#short-game`
- `#bunker`
- `#strategy`
- `#routine`
- `#excuses`

CSS rule: `section.alt-section { background: var(--bg-alt); }`

Hero (`#hero`) and the remaining five sections (`#shots`, `#putting`, `#swing-faults`, `#rules`, `#practice`) stay on `--bg`.

### Section header accent bar

Remove all `<div class="section-rule" aria-hidden="true"></div>` elements from `index.html` (they appear once per section header).

Remove the `.section-rule` CSS rule entirely.

Add a left-anchored vertical accent bar via `::before` on the section heading elements. The full selector covering all section headers is:

```css
.shots-header h2::before,
.sg-header h2::before,
.strategy-header h2::before,
.excuses-header h2::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 56px;
  background: var(--claret);
  vertical-align: middle;
  margin-right: 0.85rem;
  border-radius: 2px;
  flex-shrink: 0;
}
```

Note: Putting, Bunker, Swing Faults, Rules, Practice, and Routine all reuse `.shots-header`, so `.shots-header h2::before` covers all of them. **Confirm in `index.html` that each of these sections uses `class="shots-header"` on its header wrapper before applying the CSS rule** — if any differ, add their class to the selector list.

The `h2` elements use `display: flex; align-items: center` (add this) so the bar aligns with the text.

### Colour role assignments

**Claret `#95003A`** — identity and primary actions:
- Section accent bars (new)
- Active nav dot (new)
- Active filter tab background (existing, keep)
- Card top borders — shape category, default (existing, keep)
- CTA buttons (existing, keep)
- Shot panel left-border accent (existing, keep)

**Sky blue `#3D7CC9`** — interactive and informational:
- Ghost button hover border (existing, keep)
- Control category cards and badges (existing, keep)
- Focus rings: add `*:focus-visible { outline: 2px solid var(--blue-mid); outline-offset: 2px; }` (new)
- Nav link hover colour: change `nav ul a:hover { color: var(--text) }` to `color: var(--blue)` (new)

**Gold `#C8A95A`** — highlights and callouts:
- Watch Out warning panels: update `.panel-watchout` from claret-tinted to gold-tinted:
  - `background: rgba(200,169,90,0.06)` (was `rgba(149, 0, 58, 0.06)`)
  - `border-color: rgba(200,169,90,0.2)` (was `rgba(149, 0, 58, 0.18)`)
  - `.watchout-label { color: var(--gold) }` (was `var(--claret-light)`)
- Routine completion screen (already gold — keep)
- Short game category badges (existing, keep)

### Hero updates

- Ghost text: change `-webkit-text-stroke: 1px rgba(149, 0, 58, 0.08)` to `rgba(149, 0, 58, 0.13)`
- Hero background first radial gradient: change `rgba(92, 0, 37, 0.7)` to `rgba(92, 0, 37, 0.85)` — this is an alpha channel edit inside the `background` shorthand on `#hero`, not an `opacity` property
- Subtitle (`<p class="hero-sub">`): change text to *"Shot library. Short game. Strategy. Rules. Practice plans. Everything you need on the course."*
- Hero pills: change to `11 sections · AI practice · 14 shots`

---

## 4. Typography

Bump small label sizes. All changes are to `font-size` properties in `css/styles.css`:

| Selector | From | To |
|---|---|---|
| `.section-tag` | `0.65rem` | `0.7rem` |
| `.watchout-label` | `0.58rem` | `0.68rem` |
| `.thought-label` | `0.58rem` | `0.68rem` |
| `.panel-section-title` | `0.6rem` | `0.68rem` |
| `.rc-when-label` | `0.58rem` | `0.68rem` |
| `.dt-result-label` | `0.58rem` | `0.68rem` |

No changes to display/heading sizes.

---

## 5. Section Rhythm and Spacing

- Normalise section padding: all `<section>` elements that currently use `9rem 2rem` (Shots, Short Game) change to `7rem 2rem`. Sections already at `6rem` or `7rem` stay as-is or bump to `7rem` for consistency.
- Any section missing `border-top: 1px solid var(--border)` gets it added in CSS.
- Verify all content grids have `max-width: 1200px; margin-left: auto; margin-right: auto` — add where missing.

---

## 6. Scroll-to-Top Button

`#scrollTop` already exists in HTML and CSS. **Update the existing styling** (intentional overrides of the current values):

CSS changes to `#scrollTop` / `.scroll-top`:
- `border-radius: 50%` (was `4px`)
- `border: 1px solid var(--claret)` (was `rgba(149, 0, 58, 0.4)`)
- `background: rgba(11,8,18,0.85)` (was `rgba(11, 8, 18, 0.9)`)
- Hover: `background: var(--claret); color: #fff; border-color: var(--claret)` (was a faint fill with glow)
- Transition to `.visible` class: `opacity: 1; pointer-events: auto; transform: translateY(0)`
- Default (hidden): `opacity: 0; pointer-events: none; transform: translateY(8px)`

JS change: trigger `.visible` after `300px` scroll (was `500px`):
```js
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
});
```

---

## Implementation Order

1. HTML structure fixes — `</main>` placement, Excuses move, footer position, add `#navToggle` + `#navOverlay`, remove `section-rule` divs, add `alt-section` classes, update hero text/pills
2. CSS — token additions (`--bg-alt`), `alt-section` rule, section accent bar `::before`, label size bumps, scroll-top overrides, watch-out gold recolour, hero opacity/stroke values, nav desktop tweaks, focus-visible rule
3. CSS — mobile nav overlay (`#navOverlay`, `body.nav-open` rules, hamburger button styles)
4. JS — replace broken IntersectionObserver with new `rootMargin`-based implementation
5. JS — nav toggle open/close logic
6. JS — scroll-top threshold change to 300px

---

## Files Changed

| File | Changes |
|---|---|
| `index.html` | Fix `</main>` placement, move Excuses before footer, add `alt-section` classes, add `#navToggle` + `#navOverlay`, remove `section-rule` divs, update hero subtitle and pills |
| `css/styles.css` | Add `--bg-alt` token, `alt-section` rule, section accent bar `::before`, label size bumps, scroll-top overrides, watch-out gold recolour, hero opacity/stroke, nav gap/font/hover/dot, mobile nav overlay, focus-visible rule |
| `js/app.js` | Replace IntersectionObserver (remove dead + per-section code, add single rootMargin observer), nav toggle open/close, scroll-top 300px threshold |

---

## Out of Scope

- No changes to JS data arrays (SHOTS, BUNKER_SHOTS, PUTTING_TOPICS, etc.)
- No changes to any interactive feature logic (shot panel, decision tree, routine module, practice planner, excuses)
- No changes to font choices or the overall glassmorphism card aesthetic
- No new sections or content
