import React from 'react';
import { Globe, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import { GooeyText } from './GooeyText';

// HomepageSections.jsx — D8TAOPS homepage modeled on the real site, brief colors

const NAVY = '#081F5C';
const BLUE = '#0477BF';
const BLUE_LIGHT = '#048ABF';
const BODY = '#333333';
const MUTED = '#515151';
const BG_LIGHT = '#F1F5F9';
const BG = '#FAFBFF';
const WHITE = '#FFFFFF';
const SUCCESS = '#22C55E';
const EASE = 'cubic-bezier(0.23, 1, 0.32, 1)';

// Reusable single-line section eyebrow: `D8:CODE` in grey mono.
function SectionEyebrow({ code, muted = false }) {
  return (
    <span style={{
      display: 'block', marginBottom: 12,
      fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700,
      letterSpacing: '0.14em', textTransform: 'uppercase',
      color: muted ? 'rgba(255,255,255,0.6)' : 'var(--color-blue)',
    }}>{code}</span>
  );
}

const HERO_MORPH_TEXTS = [
  'No Rip-and-tear systems.',
  'No New platforms.',
  'No External data slop.',
  'No Security risks.',
  'No High-paid consultants.',
  'No IT migrations.',
  'No Manual audits necessary.',
  'No Unorganized data.',
];

// ============================================================
// HERO — particle canvas + typewriter on navy→blue gradient
// ============================================================
const rotatingPhrases = [
  'No migration.', 'No new tech.', 'No rip-and-tear.', 'No hallucinating.',
  'No bad data.', 'No external data.', 'No connecting outside the org.',
  'No generic results.', 'No costly software.', 'No foreign data.',
];

function ParticleCanvas() {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    const COLORS = ['rgba(4,119,191,', 'rgba(4,138,191,', 'rgba(180,210,245,', 'rgba(255,255,255,'];
    let particles = [];
    let raf, t = 0;
    const resize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = r.width * dpr; canvas.height = r.height * dpr;
      canvas.style.height = r.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: 280 }, () => ({
        x: Math.random() * r.width,
        y: Math.random() * r.height,
        size: Math.random() * 1 + 0.3,
        opacity: Math.random() * 0.7 + 0.3,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.25,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.008 + 0.003,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(canvas.parentElement);
    const animate = () => {
      const r = canvas.getBoundingClientRect();
      const w = r.width, h = r.height;
      ctx.clearRect(0, 0, w, h); t += 1;
      for (const p of particles) {
        p.x += p.vx + Math.sin(t * p.speed + p.phase) * 0.25;
        p.y += p.vy + Math.cos(t * p.speed * 1.3 + p.phase) * 0.15;
        if (p.x < -20) p.x = w + 10; if (p.x > w + 20) p.x = -10;
        if (p.y < -20) p.y = h + 10; if (p.y > h + 20) p.y = -10;
        const sparkle = 0.5 + 0.5 * Math.sin(t * p.speed * 2 + p.phase);
        const alpha = p.opacity * (0.6 + sparkle * 0.4);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        g.addColorStop(0, p.color + (alpha * 0.9) + ')');
        g.addColorStop(0.4, p.color + (alpha * 0.3) + ')');
        g.addColorStop(1, p.color + '0)');
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,235,250,${alpha})`; ctx.fill();
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" style={{
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    pointerEvents: 'none', zIndex: 0,
  }} />;
}

function TextScramble({ text, duration = 800, speed = 40, characterSet, style }) {
  const defaults = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const chars = characterSet || defaults;
  const [display, setDisplay] = React.useState(text);
  React.useEffect(() => {
    const steps = duration / speed;
    let step = 0;
    const id = setInterval(() => {
      let out = '';
      const progress = step / steps;
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') { out += ' '; continue; }
        if (progress * text.length > i) out += text[i];
        else out += chars[Math.floor(Math.random() * chars.length)];
      }
      setDisplay(out);
      step++;
      if (step > steps) { clearInterval(id); setDisplay(text); }
    }, speed);
    return () => clearInterval(id);
  }, [text, duration, speed]);
  return <span style={style}>{display}</span>;
}

function ScrambleRotator() {
  const [idx, setIdx] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setIdx(p => (p + 1) % rotatingPhrases.length), 2400);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ fontFamily: 'var(--font-sans)', fontSize: 'clamp(28px, 3.6vw, 44px)', fontWeight: 400, color: 'rgba(255,255,255,0.9)' }}>
      <TextScramble key={idx} text={rotatingPhrases[idx]} duration={900} speed={35} />
    </span>
  );
}

const PANEL_ITEMS = [
  { strong: 'Runs on top of your stack.', muted: '' },
  { strong: 'Your data stays put.', muted: 'On-premise, in the cloud, SaaS platforms.' },
  { strong: 'Governed by design.', muted: 'Auditable outputs. Human-in-the-loop.' },
  { strong: 'Live in 90 days.', muted: 'Not multi-year migrations.' },
];

function HeroSection() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Background — untouched */}
      <div style={{
        position: 'relative', width: '100%',
        minHeight: 'max(680px, 90vh)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #0c1428 0%, #0f2560 40%, #0477BF 100%)',
      }}>
        <ParticleCanvas />

        {/* Two-column content grid */}
        <div
          className="hero-grid"
          style={{
            position: 'relative', zIndex: 1,
            width: '100%', maxWidth: 1200,
            padding: '80px clamp(2rem, 5%, 64px)',
            display: 'grid',
            gridTemplateColumns: '1.15fr 0.85fr',
            gap: 80,
            alignItems: 'center',
          }}
        >
          {/* ── LEFT COLUMN ── */}
          <div>
            <p className="hero-eyebrow" style={{
              margin: '0 0 14px', fontSize: 12, color: '#2ea062',
              fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>
              Agent orchestration · Regulated industries
            </p>

            <h1
              className="hero-h1"
              style={{
                margin: '0 0 20px', fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 700,
                color: '#ffffff', lineHeight: 1.08, letterSpacing: '-0.02em',
              }}
            >
              We get <span style={{ color: '#2ea062' }}>YOUR</span> data ready for AI.
            </h1>

            <h2 style={{
              margin: '0 0 22px', fontSize: 20, fontWeight: 400,
              color: 'rgba(255,255,255,0.65)', lineHeight: 1.5, maxWidth: 480,
              letterSpacing: '-0.01em',
            }}>
              Agentic systems tailored to your infrastructure. Governed, auditable outputs — deployed in 90 days.
            </h2>

            {/* Morphing "No [word]" line */}
            <div style={{ margin: '0 0 32px', height: 36 }}>
              <GooeyText
                texts={HERO_MORPH_TEXTS}
                morphTime={1.1}
                cooldownTime={2.2}
                style={{ height: '100%', justifyContent: 'flex-start' }}
                textStyle={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(14px, 1.4vw, 17px)',
                  fontWeight: 500,
                  color: '#2ea062',
                  letterSpacing: '0.01em',
                  textAlign: 'left',
                }}
              />
            </div>

            {/* CTA row */}
            <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
              <a href="#contact" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                padding: '14px 30px', fontSize: 15, fontWeight: 600,
                background: '#ffffff', color: '#08183a', borderRadius: 24,
                textDecoration: 'none', whiteSpace: 'nowrap',
              }}>
                Get in touch.
              </a>
              <a href="#ingest" style={{
                fontSize: 14, color: 'rgba(255,255,255,0.6)',
                textDecoration: 'none', whiteSpace: 'nowrap',
              }}>
                See how it works →
              </a>
            </div>

            <div style={{ margin: '24px 0 0' }}>
              <p style={{
                margin: '0',
                fontSize: 10, color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                fontFamily: 'var(--font-sans)',
              }}>
                Deployed at Kitsap Credit Union and leading financial institutions.
              </p>
            </div>

            {/* NVIDIA badge */}
            <div style={{ marginTop: 28 }}>
              <img
                src="/assets/nvidia-inception.png"
                alt="NVIDIA Inception Program"
                style={{ height: 36, opacity: 0.75 }}
                onError={e => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextSibling.style.display = 'block';
                }}
              />
              <p style={{
                display: 'none', margin: 0,
                fontSize: 10, color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                fontFamily: 'var(--font-sans)',
              }}>
                NVIDIA INCEPTION MEMBER
              </p>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div style={{
            background: 'rgba(255,255,255,0.19)',
            border: '0.5px solid rgba(255,255,255,0.1)',
            borderRadius: 10,
            padding: '28px 32px',
          }}>
            <p style={{
              margin: '0 0 16px', fontFamily: 'var(--font-mono)', fontSize: 'clamp(14px, 1.4vw, 17px)', color: '#2ea062',
              fontWeight: 500, letterSpacing: '0.01em', textTransform: 'uppercase',
            }}>
              HOW WE'RE DIFFERENT
            </p>

            {PANEL_ITEMS.map((item, i) => (
              <div key={i} style={{
                display: 'flex', gap: 12,
                marginBottom: i === PANEL_ITEMS.length - 1 ? 0 : 14,
              }}>
                <div style={{
                  width: 18, height: 18, flexShrink: 0, marginTop: 1,
                  background: 'rgba(46,160,98,0.18)',
                  border: '1px solid rgba(46,160,98,0.4)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                    <path d="M1 4l3 3 5-6" stroke="#2ea062" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div style={{ fontSize: 'clamp(14px, 1.4vw, 17px)', lineHeight: 1.4 }}>
                  <strong style={{ color: '#fff', fontWeight: 600 }}>{item.strong}</strong>
                  {' '}
                  <span style={{ color: 'rgba(255,255,255,0.45)' }}>{item.muted}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// COMPARISON SECTION
// ============================================================
function ComparisonSection() {
  const rows = [
    { label: 'What it is', d8: 'Agent orchestration layer', platform: 'Data warehouse + analytics', generic: 'LLM wrapper' },
    { label: 'Where your data goes', d8: 'Stays in your environment', platform: 'Migrated to their cloud', generic: 'Sent to their API' },
    { label: 'What it produces', d8: 'Governed, auditable outputs', platform: 'A place to store and query data', generic: 'Unstructured responses' },
    { label: 'Governance', d8: 'Built-in, enforced per agent', platform: 'Inside their ecosystem only', generic: 'None' },
    { label: 'Timeline', d8: '90 days to production', platform: 'Multi-year migration + build', generic: 'Depends on what you wire up' },
    { label: 'Works with what you have', d8: 'Yes — runs on top', platform: 'Replaces what you have', generic: "Doesn't integrate deeply" },
  ];

  const BORDER = '1px solid #E4E7EC';

  return (
    <section style={{ padding: '96px 24px', background: BG_LIGHT, color: NAVY }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', margin: '0 auto 64px', fontSize: 'clamp(24px, 3vw, 32px)', color: NAVY, fontWeight: 700, lineHeight: 1.4, maxWidth: 800 }}>
          Not a warehouse. Not a generic AI tool.<br />
          The orchestration layer your stack has been missing.
        </h2>

        {/* The Table Wrapper matching Shadcn Table */}
        <div style={{
          width: '100%', overflowX: 'auto',
          borderRadius: 12, position: 'relative',
          background: WHITE,
          boxShadow: '0 4px 24px rgba(8,31,92,0.03)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, fontFamily: 'var(--font-sans)', textAlign: 'left' }}>
            <thead>
              <tr>
                <th style={{ padding: '24px 20px', fontWeight: 600, borderBottom: BORDER, borderRight: BORDER }}></th>
                <th style={{ padding: '24px 20px', fontWeight: 700, color: NAVY, borderBottom: BORDER, borderRight: BORDER }}>D8TAOPS</th>
                <th style={{ padding: '24px 20px', fontWeight: 600, color: MUTED, borderBottom: BORDER, borderRight: BORDER }}>Data Platforms (Snowflake, Databricks)</th>
                <th style={{ padding: '24px 20px', fontWeight: 600, color: MUTED, borderBottom: BORDER }}>Generic AI Tools</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i}>
                  <td style={{ padding: '20px', verticalAlign: 'middle', fontWeight: 700, color: NAVY, borderBottom: i === rows.length - 1 ? 'none' : BORDER, borderRight: BORDER }}>{r.label}</td>
                  <td style={{ padding: '20px', verticalAlign: 'middle', fontWeight: 700, color: NAVY, borderBottom: i === rows.length - 1 ? 'none' : BORDER, borderRight: BORDER }}>{r.d8}</td>
                  <td style={{ padding: '20px', verticalAlign: 'middle', fontWeight: 500, color: MUTED, borderBottom: i === rows.length - 1 ? 'none' : BORDER, borderRight: BORDER }}>{r.platform}</td>
                  <td style={{ padding: '20px', verticalAlign: 'middle', fontWeight: 500, color: MUTED, borderBottom: i === rows.length - 1 ? 'none' : BORDER }}>{r.generic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Caption */}
        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <p style={{ margin: '0 auto', fontSize: 15, color: '#18181b', lineHeight: 1.6, maxWidth: 800 }}>
            <strong style={{ color: BLUE }}>“We sit alongside them, not against them.”</strong> Already using Snowflake or Databricks? Good. We run alongside them. Our agents connect to your data wherever it lives, including inside your warehouse.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// WHO WE ARE — short left-justified intro
// ============================================================
function WhoWeAreSection() {
  return null;
}

// ============================================================
// WHAT WE DO — full-width audit widget
// ============================================================
const D8_AUDIT_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700&family=IBM+Plex+Mono:wght@400;500&display=swap');

  /* ── Outer section wrapper ── */
  .d8-audit-section {
    font-family: 'IBM Plex Sans', sans-serif;
    background: #eef2f7;
    padding: 4.5rem 3rem;
  }
  .d8-audit-inner { max-width: 1200px; margin: 0 auto; }

  /* ── Inner navy card ── */
  .d8-audit-card {
    background: #081F5C;
    border-radius: 18px;
    padding: 36px;
    color: #fff;
    position: relative;
    overflow: hidden;
  }
  .d8-audit-card::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(circle at 85% 10%, rgba(4,119,191,.18) 0%, transparent 50%),
                radial-gradient(circle at 10% 90%, rgba(255,255,255,.03) 0%, transparent 50%);
    pointer-events: none;
  }

  /* ── Zone 1: Header ── */
  .d8-audit-header {
    display: flex; justify-content: space-between; align-items: flex-start;
    gap: 24px; margin-bottom: 28px; position: relative;
  }
  .d8-audit-left { flex: 1; }
  .d8-audit-h2 {
    font-size: 22px; font-weight: 600; letter-spacing: -0.01em;
    margin: 0 0 8px 0; line-height: 1.2; color: #fff;
  }
  .d8-audit-subhead {
    font-size: 14px; color: rgba(255,255,255,0.52);
    line-height: 1.6; max-width: 580px; margin: 0;
  }
  .d8-audit-pills {
    display: flex; gap: 8px; flex-wrap: wrap; margin-top: 18px;
  }
  .d8-audit-pill {
    background: rgba(255,255,255,0.09); border-radius: 20px;
    padding: 5px 16px; font-size: 12px; color: rgba(255,255,255,0.75);
  }
  .d8-audit-shield {
    width: 48px; height: 48px; background: rgba(255,255,255,0.07);
    border-radius: 12px; display: flex; align-items: center;
    justify-content: center; flex-shrink: 0; position: relative;
  }

  /* ── Divider ── */
  .d8-audit-divider {
    border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 0 0 24px 0;
  }

  /* ── Zone 2: Live feed ── */
  .d8-audit-feed-hdr {
    display: flex; align-items: center; gap: 8px; margin-bottom: 16px;
  }
  .d8-audit-live-dot {
    width: 8px; height: 8px; border-radius: 50%; background: #26D07C;
    animation: d8AuditPulse 2s ease-in-out infinite; flex-shrink: 0;
  }
  @keyframes d8AuditPulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.3; }
  }
  .d8-audit-feed-label {
    font-family: 'IBM Plex Mono', monospace; font-size: 10px;
    letter-spacing: 0.12em; color: rgba(255,255,255,0.38); text-transform: uppercase;
  }
  .d8-audit-viewport {
    overflow: hidden; position: relative; height: 294px; margin-bottom: 28px;
  }
  .d8-audit-feed-inner { position: absolute; width: 100%; bottom: 0; }
  .d8-audit-row {
    display: flex; align-items: center; padding: 13px 0; gap: 16px;
    border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .d8-audit-row:last-child { border-bottom: none; }
  .d8-audit-row__ts {
    font-family: 'IBM Plex Mono', monospace; font-size: 11px;
    color: rgba(255,255,255,0.28); min-width: 40px; flex-shrink: 0;
  }
  .d8-audit-row__text {
    font-size: 14px; color: rgba(255,255,255,0.85); flex: 1; line-height: 1.4;
  }
  .d8-audit-row__badge {
    padding: 3px 12px; border-radius: 6px; font-size: 11px;
    font-weight: 500; white-space: nowrap;
  }
  .d8-audit-badge--done    { background: rgba(38,208,124,0.15);  color: #26D07C; }
  .d8-audit-badge--review  { background: rgba(232,168,56,0.15);   color: #e8a838; }
  .d8-audit-badge--running { background: rgba(79,180,245,0.15);   color: #4fb4f5; }
  .d8-audit-badge--queued  { background: rgba(255,255,255,0.07);  color: rgba(255,255,255,0.30); }
  @keyframes d8SlideIn  { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes d8SlideOut { from { opacity: 1; transform: translateY(0); }   to { opacity: 0; transform: translateY(-10px); } }
  .d8-audit-row.entering { animation: d8SlideIn  0.4s  ease forwards; }
  .d8-audit-row.leaving  { animation: d8SlideOut 0.35s ease forwards; }

  /* ── Zone 3: Metrics grid ── */
  .d8-audit-metrics {
    display: grid; grid-template-columns: auto 1fr 1fr 1fr;
    align-items: start;
    border-top: 1px solid rgba(255,255,255,0.08); padding-top: 24px;
  }
  .d8-audit-metric { padding-right: 32px; }
  .d8-audit-metric + .d8-audit-metric {
    padding-left: 32px; border-left: 1px solid rgba(255,255,255,0.07);
  }
  .d8-audit-metric:last-child { padding-right: 0; }
  .d8-audit-metric-lbl {
    font-family: 'IBM Plex Mono', monospace; font-size: 9px;
    letter-spacing: 0.12em; color: rgba(255,255,255,0.32);
    text-transform: uppercase; margin: 0 0 12px 0;
  }
  .d8-audit-big { font-size: 34px; font-weight: 600; color: #fff; margin: 0 0 6px 0; line-height: 1; }
  .d8-audit-big--blue { color: #4fb4f5; }
  .d8-audit-sub  { font-size: 12px; color: rgba(255,255,255,0.36); margin: 0; }
  /* bar rows */
  .d8-audit-bar-row { display: flex; align-items: center; gap: 10px; margin-bottom: 8px; }
  .d8-audit-bar-row:last-of-type { margin-bottom: 0; }
  .d8-audit-bar-track {
    flex: 1; height: 5px; background: rgba(255,255,255,0.08);
    border-radius: 3px; overflow: hidden;
  }
  .d8-audit-bar-fill { height: 100%; border-radius: 3px; width: 0; transition: width 1s ease; }
  .d8-audit-bar-val {
    font-family: 'IBM Plex Mono', monospace; font-size: 11px;
    color: rgba(255,255,255,0.45); min-width: 30px; text-align: right;
  }
  .d8-audit-bars-sub { margin-top: 8px; font-size: 12px; color: rgba(255,255,255,0.36); }

  /* ── Reveal animation ── */
  .d8-audit-reveal {
    opacity: 0; transform: translateY(16px);
    transition: opacity 0.4s ease, transform 0.4s ease;
  }
  .d8-audit-reveal.in { opacity: 1; transform: translateY(0); }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .d8-audit-metrics { grid-template-columns: 1fr 1fr; gap: 24px; }
    .d8-audit-metric + .d8-audit-metric { padding-left: 0; border-left: none; }
    .d8-audit-metric { padding-right: 0; border-bottom: 1px solid rgba(255,255,255,0.07); padding-bottom: 20px; }
    .d8-audit-metric:last-child { border-bottom: none; padding-bottom: 0; }
  }
  @media (max-width: 600px) {
    .d8-audit-section { padding: 3rem 1.25rem; }
    .d8-audit-card { padding: 24px; }
    .d8-audit-metrics { grid-template-columns: 1fr; }
    .d8-audit-h2 { font-size: 18px; }
  }

  /* ── Reduced motion ── */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

const s4Agents = [
  { num: 1, d: 'D8:INGEST',  n: 'Ingest',     r: 'Collect & normalize',
    what: 'Connects to your existing data sources — core systems, cloud storage, APIs — and normalizes everything into a unified layer automatically.',
    why: 'Most organizations have data spread across five or more systems that don\'t talk to each other. D8:INGEST replaces manual exports and one-off scripts with a governed, repeatable pipeline.',
    examples: [
      'Financial services: Connected to Kitsap Credit Union\'s core banking system and LOS overnight. Every loan record normalized and ready — no manual pull, no missing fields.',
      'Media & operations: Connected to billboard lease contract data by facility ID across hundreds of locations. All contract records pulled into a single normalized layer per billing cycle.',
      'Healthcare: Connected to EHR, insurance verification, and clinical research systems simultaneously. Patient records assembled from three siloed sources without manual export.',
      'Real estate: Normalized property data across MLS, internal portfolio systems, and financial platforms. One unified layer — no IT involvement required.',
    ]},
  { num: 2, d: 'D8:CAT',     n: 'Categorize', r: 'Classify & catalog',
    what: 'Discovers, classifies, and catalogs your data with full lineage tracking. Every dataset traceable from origin to current state.',
    why: 'You can\'t govern what you can\'t see. Without a catalog, teams don\'t know what data exists or whether they\'re allowed to use it. Shadow data creates compliance exposure and duplicated work.',
    examples: [
      'Financial services: Cataloged every loan record by type, origination date, and applicable policy version. Auditors traced any data point back to its source system in seconds.',
      'Media & operations: Classified lease contracts by property type, billing period, and calculation method. Every record tagged before the calculation pipeline ran.',
      'Healthcare: Cataloged patient records across EHR, billing, and lab systems. Every dataset tagged with origin, access permissions, and clinical context.',
      'Real estate: Classified portfolio properties by asset class, ownership structure, and market region. Full lineage from acquisition record to current valuation.',
    ]},
  { num: 3, d: 'D8:CURATE',  n: 'Curate',     r: 'Validate & clean',
    what: 'Validates and cleans your data before it reaches AI models — catching wrong formats, missing fields, and inconsistent values at the source.',
    why: 'Garbage in, garbage out. AI output is only as reliable as the data it runs on. D8:CURATE ensures models work with clean, structured data every time.',
    examples: [
      'Financial services: Flagged 84 loan records with missing or inconsistent fields before the audit ran. 100% coverage confirmed with no bad data reaching the policy check layer.',
      'Media & operations: Identified mismatched billing periods and duplicate facility records before the percent rent calculation ran. Zero calculation errors on output.',
      'Healthcare: Normalized patient records across EHR, billing, and lab systems — ensuring every field was complete and consistent before clinical recommendations were generated.',
      'Real estate: Cleaned stale comparable data and flagged properties with incomplete ownership records before the portfolio intelligence dashboard populated.',
    ]},
  { num: 4, d: 'D8:SEC',     n: 'Secure',     r: 'Enforce governance',
    what: 'Enforces role-based access controls, masks sensitive fields, and logs every action across the pipeline for compliance review.',
    why: 'Governance bolted on after the fact creates gaps. D8:SEC builds access control and audit logging directly into the pipeline — not as a separate layer.',
    examples: [
      'Financial services: Applied PII masking to borrower data. Enforced role-based access so only credentialed reviewers saw exception findings. Every action timestamped and logged.',
      'Media & operations: Enforced contract data access by billing team role. Sensitive lease terms masked from operations staff without clearance. Full change log maintained.',
      'Healthcare: Enforced HIPAA-compliant access controls on patient records. Masked sensitive clinical fields from non-treating staff. Every access event logged for audit.',
      'Real estate: Applied role-based access to financial performance data. Acquisition team saw full portfolio metrics. External advisors saw anonymized comparables only.',
    ]},
  { num: 5, d: 'D8:FLOW',    n: 'Flow',       r: 'Orchestrate workflow',
    what: 'Orchestrates the entire workflow. A supervisor agent coordinates task routing, policy checks, and handoffs between agents and human reviewers.',
    why: 'Without orchestration, complex pipelines break down at handoff points. D8:FLOW keeps every step in sequence and routes exceptions to humans at exactly the right moment.',
    examples: [
      'Financial services: Ran policy checks across all loan records. Automatically routed 31 exception findings to the compliance team. No manual triage required.',
      'Media & operations: Orchestrated the full percent rent calculation — Type A and Type B formulas applied in correct sequence, payment restriction rules enforced, payee splits separated automatically.',
      'Healthcare: Routed patient intake data through eligibility verification, prior authorization check, and clinical protocol matching — in sequence, without human coordination between steps.',
      'Real estate: Coordinated portfolio data refresh across four source systems. Flagged properties with stale valuations and routed them to the analyst team for manual review.',
    ]},
  { num: 6, d: 'D8:OBSERVE', n: 'Observe',    r: 'Monitor & trace',
    what: 'Monitors pipeline health in real time. Tracks every decision, override, and approval with full traceability for regulatory review.',
    why: 'Regulators don\'t just want results — they want to see how you got there. D8:OBSERVE generates a complete, explainable audit trail on every run.',
    examples: [
      'Financial services: Monitored the full audit run in real time. Produced a complete trail showing every policy decision, agent handoff, and human override. 99.4% accuracy confirmed.',
      'Media & operations: Logged every calculation step and IMS error classification decision. Full traceability from raw contract data to Tririga-ready output — every run.',
      'Healthcare: Tracked every clinical recommendation against the source data that informed it. Any override by a physician logged with rationale for compliance review.',
      'Real estate: Monitored portfolio dashboard refresh cycles. Flagged data latency issues before they reached the reporting layer. Every analyst override recorded.',
    ]},
  { num: 7, d: 'D8:STAGE',   n: 'Stage',      r: 'Package output',
    what: 'Delivers production-ready data products. Validates and prepares output before it reaches its final destination — dashboard, downstream system, or human reviewer.',
    why: 'Raw pipeline output isn\'t usable output. D8:STAGE ensures what comes out the other end is complete, validated, and formatted for immediate use.',
    examples: [
      'Financial services: Packaged all exception findings into a structured audit report. Validated completeness before handoff — zero manual reformatting by the compliance team.',
      'Media & operations: Validated ownership splits, separated payees, and delivered output in Tririga-ready format. Direct system entry — no manual reformatting.',
      'Healthcare: Formatted clinical recommendations into a structured patient summary for physician review. Complete, validated, ready to act on during the appointment.',
      'Real estate: Packaged portfolio intelligence into the standard board reporting format. Leadership received the deck-ready output — no analyst reformatting required.',
    ]},
  { num: 8, d: 'D8:VIEW',    n: 'View',       r: 'Surface to humans',
    what: 'Connects curated, validated data to your dashboard. The human-facing layer that gives operators and decision-makers exactly what they need to act.',
    why: 'The best pipeline in the world fails if the output isn\'t accessible. D8:VIEW closes the loop — turning agent work into visible, actionable intelligence.',
    examples: [
      'Financial services: Delivered the exception dashboard to the compliance team. Flagged loans, policy violations, and recommended actions — ready to review without opening a raw data file.',
      'Media & operations: Surfaced the completed billing run to the finance team. Payment totals, payee splits, and error classifications visible in one view — no spreadsheet required.',
      'Healthcare: Delivered a unified patient dashboard to the physician — EHR, insurance status, and clinical research in one view, available while the doctor was still in the room.',
      'Real estate: Delivered a live portfolio dashboard to leadership. Every property, current market comparables, and performance metrics — updated in real time, no IT request needed.',
    ]},
];

function S4Node({ agent, idx, activeIdx, setActiveIdx }) {
  return (
    <div
      className={`s4-node${activeIdx === idx ? ' active' : ''}`}
      onClick={() => setActiveIdx(idx)}
    >
      <div className="s4-node-inner">
        <div className="s4-badge">{agent.num}</div>
        <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0477BF', marginBottom: 3 }}>{agent.d}</div>
        <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 13, color: '#081F5C', marginBottom: 3 }}>{agent.n}</div>
        <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 400, fontSize: 11, color: '#333333', lineHeight: 1.3 }}>{agent.r}</div>
      </div>
    </div>
  );
}

function S4Connector() {
  return (
    <div className="s4-conn">
      <div className="s4-conn-line">
        <div className="s4-conn-pulse" />
      </div>
      <div className="s4-conn-arrow" />
    </div>
  );
}

function WhatWeDoSection() {
  const [activeIdx, setActiveIdx] = React.useState(null);
  const [exampleIndices, setExampleIndices] = React.useState({});

  const row1 = s4Agents.slice(0, 4);
  const row2 = s4Agents.slice(4, 8);

  const handleNodeClick = (idx) => {
    setActiveIdx(idx);
    setExampleIndices(prev => ({ ...prev, [idx]: prev[idx] ?? 0 }));
  };

  const cycleExample = (idx) => {
    setExampleIndices(prev => ({ ...prev, [idx]: ((prev[idx] ?? 0) + 1) % 4 }));
  };

  const renderRow = (rowAgents, startIdx) => (
    <div className="s4-row">
      {rowAgents.map((agent, i) => (
        <React.Fragment key={agent.d}>
          <S4Node agent={agent} idx={startIdx + i} activeIdx={activeIdx} setActiveIdx={handleNodeClick} />
          {i < rowAgents.length - 1 && <S4Connector />}
        </React.Fragment>
      ))}
    </div>
  );

  const active = activeIdx !== null ? s4Agents[activeIdx] : null;
  const exampleIdx = activeIdx !== null ? (exampleIndices[activeIdx] ?? 0) : 0;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: S4_CSS }} />
      <section style={{ background: '#f5f7fa', width: '100%', padding: '96px clamp(1rem, 5vw, 3rem)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0477BF', marginBottom: 16 }}>
            THE PLATFORM
          </div>
          <h2 style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: '#081F5C', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 12, textAlign: 'left' }}>
            Meet the D8:Agents who get your data ready for AI.
          </h2>
          <p style={{ fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 400, fontSize: 18, color: '#333333', maxWidth: 680, lineHeight: 1.6, margin: '0 0 48px 0' }}>
            The D8TAOPS Data Nervous System. Each agent handles a distinct job. Together, they take raw data from your systems to secure, governed, AI-ready output.
          </p>

          {renderRow(row1, 0)}

          <div className="s4-divider">
            <div className="s4-divider-line" />
            <span>continues →</span>
            <div className="s4-divider-line" />
          </div>

          {renderRow(row2, 4)}

          {active === null ? (
            <div className="s4-detail">
              <div className="s4-detail-prompt">Select an agent above to see what it does, why it matters, and a real-world example.</div>
            </div>
          ) : (
            <div className="s4-detail expanded">
              <div className="s4-detail-desig">{active.d}</div>
              <div className="s4-detail-name">{active.n}</div>
              <div className="s4-detail-what">{active.what}</div>
              <div className="s4-detail-row">
                <div className="s4-detail-block">
                  <div className="s4-detail-block-label">Why it matters</div>
                  <div className="s4-detail-block-text">{active.why}</div>
                </div>
                <div className="s4-detail-block">
                  <div className="s4-detail-block-label">Example</div>
                  <div className="s4-detail-block-text">{active.examples[exampleIdx]}</div>
                  <button className="s4-next-example" onClick={() => cycleExample(activeIdx)}>next example →</button>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>
    </>
  );
}



// ============================================================
// INGEST AGENT DEMO — orbiting sources + live log
// ============================================================
function IngestAgentDemo() {
  const [tick, setTick] = React.useState(0);
  const [logs, setLogs] = React.useState([]);
  const logRef = React.useRef(null);
  const sources = [
    { label: 'Postgres', angle: -45 },
    { label: 'CSV / Excel', angle: 0 },
    { label: 'REST API', angle: 45 },
  ];

  React.useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1400);
    return () => clearInterval(id);
  }, []);

  React.useEffect(() => {
    const src = sources[tick % sources.length];
    const ts = new Date().toLocaleTimeString([], { hour12: false });
    setLogs(prev => [...prev.slice(-4), `[${ts}] DB:INGEST ✓ pulled batch from ${src.label}`]);
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [tick]);

  const radius = 140;

  return (
    <section style={{ padding: '96px 24px', background: BG_LIGHT }}>
      <div style={{ maxWidth: 1000, margin: '0 auto' }}>
        <div style={{ marginBottom: 40, textAlign: 'center' }}>
          <SectionEyebrow code="D8:INGEST" />
          <h2 style={{ margin: '12px auto', fontSize: 'clamp(32px, 3.6vw, 48px)', fontWeight: 700, color: NAVY, letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: '22ch' }}>See the Ingest Agent in motion.</h2>
          <p style={{ margin: '0 auto', fontSize: 16, color: MUTED, maxWidth: 640, lineHeight: 1.6 }}>
            Watch as Ingest pulls from multiple sources, normalizes the payloads, and hands off a unified data layer to the next agent.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'stretch' }}>
          {/* Left Orbital Card */}
          <div style={{ position: 'relative', borderRadius: 12, background: WHITE, border: `1px solid #E4E7EC`, height: 400, overflow: 'hidden', boxShadow: '0 4px 12px rgba(8,31,92,0.03)' }}>
            <div style={{
              position: 'absolute', width: radius * 2, height: radius * 2,
              left: `calc(50% - ${radius}px)`, top: `calc(50% - ${radius}px)`,
              borderRadius: '50%', border: `1px dashed #E4E7EC`,
            }} />
            <div style={{
              position: 'absolute', width: radius * 3, height: radius * 3,
              left: `calc(50% - ${radius * 1.5}px)`, top: `calc(50% - ${radius * 1.5}px)`,
              borderRadius: '50%', border: `1px dashed #E4E7EC`,
            }} />

            {sources.map((s, i) => {
              const rad = s.angle * Math.PI / 180;
              const x = Math.cos(rad) * radius;
              const y = Math.sin(rad) * radius;
              const active = tick % sources.length === i;
              return (
                <React.Fragment key={s.label}>
                  <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}>
                    <line
                      x1={`calc(50% + ${x}px)`} y1={`calc(50% + ${y}px)`} x2="50%" y2="50%"
                      stroke={active ? '#CBD5E1' : '#F1F5F9'} strokeWidth={1}
                      style={{ transition: 'stroke 300ms' }} />
                  </svg>
                  <div style={{
                    position: 'absolute', left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`,
                    transform: `translate(-50%, -50%) scale(${active ? 1.05 : 1})`,
                    transition: 'transform 300ms',
                    background: WHITE, border: '1px solid #E4E7EC', padding: '8px 12px',
                    borderRadius: 8, color: NAVY, fontSize: 12, fontWeight: 600,
                    boxShadow: active ? '0 4px 12px rgba(8,31,92,0.05)' : 'none',
                    zIndex: 2
                  }}>
                    {s.label}
                  </div>
                  {active && (
                    <div key={`packet-${tick}`} style={{
                      position: 'absolute', left: '50%', top: '50%',
                      width: 8, height: 8, borderRadius: '4px', background: BLUE,
                      animation: `packet-${i} 1s ease-in-out forwards`,
                    }}>
                      <style>{`@keyframes packet-${i}{
                        0%{transform:translate(${x - 4}px,${y - 4}px) scale(0.6);opacity:0}
                        25%{opacity:1}
                        100%{transform:translate(-4px,-4px) scale(0.4);opacity:0}
                      }`}</style>
                    </div>
                  )}
                </React.Fragment>
              );
            })}

            {/* Center Agent */}
            <div style={{
              position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              background: NAVY, width: 88, height: 88, borderRadius: 12,
              justifyContent: 'center', color: WHITE, zIndex: 3,
              boxShadow: '0 8px 24px rgba(8,31,92,0.1)'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5V19A9 3 0 0 0 21 19V5"></path><path d="M3 12A9 3 0 0 0 21 12"></path></svg>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 800, letterSpacing: '0.05em' }}>DB:INGEST</span>
            </div>

            {/* ACTIVE badge */}
            <div style={{
              position: 'absolute', top: 20, left: 20,
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '6px 12px', borderRadius: 9999, background: '#F1F5F9',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: SUCCESS }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: NAVY }}>ACTIVE</span>
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Terminal */}
            <div style={{ borderRadius: 12, background: '#1E293B', color: WHITE, padding: 20, fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 1.6, height: 200, display: 'flex', flexDirection: 'column', boxShadow: '0 8px 24px rgba(8,31,92,0.1)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B' }} />
                <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981' }} />
                <span style={{ marginLeft: 12, color: 'rgba(255,255,255,0.5)', fontSize: 11, letterSpacing: '0.1em' }}>INGEST.LOG</span>
              </div>
              <div ref={logRef} style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {logs.map((l, i) => <div key={i} style={{ color: '#E2E8F0' }}>{l}</div>)}
              </div>
            </div>

            {/* What's Happening */}
            <div style={{ borderRadius: 12, background: WHITE, border: '1px solid #E4E7EC', padding: 24, flex: 1, boxShadow: '0 4px 12px rgba(8,31,92,0.03)' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#94A3B8' }}>WHAT'S HAPPENING</span>
              <ul style={{ margin: '16px 0 0', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  'Connect to source systems via secure adapters',
                  'Normalize schemas into a unified payload',
                  'Hand off to DB:CAT for classification',
                ].map(s => (
                  <li key={s} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: NAVY, fontWeight: 600 }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: BLUE, flexShrink: 0 }} />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// DASHBOARD SHOWCASE — stacked browser-chrome cards, click to expand
// ============================================================
function DashboardChrome({ label, children }) {
  return (
    <div style={{
      borderRadius: 12, overflow: 'hidden', background: WHITE,
      border: '1px solid rgba(8,31,92,0.12)', boxShadow: '0 24px 48px rgba(8,31,92,0.15)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px',
        background: '#EDF0F5', borderBottom: '1px solid rgba(8,31,92,0.08)',
      }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#e04b4b' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ecc229' }} />
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#26c26a' }} />
        <span style={{ marginLeft: 8, fontSize: 12, color: MUTED, fontWeight: 500 }}>{label}</span>
      </div>
      {children}
    </div>
  );
}

function FakeDashboard({ variant }) {
  if (variant === 'reports') {
    return (
      <div style={{ background: WHITE, borderRadius: 12, border: '1px solid #E4E7EC', padding: 24, display: 'grid', gridTemplateColumns: '200px 1fr', gap: 24, minHeight: 360, boxShadow: '0 4px 12px rgba(8,31,92,0.03)' }}>
        <aside style={{ paddingRight: 24, borderRight: '1px solid #E4E7EC', fontSize: 13, color: MUTED }}>
          <div style={{ fontWeight: 800, color: NAVY, marginBottom: 16 }}>Reports</div>
          {['Overview', 'Compliance', 'Origination', 'Portfolio', 'Risk', 'Exports'].map((s, i) => (
            <div key={s} style={{ padding: '8px 12px', borderRadius: 6, background: i === 1 ? NAVY : 'transparent', color: i === 1 ? WHITE : MUTED, marginBottom: 4, fontWeight: i === 1 ? 600 : 500 }}>{s}</div>
          ))}
        </aside>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
            <div>
              <div style={{ fontSize: 11, color: MUTED, letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>Compliance</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: NAVY, marginTop: 4 }}>Portfolio Audit Summary</div>
            </div>
            <div style={{ fontSize: 12, color: NAVY, padding: '6px 12px', border: '1px solid #E4E7EC', borderRadius: 6, fontWeight: 600, height: 'fit-content' }}>Q2 2026</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
            {[{ v: '1,247', l: 'Loans audited' }, { v: '99.5%', l: 'Accuracy' }, { v: '12', l: 'Flagged' }, { v: '$1.2M', l: 'Savings' }].map(m => (
              <div key={m.l} style={{ padding: 16, border: '1px solid #E4E7EC', borderRadius: 8 }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: NAVY }}>{m.v}</div>
                <div style={{ fontSize: 12, color: MUTED, marginTop: 4, fontWeight: 500 }}>{m.l}</div>
              </div>
            ))}
          </div>
          <div style={{ height: 140, border: '1px solid #E4E7EC', borderRadius: 8, padding: 16, display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            {[40, 62, 55, 78, 90, 72, 85, 95, 88, 92, 80, 96].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: i > 8 ? BLUE : '#E4E7EC', borderRadius: 4, transition: 'height 1s ease' }} />
            ))}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ background: WHITE, borderRadius: 12, border: '1px solid #E4E7EC', overflow: 'hidden', boxShadow: '0 4px 12px rgba(8,31,92,0.03)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', borderBottom: '1px solid #E4E7EC' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Activity size={20} color={BLUE} strokeWidth={2.5} />
          <div style={{ fontSize: 16, fontWeight: 700, color: NAVY }}>Loan Requests</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <div style={{ fontSize: 13, padding: '8px 16px', borderRadius: 6, background: NAVY, color: WHITE, fontWeight: 600, cursor: 'pointer' }}>All Queue</div>
          <div style={{ fontSize: 13, padding: '8px 16px', borderRadius: 6, border: '1px solid #E4E7EC', color: MUTED, fontWeight: 500, cursor: 'pointer' }}>Pending</div>
        </div>
      </div>
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: '100px 2fr 1fr 1fr 100px 100px', gap: 16, padding: '16px 24px', fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94A3B8' }}>
          <span>ID</span><span>Borrower</span><span>Product</span><span>Amount</span><span>Risk</span><span>Status</span>
        </div>
        {[
          ['L-20417', 'Kenwood Holdings LLC', 'Commercial RE', '$2.4M', 'LOW', { l: 'Approved', c: SUCCESS }],
          ['L-20416', 'River Valley Farms', 'Agricultural', '$875K', 'MEDIUM', { l: 'Pending', c: '#94A3B8' }],
          ['L-20415', 'Mercer & Sons', 'SBA 7(a)', '$450K', 'LOW', { l: 'Approved', c: SUCCESS }],
          ['L-20414', 'Nova Tech Partners', 'Equipment', '$1.2M', 'HIGH', { l: 'Flagged', c: '#F59E0B' }],
          ['L-20413', 'Bright Canyon Hotels', 'Commercial RE', '$4.1M', 'MEDIUM', { l: 'Pending', c: '#94A3B8' }],
          ['L-20412', 'Coastal Metals Co.', 'Working Capital', '$320K', 'LOW', { l: 'Approved', c: SUCCESS }],
        ].map((row, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '100px 2fr 1fr 1fr 100px 100px', gap: 16,
            padding: '16px 24px', fontSize: 13,
            borderTop: '1px solid #E4E7EC',
          }}>
            <span style={{ fontFamily: 'var(--font-mono)', color: '#94A3B8', fontWeight: 500 }}>{row[0]}</span>
            <span style={{ fontWeight: 700, color: NAVY }}>{row[1]}</span>
            <span style={{ color: '#64748B' }}>{row[2]}</span>
            <span style={{ fontWeight: 700, color: NAVY }}>{row[3]}</span>
            <span style={{
              fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 12,
              background: '#F1F5F9', color: '#64748B', display: 'inline-block', width: 'fit-content',
            }}>{row[4]}</span>
            <span style={{
              fontSize: 13, fontWeight: 500, color: row[5].c, display: 'flex', alignItems: 'center', gap: 6
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: row[5].c }} />
              {row[5].l}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardShowcase() {
  const [active, setActive] = React.useState(null);
  const cards = [
    { id: 'requests', label: 'Loan Requests', variant: 'requests' },
    { id: 'reports', label: 'Reports & Analytics', variant: 'reports' },
  ];
  return (
    <section style={{ padding: '96px 24px', background: WHITE }}>
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        <div style={{ marginBottom: 48 }}>
          <SectionEyebrow code="D8:DASHBOARD" />
          <h2 style={{ margin: '12px 0 12px', fontSize: 'clamp(32px, 3.6vw, 48px)', fontWeight: 700, color: NAVY, letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: '22ch' }}>See your data come alive.</h2>
          <p style={{ margin: 0, fontSize: 16, color: MUTED, maxWidth: 640, lineHeight: 1.6 }}>Our agents surface insights in real-time dashboards built for your workflows.</p>
        </div>

        {active !== null ? (
          <div style={{ marginBottom: 32 }}>
            <DashboardChrome label={`D8TAOPS — ${cards[active].label}`}>
              <div style={{ position: 'relative' }}>
                <button onClick={() => setActive(null)} style={{
                  position: 'absolute', top: 8, right: 12, zIndex: 2,
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  fontSize: 12, color: MUTED, padding: '6px 10px', borderRadius: 6,
                }}>✕ Close</button>
                <FakeDashboard variant={cards[active].variant} />
              </div>
            </DashboardChrome>
          </div>
        ) : (
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minHeight: 520, gap: 24 }}>
            <div aria-hidden style={{
              position: 'absolute', inset: -24, borderRadius: 48, filter: 'blur(48px)',
              background: `radial-gradient(ellipse at center, ${BLUE}80, ${NAVY}50, transparent 70%)`,
              opacity: 0.15, pointerEvents: 'none',
            }} />
            {cards.map((c, i) => (
              <div key={c.id} onClick={() => setActive(i)} style={{
                position: 'relative', width: '100%', maxWidth: 900,
                marginLeft: 0,
                marginTop: i === 1 ? 24 : 0,
                zIndex: i === 0 ? 2 : 1,
                cursor: 'pointer',
                transition: `transform 300ms ${EASE}`,
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
              >
                <DashboardChrome label={c.label}>
                  <FakeDashboard variant={c.variant} />
                </DashboardChrome>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================
// PROOF BLOCK — 3:2 split, quote left, metrics bento right
// ============================================================
function ProofBlockSection() {
  const metrics = [
    { v: '97%', l: 'Faster' },
    { v: '100%', l: 'Coverage' },
    { v: '99.5%', l: 'Accuracy' },
    { v: '$1.2M+', l: 'Projected Savings' },
    { v: '90 Days', l: 'Deployed', wide: true },
  ];
  return (
    <section style={{ padding: '96px 24px', background: BG_LIGHT }}>
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 16 }}>
          <div style={{ borderRadius: 12, background: WHITE, padding: 32 }}>
            <div style={{ marginBottom: 16 }}>
              <SectionEyebrow code="D8:STORY" />
            </div>
            <h2 style={{ margin: '0 0 24px', fontSize: 'clamp(24px, 2.4vw, 32px)', fontWeight: 700, color: NAVY, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              What this looks like in production.
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: 14, lineHeight: 1.7, color: '#1F1F1F' }}>
              <div>
                <span style={{ display: 'block', marginBottom: 4, fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED }}>Challenge</span>
                <p style={{ margin: 0 }}>A regional credit union was conducting loan audits manually, relying on static policy checklists and multiple siloed systems. Underwriting rules were interpreted inconsistently, creating compliance gaps and regulatory risk.</p>
              </div>
              <div>
                <span style={{ display: 'block', marginBottom: 4, fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: MUTED }}>The Solution</span>
                <p style={{ margin: 0 }}>D8TAOPS co-designed an agentic audit platform running entirely inside the credit union's Azure environment. The system ingests loan data, applies policy and risk checks, generates explainable audit reports, and routes findings to human reviewers. No data leaves the credit union's cloud.</p>
              </div>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {metrics.map((m, i) => (
              <div key={m.l} style={{
                borderRadius: 12, background: NAVY, padding: 20,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                textAlign: 'center', gridColumn: m.wide ? 'span 2' : 'auto',
              }}>
                <span style={{ fontSize: 'var(--text-4xl)', fontWeight: 700, color: '#FFFFFF', fontVariantNumeric: 'tabular-nums' }}>{m.v}</span>
                <span style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.7)', marginTop: 4 }}>{m.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CLOSING CTA
// ============================================================
function ClosingCTA() {
  return (
    <section id="contact" style={{
      padding: '88px 24px 72px',
      scrollMarginTop: '88px',
      background: 'linear-gradient(135deg, #0c1428 0%, #0f2560 40%, #0477BF 100%)',
      color: WHITE,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <ParticleCanvas />
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: 960,
        margin: '0 auto',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <h2 style={{
          margin: '0 0 16px',
          fontSize: 'clamp(28px, 3.5vw, 44px)',
          fontWeight: 700,
          color: '#FFFFFF',
          letterSpacing: '-0.03em',
          lineHeight: 1.1
        }}>
          Ready to see what your data can do?
        </h2>
        <p style={{ margin: '20px 0 36px', fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.8)' }}>
          Book a discovery call. We'll show you what your data can do in 90 days.
        </p>
        <a href="#contact" style={{
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          padding: '12px 24px', fontSize: 14, fontWeight: 700, letterSpacing: '0.02em',
          background: WHITE, color: NAVY, borderRadius: 9999, textDecoration: 'none',
          boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
        }}>Get in touch.</a>
      </div>
    </section>
  );
}

// ============================================================
// FOOTER
// ============================================================
function GlobalFooter() {
  const cols = [
    { title: 'Platform', links: ['Overview', 'Agents', 'Observability', 'Security', 'Pricing'] },
    { title: 'Solutions', links: ['Credit Unions', 'Financial Services', 'Healthcare', 'Public Sector'] },
    { title: 'Company', links: ['About', 'Career', 'Press', 'Contact'] },
    { title: 'Resources', links: ['Blog', 'Documentation', 'Case Studies', 'Trust Center'] },
  ];
  return (
    <footer style={{ background: WHITE, color: MUTED, padding: '96px 24px 48px', borderTop: '1px solid #E4E7EC' }}>
      <style>{`
        .footer-link-placeholder {
          color: #6B7280;
          cursor: default;
          pointer-events: none;
          opacity: 1;
        }
      `}</style>
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1.5fr) repeat(4, 1fr)', gap: 40, marginBottom: 64 }}>
          <div>
            <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center' }}>
              <div style={{
                fontSize: '22px',
                fontWeight: 800,
                color: '#081F5C',
                letterSpacing: '-0.03em',
                fontFamily: 'var(--font-sans)'
              }}>
                D8TAOPS
              </div>
            </div>
            <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, maxWidth: 300, color: MUTED }}>
              AI agents for regulated industries.
            </p>
          </div>
          {cols.map(c => (
            <div key={c.title}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: NAVY, marginBottom: 20 }}>{c.title}</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                {c.links.map(l => (
                  <li key={l}>
                    <a
                      href={l === 'Contact' ? '#contact' : '#'}
                      className={l === 'Contact' ? '' : 'footer-link-placeholder'}
                      style={{ color: MUTED, textDecoration: 'none', fontSize: 13, fontWeight: 500, transition: 'color 0.2s' }}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{
          paddingTop: 32, borderTop: '1px solid #E4E7EC',
          display: 'flex', justifyContent: 'space-between',
          fontSize: 12, color: MUTED, fontWeight: 500
        }}>
          <span>© 2026 D8TAOPS. All rights reserved.</span>
          <span style={{ display: 'flex', gap: 24 }}>
            <span className="footer-link-placeholder">Privacy</span>
            <span className="footer-link-placeholder">Terms</span>
            <span className="footer-link-placeholder">Security</span>
          </span>
        </div>
      </div>
    </footer>
  );
}

// ============================================================
// WHAT WE DO GRID — 3-column card grid
// ============================================================
const WHAT_WE_DO_GRID_CSS = `
  .d8-reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 400ms cubic-bezier(0.0, 0, 0.2, 1),
                transform 400ms cubic-bezier(0.0, 0, 0.2, 1);
  }
  .d8-reveal.in {
    opacity: 1;
    transform: translateY(0);
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
  @media (max-width: 768px) {
    .s3-grid {
      grid-template-columns: 1fr !important;
    }
  }
`;

const S4_CSS = `
  .s4-row {
    display: flex;
    align-items: stretch;
    gap: 0;
    margin-bottom: 12px;
  }
  .s4-node {
    flex: 1;
    min-width: 0;
    cursor: pointer;
  }
  .s4-node-inner {
    background: #ffffff;
    border: 0.5px solid rgba(8, 31, 92, 0.15);
    border-left: 3px solid #0477BF;
    border-radius: 0 12px 12px 0;
    padding: 14px 12px;
    height: 100%;
    box-sizing: border-box;
    transition: border-left-color 120ms ease, transform 120ms ease;
  }
  .s4-node:hover .s4-node-inner {
    border-left-color: #081F5C;
    transform: translateY(-2px);
  }
  .s4-node.active .s4-node-inner {
    border-left-color: #081F5C;
    border-left-width: 4px;
    background: #E8F4FD;
  }
  .s4-badge {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: rgba(4, 119, 191, 0.15);
    color: #0477BF;
    font-size: 9px;
    font-weight: 600;
    margin-bottom: 6px;
  }
  .s4-node.active .s4-badge {
    background: #081F5C;
    color: #ffffff;
  }
  .s4-conn {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    width: 16px;
  }
  .s4-conn-line {
    flex: 1;
    height: 2px;
    background: rgba(8, 31, 92, 0.12);
    position: relative;
    overflow: hidden;
  }
  .s4-conn-pulse {
    position: absolute;
    top: 0;
    left: -40%;
    width: 40%;
    height: 100%;
    background: linear-gradient(90deg, transparent, #0477BF, transparent);
    animation: s4pulse 2s linear infinite;
  }
  @keyframes s4pulse { to { left: 140%; } }
  .s4-conn-arrow {
    width: 0;
    height: 0;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 5px solid rgba(8, 31, 92, 0.2);
    flex-shrink: 0;
  }
  .s4-divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 4px 0 12px;
    font-size: 11px;
    color: rgba(51, 51, 51, 0.4);
    font-family: IBM Plex Sans, sans-serif;
  }
  .s4-divider-line {
    flex: 1;
    height: 0.5px;
    background: rgba(8, 31, 92, 0.1);
  }
  .s4-detail {
    margin-top: 24px;
    background: #E8F4FD;
    border: 0.5px solid rgba(4, 119, 191, 0.2);
    border-left: 3px solid #0477BF;
    border-radius: 0 12px 12px 0;
    padding: 14px 20px;
    display: flex;
    align-items: center;
    gap: 12px;
    cursor: default;
    transition: padding 240ms ease;
  }
  .s4-detail.expanded {
    padding: 20px 24px;
    display: block;
    border-top: 2px solid #0477BF;
    border-left: 3px solid #0477BF;
  }
  .s4-detail-prompt {
    font-size: 13px;
    color: #0477BF;
    font-style: italic;
  }
  .s4-detail-desig {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #0477BF;
    margin-bottom: 4px;
  }
  .s4-detail-name {
    font-size: 16px;
    font-weight: 700;
    color: #081F5C;
    margin-bottom: 8px;
  }
  .s4-next-example {
    background: none;
    border: none;
    border-top: 0.5px solid rgba(4, 119, 191, 0.25);
    color: #0477BF;
    font-size: 12px;
    font-family: IBM Plex Sans, sans-serif;
    cursor: pointer;
    padding: 12px 0 0;
    margin-top: 12px;
    display: block;
    width: 100%;
    text-align: left;
    transition: opacity 120ms ease;
  }
  .s4-next-example:hover { opacity: 0.7; }
  .s4-detail-what {
    font-size: 14px;
    color: #333333;
    line-height: 1.6;
    margin-bottom: 16px;
    padding-bottom: 16px;
    border-bottom: 0.5px solid rgba(4, 119, 191, 0.2);
  }
  .s4-detail-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  .s4-detail-block-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #0477BF;
    margin-bottom: 6px;
  }
  .s4-detail-block-text {
    font-size: 13px;
    color: #333333;
    line-height: 1.6;
  }
  @media (max-width: 600px) {
    .s4-detail-row { grid-template-columns: 1fr; }
  }
  .s4-tag {
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.08em;
    color: #0477BF;
    background: #E8F4FD;
    border: 0.5px solid rgba(4, 119, 191, 0.3);
    padding: 2px 6px;
    border-radius: 4px;
    flex-shrink: 0;
    white-space: nowrap;
  }
  @media (prefers-reduced-motion: reduce) {
    .s4-conn-pulse { display: none; }
    .s4-node-inner { transition: none; }
  }
  @media (max-width: 768px) {
    .s4-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }
    .s4-conn { display: none; }
  }
  @media (max-width: 480px) {
    .s4-row { grid-template-columns: 1fr; }
  }
`;

function WhatWeDoGrid() {
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    const elements = document.querySelectorAll('.d8-reveal');
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: WHAT_WE_DO_GRID_CSS }} />
      <section style={{ background: '#ffffff', width: '100%', padding: '96px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1rem, 5vw, 3rem)' }}>
          <div style={{ 
            fontFamily: 'IBM Plex Sans, sans-serif', fontSize: 11, fontWeight: 600, 
            letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0477BF', 
            marginBottom: 16 
          }}>
            WHAT WE DO
          </div>
          <h2 style={{ 
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', 
            color: '#081F5C', letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 12, textAlign: 'left' 
          }}>
            We send AI agents to your data. You don't move a thing.
          </h2>
          <h3 style={{ 
            fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 400, fontSize: 'clamp(18px, 2vw, 20px)', 
            color: '#0477BF', marginBottom: 32, textAlign: 'left' 
          }}>
            AI is only as good as the data you feed it. We get rid of the AI slop.
          </h3>
          
          <div className="s3-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, alignItems: 'stretch' }}>
            {/* Card 1 */}
            <div className="d8-reveal" style={{ 
              background: '#f5f7fa', borderRadius: 16, padding: 32, transitionDelay: '0ms',
              display: 'flex', flexDirection: 'column'
            }}>
              <h3 style={{ 
                fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 18, 
                color: '#081F5C', marginBottom: 12, lineHeight: 1.2, flexShrink: 0
              }}>
                Agents that run in your environment
              </h3>
              <p style={{ 
                fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 400, fontSize: 16, 
                color: '#333333', lineHeight: 1.6, margin: 0, flexGrow: 1
              }}>
                D8TAOPS agents deploy inside your existing cloud or on-prem infrastructure. No new vendors. No data leaving your perimeter.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="d8-reveal" style={{ 
              background: '#f5f7fa', borderRadius: 16, padding: 32, transitionDelay: '100ms',
              display: 'flex', flexDirection: 'column'
            }}>
              <h3 style={{ 
                fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 18, 
                color: '#081F5C', marginBottom: 12, lineHeight: 1.2, flexShrink: 0
              }}>
                Production-ready in 90 days
              </h3>
              <p style={{ 
                fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 400, fontSize: 16, 
                color: '#333333', lineHeight: 1.6, margin: 0, flexGrow: 1
              }}>
                We scope a Micro-MVP, validate it with your team, and go live. Most clients are in production within 90 days of kickoff.
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="d8-reveal" style={{ 
              background: '#f5f7fa', borderRadius: 16, padding: 32, transitionDelay: '200ms',
              display: 'flex', flexDirection: 'column'
            }}>
              <h3 style={{ 
                fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 700, fontSize: 18, 
                color: '#081F5C', marginBottom: 12, lineHeight: 1.2, flexShrink: 0
              }}>
                You keep control
              </h3>
              <p style={{ 
                fontFamily: 'IBM Plex Sans, sans-serif', fontWeight: 400, fontSize: 16, 
                color: '#333333', lineHeight: 1.6, margin: 0, flexGrow: 1
              }}>
                Human-in-the-loop design means your team reviews, overrides, and approves what the agents produce. AI handles volume. People handle judgment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export {
  HeroSection,
  ComparisonSection,
  WhoWeAreSection,
  WhatWeDoSection,
  WhatWeDoGrid,
  IngestAgentDemo,
  DashboardShowcase,
  ProofBlockSection,
  ClosingCTA,
  GlobalFooter
};
