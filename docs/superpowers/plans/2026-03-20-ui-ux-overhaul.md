# UI/UX Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix structural HTML bugs, push the Aston Villa colour identity harder, create visual rhythm across all 11 sections, and add a working responsive nav with active section indicator.

**Architecture:** All changes are in three files — `index.html` (structure), `css/styles.css` (visual), and `js/app.js` (behaviour). No framework, no build step. Each task is independently verifiable by opening `index.html` in a browser. Tasks are ordered so each is visually meaningful on its own.

**Tech Stack:** Vanilla HTML5 / CSS3 / ES6 JS. Static file, no server needed. Open via `file://` or any local HTTP server.

---

## Pre-flight: know the codebase

Key line numbers in `js/app.js` before editing:
- Lines 762–784: nav active state code (dead observer on 765–772, working loop on 775–784)
- Lines 799–803: scroll-top code (threshold is 500px on line 801)

Key line numbers in `css/styles.css`:
- Line 64: `header::before` gradient stripe (keep)
- Line 83: `nav ul { gap: 2.5rem }` → change to `1.25rem`
- Line 88: `nav ul a { font-size: 0.68rem }` → change to `0.7rem`
- Line 92–98: `nav ul a:hover` and `a[data-active]` rules → update both
- Line 228: `#shots { padding: 9rem 2rem }` → change to `7rem 2rem`
- Line 566: `#short-game { padding: 9rem 2rem }` → change to `7rem 2rem`
- Lines 786–802: scroll-top CSS block → full replacement
- Line 854–856: `@media (max-width: 860px) { .section-rule { display: none; } }` → remove after section-rule is gone
- Line 884: `#practice { padding: 9rem 2rem }` → change to `7rem 2rem`
- Line 1458–1459: `#strategy { padding: 9rem 2rem }` → change to `7rem 2rem`
- Line 1711–1712: `#excuses { padding: 9rem 2rem }` → change to `7rem 2rem`
- Line 2053: `#putting { padding: 9rem 2rem }` → change to `7rem 2rem`
- Line 2123: `#swing-faults { padding: 9rem 2rem }` → change to `7rem 2rem`
- Line 2201: `#rules { padding: 9rem 2rem }` → change to `7rem 2rem`
- Lines 2281–2284: `.bunker-section` and `.routine-section` — these style inner wrapper divs; separate `#bunker` and `#routine` section-level rules are **missing** and must be added

---

## Task 1: Fix HTML Structure

**Files:**
- Modify: `index.html`

Fix the premature `</main>` tag, move Excuses inside main, fix footer position. This is pure structure — no visual change.

- [ ] **Step 1: Remove the premature `</main>` after Short Game**

In `index.html` around line 119, find and remove the lone `</main>` tag that sits immediately after the `</section>` closing tag for Short Game:
```html
    </section>

  </main>        ← DELETE this line

      <!-- ── PUTTING ── -->
```

- [ ] **Step 2: Move the Excuses section**

Currently the Excuses `<section id="excuses">` block and its closing `</section>` sit *after* `</footer>`. Cut the entire Excuses section (from `<!-- ── EXCUSES ── -->` comment through `</section>`) and paste it immediately after the Practice section's closing `</section>` — before the shot panel div.

**Important:** The current file order between `#practice`'s `</section>` and the `</footer>` is:
```
</section>          ← closes #practice
<!-- Shot detail panel -->
<div class="shot-panel" ...>
<div class="panel-overlay" ...>
<footer>...</footer>
<!-- EXCUSES section currently here -->
<!-- API Key Modal -->
<div class="api-modal" ...>
```
When you cut Excuses and paste it before the shot panel, the shot panel, footer, API modal, and `#scrollTop` all remain *outside* `</main>`. Do not accidentally enclose them inside `</main>`.

- [ ] **Step 3: Close `</main>` after Excuses**

