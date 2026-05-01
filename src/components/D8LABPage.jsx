import React, { useState, useEffect, useMemo, useRef } from 'react';
import HomepageNav from './HomepageNav';
import { GLOBAL_CSS, GlobalFooter } from './HomepageSections';

// ── Hooks ─────────────────────────────────────────────────────────────────────
function useStaggerReveal(count, threshold = 0.12) {
  const ref = useRef(null);
  const [visibleCount, setVisibleCount] = useState(0);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        io.disconnect();
        let i = 0;
        const step = () => { setVisibleCount(n => n + 1); if (++i < count) setTimeout(step, 80); };
        step();
      }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [count, threshold]);
  return [ref, visibleCount];
}

// ── Particle canvas ───────────────────────────────────────────────────────────
function ParticleCanvas({ count = 60, scale = 1 }) {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let particles = [], raf;
    const resize = () => {
      const p = canvas.parentElement; const r = p.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = r.width * dpr; canvas.height = r.height * dpr;
      canvas.style.width = r.width + 'px'; canvas.style.height = r.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * r.width, y: Math.random() * r.height,
        vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.18,
        size: Math.random() * 1.5 + 0.4,
        opacity: Math.min(1, (Math.random() * 0.4 + 0.12) * scale),
      }));
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas.parentElement);
    const animate = () => {
      const w = canvas.width / (window.devicePixelRatio || 1);
      const h = canvas.height / (window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
      }
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(4,119,191,${(1 - d / 140) * 0.18 * scale})`; ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(4,119,191,${p.opacity})`; ctx.fill();
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />;
}

