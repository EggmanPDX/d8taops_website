import React from 'react';
import { Globe, CheckCircle2, ChevronRight, Activity } from 'lucide-react';

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

function HeroSection() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'relative', width: '100%', padding: '128px 24px 80px',
        background: 'linear-gradient(135deg, #0c1428 0%, #0f2560 40%, #0477BF 100%)',
      }}>
        <ParticleCanvas />
        <div style={{
          position: 'relative', zIndex: 1, maxWidth: 1152, margin: '0 auto',
          display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
        }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, padding: '4px 12px',
              borderRadius: 9999, border: '1px solid rgba(255,255,255,0.2)',
              background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
              fontSize: 11, color: '#fff',
            }}>
              <span style={{ fontWeight: 700 }}>🏆 Global 100</span>
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>— Best Data Infrastructure & Analytics 2026</span>
            </div>
          </div>

          <h1 style={{
            margin: 0, fontSize: 'clamp(44px, 5.8vw, 80px)', fontWeight: 800,
            color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.05,
          }}>
            We get <span style={{ color: '#22C55E' }}>YOUR</span> data ready for AI.
          </h1>

          <p style={{
            fontSize: 18, color: '#fff', maxWidth: 640,
            lineHeight: 1.55, margin: '48px auto 0',
          }}>
            Your data stays in your environment. Your team stays in control. No migration. No lock-in. No risk.
          </p>

          <div style={{ marginTop: 32 }}>
            <a href="#contact" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              padding: '12px 24px', fontSize: 14, fontWeight: 700, letterSpacing: '0.02em',
              background: '#fff', color: NAVY, borderRadius: 9999, textDecoration: 'none',
              boxShadow: '0 2px 12px rgba(0,0,0,0.2)',
            }}>Get in touch.</a>
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
          Not a warehouse. Not a generic AI tool.<br/>
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
// WHAT WE DO — three-up feature row
// ============================================================
function WhatWeDoSection() {
  const cols = [
    { title: 'Your environment. Not ours.', body: 'Agents run inside your existing AWS, Azure, GCP, or on-prem infrastructure. No data leaves your perimeter. Your security team stays in the loop.' },
    { title: 'Production in 90 days.', body: 'We scope a µMVP, validate it with your team, and deploy to production. Most clients go live within 90 days of kickoff.' },
    { title: 'Human-in-the-loop by design.', body: 'Your team reviews, overrides, and approves what the agents produce. Agents handle volume. People handle judgment.' },
  ];
  return (
    <section style={{ padding: '96px 24px', background: BG_LIGHT }}>
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        <SectionEyebrow code="D8:DIFFERENCE" />
        <h2 style={{ margin: '12px 0 48px', fontSize: 'clamp(32px, 3.6vw, 48px)', fontWeight: 700, color: NAVY, letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: '22ch' }}>
          We deploy agents. You keep control.
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gridTemplateRows: '1fr 1fr', gap: 16 }}>
          {cols.map((c, i) => {
            const isPrimary = i === 0;
            return (
              <div key={i} style={{ 
                background: isPrimary ? NAVY : WHITE, 
                borderRadius: 24, 
                padding: isPrimary ? '32px 40px' : 32,
                gridColumn: isPrimary ? 1 : 2,
                gridRow: isPrimary ? '1 / 3' : 'auto',
                minWidth: 0,
                wordBreak: isPrimary ? 'normal' : 'break-word'
              }}>
                <h3 style={{ margin: '0 0 12px', fontSize: isPrimary ? 22 : 15, fontWeight: 700, color: isPrimary ? WHITE : NAVY, letterSpacing: '-0.02em' }}>{c.title}</h3>
                <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: isPrimary ? 'rgba(255,255,255,0.85)' : BODY }}>{c.body}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// AGENT OVERVIEW — 8-card grid with hover border + arrow reveal
// ============================================================
const agents = [
  { d: 'D8:INGEST',  n: 'Ingest',     b: 'Connects to your data sources and normalizes everything into a unified layer. Then hands off to the next agent.' },
  { d: 'D8:CAT',     n: 'Categorize', b: 'Discovers, classifies, and catalogs your data with full lineage tracking. Every dataset traceable from origin.' },
  { d: 'D8:CURATE',  n: 'Curate',     b: 'Validates and cleans your data before it reaches AI models. Catches problems before they become errors.' },
  { d: 'D8:SEC',     n: 'Secure',     b: 'Enforces access controls, masks sensitive fields, and logs every action. Governance built in — not bolted on.' },
  { d: 'D8:FLOW',    n: 'Flow',       b: 'Orchestrates the entire workflow. A supervisor agent coordinates task routing, policy checks, and human handoffs.' },
  { d: 'D8:OBSERVE', n: 'Observe',    b: 'Monitors pipeline health in real time. Tracks every decision and generates audit-ready reports.' },
  { d: 'D8:STAGE',   n: 'Stage',      b: 'Delivers production-ready data products to the systems and teams that need them.' },
  { d: 'D8:VIEW',    n: 'View',       b: 'The human-facing layer. Clean, validated data delivered as dashboards, reports, and APIs in real time.' },
];

function AgentCard({ a, i }) {
  const [hover, setHover] = React.useState(false);
  const num = String(i + 1).padStart(2, '0');
  const isIngest = a.d === 'D8:INGEST';
  const isView = a.d === 'D8:VIEW';

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative', borderRadius: 12, padding: 1,
        gridArea: isIngest ? '1 / 1 / 4 / 2' : isView ? 'auto / 2 / auto / 5' : 'auto',
        background: hover
          ? `linear-gradient(135deg, ${NAVY} 0%, ${BLUE} 100%)`
          : isIngest ? NAVY : BG_LIGHT,
        transition: 'all 300ms',
        cursor: 'pointer',
        transform: hover ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hover ? `0 18px 40px -18px ${BLUE}70` : 'none',
        height: 'auto', overflow: 'visible',
        breakInside: 'avoid',
        pageBreakInside: 'avoid'
      }}
    >
      <div style={{
        position: 'relative', borderRadius: 11,
        background: hover ? WHITE : isIngest ? NAVY : BG_LIGHT,
        padding: 24, height: 'auto', minHeight: '160px', overflow: 'visible',
        transition: 'background 300ms',
      }}>
        <span style={{
          position: 'absolute', top: 16, right: 16,
          minWidth: 28, height: 24, padding: '0 8px', display: 'inline-flex',
          alignItems: 'center', justifyContent: 'center', borderRadius: 6,
          fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em',
          background: hover ? NAVY : isIngest ? 'rgba(255,255,255,0.1)' : '#E4E7EC',
          color: hover ? WHITE : isIngest ? '#FFFFFF' : MUTED,
          transform: hover ? 'scale(1.1)' : 'scale(1)',
          transition: 'all 300ms',
        }}>{num}</span>
        <span style={{
          display: 'block', marginBottom: 4,
          fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: hover ? BLUE : isIngest ? 'rgba(255,255,255,0.5)' : MUTED,
          transition: 'color 300ms',
        }}>{a.d}</span>
        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 4, marginBottom: 8 }}>
          <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: hover || !isIngest ? NAVY : '#FFFFFF', letterSpacing: '-0.02em' }}>{a.n}</h3>
          <i data-lucide="arrow-right" style={{
            width: 16, height: 16, color: BLUE,
            opacity: hover ? 1 : 0, transform: hover ? 'translateX(0)' : 'translateX(-4px)',
            transition: 'all 300ms',
          }} />
          <span style={{
            position: 'absolute', left: 0, bottom: -4, height: 2, width: '100%',
            background: BLUE, transformOrigin: 'left',
            transform: hover ? 'scaleX(1)' : 'scaleX(0)',
            transition: 'transform 300ms',
          }} />
        </div>
        <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: hover || !isIngest ? '#1F1F1F' : 'rgba(255,255,255,0.8)' }}>{a.b}</p>
      </div>
    </div>
  );
}