After completing Step 2, add a closing `</main>` tag immediately after the Excuses section's `</section>`. The correct element order from Practice onwards should be:

```html
      </section>   ← closes #practice

      <!-- ── EXCUSES ── -->
      <section id="excuses" class="alt-section">
        ...
      </section>

    </main>

    <!-- Shot detail panel -->
    <div class="shot-panel" ...>...</div>
    <div class="panel-overlay" ...></div>

    <footer>...</footer>

    <!-- API Key Modal -->
    <div class="api-modal" ...>...</div>
    <div class="api-modal-overlay" ...></div>

    <button class="scroll-top" id="scrollTop" ...>↑</button>
    <script src="js/app.js"></script>
  </body>
```

- [ ] **Step 4: Remove all `<div class="section-rule" aria-hidden="true"></div>` elements**

Search `index.html` for `section-rule` — there is one in each section header. Delete every occurrence. They will be replaced by CSS `::before` pseudo-elements in Task 4.

- [ ] **Step 5: Verify**

Open `index.html` in a browser. Inspect the DOM — confirm `<main>` wraps all 11 content sections. Confirm footer is the last visible block. Confirm Excuses renders before the footer, not after it.

- [ ] **Step 6: Commit**

```bash
git add index.html
git commit -m "fix: correct HTML structure — main wraps all sections, excuses before footer"
```

---

## Task 2: HTML — Navigation toggle + alt-section classes + hero text

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Add the hamburger button to the nav**

Inside `<nav>`, after the closing `</ul>`, add:
```html
        <button id="navToggle" aria-label="Open navigation" aria-expanded="false">☰</button>
```

- [ ] **Step 2: Add the mobile nav overlay**

Immediately after the `<button id="navToggle">` line, add the overlay div with a duplicate link list:
```html
        <div id="navOverlay" aria-hidden="true">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#shots">Shots</a></li>
            <li><a href="#short-game">Short Game</a></li>
            <li><a href="#putting">Putting</a></li>
            <li><a href="#bunker">Bunker</a></li>
            <li><a href="#swing-faults">Swing Faults</a></li>
            <li><a href="#strategy">Strategy</a></li>
            <li><a href="#rules">Rules</a></li>
            <li><a href="#routine">Routine</a></li>
            <li><a href="#practice">Practice</a></li>
            <li><a href="#excuses">Excuses</a></li>
          </ul>
        </div>
```

- [ ] **Step 3: Add `alt-section` class to the five alternating sections**

Find each of the following `<section>` opening tags and add `class="alt-section"`:
- `<section id="short-game">` → `<section id="short-game" class="alt-section">`
- `<section id="bunker">` → `<section id="bunker" class="alt-section">`
- `<section id="strategy">` → `<section id="strategy" class="alt-section">`
- `<section id="routine">` → `<section id="routine" class="alt-section">`
- `<section id="excuses">` → `<section id="excuses" class="alt-section">`

- [ ] **Step 4: Update hero subtitle**

Find `<p class="hero-sub">` and replace its text content:
```html
<p class="hero-sub">Shot library. Short game. Strategy. Rules. Practice plans. Everything you need on the course.</p>
```

- [ ] **Step 5: Update hero pills**

Find the `<div class="hero-pills">` block and replace its contents:
```html
<div class="hero-pills" aria-hidden="true">
  <span class="hero-pill">11 sections</span>
  <span class="hero-pill-sep">·</span>
  <span class="hero-pill">AI practice</span>
  <span class="hero-pill-sep">·</span>
  <span class="hero-pill">14 shots</span>
</div>
```

- [ ] **Step 6: Verify**

Open in browser. At desktop width, the nav looks identical (no toggle visible yet — CSS comes in Task 6). Hero subtitle and pills show updated text. The 5 alt-section sections have a class applied (visible in DevTools inspector).

- [ ] **Step 7: Commit**

```bash
git add index.html
git commit -m "feat: add nav toggle/overlay, alt-section classes, update hero copy"
```