const DATA = [
  {
    t: 'article', label: 'Article',
    h: 'Why we build agents that go to the data — not the other way around.',
    rt: '4 min read',
    body: `<p>Most enterprise AI projects fail before they start. Not because the models are bad. Because 80% of the project timeline gets consumed by a single question: <em>how do we move the data?</em></p>
<div class="callout"><p>The standard playbook — centralize everything into a warehouse, clean it, then train on it — was designed for a world where AI was a quarterly batch job. That world is gone.</p></div>
<h3>The migration trap</h3>
<p>When a buyer chooses Snowflake or Databricks, they're implicitly agreeing to a multi-month migration project before any AI can run. Data has to leave its original environment, be transformed, loaded, reconciled, and governed all over again. Every step is a failure point. Every transformation is a lineage break.</p>
<h3>The agent-first alternative</h3>
<p>D8TAOPS agents deploy inside your existing environment. <code>D8:INGEST</code> connects to your sources. <code>D8:CAT</code> maps what's there. <code>D8:CURATE</code> cleans it in place. Nothing leaves your perimeter unless you tell it to.</p>
<p>The result: a production-ready pipeline in 4–6 weeks, running against your real data, in your real infrastructure — with no migration required.</p>`,
  },
  {
    t: 'paper', label: 'Paper',
    h: 'The hybrid pipeline pattern: deterministic agents vs. LLM calls.',
    rt: '5 min read',
    body: `<p>One of the most common mistakes in agentic AI system design is reaching for a language model when a deterministic function would do the job faster, cheaper, and more reliably.</p>
<div class="callout"><p>Our production deployments use Python agents for rule-based logic and a single LLM supervisor for judgment calls. This is the architecture that gets to 1 API call per run instead of 30.</p></div>
<h3>When determinism wins</h3>
<p>Percent rent calculations. Loan covenant checks. Field validation against a known schema. These are 2+2=4 problems. A deterministic agent handles them in milliseconds with 100% consistency. An LLM handles them at higher cost and lower consistency per record.</p>
<h3>Where the LLM earns its place</h3>
<p>Narrative generation. Anomaly classification where edge cases require judgment. One LLM call at the end of a deterministic pipeline — reviewing output and writing the human-readable summary — is the pattern that works at production scale.</p>`,
  },
  {
    t: 'article', label: 'Article',
    h: 'Governance built in: how D8:SEC enforces policy without slowing the pipeline.',
    rt: '6 min read',
    body: `<p>Security added after deployment is security that fights the pipeline. Access controls that sit outside the agent layer create bottlenecks, audit gaps, and failure modes that only surface under load.</p>
<div class="callout"><p>D8:SEC runs at the agent level. It doesn't inspect traffic at a perimeter — it participates in every action, on every record, continuously.</p></div>
<h3>What "built in" actually means</h3>
<p>Every data access event is evaluated against policy before it executes. Field-level masking is applied at the source. Every action — read, transform, route, export — is logged with full context: who, what, when, which agent, which policy applied.</p>
<h3>Why this matters in regulated industries</h3>
<p>Financial services, healthcare, and media companies need explainable audit trails. Not logs after the fact — proof that policy was applied correctly at every step. <code>D8:SEC</code> makes that trail automatic. <code>D8:OBSERVE</code> surfaces it in real time.</p>`,
  },
  {
    t: 'paper', label: 'Paper',
    h: 'Data lineage at scale: full traceability without a data catalog rebuild.',
    rt: '7 min read',
    body: `<p>Data catalogs promised to solve lineage. Most implementations delivered a documentation project — manually maintained, perpetually out of date, and disconnected from the actual pipeline.</p>
<div class="callout"><p>D8:CAT maintains origin-to-output lineage on every record, automatically, as a byproduct of normal pipeline operation. No separate cataloging project required.</p></div>
<h3>Lineage as a side effect, not a project</h3>
<p>When <code>D8:INGEST</code> pulls from a source, it registers the origin. When <code>D8:CAT</code> classifies a field, it records the classification logic applied. When <code>D8:CURATE</code> transforms a record, it logs before and after state.</p>
<p>By the time data reaches <code>D8:STAGE</code>, it carries a complete chain of custody — accumulated through normal agent execution, not a separate project.</p>`,
  },
  {
    t: 'article', label: 'Article',
    h: 'Human-in-the-loop by design: where agents stop and people decide.',
    rt: '4 min read',
    body: `<p>Agentic AI doesn't mean unattended AI. The most reliable production systems aren't the ones that run without human input — they're the ones that know exactly when to stop and ask.</p>
<div class="callout"><p>We wire human checkpoints into every pipeline from day one. Not as an afterthought. As a deliberate design decision that makes the system more trustworthy, not less autonomous.</p></div>
<h3>The checkpoint pattern</h3>
<p><code>D8:FLOW</code> acts as the supervisor agent. It routes tasks, enforces sequencing — and triggers review requests when conditions require human judgment. Threshold exceptions. Policy ambiguities. Edge cases outside the training distribution.</p>
<h3>Why this builds trust faster</h3>
<p>Teams that start with human-in-the-loop typically expand autonomy within the first billing cycle after seeing consistently clean output. Checkpoints are the on-ramp, not the ceiling.</p>`,
  },
  {
    t: 'paper', label: 'Paper',
    h: 'From 5% sampling to 100% coverage: loan audit automation at a regional credit union.',
    rt: '8 min read',
    body: `<p>A regional credit union was auditing 5% of its loan portfolio manually. Thirty minutes per loan. Good auditors doing careful work — reviewing a fraction of the risk.</p>
<div class="callout"><p>After a 6-week deployment: 100% portfolio coverage. Every loan. Every night. 97% faster. No migration. No new infrastructure. No rip and replace.</p></div>
<h3>The problem with sampling</h3>
<p>Sample-based audit isn't a methodology choice — it's a resource constraint disguised as one. When you can only review 5% of loans, you're betting the problems aren't in the 95% you didn't look at.</p>
<h3>The deployment</h3>
<p><code>D8:INGEST</code> connected to the existing loan management system. <code>D8:FLOW</code> ran policy checks nightly. <code>D8:OBSERVE</code> surfaced exceptions for human review each morning.</p>
<h3>Results</h3>
<p>97% faster per loan. 100% portfolio coverage. 30% fewer human review discrepancies. 40–50% cost reduction per audit cycle. Break-even under 12 months.</p>`,
  },
  {
    t: 'video', label: 'Video',
    h: 'Pipeline walkthrough: how a funded loan moves through 6 agents in under 3 seconds.',
    rt: '8 min watch',
    body: `<p>This walkthrough traces a single funded loan document through each of the six D8TAOPS agents — from ingest to final audit report.</p>
<div class="callout"><p>Total processing time per loan: under 3 seconds. Every field validated. Every policy checked. Full audit trail written. No human required until a flag is raised.</p></div>
<h3>What you'll see</h3>
<p>The walkthrough shows the real dashboard output at each agent handoff — not a mockup. You'll see <code>D8:INGEST</code> acquire the document, <code>D8:CAT</code> classify all 47 fields, <code>D8:CURATE</code> resolve two data quality issues, and <code>D8:FLOW</code> route the loan to the audit queue without a single manual step.</p>
<h3>Why this matters for your team</h3>
<p>Most teams don't believe the speed claims until they see the execution trace. This walkthrough is the execution trace — real timestamps, real data (anonymized), real exception handling.</p>`,
  },
];

