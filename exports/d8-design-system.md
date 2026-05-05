# D8TAOPS Design System — The Intelligent Editorial
**Version 1.1 · April 2026 · Derived from `/src/index.css` + `HomepageNav.jsx` + `HomepageSections.jsx`**

---

## Table of Contents
1. [Colors](#1-colors)
2. [Typography](#2-typography)
3. [CSS Token Layer](#3-css-token-layer)
4. [Section Types](#4-section-types)
5. [Navigation](#5-navigation)
6. [Buttons](#6-buttons)
7. [Cards](#7-cards)
8. [Inputs](#8-inputs)
9. [Bento Grid Layout](#9-bento-grid-layout)
10. [Motion](#10-motion)
11. [Elevation & Depth](#11-elevation--depth)
12. [Rules](#12-rules)
13. [Anti-Patterns](#13-anti-patterns)
14. [Copy Rules](#14-copy-rules)

---

## 1. Colors

The palette is locked. Functional UI colors are for state and data only — never decoration. The tinted surface (`#f0f4f8`) is used for alternating light sections.

### Core Brand Colors

| Token | Hex | Use |
|---|---|---|
| `--color-navy` | `#081F5C` | H1, H2, section headings, proof block bg |
| `--color-deep-navy` | `#040e2e` | Footer bg, darkest hero gradient stop |
| `--color-blue` | `#0477BF` | H3, eyebrow labels, nav links, stat numbers |
| `--color-blue-mid` | `#0577BE` | Gradient midpoint |
| `--color-cyan` | `#048ABF` | Gradient endpoint, CTA gradient |
| `--color-green-accent` | `#3ecf8e` | Proof block accents, button glow, agent active states |
| `--color-body` | `#333333` | All body copy on light sections |
| `--color-white` | `#FFFFFF` | Light section backgrounds, text on dark sections |

### Surface System (5 levels)

| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#FAFBFF` | Page background — never pure white |
| `--color-surface` | `#FFFFFF` | Card / panel surface |
| `--color-surface-container` | `#F5F7FC` | Card backgrounds, agent icon bg |
| `--color-surface-container-high` | `#EEF2F9` | Elevated surfaces, hovered states |
| `--color-tinted-surface` | `#f0f4f8` | Alternating section bg (ticker, personas, D8:VIEW) |
| `--color-border` | `rgba(8, 31, 92, 0.12)` | Ghost border — felt, not seen |
| `--color-border-strong` | `rgba(8, 31, 92, 0.20)` | Stronger border where needed |

### Functional UI Colors (state & data only — never decoration)

| Token | Hex | Use |
|---|---|---|
| `--color-success` | `#22C55E` | Positive metrics, "After" states |
| `--color-success-bright` | `#26D07C` | Progress bars, PASS status badges |
| `--color-error` | `#FF5252` | Compliance violations, failures |
| `--color-warning` | `#FFD500` | Stale data, REVIEW status badges |
| `--color-grey-dark` | `#515151` | UI sub-headers, secondary text |
| `--color-grey-mid` | `#6B7280` | Muted body text |
| `--color-grey-light` | `#F1F5F9` | Table headers, empty chart tracks |

### Gradients

| Token | Value | Use |
|---|---|---|
| `--gradient-brand` | `linear-gradient(90deg, #081F5C 0%, #0577BE 45%, #048ABF 75%, #FFFFFF 100%)` | Logo, select brand moments only |
| `--gradient-brand-vertical` | `linear-gradient(180deg, #081F5C 0%, #0577BE 45%, #048ABF 75%, #FFFFFF 100%)` | Vertical brand moments |
| `--gradient-hero` | `linear-gradient(160deg, #0c1428 0%, #0f2560 45%, #081F5C 100%)` | Hero section + proof block only |
| `--gradient-cta` | `linear-gradient(90deg, #0477BF 0%, #048ABF 100%)` | CTA gradient accent |
| `--gradient-card-soul` | `linear-gradient(135deg, rgba(8,31,92,0.05) 0%, rgba(4,119,191,0.05) 100%)` | Subtle card bg tint |
| `--gradient-agent-stroke` | `linear-gradient(135deg, #081F5C 0%, #0477BF 100%)` | Agent icon strokes |

---

## 2. Typography

**One font family: IBM Plex Sans.** IBM Plex Mono for code and data contexts only. Import all weights 100–700 via Google Fonts with `display=swap`.

```
https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;0,700&display=swap
```

### Type Scale (1.25 ratio)

| Token | rem | px |
|---|---|---|
| `--text-xs` | `0.75rem` | 12px |
| `--text-sm` | `0.875rem` | 14px |
| `--text-base` | `1rem` | 16px |
| `--text-lg` | `1.25rem` | 20px |
| `--text-xl` | `1.563rem` | 25px |
| `--text-2xl` | `1.953rem` | 31px |
| `--text-3xl` | `2.441rem` | 39px |
| `--text-4xl` | `3.052rem` | 49px |
| `--text-5xl` | `3.815rem` | 61px |

### Font Weights

| Token | Value |
|---|---|
| `--fw-regular` | `400` |
| `--fw-medium` | `500` |
| `--fw-semibold` | `600` |
| `--fw-bold` | `700` |

### Semantic Type Tokens

| Role | Size | Weight | Color | Tracking | Line Height |
|---|---|---|---|---|---|
| H1 | `--text-4xl` (49px) | `--fw-bold` | `--color-navy` | `--tracking-tight` (-0.03em) | `--leading-display` (1.05) |
| H2 | `--text-3xl` (39px) | `--fw-bold` | `--color-navy` | `--tracking-tight` | `--leading-heading` (1.15) |
| H3 | `--text-xl` (25px) | `--fw-semibold` | `--color-blue` | `--tracking-normal` (0) | `--leading-heading` (1.15) |
| Eyebrow | `--text-sm` (14px) | `--fw-semibold` | `--color-blue` | `--tracking-eyebrow` (0.05em) | — |
| Body | `--text-base` (16px) | `--fw-regular` | `--color-body` | — | `--leading-body` (1.7) |
| Nav links | 14px | `--fw-medium` | `--color-blue` | — | — |
| Stats | `--text-4xl` (49px) | `--fw-bold` | `--color-blue` | `--tracking-tight` | — |

### Typography Rules

| Rule | Value |
|---|---|
| Font family | IBM Plex Sans only. No exceptions. |
| H1 tracking | `letter-spacing: -0.03em` |
| H1 line-height | `1.05` (`--leading-display`) |
| H2/H3 line-height | `1.15` (`--leading-heading`) |
| Body line-height | `1.7` — mandatory |
| Body line length | 55–75 chars (max: `65ch`). Never below 16px on mobile. |
| Eyebrow tracking | `0.05em` — UPPERCASE |
| Nav link size | 14px, weight 500, color `--color-blue`. Hover: `--color-navy`. |
| Text alignment | Left-justify always. Exception: closing CTA section (center-aligned, intentional, one occurrence). |

---

## 3. CSS Token Layer

Paste this into `:root` before writing any UI code. Source: `/src/index.css`.

```css
:root {

  /* BRAND COLORS */
  --color-navy:         #081F5C;
  --color-blue:         #0477BF;
  --color-blue-mid:     #0577BE;
  --color-cyan:         #048ABF;
  --color-body:         #333333;
  --color-white:        #FFFFFF;

  /* EXTENDED BRAND */
  --color-deep-navy:    #040e2e;
  --color-green-accent: #3ecf8e;

  /* FUNCTIONAL UI (state & data only — never decoration) */
  --color-success:        #22C55E;
  --color-success-bright: #26D07C;
  --color-error:          #FF5252;
  --color-warning:        #FFD500;
  --color-grey-dark:      #515151;
  --color-grey-mid:       #6B7280;
  --color-grey-light:     #F1F5F9;
  --color-tinted-surface: #f0f4f8;

  /* SURFACE SYSTEM */
  --color-bg:                        #FAFBFF;
  --color-surface:                   #FFFFFF;
  --color-surface-container-lowest:  #FFFFFF;
  --color-surface-container-low:     #FAFBFF;
  --color-surface-container:         #F5F7FC;
  --color-surface-container-high:    #EEF2F9;
  --color-surface-container-highest: #E7ECF5;
  --color-border:                    rgba(8, 31, 92, 0.12);
  --color-border-strong:             rgba(8, 31, 92, 0.20);

  /* GRADIENTS */
  --gradient-brand:          linear-gradient(90deg,  #081F5C 0%, #0577BE 45%, #048ABF 75%, #FFFFFF 100%);
  --gradient-brand-vertical: linear-gradient(180deg, #081F5C 0%, #0577BE 45%, #048ABF 75%, #FFFFFF 100%);
  --gradient-card-soul:      linear-gradient(135deg, rgba(8,31,92,0.05) 0%, rgba(4,119,191,0.05) 100%);
  --gradient-hero:           linear-gradient(160deg, #0c1428 0%, #0f2560 45%, #081F5C 100%);
  --gradient-cta:            linear-gradient(90deg,  #0477BF 0%, #048ABF 100%);
  --gradient-agent-stroke:   linear-gradient(135deg, #081F5C 0%, #0477BF 100%);

  /* FONT FAMILIES */
  --font-sans: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif;
  --font-mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace;

  /* TYPOGRAPHIC SCALE (1.25 ratio) */
  --text-xs:   0.75rem;    /*  12px */
  --text-sm:   0.875rem;   /*  14px */
  --text-base: 1rem;       /*  16px */
  --text-lg:   1.25rem;    /*  20px */
  --text-xl:   1.563rem;   /*  25px */
  --text-2xl:  1.953rem;   /*  31px */
  --text-3xl:  2.441rem;   /*  39px */
  --text-4xl:  3.052rem;   /*  49px */
  --text-5xl:  3.815rem;   /*  61px */

  /* FONT WEIGHTS */
  --fw-regular:  400;
  --fw-medium:   500;
  --fw-semibold: 600;
  --fw-bold:     700;

  /* LETTER SPACING */
  --tracking-tight:   -0.03em;
  --tracking-normal:  0;
  --tracking-eyebrow: 0.05em;

  /* LINE HEIGHTS */
  --leading-display: 1.05;
  --leading-heading: 1.15;
  --leading-body:    1.7;
  --leading-tight:   1.25;

  /* SEMANTIC TYPE TOKENS */
  --h1-size: var(--text-4xl); --h1-weight: var(--fw-bold);
  --h1-tracking: var(--tracking-tight); --h1-leading: var(--leading-display);
  --h1-color: var(--color-navy);

  --h2-size: var(--text-3xl); --h2-weight: var(--fw-bold);
  --h2-tracking: var(--tracking-tight); --h2-leading: var(--leading-heading);
  --h2-color: var(--color-navy);

  --h3-size: var(--text-xl); --h3-weight: var(--fw-semibold);
  --h3-tracking: var(--tracking-normal); --h3-leading: var(--leading-heading);
  --h3-color: var(--color-blue);

  --eyebrow-size: var(--text-sm); --eyebrow-weight: var(--fw-semibold);
  --eyebrow-tracking: var(--tracking-eyebrow); --eyebrow-color: var(--color-blue);

  --body-size: var(--text-base); --body-weight: var(--fw-regular);
  --body-leading: var(--leading-body); --body-color: var(--color-body);

  --stat-size: var(--text-4xl); --stat-weight: var(--fw-bold);
  --stat-color: var(--color-blue);

  /* SPACING (base-8) */
  --space-1:   0.25rem;   /*   4px */
  --space-2:   0.5rem;    /*   8px */
  --space-3:   0.75rem;   /*  12px */
  --space-4:   1rem;      /*  16px */
  --space-6:   1.5rem;    /*  24px */
  --space-8:   2rem;      /*  32px */
  --space-10:  2.5rem;    /*  40px */
  --space-12:  3rem;      /*  48px */
  --space-16:  4rem;      /*  64px */
  --space-20:  5rem;      /*  80px */
  --space-24:  6rem;      /*  96px */
  --space-32:  8rem;      /* 128px */

  /* MOTION */
  --duration-fast:  120ms;
  --duration-base:  240ms;
  --duration-slow:  400ms;
  --ease-out:       cubic-bezier(0.0, 0, 0.2, 1);
  --ease-spring:    cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-reveal:    cubic-bezier(0.22, 1, 0.36, 1);
  --transition:     all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  /* ELEVATION (Navy-tinted — never pure grey) */
  --shadow-sm:  0 1px 2px 0 rgba(8, 31, 92, 0.05);
  --shadow-md:  0 4px 6px -1px rgba(8, 31, 92, 0.10),
                0 2px 4px -2px rgba(8, 31, 92, 0.08);
  --shadow-lg:  0 20px 40px rgba(8, 31, 92, 0.08);
  --shadow-nav: 0 10px 40px rgba(8, 31, 92, 0.18);

  /* RADIUS */
  --radius-sm:   0.5rem;
  --radius-md:   1rem;
  --radius-lg:   2rem;
  --radius-xl:   3rem;
  --radius-pill: 9999px;

  /* BLUR */
  --blur-nav: 24px;

}
```

---

## 4. Section Types

Three types. Light sections alternate between White and Tinted — never stack the same type consecutively. Dark is used for the hero and proof block only.

### Section Sequence (homepage)

| Section | Type | Background |
|---|---|---|
| Hero | Dark | `linear-gradient(160deg, #0c1428 0%, #0f2560 45%, #081F5C 100%)` |
| Ticker Bar | Tinted | `#f0f4f8` · border top/bottom: `rgba(8,31,92,0.08)` |
| Stats | White | `#FFFFFF` |
| Who It's For (Personas) | Tinted | `#f0f4f8` |
| Agents Platform | White | `#FFFFFF` |
| D8:VIEW | Tinted | `#f0f4f8` |
| Proof Block / Case Study | Dark | `linear-gradient(160deg, #0c1428 0%, #0f2560 45%, #081F5C 100%)` |
| Closing CTA | White | `#FFFFFF` · border-top: `1px solid #E4E7EC` |
| Footer | Deep Navy | `#040e2e` · border-top: `rgba(255,255,255,0.055)` |

### Element Colors by Type

| Element | Type 1 — White | Type 2 — Tinted | Type 3 — Dark |
|---|---|---|---|
| Background | `#FFFFFF` | `#f0f4f8` | `--gradient-hero` |
| H1, H2 | `#081F5C` | `#081F5C` | `#FFFFFF` |
| H3 / Subhead | `#0477BF` | `#0477BF` | `#0477BF` |
| Eyebrow | `#0477BF` | `#0477BF` | `#0477BF` |
| Body | `#333333` | `#333333` | `#FFFFFF` (85% opacity) |

---

## 5. Navigation

Floating white glassmorphism pill. Fixed at top (`top: 16px`). Hides on scroll down, reveals on scroll up. **Background is white/translucent — not navy.** Border-radius is `14px`, not a full pill.

### Specs

| Property | Value |
|---|---|
| Position | `fixed`, `top: 16px`, `z-index: 1000` |
| Max width | `1200px` |
| Height | `54px` |
| Padding | `0 24px 0 28px` |
| Background (at top) | `rgba(255, 255, 255, 0.88)` |
| Background (scrolled) | `rgba(255, 255, 255, 0.96)` |
| Backdrop filter | `blur(24px)` |
| Border | `1px solid rgba(8, 31, 92, 0.1)` |
| Border radius | `14px` — NOT 9999px |
| Shadow (at top) | `0 2px 8px rgba(8,31,92,0.06)` |
| Shadow (scrolled) | `0 4px 24px rgba(8,31,92,0.1)` |
| Link color | `#0477BF` |
| Link hover | `#081F5C` |
| Link font size | `14px` |
| Link font weight | `500` |
| Link gap | `28px` |

### Nav Links (locked order)

```
Platform · Agents · Use Cases · D8:LAB · About Us
```

### CTA

`"Book a Demo"` — see Buttons section for style. Nav size: `font-size: 13px`, `padding: 9px 22px`.

```css
/* Navigation */
nav {
  position: fixed;
  top: 16px; left: 0; right: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  padding: 0 20px;
}

.nav-pill {
  width: 100%; max-width: 1200px;
  display: flex; align-items: center; justify-content: space-between;
  height: 54px;
  padding: 0 24px 0 28px;
  background: rgba(255, 255, 255, 0.88);   /* scrolled: 0.96 */
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(8, 31, 92, 0.1);
  border-radius: 14px;
  transition: background 0.25s ease, box-shadow 0.25s ease,
              transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease;
}

.nav-link {
  color: #0477BF;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.15s ease;
}
.nav-link:hover        { color: #081F5C; }
.nav-link:focus-visible {
  outline: 2px solid #0477BF;
  outline-offset: 4px;
  border-radius: 4px;
}
```

---

## 6. Buttons

Primary CTA is **navy background (`#081F5C`)** with a blue-green glow pseudo-element that reveals on hover. Border-radius: `24px`. Two CTA labels are in use.

### CTA Labels

| Context | Label |
|---|---|
| Navigation | `Book a Demo` |
| Hero, closing section, footer | `Get in touch.` |

### Size Variants

| Variant | Font size | Padding |
|---|---|---|
| Nav | `13px` | `9px 22px` |
| Hero | `15px` | `14px 32px` |
| Closing CTA | `16px` | `17px 40px` |

```css
/* Primary Button — Navy + Blue-Green Glow */
.btn-primary {
  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 600;
  color: #ffffff;
  border-radius: 24px;       /* NOT --radius-pill */
  background: #081F5C;       /* navy — NOT blue */
  text-decoration: none;
  white-space: nowrap;
  transition: transform 0.18s ease;
}

/* Glow pseudo-element */
.btn-glow {
  position: absolute;
  inset: -4px;
  background: linear-gradient(135deg, #0477BF 0%, #3ecf8e 50%, #0477BF 100%);
  opacity: 0.28;
  filter: blur(12px);
  transition: opacity 0.45s ease;
  pointer-events: none;
  border-radius: 24px;
}

.btn-primary:hover              { transform: translateY(-1px); }
.btn-primary:hover .btn-glow   { opacity: 0.88; }
.btn-primary:active             { transform: scale(0.98); }
.btn-primary:focus-visible {
  outline: 3px solid var(--color-blue);
  outline-offset: 3px;
}

/* Text wrapper — keeps label above glow layer */
.btn-inner {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 6px;
}
```

---

## 7. Cards

Cards use tonal layering — no decorative borders on body cards. Background shifts on hover. No shadow on cards at rest (`--shadow-sm` for floating elements only).

| Component | Radius | Padding | Border | Hover |
|---|---|---|---|---|
| Outer container | `--radius-xl` (3rem) | — | none | — |
| Content card | `--radius-lg` (2rem) | `2.5rem` | none | background: `--color-grey-light` |
| Persona card | `24px` | `36px` | `1px solid rgba(8,31,92,0.08)` | bg `#edf4fc`, translateY(-3px), border blue |
| Agent card | `14px` | — | `1px solid rgba(8,31,92,0.10)` | bg `#081F5C`, text white, accent `#3ecf8e` |

```css
/* Content card */
.card {
  background: var(--color-bg);
  border-radius: var(--radius-lg);
  padding: 2.5rem;
  transition: background var(--duration-fast) var(--ease-out);
}
.card:hover { background: var(--color-grey-light); }

/* Persona card */
.persona-card {
  background: #FFFFFF;
  border-radius: 24px;
  padding: 36px;
  border: 1px solid rgba(8, 31, 92, 0.08);
  transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
}
.persona-card:hover {
  background: #edf4fc;
  transform: translateY(-3px);
  border-color: rgba(4, 119, 191, 0.2);
}

/* Agent card */
.agent-card {
  background: #f5f8fb;
  border: 1px solid rgba(8, 31, 92, 0.10);
  border-radius: 14px;
}
.agent-card.active,
.agent-card:hover {
  background: #081F5C;
  color: white; /* accent: #3ecf8e */
}
```

---

## 8. Inputs

Visible label always above the field — never placeholder-only. Ghost border on focus. `--radius-xl` (3rem) corners.

```css
label {
  display: block;
  font-size: var(--text-sm);
  font-weight: var(--fw-semibold);
  color: var(--color-navy);
  margin-bottom: var(--space-2);
}

input, textarea, select {
  width: 100%;
  background: var(--color-bg);
  border-radius: var(--radius-xl);
  padding: 0.875rem 1.25rem;
  font-size: var(--text-base);
  font-family: var(--font-sans);
  color: var(--color-body);
  border: 1px solid var(--color-border);
  outline: none;
  transition: border-color var(--duration-fast) var(--ease-out),
              background var(--duration-fast) var(--ease-out);
}

input:focus {
  border-color: var(--color-blue);
  background: rgba(4, 119, 191, 0.04);
}
```

---

## 9. Bento Grid Layout

12-column asymmetrical grid. **Never equal-width columns (4/4/4 or 3/3/3/3).** Section padding uses `clamp()` for fluid sizing.

### Approved Column Spans

| Span pair | Use |
|---|---|
| 8 / 4 | Primary content + supporting stat |
| 7 / 5 | Feature + secondary |
| 9 / 3 | Wide primary + narrow aside |
| 12 | Full-width accent row |

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 5vw, 3rem);
}

.bento-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-8);
}

.col-8  { grid-column: span 8; }
.col-4  { grid-column: span 4; }
.col-7  { grid-column: span 7; }
.col-5  { grid-column: span 5; }
.col-9  { grid-column: span 9; }
.col-3  { grid-column: span 3; }
.col-12 { grid-column: span 12; }

/* Section padding */
section {
  padding: clamp(64px, 8vw, 96px) clamp(1.5rem, 5vw, 80px);
}

/* Hero padding */
.hero {
  padding: 100px clamp(2rem, 5%, 64px) 80px;
}

/* Responsive */
@media (max-width: 900px) {
  .col-8, .col-7, .col-9 { grid-column: span 12; }
  .col-4, .col-5, .col-3 { grid-column: span 12; }
}
```

---

## 10. Motion

Only animate `transform` and `opacity`. Never `width`, `height`, `top`, `left`, `margin`, or `padding`. Never `transition-all`. Use `--ease-reveal` for all scroll-triggered entrances.

### Duration & Easing Reference

| Use | Duration | Easing |
|---|---|---|
| Hover / active / focus | `120ms` (`--duration-fast`) | `--ease-out` |
| UI state transitions | `240ms` (`--duration-base`) | `--ease-out` |
| Scroll reveals | `0.72s` | `--ease-reveal` (0.22, 1, 0.36, 1) |
| Hero word stagger | `0.6s` per word, 80ms stagger | `--ease-reveal` |
| Dashboard hover reset | `0.55s` | `--ease-reveal` |
| Ticker scroll | `30s linear infinite` | linear |
| Button glow reveal | `0.45s` | ease |

### Scroll Reveal Pattern

```css
.d8-reveal {
  opacity: 0;
  transform: translateY(28px);
  transition: opacity 0.72s cubic-bezier(0.22, 1, 0.36, 1),
              transform 0.72s cubic-bezier(0.22, 1, 0.36, 1);
}
.d8-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Stagger: 60–80ms per item, max 2–3 items */
.item:nth-child(1) { transition-delay: 0ms; }
.item:nth-child(2) { transition-delay: 70ms; }
.item:nth-child(3) { transition-delay: 140ms; }
```

### Named Keyframes (used on site)

```css
/* Hero H1: word-by-word blur-to-focus */
@keyframes d8WordReveal {
  from { filter: blur(8px); opacity: 0; transform: translateY(5px); }
  to   { filter: blur(0);   opacity: 1; transform: translateY(0); }
}
/* Usage: animation: d8WordReveal 0.6s cubic-bezier(0.22,1,0.36,1) forwards */
/* Stagger: 80ms per word */

/* "LIVE" status pulse */
@keyframes d8LivePulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.25; }
}
/* Usage: animation: d8LivePulse 2s ease-in-out infinite */

/* Dashboard card 3D float */
@keyframes d8CardFloat {
  0%, 100% { transform: perspective(900px) rotateY(-5deg) rotateX(3deg) translateY(0px); }
  50%      { transform: perspective(900px) rotateY(-5deg) rotateX(3deg) translateY(-10px); }
}
/* Usage: animation: d8CardFloat 6s ease-in-out infinite */
/* Paused on hover; resets to center with 0.55s cubic-bezier(0.22,1,0.36,1) */

/* Ticker bar infinite scroll */
@keyframes d8TickerScroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
/* Usage: animation: d8TickerScroll 30s linear infinite */

/* Required: reduced-motion override */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 11. Elevation & Depth

Hierarchy through tonal layering, not decorative shadows. Shadows are Navy-tinted — never pure grey.

### Shadow Tokens

| Token | Value | Use |
|---|---|---|
| `--shadow-sm` | `0 1px 2px 0 rgba(8, 31, 92, 0.05)` | Cards at rest |
| `--shadow-md` | `0 4px 6px -1px rgba(8, 31, 92, 0.10), 0 2px 4px -2px rgba(8, 31, 92, 0.08)` | Interactive elements on hover |
| `--shadow-lg` | `0 20px 40px rgba(8, 31, 92, 0.08)` | Floating overlays |
| `--shadow-nav` | `0 10px 40px rgba(8, 31, 92, 0.18)` | Nav pill only |

### Surface Layers

| Layer | Token | Color | Used for |
|---|---|---|---|
| Base | `--color-bg` | `#FAFBFF` | Page background |
| Tinted | `--color-tinted-surface` | `#f0f4f8` | Alternating sections |
| Elevated | `--color-surface` | `#FFFFFF` | Cards, panels |
| Floating | `rgba(255,255,255,0.88–0.96)` | White glass | Navigation pill |
| Dark | `--gradient-hero` | `#0c1428 → #081F5C` | Hero, proof block |
| Footer | `--color-deep-navy` | `#040e2e` | Footer only |

---

## 12. Rules

### Do

- Left-justify all text — exception: closing CTA section (center-aligned, intentional, one occurrence)
- Alternate White (`#FFFFFF`) and Tinted (`#f0f4f8`) sections — never stack the same type twice
- Use at least `--space-24` (96px) vertical padding between major section breaks
- Use `--text-4xl` in `#0477BF` for key stat metrics
- Include all three interactive states: hover + focus-visible + active
- Use semantic HTML: `nav`, `main`, `section`, `article`, `aside`, `footer`
- Set `font-display: swap` on all custom fonts
- Use Navy-tinted shadows: `rgba(8, 31, 92, ...)`
- Use specific numbers in copy: 97% faster, $1.2M+, 100% coverage
- Respect `prefers-reduced-motion` on all animations
- Use `--ease-reveal` (`cubic-bezier(0.22, 1, 0.36, 1)`) for scroll-triggered reveals
- Use `14px` border-radius for the nav pill — not full pill

### Don't

- Don't use `hr` or `1px` borders to separate sections — use tonal background shifts
- Don't center-align text (exception: closing CTA section only)
- Don't use pure grey shadows — always Navy-tinted
- Don't use `transition-all` — specify the property
- Don't animate layout properties: `width`, `height`, `top`, `left`, `margin`, `padding`
- Don't use equal-column grids (4/4/4 or 3/3/3/3)
- Don't over-animate — 2–3 orchestrated moments per page, max
- Don't use pure `#FFFFFF` as a page background — use `#FAFBFF`
- Don't use a blue button background — the CTA is navy (`#081F5C`) with a glow
- Don't use a navy nav pill — the nav is white glass
- Don't use default Tailwind colors (`indigo-500`, `blue-600`, etc.)
- Don't use 3D robots, glowing brains, Matrix code, or stock handshakes
- Don't use placeholder text as a label substitute
- Don't ship without verifying WCAG AA (4.5:1 normal text, 3:1 large/UI)

---

## 13. Anti-Patterns

| Pattern | Why it fails | Do instead |
|---|---|---|
| `transition-all` | Animates layout props, triggers reflow | `transition: transform 120ms ease-out` |
| `col-span-4 × 3` | Flat hierarchy, no visual rhythm | 8/4, 7/5, or 9/3 split |
| `border: 1px solid #eee` | Lines are a layout failure | Tonal background shift or negative space |
| Pure grey shadow | Disconnected from brand | Navy-tinted: `rgba(8, 31, 92, 0.10)` |
| `background: #FFFFFF` on `<body>` | No depth, no tonal system | `--color-bg: #FAFBFF` |
| Placeholder as label | Disappears on focus, fails a11y | Visible persistent label above field |
| Blue CTA button (`#0477BF` bg) | Wrong — CTA is navy with glow | `background: #081F5C` + `.btn-glow` |
| Navy nav pill | Wrong — nav is white glass | `rgba(255,255,255,0.88)`, `blur(24px)`, `border-radius: 14px` |
| Multiple equal CTAs | Decision paralysis | One primary CTA per page |
| `--color-grey-mid: #694A38` | Wrong value (legacy) | `--color-grey-mid: #6B7280` |

---

## 14. Copy Rules

### Write this way
- Lead with outcome, not feature: "97% faster" beats "AI-powered audit agent"
- One idea per sentence. Short sentences.
- Use specific numbers: 97% faster, $1.2M+, 8 agents, 90 days
- Active voice only
- Write like explaining it at a coffee meeting

### Never use these words
`transform` · `leverage` · `cutting-edge` · `seamless` · `robust` · `powerful`

### Locked Copy

| Element | Locked Value |
|---|---|
| Nav CTA label | `Book a Demo` |
| Hero / closing / footer CTA label | `Get in touch.` |
| Homepage H1 | `We get your data ready for AI.` |
| Homepage subhead | `No migration. No new tech.` |
| Agents section headline | `Meet the D8:Agents who get your data ready for AI.` |
| One-liner | `We make enterprise data AI-ready — without moving it anywhere` |
| KCU metric | `97% faster` (not 60%) |
| Agent count | `8` (locked) |
| OFM reference (until approved) | `a leading out-of-home media company` |
| KCU anonymous reference | `local credit unions` (on homepage) |

---

*Prepared by Gregg Eiler · Enablement Lead · D8TAOPS · April 2026*