---

## Task 3: CSS — Tokens, section backgrounds, padding normalisation

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Add `--bg-alt` token**

In the `:root` block (around line 17, after `--bg: #0B0812;`), add:
```css
  --bg-alt:        #0F0618;
```

- [ ] **Step 2: Add `alt-section` background rule**

After the `:root` block (after line 27), add:
```css
section.alt-section { background: var(--bg-alt); }
```

- [ ] **Step 3: Normalise section padding — change 9rem to 7rem**

Find and update each of these (use exact surrounding context to avoid wrong matches):

`#shots { padding: 9rem 2rem;` → `#shots { padding: 7rem 2rem;`

`#short-game {\n  padding: 9rem 2rem;` → `padding: 7rem 2rem;`

`#practice {\n  padding: 9rem 2rem;` → `padding: 7rem 2rem;`

`#strategy {\n  padding: 9rem 2rem;` → `padding: 7rem 2rem;`

`#excuses {\n  padding: 9rem 2rem;` → `padding: 7rem 2rem;`

`#putting {\n  padding: 9rem 2rem;` → `padding: 7rem 2rem;`

`#swing-faults {\n  padding: 9rem 2rem;` → `padding: 7rem 2rem;`

`#rules {\n  padding: 9rem 2rem;` → `padding: 7rem 2rem;`

- [ ] **Step 4: Add section-level rules for #bunker and #routine**

These sections have no top-level CSS rule. Append to `css/styles.css` (or add near the bunker/routine blocks):
```css
#bunker {
  padding: 7rem 2rem;
  border-top: 1px solid var(--border);
  position: relative;
}
#bunker > * {
  max-width: 1200px; margin-left: auto; margin-right: auto;
  position: relative; z-index: 1;
}

#routine {
  padding: 7rem 2rem;
  border-top: 1px solid var(--border);
  position: relative;
}
#routine > * {
  max-width: 1200px; margin-left: auto; margin-right: auto;
  position: relative; z-index: 1;
}
```

- [ ] **Step 5: Add `border-top` to `#shots`**

`#shots` has no `border-top`. Find the `#shots {` rule (line ~228) and add `border-top: 1px solid var(--border);` to it.

- [ ] **Step 6: Verify**

Open in browser, scroll through all sections. Confirm 5 sections (`#short-game`, `#bunker`, `#strategy`, `#routine`, `#excuses`) have a noticeably different (slightly warmer) background. Confirm section spacing feels more even throughout — tighter than before but not cramped. Confirm Bunker and Routine sections no longer sit flush with no padding.

- [ ] **Step 7: Commit**

```bash
git add css/styles.css
git commit -m "feat: add --bg-alt token, section alternation, normalise section padding to 7rem"
```

---

## Task 4: CSS — Section header accent bars (replace section-rule)

**Files:**
- Modify: `css/styles.css`

The `.section-rule` divs were removed from HTML in Task 1. Now update the CSS.

- [ ] **Step 1: Remove the `.section-rule` CSS rule**

Find and delete the entire `.section-rule` block:
```css
.section-rule {
  position: absolute; right: 0; top: 55%; transform: translateY(-50%);
  width: 28%; height: 1px;
  background: linear-gradient(90deg, rgba(149, 0, 58, 0.4), transparent);
}
```

Also remove the responsive rule that hides it:
```css
@media (max-width: 860px) {
  .section-rule { display: none; }
}
```

- [ ] **Step 2: Make `h2` elements in section headers use flex layout**

Find the shared `h2` rule in `.shots-header h2, .sg-header h2`:
```css
.shots-header h2,
.sg-header h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight: 700;
  letter-spacing: -0.02em; line-height: 1.05; color: var(--text);
}
```
Change to add `display: flex; align-items: center;`:
```css
.shots-header h2,
.sg-header h2 {
  font-family: 'Cormorant Garamond', serif;
  font-size: clamp(2.2rem, 5vw, 3.8rem); font-weight: 700;
  letter-spacing: -0.02em; line-height: 1.05; color: var(--text);
  display: flex; align-items: center;
}
```