function AgentOverviewSection() {
  React.useEffect(() => { window.lucide && window.lucide.createIcons(); }, []);
  return (
    <section style={{ padding: '96px 24px', background: WHITE }}>
      <div style={{ maxWidth: 1152, margin: '0 auto' }}>
        <div style={{ marginBottom: 40 }}>
          <SectionEyebrow code="D8:AGENTS" />
          <h2 style={{ margin: '12px 0 12px', fontSize: 'clamp(32px, 3.6vw, 48px)', fontWeight: 700, color: NAVY, letterSpacing: '-0.03em', lineHeight: 1.1, maxWidth: '22ch' }}>
            Meet the 8 Agents who get your data ready for AI.
          </h2>
          <p style={{ margin: 0, fontSize: 16, color: MUTED, maxWidth: 640, lineHeight: 1.6 }}>
            Each agent handles a distinct job. Together, they take raw data from your systems to secure, governed, AI-ready output.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(3, 1fr)', gridTemplateRows: 'repeat(3, auto)', gap: 16 }}>
          {agents.map((a, i) => <AgentCard key={a.d} a={a} i={i} />)}
        </div>
      </div>
    </section>
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
    { label: 'Postgres',    angle: -45 },
    { label: 'CSV / Excel', angle: 0 },
    { label: 'REST API',    angle: 45 },
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
                        0%{transform:translate(${x-4}px,${y-4}px) scale(0.6);opacity:0}
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
          {['Overview','Compliance','Origination','Portfolio','Risk','Exports'].map((s, i) => (
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
            {[{v:'1,247',l:'Loans audited'},{v:'99.5%',l:'Accuracy'},{v:'12',l:'Flagged'},{v:'$1.2M',l:'Savings'}].map(m => (
              <div key={m.l} style={{ padding: 16, border: '1px solid #E4E7EC', borderRadius: 8 }}>
                <div style={{ fontSize: 24, fontWeight: 800, color: NAVY }}>{m.v}</div>
                <div style={{ fontSize: 12, color: MUTED, marginTop: 4, fontWeight: 500 }}>{m.l}</div>
              </div>
            ))}
          </div>
          <div style={{ height: 140, border: '1px solid #E4E7EC', borderRadius: 8, padding: 16, display: 'flex', alignItems: 'flex-end', gap: 8 }}>
            {[40,62,55,78,90,72,85,95,88,92,80,96].map((h, i) => (
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
          ['L-20417','Kenwood Holdings LLC','Commercial RE','$2.4M','LOW',{l:'Approved',c:SUCCESS}],
          ['L-20416','River Valley Farms','Agricultural','$875K','MEDIUM',{l:'Pending',c:'#94A3B8'}],
          ['L-20415','Mercer & Sons','SBA 7(a)','$450K','LOW',{l:'Approved',c:SUCCESS}],
          ['L-20414','Nova Tech Partners','Equipment','$1.2M','HIGH',{l:'Flagged',c:'#F59E0B'}],
          ['L-20413','Bright Canyon Hotels','Commercial RE','$4.1M','MEDIUM',{l:'Pending',c:'#94A3B8'}],
          ['L-20412','Coastal Metals Co.','Working Capital','$320K','LOW',{l:'Approved',c:SUCCESS}],
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
    { id: 'reports',  label: 'Reports & Analytics', variant: 'reports' },
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
    { v: '97%',     l: 'Faster' },
    { v: '100%',    l: 'Coverage' },
    { v: '99.5%',   l: 'Accuracy' },
    { v: '$1.2M+',  l: 'Projected Savings' },
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
    { title: 'Platform', links: ['Overview','Agents','Observability','Security','Pricing'] },
    { title: 'Solutions', links: ['Credit Unions','Financial Services','Healthcare','Public Sector'] },
    { title: 'Company',  links: ['About','Career','Press','Contact'] },
    { title: 'Resources', links: ['Blog','Documentation','Case Studies','Trust Center'] },
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

export {
  HeroSection,
  ComparisonSection,
  WhoWeAreSection,
  WhatWeDoSection,
  AgentOverviewSection,
  IngestAgentDemo,
  DashboardShowcase,
  ProofBlockSection,
  ClosingCTA,
  GlobalFooter
};
