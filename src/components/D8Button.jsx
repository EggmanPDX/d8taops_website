import React, { useEffect } from 'react'

const BLUE  = '#0477BF'
const NAVY  = '#081F5C'
const BLUE_SUBTLE = '#4db8ff'
const NAVY_SUBTLE = '#0a2068'

const STYLE_ID = 'd8-btn-shiny'

const CSS = `
@property --gradient-angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
@property --gradient-angle-offset {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
@property --gradient-percent {
  syntax: "<percentage>";
  initial-value: 5%;
  inherits: false;
}
@property --gradient-shine {
  syntax: "<color>";
  initial-value: white;
  inherits: false;
}

.d8-btn {
  --shiny-bg:     ${NAVY};
  --shiny-bg-sub: ${NAVY_SUBTLE};
  --shiny-fg:     #ffffff;
  --shiny-hl:     ${BLUE};
  --shiny-hl-sub: ${BLUE_SUBTLE};
  --animation:    d8-gradient-angle linear infinite;
  --duration:     3s;
  --shadow-size:  2px;
  --transition:   800ms cubic-bezier(0.25, 1, 0.5, 1);

  isolation: isolate;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  outline-offset: 4px;
  padding: 14px 32px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.2;
  border: 1px solid transparent;
  border-radius: 9999px;
  color: var(--shiny-fg);
  background:
    linear-gradient(var(--shiny-bg), var(--shiny-bg)) padding-box,
    conic-gradient(
      from calc(var(--gradient-angle) - var(--gradient-angle-offset)),
      transparent,
      var(--shiny-hl)     var(--gradient-percent),
      var(--gradient-shine) calc(var(--gradient-percent) * 2),
      var(--shiny-hl)     calc(var(--gradient-percent) * 3),
      transparent         calc(var(--gradient-percent) * 4)
    ) border-box;
  box-shadow: inset 0 0 0 1px var(--shiny-bg-sub);
  transition: var(--transition);
  transition-property: --gradient-angle-offset, --gradient-percent, --gradient-shine;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  box-sizing: border-box;
  -webkit-appearance: none;
  appearance: none;
}

.d8-btn::before,
.d8-btn::after,
.d8-btn > span::before {
  content: "";
  pointer-events: none;
  position: absolute;
  inset-inline-start: 50%;
  inset-block-start: 50%;
  translate: -50% -50%;
  z-index: -1;
}

.d8-btn:active { translate: 0 1px; }

/* Rotating dots sweep */
.d8-btn::before {
  --size: calc(100% - var(--shadow-size) * 3);
  --position: 2px;
  --space: calc(var(--position) * 2);
  width: var(--size);
  height: var(--size);
  background: radial-gradient(
    circle at var(--position) var(--position),
    white calc(var(--position) / 4),
    transparent 0
  ) padding-box;
  background-size: var(--space) var(--space);
  background-repeat: space;
  mask-image: conic-gradient(
    from calc(var(--gradient-angle) + 45deg),
    black,
    transparent 10% 90%,
    black
  );
  border-radius: inherit;
  opacity: 0.4;
  z-index: -1;
}

/* Inner shimmer disc */
.d8-btn::after {
  --animation: d8-shimmer linear infinite;
  width: 100%;
  aspect-ratio: 1;
  background: linear-gradient(-50deg, transparent, var(--shiny-hl), transparent);
  mask-image: radial-gradient(circle at bottom, transparent 40%, black);
  opacity: 0.6;
}

/* Text span — z-index as flex item; no position:relative so span::before anchors to button */
.d8-btn > span {
  z-index: 1;
}

/* Bottom glow breathe */
.d8-btn > span::before {
  --size: calc(100% + 1rem);
  width: var(--size);
  height: var(--size);
  box-shadow: inset 0 -1ex 2rem 4px var(--shiny-hl);
  opacity: 0;
  transition: opacity var(--transition);
  animation: calc(var(--duration) * 1.5) d8-breathe linear infinite;
}

/* Idle — animations paused (second layer is reverse+paused, composes on hover) */
.d8-btn,
.d8-btn::before,
.d8-btn::after {
  animation:
    var(--animation) var(--duration),
    var(--animation) calc(var(--duration) / 0.4) reverse paused;
  animation-composition: add;
}

/* Hover — widen gradient arc, shift shine color, run all layers */
.d8-btn:is(:hover, :focus-visible) {
  --gradient-percent: 20%;
  --gradient-angle-offset: 95deg;
  --gradient-shine: var(--shiny-hl-sub);
}
.d8-btn:is(:hover, :focus-visible),
.d8-btn:is(:hover, :focus-visible)::before,
.d8-btn:is(:hover, :focus-visible)::after {
  animation-play-state: running;
}
.d8-btn:is(:hover, :focus-visible) > span::before { opacity: 1; }

@keyframes d8-gradient-angle { to { --gradient-angle: 360deg; } }
@keyframes d8-shimmer         { to { rotate: 360deg; } }
@keyframes d8-breathe {
  from, to { scale: 1; }
  50%       { scale: 1.2; }
}
`

export default function D8Button({
  children,
  as: Element = 'a',
  style,
  innerStyle,
  ...props
}) {
  useEffect(() => {
    let el = document.getElementById(STYLE_ID)
    if (!el) {
      el = document.createElement('style')
      el.id = STYLE_ID
      document.head.appendChild(el)
    }
    el.textContent = CSS
  }, [])

  // innerStyle carries padding/fontSize overrides — apply to outer so they affect sizing
  return (
    <Element className="d8-btn" style={{ ...innerStyle, ...style }} {...props}>
      <span>{children}</span>
    </Element>
  )
}