Also add `display: flex; align-items: center;` to `.strategy-header h2`, `.practice-header h2`, and `.excuses-header h2` if they have their own `h2` rules. If any of them share no separate `h2` rule, the shared rule above already covers them.

- [ ] **Step 3: Add the `::before` accent bar rule**

Immediately after the `h2` rule updated above, add:
```css
.shots-header h2::before,
.sg-header h2::before,
.strategy-header h2::before,
.practice-header h2::before,
.excuses-header h2::before {
  content: '';
  display: inline-block;
  width: 3px;
  height: 56px;
  background: var(--claret);
  margin-right: 0.85rem;
  border-radius: 2px;
  flex-shrink: 0;
}
```

Note: `.shots-header` is used by Shots, Putting, Bunker, Swing Faults, Rules, and Routine — all six get the accent bar for free. Practice uses `.practice-header` (confirmed in `index.html` line 235), so it needs its own entry. Short Game (`.sg-header`), Strategy (`.strategy-header`), and Excuses (`.excuses-header`) also need separate entries.

- [ ] **Step 4: Verify**

Open in browser. Every section heading should now have a 3px × 56px claret vertical bar to the left of the heading text. The bar should be flush with the left of the text baseline, creating a clean anchor. No floating horizontal rules anywhere.

- [ ] **Step 5: Commit**

```bash
git add css/styles.css
git commit -m "feat: replace section-rule hairlines with claret accent bars on section headings"
```

---

## Task 5: CSS — Nav desktop refinements

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Reduce nav link gap**

Find `nav ul { list-style: none; display: flex; gap: 2.5rem; }` (line ~83) and change `gap: 2.5rem` to `gap: 1.25rem`.

- [ ] **Step 2: Bump nav link font-size**

Find `nav ul a { ... font-size: 0.68rem; ...}` (line ~88) and change `font-size: 0.68rem` to `font-size: 0.7rem`.

- [ ] **Step 3: Change nav link hover colour from text to blue**

Find `nav ul a:hover, nav ul a[data-active] { color: var(--text); }` (line ~92–93) and split into two rules:
```css
nav ul a:hover { color: var(--blue); }
nav ul a[data-active] { color: var(--text); }
```

- [ ] **Step 4: Replace active indicator hairline with dot**

Find the `nav ul a[data-active]::after` rule (line ~95–98):
```css
nav ul a[data-active]::after {
  content: ''; position: absolute; bottom: -4px; left: 0; right: 0;
  height: 1px; background: var(--claret);
}
```
Replace with:
```css
nav ul a[data-active]::after {
  content: ''; position: absolute; bottom: -6px;
  left: 50%; transform: translateX(-50%);
  width: 4px; height: 4px; border-radius: 50%;
  background: var(--claret);
}
```

- [ ] **Step 5: Add focus-visible rule**

After the nav rules, add a global focus ring:
```css
*:focus-visible {
  outline: 2px solid var(--blue-mid);
  outline-offset: 2px;
}
```

- [ ] **Step 6: Verify**

Open in browser at desktop width. Nav links should be noticeably less spread out. Hover a link — it should turn sky blue. Click Shot Library — the active dot appears below "Shots". Verify the dot is a circle, not a line.

- [ ] **Step 7: Commit**

```bash
git add css/styles.css
git commit -m "feat: refine nav — tighter gap, blue hover, claret dot active indicator, focus ring"
```

---

## Task 6: CSS — Mobile nav overlay + hamburger button

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Hide nav ul on mobile, show hamburger**