const LAB_CSS = `
/* ─── ANIMATIONS ─── */
@keyframes labFadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes labCountPop {
  0%   { transform: scale(1); }
  40%  { transform: scale(1.35); }
  70%  { transform: scale(0.92); }
  100% { transform: scale(1); }
}

/* Featured row cards: above-fold CSS animation */
.lab-featured-row .lab-card { opacity: 0; animation: labFadeUp var(--dur-slow) var(--ease-out) both; }
.lab-featured-row .lab-card:nth-child(1) { animation-delay: 80ms; }
.lab-featured-row .lab-card:nth-child(2) { animation-delay: 150ms; }

.lab-header .lab-eyebrow { animation: labFadeUp 400ms 60ms  var(--ease-out) both; }
.lab-header h2            { animation: labFadeUp 600ms 120ms cubic-bezier(0.22,1,0.36,1) both; }
.lab-header p             { animation: labFadeUp 600ms 200ms cubic-bezier(0.22,1,0.36,1) both; }

/* ─── HEADER ─── */
.lab-header {
  padding: 100px clamp(1.5rem, 5vw, 80px) 80px;
  background-image:
    radial-gradient(circle, rgba(4,119,191,0.18) 1px, transparent 1px),
    linear-gradient(160deg, #0c1428 0%, #0f2560 45%, #081F5C 100%);
  background-size: 24px 24px, 100% 100%;
  position: relative;
  overflow: hidden;
}
.lab-header::after {
  content: 'D8:LAB';
  position: absolute;
  bottom: -28px; right: 48px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 140px;
  font-weight: 600;
  color: rgba(255,255,255,0.04);
  line-height: 1;
  pointer-events: none;
  user-select: none;
  letter-spacing: -0.04em;
}
.lab-header::before {
  content: '';
  position: absolute;
  top: 0; right: 0;
  width: 400px; height: 100%;
  background: linear-gradient(135deg, transparent 40%, rgba(4,119,191,0.08) 100%);
  pointer-events: none;
}
.lab-header-content {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}
.lab-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(77, 184, 255, 0.9);
  margin-bottom: 20px;
}
.lab-eyebrow::before {
  content: '';
  width: 24px; height: 1px;
  background: rgba(77, 184, 255, 0.9);
}
.lab-header h2 {
  font-size: clamp(36px, 4vw, 56px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--white);
  max-width: 580px;
  margin-bottom: 16px;
}
.lab-header p {
  font-size: 16px;
  color: rgba(255,255,255,0.65);
  max-width: 460px;
  line-height: 1.65;
}

/* ─── FILTER BAR ─── */
.lab-filter-bar {
  padding: 0 clamp(1.5rem, 5vw, 80px);
  background: var(--white);
  border-bottom: 1px solid var(--grey-rule);
  display: flex;
  align-items: center;
  position: sticky;
  top: 82px;
  z-index: 50;
  box-shadow: 0 2px 12px rgba(8,31,92,0.05);
}
.lab-fb {
  padding: 16px 20px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: none;
  background: none;
  color: var(--grey-light);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  transition: color var(--dur-fast), border-color var(--dur-fast);
  display: flex;
  align-items: center;
  gap: 8px;
}
.lab-fb:hover { color: var(--navy); }
.lab-fb.active { color: var(--navy); border-bottom-color: var(--blue); }
.lab-count-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px; height: 18px;
  padding: 0 5px;
  border-radius: 20px;
  background: var(--surface);
  color: var(--grey-mid);
  font-size: 9px;
  font-weight: 600;
  transition: background var(--dur-base), color var(--dur-base);
}
.lab-fb.active .lab-count-badge { background: var(--blue); color: var(--white); }
.lab-count-badge.pop { animation: labCountPop 320ms var(--ease-spring); }

/* ─── CONTENT AREA ─── */
.lab-content-wrap {
  padding: 48px clamp(1.5rem, 5vw, 80px) 96px;
  background: var(--white);
  transition: margin-right 0.4s var(--ease-out);
}
.lab-content-wrap.pane-open { margin-right: 580px; }

/* ─── FEATURED ROW ─── */
.lab-featured-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

/* ─── CARD GRID ─── */
.lab-card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

/* ─── BASE CARD ─── */
.lab-card {
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 28px;
  cursor: pointer;
  transition:
    border-color var(--dur-base),
    box-shadow var(--dur-base),
    transform 0.2s var(--ease-out),
    background var(--dur-base);
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}
.lab-card::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--blue) 0%, var(--blue-hover) 100%);
  opacity: 0;
  transition: opacity var(--dur-base);
}
.lab-card:hover {
  border-color: var(--border-strong);
  box-shadow: 0 8px 30px rgba(8,31,92,0.09), 0 2px 8px rgba(8,31,92,0.05);
  transform: translateY(-3px);
}
.lab-card:hover::after { opacity: 1; }
.lab-card.active {
  border-color: var(--blue);
  box-shadow: 0 0 0 3px var(--blue-tint), 0 8px 30px rgba(8,31,92,0.09);
}
.lab-card.active::after { opacity: 1; }
.lab-card.hide { display: none; }

/* ─── HERO CARDS ─── */
.lab-card-hero {
  background-image:
    radial-gradient(circle, rgba(4,119,191,0.18) 1px, transparent 1px),
    linear-gradient(160deg, #0c1428 0%, #0f2560 45%, #081F5C 100%);
  background-size: 24px 24px, 100% 100%;
  border-color: transparent;
}
.lab-card-hero .lab-card-headline {
  color: var(--white);
  font-size: 17px;
  line-height: 1.3;
  letter-spacing: -0.015em;
}
.lab-card-hero .lab-card-teaser { color: rgba(255,255,255,0.55); }
.lab-card-hero .lab-card-tag { background: rgba(4,119,191,0.3); color: rgba(255,255,255,0.85); }
.lab-card-hero .lab-card-tag.paper { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.7); }
.lab-card-hero .lab-card-rule { border-color: rgba(255,255,255,0.1); }
.lab-card-hero .lab-card-rt { color: rgba(255,255,255,0.4); }
.lab-card-hero .lab-read-btn { color: rgba(255,255,255,0.5); }
.lab-card-hero:hover { border-color: rgba(4,119,191,0.5); box-shadow: 0 8px 30px rgba(4,119,191,0.18), 0 2px 8px rgba(0,0,0,0.25); }
.lab-card-hero:hover .lab-read-btn { color: var(--white); gap: 10px; }
.lab-card-hero.active { border-color: var(--blue); box-shadow: 0 0 0 3px rgba(4,119,191,0.25); }

/* ─── CARD IMAGE ─── */
.lab-card-img {
  width: calc(100% + 56px);
  margin: -28px -28px 20px;
  height: 150px;
  border-radius: 11px 11px 0 0;
  overflow: hidden;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}
.lab-card-img img { width: 100%; height: 100%; object-fit: cover; display: block; }
.lab-card-img-ph {
  width: 100%; height: 100%;
  background: linear-gradient(135deg, var(--navy) 0%, var(--blue) 100%);
  position: relative;
  overflow: hidden;
}
.lab-card-img-ph::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
  background-size: 18px 18px;
}

/* ─── VIDEO ─── */
.lab-card-tag.video { background: rgba(62,207,142,0.12); color: #15803d; }
.lab-video-player {
  background: #000;
  aspect-ratio: 16 / 9;
  width: 100%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}
.lab-video-player iframe,
.lab-video-player video { width: 100%; height: 100%; border: none; display: block; }
.lab-video-player-ph {
  width: 100%; height: 100%;
  position: absolute; inset: 0;
  background:
    radial-gradient(circle, rgba(4,119,191,0.18) 1px, transparent 1px),
    linear-gradient(160deg, #0c1428 0%, #0f2560 45%, #081F5C 100%);
  background-size: 24px 24px, 100% 100%;
  display: flex; align-items: center; justify-content: center;
}
.lab-video-player-btn {
  width: 56px; height: 56px;
  background: rgba(255,255,255,0.95);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 24px rgba(0,0,0,0.35);
}


/* ─── CARD INTERNALS ─── */
.lab-tag-row { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; }
.lab-card-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 4px 9px;
  border-radius: 4px;
  background: var(--blue-tint);
  color: var(--blue);
}
.lab-card-tag.paper { background: rgba(8,31,92,0.06); color: var(--navy); }
.lab-card-tag::before {
  content: '';
  width: 5px; height: 5px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}
.lab-card-headline {
  font-size: 16px;
  font-weight: 700;
  color: var(--navy);
  line-height: 1.35;
  letter-spacing: -0.01em;
  margin-bottom: 10px;
  flex: 1;
}
.lab-card-teaser { font-size: 13px; color: var(--grey-mid); line-height: 1.65; }
.lab-card-rule { border: none; border-top: 1px solid var(--grey-rule); margin: 20px 0 0; }
.lab-card-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
}
.lab-card-rt {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: var(--grey-light);
  letter-spacing: 0.04em;
}
.lab-read-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 600;
  color: var(--blue);
  letter-spacing: 0.01em;
  transition: gap 0.2s var(--ease-spring), color var(--dur-fast);
}
.lab-card:hover .lab-read-btn,
.lab-card.active .lab-read-btn { color: var(--navy); gap: 10px; }

/* ─── OVERLAY ─── */
.lab-pane-overlay {
  position: fixed;
  inset: 0;
  background: rgba(8,31,92,0.22);
  backdrop-filter: blur(3px);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.35s var(--ease-out);
  z-index: 90;
}
.lab-pane-overlay.show { opacity: 1; pointer-events: auto; }

/* ─── READING PANE ─── */
.lab-pane {
  position: fixed;
  top: 0; right: 0;
  width: 580px;
  height: 100vh;
  background: var(--white);
  border-left: 1px solid var(--border);
  box-shadow: -12px 0 50px rgba(8,31,92,0.12);
  transform: translateX(100%);
  transition: transform 0.4s var(--ease-out);
  display: flex;
  flex-direction: column;
  z-index: 100;
  overflow: hidden;
}
.lab-pane.open { transform: translateX(0); }

.lab-pane-top {
  padding: 16px 24px;
  border-bottom: 1px solid var(--grey-rule);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  background: var(--white);
}
.lab-pane-top-left { display: flex; align-items: center; gap: 14px; }
.lab-pane-type {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--blue);
  background: var(--blue-tint);
  padding: 4px 10px;
  border-radius: 4px;
}
.lab-pane-nav { display: flex; gap: 4px; }
.lab-pnb {
  width: 30px; height: 30px;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--grey-light);
  transition: all var(--dur-fast);
}
.lab-pnb:hover:not(:disabled) {
  border-color: var(--border-strong);
  color: var(--navy);
  background: var(--surface);
}
.lab-pnb:disabled { opacity: 0.3; cursor: default; }
.lab-close-btn {
  width: 32px; height: 32px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--grey-mid);
  font-size: 13px;
  transition: all var(--dur-fast);
}
.lab-close-btn:hover {
  background: var(--surface);
  border-color: var(--border-strong);
  color: var(--navy);
}
.lab-read-progress {
  height: 2px;
  background: var(--blue);
  transition: width 80ms linear;
  flex-shrink: 0;
}
.lab-pane-scroll { flex: 1; overflow-y: auto; scroll-behavior: smooth; }

/* ─── PANE HERO ─── */
.lab-pane-hero {
  background-image:
    radial-gradient(circle, rgba(4,119,191,0.18) 1px, transparent 1px),
    linear-gradient(160deg, #0c1428 0%, #0f2560 45%, #081F5C 100%);
  background-size: 24px 24px, 100% 100%;
  padding: 32px 32px 28px;
  position: relative;
  overflow: hidden;
}
.lab-pane-hero::before {
  content: '';
  position: absolute;
  bottom: -40px; right: -40px;
  width: 220px; height: 220px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(4,119,191,0.28) 0%, transparent 70%);
  pointer-events: none;
}
.lab-pane-headline {
  font-size: 22px;
  font-weight: 700;
  color: var(--white);
  line-height: 1.25;
  letter-spacing: -0.02em;
  margin-bottom: 16px;
  position: relative;
}
.lab-pane-meta-row {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
  position: relative;
}
.lab-pane-author { font-size: 12px; color: rgba(255,255,255,0.5); }
.lab-pane-author strong { color: rgba(255,255,255,0.8); font-weight: 500; }
.lab-pane-rt-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  color: var(--blue);
  background: rgba(4,119,191,0.18);
  padding: 4px 10px;
  border-radius: 20px;
  letter-spacing: 0.04em;
}

/* ─── PANE BODY ─── */
.lab-pane-body { padding: 36px 32px 52px; background: var(--white); }
.lab-pane-body h3 {
  font-size: 16px; font-weight: 700; color: var(--navy);
  margin: 32px 0 10px; line-height: 1.3; letter-spacing: -0.01em;
}
.lab-pane-body h3:first-child { margin-top: 0; }
.lab-pane-body p { font-size: 15px; line-height: 1.8; color: var(--grey-dark); margin-bottom: 16px; }
.lab-pane-body em { font-style: italic; color: var(--navy); }
.lab-pane-body .callout {
  background: var(--blue-tint);
  border-left: 3px solid var(--blue);
  padding: 16px 20px;
  border-radius: 0 8px 8px 0;
  margin: 28px 0;
}
.lab-pane-body .callout p { margin: 0; font-size: 14px; color: var(--navy); font-weight: 500; line-height: 1.65; }
.lab-pane-body code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  background: var(--blue-tint);
  color: var(--blue);
  padding: 2px 7px;
  border-radius: 4px;
  white-space: nowrap;
}

/* ─── PANE FOOTER ─── */
.lab-pane-foot {
  padding: 14px 24px;
  border-top: 1px solid var(--grey-rule);
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  background: var(--white);
}
.lab-btn-primary {
  padding: 10px 22px;
  background: var(--blue);
  color: var(--white);
  border: none;
  border-radius: 8px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background var(--dur-fast), transform 0.15s var(--ease-spring);
}
.lab-btn-primary:hover { background: var(--blue-hover); transform: translateY(-1px); }
.lab-btn-ghost {
  padding: 10px 16px;
  background: none;
  color: var(--grey-mid);
  border: 1px solid var(--border);
  border-radius: 8px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: border-color var(--dur-fast), color var(--dur-fast);
}
.lab-btn-ghost:hover { border-color: var(--navy); color: var(--navy); }

/* ─── RESPONSIVE ─── */
@media (max-width: 900px) {
  .lab-header { padding: 80px 24px 56px; }
  .lab-filter-bar { padding: 0 24px; overflow-x: auto; }
  .lab-content-wrap { padding: 32px 24px 64px; }
  .lab-content-wrap.pane-open { margin-right: 0; }
  .lab-featured-row { grid-template-columns: 1fr !important; }
  .lab-card-grid { grid-template-columns: 1fr !important; }
}
@media (max-width: 600px) {
  .lab-pane { width: 100vw; }
}

/* ─── REDUCED MOTION ─── */
@media (prefers-reduced-motion: reduce) {
  .lab-featured-row .lab-card,
  .lab-header .lab-eyebrow,
  .lab-header h2,
  .lab-header p {
    animation-duration: 0.01ms !important;
    animation-delay: 0ms !important;
    opacity: 1 !important;
    transform: none !important;
  }
  .lab-pane,
  .lab-content-wrap,
  .lab-pane-overlay,
  .lab-read-progress,
  .lab-card,
  .lab-read-btn {
    transition-duration: 0.01ms !important;
  }
}
`;

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 7H11M8 4L11 7L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronLeft = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M7 2L4 6L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M5 2L8 6L5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <circle cx="5" cy="5" r="4" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M5 3V5.5L6.5 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