Find the `@media (max-width: 700px)` block and add:
```css
@media (max-width: 768px) {
  nav ul { display: none; }

  #navToggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px; height: 36px;
    background: none; border: none;
    color: var(--claret);
    font-size: 1.4rem;
    cursor: pointer;
    padding: 0;
    flex-shrink: 0;
  }
}
```

- [ ] **Step 2: Hide the toggle on desktop**

Add to the default (non-media) styles (near the nav rules):
```css
#navToggle { display: none; }
```

- [ ] **Step 3: Style the nav overlay**

Add the full overlay CSS:
```css
#navOverlay {
  display: none;
  position: fixed; inset: 0; z-index: 200;
  background: rgba(11, 8, 18, 0.97);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  align-items: center;
  justify-content: center;
}

#navOverlay.open { display: flex; }

#navOverlay ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 0;
}

#navOverlay ul a {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-dim);
  text-decoration: none;
  transition: color 0.2s;
}

#navOverlay ul a:hover { color: var(--text); }
```

- [ ] **Step 4: Lock body scroll when overlay open**

```css
body.nav-open { overflow: hidden; }
```

- [ ] **Step 5: Verify**

Resize browser to ≤768px wide. Nav links disappear. A ☰ icon appears on the right of the header. Clicking it does nothing yet (JS comes in Task 10) — but the overlay HTML is in the DOM. In DevTools, manually add class `open` to `#navOverlay` — the full-screen overlay with stacked links should appear. Also manually add `nav-open` to `<body>` to confirm scroll locks. Remove both classes to dismiss.

- [ ] **Step 6: Commit**

```bash
git add css/styles.css
git commit -m "feat: add mobile nav overlay and hamburger button CSS"
```

---

## Task 7: CSS — Typography, watch-out gold recolour, hero tweaks

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Bump small label font sizes**

Find and update each of the following:

| Selector | Find | Replace |
|---|---|---|
| `.section-tag` | `font-size: 0.65rem` | `font-size: 0.7rem` |
| `.watchout-label` | `font-size: 0.58rem` | `font-size: 0.68rem` |
| `.thought-label` | `font-size: 0.58rem` | `font-size: 0.68rem` |
| `.panel-section-title` | `font-size: 0.6rem` | `font-size: 0.68rem` |
| `.rc-when-label` | `font-size: 0.58rem` | `font-size: 0.68rem` |
| `.dt-result-label` | `font-size: 0.58rem` | `font-size: 0.68rem` |

- [ ] **Step 2: Recolour watch-out warning panels to gold**

Find the `.panel-watchout` rule:
```css
.panel-watchout {
  background: rgba(149, 0, 58, 0.06);
  border: 1px solid rgba(149, 0, 58, 0.18);
  border-radius: 4px; padding: 1rem 1.25rem;
}
```
Change to:
```css
.panel-watchout {
  background: rgba(200, 169, 90, 0.06);
  border: 1px solid rgba(200, 169, 90, 0.2);
  border-radius: 4px; padding: 1rem 1.25rem;
}
```

Find `.watchout-label { ... color: var(--claret-light); ... }` and change to `color: var(--gold);`.

- [ ] **Step 3: Update hero ghost text stroke opacity**

Find `.hero-bg-text { ... -webkit-text-stroke: 1px rgba(149, 0, 58, 0.08); ... }` and change `0.08` to `0.13`.

- [ ] **Step 4: Update hero left radial glow**

Find `#hero { ... background: radial-gradient(ellipse 70% 80% at 5% 35%, rgba(92, 0, 37, 0.7) ...` and change the alpha `0.7` to `0.85`. This is inside the multi-layer `background` shorthand — change only the alpha value in the first `radial-gradient(...)`.

- [ ] **Step 5: Verify**

Open a shot's detail panel and expand it. The Watch Out section should now have a gold border and gold label text (not claret). The hero page should show a slightly more intense glow on the left and a slightly more visible "GOLF" ghost text. All labels throughout the app should feel marginally larger.

- [ ] **Step 6: Commit**

```bash
git add css/styles.css
git commit -m "feat: gold watch-out panels, increased hero glow, bump small label font sizes"
```

---

## Task 8: CSS — Scroll-to-top button update

**Files:**
- Modify: `css/styles.css`

- [ ] **Step 1: Replace the scroll-top CSS block**

Find the existing `.scroll-top` block (lines ~787–802):
```css
.scroll-top {
  position: fixed; bottom: 2rem; right: 2rem;
  width: 44px; height: 44px; border-radius: 4px;
  background: rgba(11, 8, 18, 0.9);
  border: 1px solid rgba(149, 0, 58, 0.4);
  color: var(--claret-light); font-size: 1.1rem; cursor: pointer;
  z-index: 200; opacity: 0; transform: translateY(12px);
  transition: opacity 0.3s, transform 0.3s, background 0.2s, box-shadow 0.2s;
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(12px);
}
.scroll-top.visible { opacity: 1; transform: translateY(0); }
.scroll-top:hover {
  background: rgba(149, 0, 58, 0.15); border-color: var(--claret);
  box-shadow: 0 0 20px var(--claret-glow);
}
```

Replace entirely with:
```css
.scroll-top {
  position: fixed; bottom: 2rem; right: 2rem;
  width: 44px; height: 44px; border-radius: 50%;
  background: rgba(11, 8, 18, 0.85);
  border: 1px solid var(--claret);
  color: var(--claret); font-size: 1rem; cursor: pointer;
  z-index: 90; opacity: 0; pointer-events: none;
  transform: translateY(8px);
  transition: opacity 0.3s, transform 0.3s, background 0.2s, color 0.2s;
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(12px);
}
.scroll-top.visible { opacity: 1; pointer-events: auto; transform: translateY(0); }
.scroll-top:hover { background: var(--claret); color: #fff; border-color: var(--claret); }
```

- [ ] **Step 2: Verify**

Scroll down 400px — button should not yet appear (JS threshold is still 500px; 400px is deliberately below it to confirm the CSS change is isolated). Check the button in DevTools: it should be a perfect circle with a solid claret border. Manually add class `visible` in DevTools to preview — button should be a circle with full claret fill on hover.

- [ ] **Step 3: Commit**

```bash
git add css/styles.css
git commit -m "feat: scroll-top button — circle shape, solid claret border, claret-fill hover"
```

---

## Task 9: JS — Replace IntersectionObserver for active nav

**Files:**
- Modify: `js/app.js` lines 759–784

- [ ] **Step 1: Replace the dead and working observer blocks**

Find the entire NAV ACTIVE STATE section (lines 759–784):
```js
/* ─────────────────────────────────────────────────────────────
   NAV ACTIVE STATE
───────────────────────────────────────────────────────────── */
const navLinks = document.querySelectorAll('nav ul a');
const sections = document.querySelectorAll('main section[id]');

new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(l => l.removeAttribute('data-active'));
    const link = document.querySelector(`nav ul a[href="#${entry.target.id}"]`);
    if (link) link.setAttribute('data-active', '');
  });
}, { threshold: 0.4 }).observe;

// simple approach that works
sections.forEach(section => {
  new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(l => l.removeAttribute('data-active'));
      const link = document.querySelector(`nav ul a[href="#${section.id}"]`);
      if (link) link.setAttribute('data-active', '');
    });
  }, { threshold: 0.4 }).observe(section);
});
```

Replace with:
```js
/* ─────────────────────────────────────────────────────────────
   NAV ACTIVE STATE
───────────────────────────────────────────────────────────── */
const navLinks = document.querySelectorAll('nav ul a[href^="#"]');
const sections = document.querySelectorAll('main section[id]');

// rootMargin approach: fires when a section's top edge enters the middle
// viewport band — works for tall sections that never reach a % threshold
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.removeAttribute('data-active'));
      const link = document.querySelector(`nav ul a[href="#${entry.target.id}"]`);
      if (link) link.setAttribute('data-active', '');
    }
  });
}, { rootMargin: '-10% 0px -60% 0px' }); // fires when section top is in middle 30% band

sections.forEach(s => navObserver.observe(s));
```