export default function D8LABPage() {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [activeFilter, setActiveFilter] = useState('all');
  const [scrollPct, setScrollPct] = useState(0);
  const [cardsRef, cardsVisible] = useStaggerReveal(5, 0.05);

  const pscrollRef = useRef(null);
  const badgesRef = useRef({});
  const stateRef = useRef({ currentIndex: -1, visibleIndices: [] });

  const visibleIndices = useMemo(() => {
    return DATA.map((_, i) => i).filter(i =>
      activeFilter === 'all' || DATA[i].t === activeFilter
    );
  }, [activeFilter]);

  const counts = useMemo(() => {
    const artCount   = (activeFilter === 'paper'   || activeFilter === 'video') ? 0 : DATA.filter(d => d.t === 'article').length;
    const paperCount = (activeFilter === 'article' || activeFilter === 'video') ? 0 : DATA.filter(d => d.t === 'paper').length;
    const videoCount = (activeFilter === 'article' || activeFilter === 'paper') ? 0 : DATA.filter(d => d.t === 'video').length;
    return { all: DATA.length, article: artCount, paper: paperCount, video: videoCount };
  }, [activeFilter]);

  // Keep ref in sync for stale-closure-safe keyboard handler
  stateRef.current.currentIndex = currentIndex;
  stateRef.current.visibleIndices = visibleIndices;

  const featHidden = activeFilter !== 'all' && DATA[0].t !== activeFilter && DATA[1].t !== activeFilter;
  const paneOpen   = currentIndex !== -1;
  const paneData   = paneOpen ? DATA[currentIndex] : null;
  const panePos    = paneOpen ? visibleIndices.indexOf(currentIndex) : -1;

  function openPane(i) {
    setCurrentIndex(i);
    setScrollPct(0);
    if (pscrollRef.current) pscrollRef.current.scrollTop = 0;
  }

  function closePane() {
    setCurrentIndex(-1);
  }

  function handleFilterClick(f) {
    // Pop badge before state update so DOM ref is still valid
    const el = badgesRef.current[f];
    if (el) {
      el.classList.remove('pop');
      void el.offsetWidth; // force reflow to restart animation
      el.classList.add('pop');
    }
    setActiveFilter(f);
    // Close pane if its card will be hidden
    if (currentIndex !== -1) {
      const stillVisible = f === 'all' || DATA[currentIndex].t === f;
      if (!stillVisible) setCurrentIndex(-1);
    }
  }

  // Keyboard handler (uses ref to avoid stale closures)
  useEffect(() => {
    const handler = (e) => {
      const { currentIndex: ci, visibleIndices: vi } = stateRef.current;
      if (ci === -1) return;
      if (e.key === 'Escape') {
        setCurrentIndex(-1);
      } else if (e.key === 'ArrowRight') {
        const n = vi.indexOf(ci) + 1;
        if (n < vi.length) { setCurrentIndex(vi[n]); setScrollPct(0); }
      } else if (e.key === 'ArrowLeft') {
        const n = vi.indexOf(ci) - 1;
        if (n >= 0) { setCurrentIndex(vi[n]); setScrollPct(0); }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // Reset pane scroll on open and track progress
  useEffect(() => {
    const el = pscrollRef.current;
    if (!el) return;
    const handler = () => {
      const h = el.scrollHeight - el.clientHeight;
      setScrollPct(h > 0 ? Math.min((el.scrollTop / h) * 100, 100) : 0);
    };
    el.addEventListener('scroll', handler, { passive: true });
    return () => el.removeEventListener('scroll', handler);
  }, []);

  // Reset scroll when a new article opens
  useEffect(() => {
    if (currentIndex !== -1 && pscrollRef.current) {
      pscrollRef.current.scrollTop = 0;
      setScrollPct(0);
    }
  }, [currentIndex]);

  function cardClass(i, extra) {
    const hidden = activeFilter !== 'all' && DATA[i].t !== activeFilter;
    const active = currentIndex === i;
    let cls = `lab-card${extra ? ' ' + extra : ''}`;
    if (hidden) cls += ' hide';
    if (active) cls += ' active';
    return cls;
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS + LAB_CSS }} />
      <HomepageNav activePath="/lab" />

      {/* ── Header ──────────────────────────────────────────── */}
      <div className="lab-header">
        <ParticleCanvas scale={1.5} />
        <div className="lab-header-content">
          <div className="lab-eyebrow">From the Lab</div>
          <h2>How we think about <span style={{ fontStyle: 'italic', color: 'rgba(77,184,255,0.9)' }}>data readiness.</span></h2>
          <p>AI changes daily. But one thing doesn't — the need to use good data. Your data.</p>
        </div>
      </div>

      {/* ── Filter bar ──────────────────────────────────────── */}
      <div className="lab-filter-bar">
        {['all', 'article', 'paper', 'video'].map(f => (
          <button
            key={f}
            className={`lab-fb${activeFilter === f ? ' active' : ''}`}
            onClick={() => handleFilterClick(f)}
          >
            {f === 'all' ? 'All' : f === 'article' ? 'Articles' : f === 'paper' ? 'Papers' : 'Videos'}
            {' '}
            <span
              className="lab-count-badge"
              ref={el => { if (el) badgesRef.current[f] = el; }}
            >
              {counts[f]}
            </span>
          </button>
        ))}
      </div>

      {/* ── Content ─────────────────────────────────────────── */}
      <div className={`lab-content-wrap${paneOpen ? ' pane-open' : ''}`}>

        {/* Featured row */}
        <div
          className="lab-featured-row"
          style={featHidden ? { display: 'none' } : undefined}
        >
          {[
            { i: 0, teaser: 'Most AI deployments fail because teams spend 80% of their time moving data. We don\'t do that — and it changes everything about how fast you can ship.' },
            { i: 1, teaser: '1 API call per run instead of 30. How deterministic agents and a single LLM supervisor reach production scale.' },
          ].map(({ i, teaser }) => (
            <div
              key={i}
              className={cardClass(i, 'lab-card-hero')}
              onClick={() => openPane(i)}
            >
              <div className="lab-tag-row">
                <span className={`lab-card-tag${DATA[i].t === 'paper' ? ' paper' : ''}`}>
                  {DATA[i].label}
                </span>
              </div>
              <div className="lab-card-headline">{DATA[i].h}</div>
              <div className="lab-card-teaser">{teaser}</div>
              <hr className="lab-card-rule" />
              <div className="lab-card-foot">
                <span className="lab-card-rt">{DATA[i].rt}</span>
                <span className="lab-read-btn">Read <ArrowRight /></span>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary grid */}
        <div className="lab-card-grid" ref={cardsRef}>
          {[
            { i: 2, slot: 0, teaser: 'Security at the agent level behaves differently than security bolted on at the perimeter.' },
            { i: 3, slot: 1, teaser: 'D8:CAT maintains origin-to-output lineage on every record — as a byproduct of normal pipeline operation.' },
            { i: 4, slot: 2, teaser: 'Agentic AI doesn\'t mean unattended AI. Here\'s how we wire checkpoints into every pipeline from day one.' },
            { i: 5, slot: 3, teaser: 'A production deployment case study. 97% faster. Every loan. Every night. No migration.' },
            { i: 6, slot: 4, teaser: 'Watch a single loan move through all 6 agents — real timestamps, real data, real exception handling.' },
          ].map(({ i, slot, teaser }) => (
            <div
              key={i}
              className={cardClass(i)}
              style={{
                opacity: cardsVisible > slot ? 1 : 0,
                transform: cardsVisible > slot ? 'translateY(0)' : 'translateY(18px)',
                transition: `opacity 480ms ${slot * 80}ms cubic-bezier(0.22,1,0.36,1), transform 480ms ${slot * 80}ms cubic-bezier(0.22,1,0.36,1)`,
              }}
              onClick={() => openPane(i)}
            >
              <div className="lab-tag-row">
                <span className={`lab-card-tag${DATA[i].t === 'paper' ? ' paper' : DATA[i].t === 'video' ? ' video' : ''}`}>
                  {DATA[i].label}
                </span>
              </div>
              <div className="lab-card-headline">{DATA[i].h}</div>
              <div className="lab-card-teaser">{teaser}</div>
              <hr className="lab-card-rule" />
              <div className="lab-card-foot">
                <span className="lab-card-rt">{DATA[i].rt}</span>
                <span className="lab-read-btn">{DATA[i].t === 'video' ? 'Watch' : 'Read'} <ArrowRight /></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Overlay ─────────────────────────────────────────── */}
      <div
        className={`lab-pane-overlay${paneOpen ? ' show' : ''}`}
        onClick={closePane}
      />

      {/* ── Reading pane ────────────────────────────────────── */}
      <div className={`lab-pane${paneOpen ? ' open' : ''}`}>
        <div
          className="lab-read-progress"
          style={{ width: `${scrollPct}%` }}
        />
        <div className="lab-pane-top">
          <div className="lab-pane-top-left">
            <span className="lab-pane-type">{paneData?.label ?? ''}</span>
            <div className="lab-pane-nav">
              <button
                className="lab-pnb"
                aria-label="Previous article"
                disabled={panePos <= 0}
                onClick={() => {
                  const n = panePos - 1;
                  if (n >= 0) openPane(visibleIndices[n]);
                }}
              >
                <ChevronLeft />
              </button>
              <button
                className="lab-pnb"
                aria-label="Next article"
                disabled={panePos >= visibleIndices.length - 1}
                onClick={() => {
                  const n = panePos + 1;
                  if (n < visibleIndices.length) openPane(visibleIndices[n]);
                }}
              >
                <ChevronRight />
              </button>
            </div>
          </div>
          <button className="lab-close-btn" aria-label="Close" onClick={closePane}>✕</button>
        </div>

        <div className="lab-pane-scroll" ref={pscrollRef}>
          {paneData?.t === 'video' ? (
            <>
              <div className="lab-video-player">
                <div className="lab-video-player-ph">
                  <div className="lab-video-player-btn">
                    <svg width="18" height="20" viewBox="0 0 18 20" fill="none">
                      <path d="M2 2L16 10L2 18V2Z" fill="#081F5C"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="lab-pane-hero" style={{ padding: '24px 32px 20px' }}>
                <h1 className="lab-pane-headline" style={{ fontSize: 18 }}>{paneData?.h ?? ''}</h1>
                <div className="lab-pane-meta-row">
                  <span className="lab-pane-rt-badge"><ClockIcon />{paneData?.rt ?? ''}</span>
                </div>
              </div>
              <div
                className="lab-pane-body"
                dangerouslySetInnerHTML={{ __html: paneData?.body ?? '' }}
              />
            </>
          ) : (
            <>
              <div className="lab-pane-hero">
                <h1 className="lab-pane-headline">{paneData?.h ?? ''}</h1>
                <div className="lab-pane-meta-row">
                  <span className="lab-pane-author">
                    <strong>D8TAOPS</strong> · Research &amp; Engineering
                  </span>
                  <span className="lab-pane-rt-badge">
                    <ClockIcon />
                    {paneData?.rt ?? ''}
                  </span>
                </div>
              </div>
              <div
                className="lab-pane-body"
                dangerouslySetInnerHTML={{ __html: paneData?.body ?? '' }}
              />
            </>
          )}
        </div>

        <div className="lab-pane-foot">
          <button className="lab-btn-primary">{paneData?.t === 'video' ? 'Watch video ↗' : 'Read full article ↗'}</button>
          <button className="lab-btn-ghost" onClick={closePane}>Close</button>
        </div>
      </div>

      <GlobalFooter />
    </>
  );
}