- [ ] **Step 2: Verify**

Open in browser. Scroll slowly from top to bottom. Each nav link should become active as its section scrolls into the top third of the viewport. The active state should update cleanly for all 11 sections. Open DevTools console — no errors.

- [ ] **Step 3: Commit**

```bash
git add js/app.js
git commit -m "fix: replace broken nav IntersectionObserver with rootMargin-based single observer"
```

---

## Task 10: JS — Mobile nav toggle

**Files:**
- Modify: `js/app.js`

- [ ] **Step 1: Add nav toggle logic**

After the NAV ACTIVE STATE block (after line 784 in original, after the observer code in updated file), add:

```js
/* ─────────────────────────────────────────────────────────────
   MOBILE NAV TOGGLE
───────────────────────────────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navOverlay = document.getElementById('navOverlay');

function openNav() {
  navOverlay.classList.add('open');
  navOverlay.setAttribute('aria-hidden', 'false');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.textContent = '✕';
  document.body.classList.add('nav-open');
}

function closeNav() {
  navOverlay.classList.remove('open');
  navOverlay.setAttribute('aria-hidden', 'true');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.textContent = '☰';
  document.body.classList.remove('nav-open');
}

if (navToggle && navOverlay) {
  navToggle.addEventListener('click', () => {
    navToggle.getAttribute('aria-expanded') === 'true' ? closeNav() : openNav();
  });

  // Close when a link is tapped
  navOverlay.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

  // Close when clicking outside the link list
  navOverlay.addEventListener('click', e => {
    if (e.target === navOverlay) closeNav();
  });
}
```

- [ ] **Step 2: Verify**

Resize browser to ≤768px. Tap the ☰ button — full-screen overlay should appear with all 11 links stacked. Tap ✕ or tap outside the links — overlay closes. Tap a link — overlay closes and page scrolls to that section. Body scroll should be locked while overlay is open.

- [ ] **Step 3: Commit**

```bash
git add js/app.js
git commit -m "feat: add mobile nav toggle — full-screen overlay open/close with keyboard support"
```

---

## Task 11: JS — Scroll-to-top threshold

**Files:**
- Modify: `js/app.js` lines ~799–803

- [ ] **Step 1: Change threshold from 500px to 300px**

Find:
```js
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.pageYOffset > 500);
}, { passive: true });
```

Change `500` to `300`:
```js
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.pageYOffset > 300);
}, { passive: true });
```

- [ ] **Step 2: Verify**

Scroll down ~300px — button should appear. Scroll back up to <300px — button should disappear. Click the button — smooth scroll to top.

- [ ] **Step 3: Commit + Push**

```bash
git add js/app.js
git commit -m "fix: scroll-to-top button appears at 300px not 500px"
git push origin main
```

---

## Final verification checklist

After all 11 tasks, do a full end-to-end pass:

- [ ] All 11 sections are inside `<main>` (inspect DOM)
- [ ] Footer is the last visible block before `</body>`
- [ ] 5 alt-section sections have a noticeably different (warmer) background
- [ ] Every section heading has a 3px claret accent bar to the left
- [ ] Hero subtitle and pills are updated
- [ ] Nav links turn blue on hover (not white)
- [ ] Active nav link has a claret dot (not a hairline)
- [ ] IntersectionObserver works for all 11 sections including tall ones (Shots, Excuses)
- [ ] Resize to ≤768px: nav links hidden, ☰ visible, overlay works
- [ ] Watch Out panels in shot detail are gold-bordered, not claret
- [ ] Scroll-top button is a circle, appears after ~300px scroll
- [ ] No console errors
