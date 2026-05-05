import React from 'react';
import { Briefcase, Database, Lock, Settings2, ShieldCheck, Zap } from 'lucide-react';
import D8Button from './D8Button';

// ── Brand tokens ──────────────────────────────────────────────────────────────
const NAVY      = '#081F5C';
const BLUE      = '#0477BF';
const NAVY_DEEP = '#040e2e';
const BODY      = '#333333';
const MUTED     = '#515151';
const WHITE     = '#FFFFFF';
const GREEN     = '#3ecf8e';

// ── Shared CSS injected once ──────────────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');


  @keyframes d8WordReveal {
    from { filter: blur(8px); opacity: 0; transform: translateY(5px); }
    to   { filter: blur(0);   opacity: 1; transform: translateY(0); }
  }
  @keyframes d8LivePulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.25; }
  }
  @keyframes d8CardFloat {
    0%,  100% { transform: perspective(900px) rotateY(-5deg) rotateX(3deg) translateY(0px);
                box-shadow: 0 20px 60px rgba(4,14,46,0.45), 0 0 30px rgba(4,119,191,0.08); }
    50%        { transform: perspective(900px) rotateY(-5deg) rotateX(3deg) translateY(-10px);
                box-shadow: 0 32px 80px rgba(4,14,46,0.55), 0 0 40px rgba(4,119,191,0.14); }
  }
  @keyframes d8TickerScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes s4pulse { to { left: 140%; } }

  .d8-dashboard-tilt {
    animation: d8CardFloat 6s ease-in-out infinite;
    transform-style: preserve-3d;
    border-radius: 16px;
    height: 100%;
  }
  .d8-dashboard-tilt:hover {
    animation: none;
    transform: perspective(900px) rotateY(0deg) rotateX(0deg) !important;
    transition: transform 0.55s cubic-bezier(0.22,1,0.36,1);
  }

  .d8-pipeline-scroll::-webkit-scrollbar { height: 3px; }
  .d8-pipeline-scroll::-webkit-scrollbar-track { background: rgba(8,31,92,0.08); }
  .d8-pipeline-scroll::-webkit-scrollbar-thumb { background: #0477BF; border-radius: 3px; }

  .d8-agent-card {
    width: 155px; flex-shrink: 0;
    background: #f5f8fb;
    border-radius: 14px;
    padding: 16px 14px;
    cursor: pointer;
    border: 1px solid rgba(8,31,92,0.10);
    transition: background 0.18s ease, color 0.18s ease, transform 0.18s ease;
    box-sizing: border-box;
  }
  .d8-agent-card:hover { background: #081F5C; transform: translateY(-2px); }
  .d8-agent-card:hover .d8-agent-desig { color: rgba(62,207,142,0.9); }
  .d8-agent-card:hover .d8-agent-name  { color: #ffffff; }
  .d8-agent-card:hover .d8-agent-role  { color: rgba(255,255,255,0.6); }
  .d8-agent-card:hover .d8-agent-num   { background: rgba(62,207,142,0.25); color: #3ecf8e; }
  .d8-agent-card.active { background: #081F5C; transform: translateY(-2px); }
  .d8-agent-card.active .d8-agent-desig { color: rgba(62,207,142,0.9); }
  .d8-agent-card.active .d8-agent-name  { color: #ffffff; }
  .d8-agent-card.active .d8-agent-role  { color: rgba(255,255,255,0.6); }
  .d8-agent-card.active .d8-agent-num   { background: rgba(62,207,142,0.25); color: #3ecf8e; }
  .d8-agent-card-view { border: 1px solid rgba(4,119,191,0.35); }

  .d8-who-card {
    background: #f5f8fb;
    border-radius: 20px;
    padding: 36px;
    box-sizing: border-box;
    border: 1px solid transparent;
    transition: background 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
    display: flex; flex-direction: column;
  }
  .d8-who-card:hover {
    background: #edf4fc;
    transform: translateY(-3px);
    border-color: rgba(4,119,191,0.2);
  }


  .d8-reveal {
    opacity: 0; transform: translateY(28px);
    transition: opacity 0.72s cubic-bezier(0.22,1,0.36,1),
                transform 0.72s cubic-bezier(0.22,1,0.36,1);
  }
  .d8-reveal.in { opacity: 1; transform: translateY(0); }

  .d8-what-card {
    background: #ffffff;
    border-radius: 16px;
    padding: 36px 32px;
    border: 1px solid rgba(8,31,92,0.07);
    transition: transform 0.18s ease, box-shadow 0.18s ease;
    display: flex; flex-direction: column;
  }
  .d8-what-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(8,31,92,0.1); }

  .d8-stat-cell { opacity: 0; transform: translateY(22px); transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1); }
  .d8-stat-cell.in { opacity: 1; transform: translateY(0); }

  .footer-placeholder { color: rgba(255,255,255,0.42); cursor: default; pointer-events: none; }
  .footer-link { color: rgba(255,255,255,0.42); text-decoration: none; transition: color 0.15s ease; }
  .footer-link:hover { color: rgba(255,255,255,0.75); }
  .footer-contact-link { color: rgba(255,255,255,0.42); text-decoration: none; transition: color 0.15s ease; }
  .footer-contact-link:hover { color: #0477BF; }

  .d8-portrait-card {
    border-radius: 24px;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 8px 40px rgba(8,31,92,0.1);
    transition: transform 0.3s cubic-bezier(.22,1,.36,1), box-shadow 0.3s ease;
    display: flex;
    flex-direction: column;
    gap: 0;
    height: 100%;
  }
  .d8-portrait-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 24px 64px rgba(8,31,92,0.18);
  }
  .d8-portrait-top {
    min-height: 230px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 40px 32px 32px;
    position: relative;
    overflow: hidden;
  }
  .d8-portrait-top::after {
    content: '';
    position: absolute;
    width: 200px; height: 200px; border-radius: 50%;
    background: rgba(62,207,142,0.1);
    top: -50px; right: -50px; pointer-events: none;
  }
  .d8-portrait-top.c1 { background: linear-gradient(145deg, #040e2e 0%, #081F5C 100%); }
  .d8-portrait-top.c2 { background: linear-gradient(145deg, #023d74 0%, #0477BF 100%); }
  .d8-portrait-top.c3 { background: linear-gradient(145deg, #062242 0%, #0a3366 100%); }

  .dash-browser {
    margin-top: 48px;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 32px 80px rgba(0,0,0,0.5);
    border: 1px solid rgba(255,255,255,0.08);
  }
  .dash-chrome {
    background: #1e2330;
    padding: 10px 16px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .dash-dots { display: flex; gap: 6px; flex-shrink: 0; }
  .dash-dot { width: 10px; height: 10px; border-radius: 50%; }
  .dash-dot:nth-child(1) { background: #ff5f57; }
  .dash-dot:nth-child(2) { background: #febc2e; }
  .dash-dot:nth-child(3) { background: #28c840; }
  .dash-url {
    flex: 1;
    background: rgba(255,255,255,0.07);
    border-radius: 6px;
    padding: 4px 12px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px;
    color: rgba(255,255,255,0.45);
    letter-spacing: 0.02em;
  }
  .dash-img-wrap { position: relative; overflow: hidden; line-height: 0; }
  .dash-img-wrap::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 60%, rgba(8,31,92,0.85) 100%);
    pointer-events: none;
  }

  .d8-stats-grid .d8-stat-cell:not(:last-child) { border-right: 1px solid rgba(8,31,92,0.1); padding-right: 48px; }
  @media (max-width: 768px) { .d8-stats-grid .d8-stat-cell { border-right: none !important; padding-right: 0 !important; } }
  .d8-section-label { display: block; }
  @media (max-width: 900px) { .d8-section-label { display: none !important; } }

  @media (max-width: 900px) {
    .d8-hero-grid { grid-template-columns: 1fr !important; }
    .d8-what-header-grid { grid-template-columns: 1fr !important; }
    .d8-what-card-grid { grid-template-columns: 1fr !important; }
    .d8-proof-grid { grid-template-columns: 1fr !important; }
    .d8-footer-grid { grid-template-columns: 1fr 1fr !important; }
    .d8-persona-grid { grid-template-columns: 1fr !important; }
  }
  @media (max-width: 768px) {
    .d8-stats-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 32px !important; }
    .d8-view-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
  }
  @media (prefers-reduced-motion: reduce) {
    .d8-view-text-col > * { opacity: 1 !important; transform: none !important; transition: none !important; }
    .d8-view-img { opacity: 1 !important; transform: none !important; transition: none !important; }
  }
  @media (max-width: 480px) {
    .d8-stats-grid { grid-template-columns: 1fr !important; }
    .d8-who-bento-right { flex-direction: row !important; flex-wrap: wrap; }
  }
  h2, h3 { text-wrap: balance; }
  p { text-wrap: pretty; }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
    .d8-dashboard-tilt { animation: none; transform: none !important; }
    .d8-reveal { opacity: 1; transform: none; }
  }
`;

// ── Utility: scroll-triggered counter ────────────────────────────────────────
function AnimatedNumber({ target, decimals = 0, prefix = '', suffix = '', duration = 1400 }) {
  const [val, setVal] = React.useState(0);
  const ref = React.useRef(null);
  const started = React.useRef(false);
  const start = React.useCallback(() => {
    if (started.current) return;
    started.current = true;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setVal(e * target);
      if (p < 1) requestAnimationFrame(tick);
      else setVal(target);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) start(); }, { threshold: 0.18 });
    io.observe(el);
    return () => io.disconnect();
  }, [start]);
  return <span ref={ref}>{prefix}{val.toFixed(decimals)}{suffix}</span>;
}

// ── Utility: mount-triggered counter (for dashboard) ─────────────────────────
function useMountCounter(target, duration = 2000, delay = 0) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    const t = setTimeout(() => {
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / duration, 1);
        const e = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(e * target));
        if (p < 1) requestAnimationFrame(tick);
        else setVal(target);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(t);
  }, [target, duration, delay]);
  return val;
}

// ── Utility: IntersectionObserver reveal ─────────────────────────────────────
function useReveal(threshold = 0.18) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── Particle canvas ───────────────────────────────────────────────────────────
function ParticleCanvas({ count = 85, scale = 1 }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext('2d'); if (!ctx) return;
    let particles = [], raf;
    const resize = () => {
      const p = canvas.parentElement;
      const r = p.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = r.width  * dpr;
      canvas.height = r.height * dpr;
      canvas.style.width  = r.width  + 'px';
      canvas.style.height = r.height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * r.width,
        y: Math.random() * r.height,
        vx: (Math.random() - 0.5) * 0.42,
        vy: (Math.random() - 0.5) * 0.28,
        size: Math.random() * 2.2 + 0.6,
        opacity: Math.min(1, (Math.random() * 0.65 + 0.22) * scale),
        w: r.width, h: r.height,
      }));
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    const animate = () => {
      const w = canvas.width  / (window.devicePixelRatio || 1);
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
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < 140) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(4,119,191,${Math.min(1, (1 - d / 140) * 0.28 * scale)})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      }
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(4,119,191,${p.opacity})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  );
}

// ── H1 with staggered blur-to-focus ──────────────────────────────────────────
function BlurRevealH1({ text }) {
  const words = text.split(' ');
  return (
    <h1 style={{
      margin: '0 0 24px',
      fontSize: 'clamp(40px, 5vw, 68px)',
      fontWeight: 700,
      color: WHITE,
      lineHeight: 1.08,
      letterSpacing: '-0.02em',
      fontFamily: "'IBM Plex Sans', sans-serif",
    }}>
      {words.map((word, i) => {
        const isAccent = word === 'Your' || word === 'systems.';
        return (
          <React.Fragment key={i}>
            <span style={{
              display: 'inline-block',
              color: isAccent ? BLUE : WHITE,
              fontStyle: isAccent ? 'italic' : 'normal',
              animation: `d8WordReveal 0.6s cubic-bezier(0.22,1,0.36,1) both`,
              animationDelay: `${i * 80}ms`,
            }}>{word}</span>
            {i < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        );
      })}
    </h1>
  );
}

// ── Dashboard widget ──────────────────────────────────────────────────────────
const PANEL_ITEMS = [
  { strong: 'Runs inside your cloud environment.',  muted: '' },
  { strong: 'Your data stays put.',         muted: 'On-premise, in the cloud, SaaS platforms.' },
  { strong: 'Governed by design.',          muted: 'Auditable outputs. Human-in-the-loop.' },
  { strong: 'Live in 6 weeks.',              muted: 'Not multi-year migrations.' },
];

const ACTIVITY_POOL = [
  { id: 'LN-487291', check: 'DTI ratio check',     status: 'PASS' },
  { id: 'LN-487290', check: 'Income verification', status: 'PASS' },
  { id: 'LN-487289', check: 'Flood cert required', status: 'REVIEW' },
  { id: 'LN-487288', check: 'Property value',      status: 'PASS' },
  { id: 'LN-487287', check: 'Credit score gate',   status: 'PASS' },
  { id: 'LN-487286', check: 'LTV threshold',       status: 'PASS' },
  { id: 'LN-487285', check: 'Title search',        status: 'PASS' },
  { id: 'LN-487284', check: 'Appraisal gap',       status: 'REVIEW' },
  { id: 'LN-487283', check: 'Policy version match', status: 'PASS' },
  { id: 'LN-487282', check: 'Escrow calculation',  status: 'PASS' },
];

const LIVE_STAGES = ['D8:INGEST', 'D8:CAT', 'D8:CURATE', 'D8:SEC', 'D8:FLOW', 'D8:STAGE'];

function DashboardWidget() {
  const loans  = useMountCounter(575,  2000, 700);
  const [progress, setProgress] = React.useState(0);
  const [stage, setStage]       = React.useState(2);
  const [feedIdx, setFeedIdx]   = React.useState(0);

  React.useEffect(() => {
    const t = setTimeout(() => {
      const t0 = performance.now();
      const tick = (now) => {
        const p = Math.min((now - t0) / 2200, 1);
        setProgress((1 - Math.pow(1 - p, 3)) * 73);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, 300);
    return () => clearTimeout(t);
  }, []);

  React.useEffect(() => {
    const s = setInterval(() => setStage(p => (p + 1) % LIVE_STAGES.length), 1800);
    const f = setInterval(() => setFeedIdx(p => (p + 1) % ACTIVITY_POOL.length), 3200);
    return () => { clearInterval(s); clearInterval(f); };
  }, []);

  const rows = [0, 1, 2, 3].map(off => ACTIVITY_POOL[(feedIdx + off) % ACTIVITY_POOL.length]);

  return (
    <div className="d8-dashboard-tilt">
      <div style={{
        background: 'rgba(255,255,255,0.10)',
        border: '1px solid rgba(255,255,255,0.22)',
        borderRadius: 16, padding: '20px 24px',
        height: '100%', boxSizing: 'border-box',
        display: 'flex', flexDirection: 'column', gap: 0,
        fontFamily: "'IBM Plex Mono', monospace",
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: GREEN, flexShrink: 0, animation: 'd8LivePulse 2s ease-in-out infinite' }} />
          <span style={{ fontSize: 10, color: GREEN, letterSpacing: '0.12em' }}>LIVE</span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', marginLeft: 6 }}>D8:VIEW DASHBOARD</span>
        </div>

        {/* Stage track */}
        <div style={{ display: 'flex', gap: 3, marginBottom: 6 }}>
          {LIVE_STAGES.map((s, i) => (
            <div key={s} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: i <= stage ? BLUE : 'rgba(255,255,255,0.18)',
              transition: 'background 0.4s ease',
            }} />
          ))}
        </div>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', marginBottom: 14 }}>
          ACTIVE: {LIVE_STAGES[stage]}
        </div>

        {/* Progress bar → 73% */}
        <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 3, height: 5, marginBottom: 14 }}>
          <div style={{
            width: `${progress}%`, height: '100%', borderRadius: 3,
            background: 'linear-gradient(90deg, #0477BF, #26D07C)',
            transition: 'width 0.2s ease',
          }} />
        </div>

        {/* Counters */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 26, fontWeight: 700, color: WHITE, fontFamily: "'IBM Plex Sans', sans-serif", lineHeight: 1 }}>
              {loans.toLocaleString()}
            </div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', marginTop: 4 }}>LOANS PROCESSED</div>
          </div>
          <div>
            <div style={{ fontSize: 26, fontWeight: 700, color: '#e8a838', fontFamily: "'IBM Plex Sans', sans-serif", lineHeight: 1 }}>31</div>
            <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.55)', letterSpacing: '0.1em', marginTop: 4 }}>EXCEPTIONS FLAGGED</div>
          </div>
        </div>

        <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.1)', margin: '0 0 14px' }} />

        {/* Checklist */}
        <div style={{ marginBottom: 16 }}>
          {PANEL_ITEMS.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 9, marginBottom: i < PANEL_ITEMS.length - 1 ? 9 : 0 }}>
              <div style={{
                width: 15, height: 15, flexShrink: 0, marginTop: 1,
                background: 'rgba(46,160,98,0.18)', border: '1px solid rgba(46,160,98,0.4)',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="7" height="6" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                  <path d="M1 4l3 3 5-6" stroke="#2ea062" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={{ fontSize: 12, lineHeight: 1.4, fontFamily: "'IBM Plex Sans', sans-serif" }}>
                <strong style={{ color: WHITE, fontWeight: 600 }}>{item.strong}</strong>
                {item.muted && <span style={{ color: 'rgba(255,255,255,0.55)' }}> {item.muted}</span>}
              </div>
            </div>
          ))}
        </div>

        <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.1)', margin: '0 0 12px' }} />

        {/* Live feed */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.12em', marginBottom: 10 }}>RECENT ACTIVITY</div>
          {rows.map((row, i) => (
            <div key={row.id + feedIdx + i} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '6px 0',
              borderBottom: i < rows.length - 1 ? '0.5px solid rgba(255,255,255,0.06)' : 'none',
              opacity: 1 - i * 0.18,
            }}>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', minWidth: 52, flexShrink: 0 }}>{row.id}</span>
              <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.check}</span>
              <span style={{
                fontSize: 9, fontWeight: 600, padding: '2px 7px', borderRadius: 4, flexShrink: 0,
                background: row.status === 'PASS' ? 'rgba(38,208,124,0.15)' : 'rgba(232,168,56,0.15)',
                color: row.status === 'PASS' ? GREEN : '#e8a838',
                letterSpacing: '0.06em',
              }}>{row.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// S1 — HERO
// ═══════════════════════════════════════════════════════════════════════════════
function HeroSection() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: 'max(680px, 92vh)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(160deg, #0c1428 0%, #0f2560 45%, #081F5C 100%)',
        backgroundImage: `radial-gradient(circle, rgba(4,119,191,0.18) 1px, transparent 1px), linear-gradient(160deg, #0c1428 0%, #0f2560 45%, #081F5C 100%)`,
        backgroundSize: '24px 24px, 100% 100%',
      }}>
        <ParticleCanvas scale={2} />

        <div
          className="d8-hero-grid"
          style={{
            position: 'relative', zIndex: 1,
            width: '100%', maxWidth: 1200,
            padding: '100px clamp(2rem, 5%, 64px) 80px',
            display: 'grid',
            gridTemplateColumns: '1.05fr 0.95fr',
            gap: 56,
            alignItems: 'center',
          }}
        >
          {/* ── Left column ── */}
          <div>
            <BlurRevealH1 text="Deploy agentic solutions locally. Your systems. Secured." />

            <p style={{
              margin: '0 0 32px',
              fontSize: 18, fontWeight: 400,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.55, maxWidth: 480,
              fontFamily: "'IBM Plex Sans', sans-serif",
            }}>
              D8TAOPS deploys agents directly into your existing environment to run pipelines and workflows. No migration. No infrastructure rebuild. Production-ready in 6 weeks.
            </p>


            {/* CTAs */}
            <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
              <D8Button href="#agents" innerStyle={{ fontSize: 16, padding: '17px 40px' }}>See how it works</D8Button>
              <a href="#contact" style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 16, fontWeight: 500,
                color: 'rgba(255,255,255,0.75)',
                textDecoration: 'none',
                borderBottom: '1px solid rgba(255,255,255,0.35)',
                paddingBottom: 2,
                transition: 'color 0.18s ease, border-color 0.18s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.8)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; }}
              >Talk to us</a>
            </div>

          </div>

          {/* ── Right column: Dashboard ── */}
          <div style={{ alignSelf: 'stretch', minHeight: 520 }}>
            <DashboardWidget />
          </div>
        </div>

        {/* ACM announcement bar — bottom of hero */}
        <ACMAnnouncementBanner />
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PARTNER BADGES — static trust badges below hero
// ═══════════════════════════════════════════════════════════════════════════════
const TICKER_BADGES = [
  { src: '/images/partners/nvidia.png',      alt: 'NVIDIA',       label: 'NVIDIA Inception' },
  { src: '/images/partners/aws.png',         alt: 'AWS',          label: 'AWS Partner' },
  { src: '/images/partners/azure.png',       alt: 'Azure',        label: 'Microsoft Azure' },
  { src: '/images/partners/databricks.png',  alt: 'Databricks',   label: 'Databricks' },
  { src: '/images/partners/google-cloud.png',alt: 'Google Cloud', label: 'Google Cloud' },
  { src: '/images/partners/ibm.png',         alt: 'IBM',          label: 'IBM' },
  { src: '/images/partners/snowflake.png',   alt: 'Snowflake',    label: 'Snowflake' },
];

function TickerBadge({ badge }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, opacity: 0.75, flexShrink: 0 }}>
      <img
        src={badge.src}
        alt={badge.alt}
        style={{ height: 32, width: 'auto', display: 'block', flexShrink: 0 }}
      />
      <span style={{
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: 12, fontWeight: 500,
        color: MUTED, letterSpacing: '0.04em',
        whiteSpace: 'nowrap',
      }}>{badge.label}</span>
    </div>
  );
}

function TickerBar() {
  const [paused, setPaused] = React.useState(false);
  // Each copy div includes paddingRight === gap so that
  // translateX(-50%) moves exactly one copy — no jump at the seam.
  const GAP = 56;
  const copyStyle = {
    display: 'flex', alignItems: 'center',
    gap: GAP, paddingRight: GAP, flexShrink: 0,
  };
  return (
    <div
      style={{
        background: '#f0f4f8',
        borderTop: '1px solid rgba(8,31,92,0.08)',
        borderBottom: '1px solid rgba(8,31,92,0.08)',
        padding: '18px 0',
        overflow: 'hidden',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{
        display: 'flex',
        width: 'max-content',
        animation: 'd8TickerScroll 38s linear infinite',
        animationPlayState: paused ? 'paused' : 'running',
        willChange: 'transform',
      }}>
        <div style={copyStyle}>
          {TICKER_BADGES.map(badge => <TickerBadge key={badge.alt} badge={badge} />)}
        </div>
        <div style={copyStyle} aria-hidden="true">
          {TICKER_BADGES.map(badge => <TickerBadge key={badge.alt} badge={badge} />)}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PILLARS
// ═══════════════════════════════════════════════════════════════════════════════
const PILLARS_DATA = [
  {
    icon: ShieldCheck,
    eyebrow: 'BUILT-IN GOVERNANCE',
    headline: 'Policy, lineage, and access control',
    body: 'Security and compliance are embedded into the workflow, not added later.',
    accent: BLUE,
  },
  {
    icon: Lock,
    eyebrow: 'YOUR DATA STAYS HOME',
    headline: 'No data hostages',
    body: 'D8TAOPS operates inside your environment, governed by your policies.',
    accent: BLUE,
  },
  {
    icon: Zap,
    eyebrow: 'AGENT-READY DATA',
    headline: 'Power private AI with traceability',
    body: 'Give copilots, agents, dashboards, and APIs trusted enterprise data.',
    accent: BLUE,
  },
];

function PillarCard({ pillar, index }) {
  const [ref, visible] = useReveal(0.15);
  const Icon = pillar.icon;
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.5s ease ${index * 100}ms, transform 0.5s ease ${index * 100}ms`,
        background: WHITE,
        borderRadius: 12,
        padding: '36px 32px',
        borderTop: `3px solid ${pillar.accent}`,
        boxShadow: '0 1px 4px rgba(8,31,92,0.06), 0 4px 16px rgba(8,31,92,0.04)',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
      }}
    >
      <div style={{
        width: 40, height: 40, borderRadius: 8,
        background: `${pillar.accent}12`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon size={20} color={pillar.accent} strokeWidth={1.75} />
      </div>
      <div style={{
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: '0.7rem', fontWeight: 600,
        textTransform: 'uppercase', letterSpacing: '0.13em',
        color: pillar.accent,
      }}>{pillar.eyebrow}</div>
      <div style={{
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: '1.125rem', fontWeight: 600,
        color: NAVY, lineHeight: 1.35,
      }}>{pillar.headline}</div>
      <div style={{
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: '0.9375rem', color: BODY,
        lineHeight: 1.65,
      }}>{pillar.body}</div>
    </div>
  );
}

function StatsSection() {
  return (
    <section style={{ background: '#F5F7FA', padding: '64px clamp(1.5rem, 5vw, 80px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 28,
        }}>
          {PILLARS_DATA.map((p, i) => <PillarCard key={p.eyebrow} pillar={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// WHO IT'S FOR — portrait cards
// ═══════════════════════════════════════════════════════════════════════════════
const PERSONA_CARDS = [
  {
    num: '01', icon: Briefcase, colorClass: 'c1',
    role: 'VP / C-SUITE',
    headline: 'The board wants results,\u00a0not\u00a0roadmaps.',
    pain: 'Competitors moving faster. Board pressure to show AI progress. No clear path from data to production.',
    change: 'A working system in 6 weeks with measurable ROI. No infrastructure overhaul required.',
  },
  {
    num: '02', icon: Database, colorClass: 'c2',
    role: 'DATA ENGINEER / ARCHITECT',
    headline: "You're asked to add AI. You're not given the foundation.",
    pain: "Asked to 'add AI' to systems not designed for it. Unclear ownership. No governance layer.",
    change: 'Agents that run inside your existing stack. Clean interfaces. Traceable lineage. Governance built in.',
  },
  {
    num: '03', icon: Settings2, colorClass: 'c3',
    role: 'OPERATIONS LEADER',
    headline: "Manual volume is the ceiling. It doesn't scale.",
    pain: "Manual, high-volume work that doesn't scale. Audit coverage gaps. Human error at scale.",
    change: 'Automated workflows with human-in-the-loop controls. Complete coverage without headcount growth.',
  },
];

function WhoItIsSection() {
  React.useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.18 });
    document.querySelectorAll('.d8-reveal').forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section style={{ background: '#f0f4f8', width: '100%', padding: '88px clamp(1.5rem, 5vw, 80px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div className="d8-reveal" style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 13, fontWeight: 600, letterSpacing: '0.15em',
          color: BLUE, textTransform: 'uppercase', marginBottom: 16,
        }}>WHO IT'S FOR</div>
        <h2 className="d8-reveal" style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontWeight: 700, fontSize: 'clamp(30px, 4vw, 50px)',
          color: NAVY, lineHeight: 1.1, letterSpacing: '-1px',
          marginBottom: 16, transitionDelay: '80ms',
        }}>Built for the teams that own the data and the outcomes.</h2>
        <p className="d8-reveal" style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 18, color: BODY, lineHeight: 1.68,
          maxWidth: 580, marginBottom: 48, transitionDelay: '160ms',
        }}>D8TAOPS is built for the people who sit at the intersection of AI pressure and data reality. If that's you, this is what changes.</p>

        <div
          className="d8-persona-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}
        >
          {PERSONA_CARDS.map((card, i) => (
            <div
              key={card.num}
              className="d8-portrait-card d8-reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="d8-portrait-top" style={{ background: 'linear-gradient(160deg, #0c1428 0%, #0f2560 45%, #081F5C 100%)' }}>
                <ParticleCanvas count={28} />
                <div style={{ position: 'relative', zIndex: 1, marginBottom: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 10, background: '#0477BF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <card.icon size={22} color="#FFFFFF" strokeWidth={1.5} />
                  </div>
                </div>
                <div style={{
                  position: 'relative', zIndex: 1,
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11, color: GREEN, textTransform: 'uppercase',
                  letterSpacing: '0.16em', fontWeight: 500, marginBottom: 10,
                }}>{card.role}</div>
                <div style={{
                  position: 'relative', zIndex: 1,
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: 19, fontWeight: 700, color: '#fff', lineHeight: 1.28,
                }}>{card.headline}</div>
              </div>
              <div style={{ padding: '28px 32px 36px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11, color: 'rgba(0,0,0,0.38)',
                  textTransform: 'uppercase', letterSpacing: '0.14em',
                  fontWeight: 500, marginBottom: 10,
                }}>THE PROBLEM</div>
                <p style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: 15, color: BODY, lineHeight: 1.68, margin: 0,
                  minHeight: 100,
                }}>{card.pain}</p>
                <div style={{
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: 11, color: BLUE,
                  textTransform: 'uppercase', letterSpacing: '0.14em',
                  fontWeight: 500, marginTop: 22, marginBottom: 10,
                }}>WHAT CHANGES</div>
                <p style={{
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  fontSize: 15, color: BLUE, lineHeight: 1.68, margin: 0,
                }}>{card.change}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatWeDoGrid() { return null; }

// ═══════════════════════════════════════════════════════════════════════════════
// AGENT PIPELINE — horizontal scroll
// ═══════════════════════════════════════════════════════════════════════════════
const s4Agents = [
  { num: 1, d: 'D8:INGEST',  r: 'Connects to your data sources and normalizes everything into a unified layer.' },
  { num: 2, d: 'D8:CAT',     r: 'Discovers, classifies, and catalogs your data with full lineage tracking. Every dataset traceable from origin.' },
  { num: 3, d: 'D8:CURATE',  r: 'Validates and cleans your data before it reaches AI models. Catches problems before they become errors.' },
  { num: 4, d: 'D8:SEC',     r: 'Enforces access controls, masks sensitive fields, and logs every action. Governance built in.' },
  { num: 5, d: 'D8:FLOW',    r: 'Orchestrates the entire workflow, coordinating task routing, policy checks, and human handoffs.' },
  { num: 6, d: 'D8:OBSERVE', r: 'Monitors pipeline health in real time. Tracks every decision and generates reports.' },
  { num: 7, d: 'D8:STAGE',   r: 'Delivers production-ready data products to the systems and teams that need them.' },
  { num: 8, d: 'D8:VIEW',    r: 'Clean, validated data delivered as dashboards, reports, and APIs in real time.' },
];

function AgentArrow() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: 28, flexShrink: 0 }}>
      <div style={{ flex: 1, height: 1.5, background: 'linear-gradient(90deg, #0477BF, #048ABF)', position: 'relative', overflow: 'visible' }}>
        <div style={{
          position: 'absolute', top: 0, left: '-40%',
          width: '40%', height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
          animation: 's4pulse 2s linear infinite',
        }} />
      </div>
      <div style={{ width: 0, height: 0, borderTop: '4px solid transparent', borderBottom: '4px solid transparent', borderLeft: '5px solid #0477BF', flexShrink: 0 }} />
    </div>
  );
}

function WhatWeDoSection() {
  const [activeIdx, setActiveIdx] = React.useState(-1);

  return (
    <section style={{ background: '#040e2e', width: '100%', padding: '96px 0', boxSizing: 'border-box', position: 'relative' }} id="agents">
      <div aria-hidden="true" className="d8-section-label" style={{
        position: 'absolute', left: 'clamp(4px, 1.5vw, 18px)', top: '50%',
        transform: 'translateY(-50%) rotate(180deg)',
        writingMode: 'vertical-rl',
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 600,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'rgba(62,207,142,0.25)', userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>THE PLATFORM</div>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 80px)' }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: GREEN, marginBottom: 16 }}>
          THE PLATFORM
        </div>
        <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', color: WHITE, letterSpacing: '-0.02em', lineHeight: 1.1, marginBottom: 12 }}>
          Meet the D8:Agents who get your data ready for AI.
        </h2>
        <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 18, color: 'rgba(255,255,255,0.7)', maxWidth: 680, lineHeight: 1.6, margin: '0 0 48px' }}>
          Each agent handles a distinct job. Together, they take raw data from your systems to governed, AI-ready output, without touching your infrastructure.
        </p>

        {/* 4×2 grid pipeline */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 0 }}>
          {s4Agents.map((agent, i) => {
            const isActive = activeIdx === i;
            const isView = i === 7;
            return (
              <button
                key={agent.d}
                className={`d8-agent-card${isActive ? ' active' : ''}${isView ? ' d8-agent-card-view' : ''}`}
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(-1)}
                style={{
                  background: isActive ? 'rgba(62,207,142,0.12)' : 'rgba(255,255,255,0.06)',
                  border: isView ? '1px solid rgba(62,207,142,0.4)' : isActive ? '1px solid rgba(62,207,142,0.5)' : '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 14,
                  padding: '16px 14px',
                  cursor: 'default',
                  textAlign: 'left',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box',
                  width: '100%',
                  transition: 'background 0.18s ease, transform 0.18s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <div className="d8-agent-desig" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: isActive ? 'rgba(62,207,142,0.9)' : 'rgba(255,255,255,0.5)' }}>{agent.d}</div>
                  <div className="d8-agent-num" style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 20, height: 20, borderRadius: '50%',
                    background: isActive ? 'rgba(62,207,142,0.25)' : 'rgba(4,119,191,0.15)',
                    color: isActive ? GREEN : BLUE,
                    fontSize: 9, fontWeight: 600,
                    fontFamily: "'IBM Plex Mono', monospace",
                    flexShrink: 0, marginLeft: 6,
                  }}>{agent.num}</div>
                </div>
                <div className="d8-agent-role" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 11, color: isActive ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.45)', lineHeight: 1.4 }}>{agent.r}</div>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// D8:VIEW — mid-blue section, text left / image right
// ═══════════════════════════════════════════════════════════════════════════════
function D8ViewSection() {
  const sectionRef = React.useRef(null);
  const imgRef     = React.useRef(null);
  const [textVisible, setTextVisible] = React.useState(false);
  const [imgVisible,  setImgVisible]  = React.useState(false);
  const [lightbox,    setLightbox]    = React.useState(false);

  React.useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setTextVisible(true); io.disconnect(); }
    }, { threshold: 0.15 });
    io.observe(section);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setImgVisible(true); io.disconnect(); }
    }, { threshold: 0.25 });
    io.observe(img);
    return () => io.disconnect();
  }, []);

  const textBase = {
    transition: 'opacity 600ms ease, transform 600ms cubic-bezier(0.16, 1, 0.3, 1)',
  };
  const hidden = { opacity: 0, transform: 'translateX(-36px)' };
  const shown  = { opacity: 1, transform: 'translateX(0)' };

  return (
    <section
      ref={sectionRef}
      style={{ background: '#f0f4f8', padding: 'clamp(64px, 8vw, 96px) clamp(1.5rem, 5vw, 80px)', overflow: 'hidden' }}
    >
      <div
        className="d8-view-grid"
        style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '45fr 55fr', gap: 64, alignItems: 'center' }}
      >
        {/* Text column — staggered slide-in from left */}
        <div className="d8-view-text-col">
          <div style={{
            ...textBase,
            ...(textVisible ? shown : hidden),
            transitionDelay: '0ms',
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 13, fontWeight: 600, letterSpacing: '0.15em',
            textTransform: 'uppercase', color: BLUE, marginBottom: 16,
          }}>D8:VIEW</div>

          <h2 style={{
            ...textBase,
            ...(textVisible ? shown : hidden),
            transitionDelay: '80ms',
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontWeight: 700, fontSize: 'clamp(30px, 4vw, 50px)',
            color: NAVY, lineHeight: 1.1, letterSpacing: '-1px', marginBottom: 24,
          }}>
            See <span style={{ color: BLUE }}>YOUR</span> data pipeline.
          </h2>

          <p style={{
            ...textBase,
            ...(textVisible ? shown : hidden),
            transitionDelay: '160ms',
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 17, color: BODY, lineHeight: 1.68, margin: 0,
          }}>
            Our agents do the work to orchestrate your data so you can make decisions quickly. Clean, secure data is presented to you the way you want to see it.
          </p>
        </div>

        {/* Image column — scale+fade on scroll, click to expand */}
        <div
          ref={imgRef}
          className="d8-view-img"
          style={{
            opacity: imgVisible ? 1 : 0,
            transform: imgVisible ? 'scale(1) translateY(0)' : 'scale(0.94) translateY(24px)',
            transition: 'transform 600ms cubic-bezier(0.0, 0, 0.2, 1), opacity 600ms cubic-bezier(0.0, 0, 0.2, 1)',
            cursor: 'zoom-in', position: 'relative',
          }}
          onClick={() => setLightbox(true)}
        >
          <img
            src="/images/dashboard-preview.png"
            alt="D8:VIEW — data pipeline dashboard"
            style={{ width: '100%', display: 'block', borderRadius: 12, boxShadow: '0 20px 60px rgba(8,31,92,0.12)' }}
          />
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 2000,
            background: 'rgba(4,14,46,0.92)', backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '40px 24px', cursor: 'zoom-out',
            animation: 'lightboxIn 0.22s ease',
          }}
        >
          <style>{`@keyframes lightboxIn { from { opacity:0; } to { opacity:1; } }`}</style>
          <button
            onClick={() => setLightbox(false)}
            style={{
              position: 'absolute', top: 20, right: 24,
              background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: 8,
              color: 'white', fontSize: 20, width: 36, height: 36,
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            aria-label="Close"
          >×</button>
          <img
            src="/images/dashboard-preview.png"
            alt="D8:VIEW — data pipeline dashboard"
            style={{
              maxWidth: '92vw', maxHeight: '88vh', borderRadius: 14,
              boxShadow: '0 40px 120px rgba(0,0,0,0.6)',
              display: 'block',
            }}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CASE STUDY — 5fr / 7fr, ghost watermark
// ═══════════════════════════════════════════════════════════════════════════════
const PROOF_METRICS = [
  { target: 97,   decimals: 0, suffix: '%',    label: 'FASTER',            sub: 'Audit time per loan. Manual cycles replaced by agentic validation in under one minute.' },
  { target: 100,  decimals: 0, suffix: '%',    label: 'COVERAGE',          sub: 'Every loan audited, every night. Not sampled.' },
  { target: 99.5, decimals: 1, suffix: '%',    label: 'ACCURACY',          sub: 'Consistent policy interpretation across every audit.' },
  { target: 1.2,  decimals: 1, prefix: '$', suffix: 'M+', label: 'PROJECTED SAVINGS', sub: 'Over 3 years through labor avoidance and improved compliance efficiency.' },
  { target: 6,    decimals: 0, suffix: ' Weeks', label: 'DEPLOYED',        sub: 'Micro-MVP to production. Break-even under 12 months.', wide: true },
];

function ProofBlockSection() {
  return (
    <section style={{
      padding: '96px clamp(1.5rem, 5vw, 80px)',
      backgroundImage: `radial-gradient(circle, rgba(4,119,191,0.18) 1px, transparent 1px), linear-gradient(160deg, #0c1428 0%, #0f2560 45%, #081F5C 100%)`,
      backgroundSize: '24px 24px, 100% 100%',
      position: 'relative', overflow: 'hidden',
    }}>
      <div aria-hidden="true" className="d8-section-label" style={{
        position: 'absolute', left: 'clamp(4px, 1.5vw, 18px)', top: '50%',
        transform: 'translateY(-50%) rotate(180deg)',
        writingMode: 'vertical-rl',
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 600,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.18)', userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
        zIndex: 1,
      }}>CUSTOMER STORY</div>
      <ParticleCanvas />
      {/* Radial glows */}
      <div aria-hidden="true" style={{
        position: 'absolute', width: 380, height: 380, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(62,207,142,0.08) 0%, transparent 70%)',
        top: '-5%', right: '8%', pointerEvents: 'none', zIndex: 0,
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', width: 240, height: 240, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(62,207,142,0.06) 0%, transparent 70%)',
        bottom: '10%', left: '18%', pointerEvents: 'none', zIndex: 0,
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: GREEN, marginBottom: 16 }}>
          CUSTOMER STORY
        </div>
        <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 700, fontSize: 'clamp(1.8rem, 3vw, 2.25rem)', color: WHITE, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 48 }}>
          A regional credit union went from 8 hours to 14 minutes.
        </h2>

        <div
          className="d8-proof-grid"
          style={{ display: 'grid', gridTemplateColumns: '5fr 7fr', gap: 56, alignItems: 'start' }}
        >
          {/* Left — narrative copy */}
          <div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: GREEN, marginBottom: 8 }}>CHALLENGE</div>
            <p style={{ margin: 0, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.8)', maxWidth: 'none' }}>
              A regional credit union conducted loan audits manually using static checklists and siloed systems. Inconsistent underwriting interpretation created compliance gaps and regulatory risk. Audits were time-intensive and labor-heavy, limiting coverage. Leadership needed more confidence — without growing headcount.
            </p>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.12)', margin: '24px 0' }} />
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: GREEN, marginBottom: 8 }}>THE SOLUTION</div>
            <p style={{ margin: 0, fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 15, lineHeight: 1.75, color: 'rgba(255,255,255,0.8)', maxWidth: 'none' }}>
              D8TAOPS co-designed an agentic audit platform running entirely inside the credit union's Azure environment. The system ingests loan data, applies policy and risk checks, generates explainable reports, and routes findings to human reviewers. No data leaves the credit union's cloud. Compliance teams can review, override, and approve findings.
            </p>
          </div>

          {/* Right — stat grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
            {PROOF_METRICS.map((m) => (
              <div key={m.label} style={{
                gridColumn: m.wide ? 'span 2' : 'auto',
                background: 'rgba(255,255,255,0.05)',
                borderTop: `2px solid rgba(62,207,142,0.32)`,
                borderRadius: 12, padding: 20,
                display: 'flex', flexDirection: 'column',
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Per-cell ghost watermark */}
                <div aria-hidden="true" style={{
                  position: 'absolute', right: '-4%', bottom: '-8%',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '4.5rem', fontWeight: 700,
                  color: 'rgba(62,207,142,0.07)',
                  lineHeight: 1, pointerEvents: 'none', userSelect: 'none',
                  zIndex: 0,
                }}>{m.target}{m.suffix}</div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, color: GREEN, lineHeight: 1, letterSpacing: '-0.02em' }}>
                    <AnimatedNumber target={m.target} decimals={m.decimals} prefix={m.prefix || ''} suffix={m.suffix} duration={1000} />
                  </div>
                  <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: WHITE, marginTop: 6 }}>{m.label}</div>
                  <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5, marginTop: 6 }}>{m.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CLOSING CTA
// ═══════════════════════════════════════════════════════════════════════════════
function ClosingCTA() {
  return (
    <section id="contact" style={{ padding: '96px clamp(1.5rem, 5vw, 3rem)', background: '#040e2e', scrollMarginTop: 80, position: 'relative', overflow: 'hidden' }}>
      {/* Subtle background glow */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: '-20%', left: '50%', transform: 'translateX(-50%)',
        width: 600, height: 400, borderRadius: '50%',
        background: 'radial-gradient(ellipse, rgba(4,119,191,0.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{ maxWidth: 620, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: GREEN, marginBottom: 20 }}>
          GET STARTED
        </div>
        <h2 style={{ margin: '0 0 20px', fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, color: WHITE, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
          Your first audit runs tonight.
        </h2>
        <p style={{ margin: '0 0 40px', fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', maxWidth: 480 }}>
          We'll show you what a 6-week deployment looks like for your environment. No pitch, no pressure.
        </p>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <D8Button href="mailto:hello@d8taops.com" innerStyle={{ fontSize: 16, padding: '17px 40px' }}>Book a Demo</D8Button>
          <a href="#agents" style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 16, fontWeight: 500,
            color: 'rgba(255,255,255,0.65)',
            textDecoration: 'none',
            borderBottom: '1px solid rgba(255,255,255,0.3)',
            paddingBottom: 2,
            transition: 'color 0.18s ease, border-color 0.18s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'; }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
          >See how it works →</a>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FOOTER — logo · nav · copyright · address · social · legal
// ═══════════════════════════════════════════════════════════════════════════════
const FOOTER_NAV = [
  { label: 'HOME',         href: '/' },
  { label: 'PLATFORM',     href: '/platform' },
  { label: 'CASE STUDIES', href: '/case-studies' },
  { label: 'ABOUT',        href: '/about' },
  { label: 'LABS',         href: '/labs' },
];

function GlobalFooter() {
  return (
    <footer style={{ background: NAVY_DEEP, borderTop: `1px solid rgba(255,255,255,0.055)`, padding: '40px clamp(1.5rem, 5vw, 80px) 28px', position: 'relative', overflow: 'hidden' }}>
      <svg aria-hidden="true" style={{ position: 'absolute', right: -30, bottom: -20, width: 300, height: 300, opacity: 0.07, pointerEvents: 'none', zIndex: 0 }} viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="300" cy="300" r="80"  stroke="white" strokeWidth="1"/>
        <circle cx="300" cy="300" r="140" stroke="white" strokeWidth="1"/>
        <circle cx="300" cy="300" r="200" stroke="white" strokeWidth="1"/>
        <line x1="260" y1="300" x2="300" y2="300" stroke="white" strokeWidth="1"/>
        <line x1="300" y1="260" x2="300" y2="300" stroke="white" strokeWidth="1"/>
        <line x1="300" y1="300" x2="195" y2="155" stroke="white" strokeWidth="0.75"/>
        <line x1="300" y1="300" x2="115" y2="218" stroke="white" strokeWidth="0.75"/>
        <circle cx="220" cy="300" r="2.5" fill="white"/>
        <circle cx="160" cy="300" r="2.5" fill="white"/>
        <circle cx="300" cy="220" r="2.5" fill="white"/>
        <circle cx="300" cy="160" r="2.5" fill="white"/>
      </svg>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Top row: logo · nav · social icons + copyright */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: 20, marginBottom: 28 }}>
          <img src="/images/d8taops-logo.png" alt="Loop" style={{ height: 32, width: 'auto', display: 'block' }} />
          <nav style={{ display: 'flex', gap: 28, flexWrap: 'wrap', justifyContent: 'center' }}>
            {FOOTER_NAV.map(({ label, href }) => (
              <a key={label} href={href}
                className="footer-link"
                style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14, fontWeight: 500 }}
              >{label}</a>
            ))}
          </nav>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'flex-end' }}>
            {/* Social icons */}
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              {/* LinkedIn */}
              <a href="https://www.linkedin.com/company/d8taops/posts/?feedView=all" className="footer-link" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              {/* YouTube */}
              <a href="https://www.youtube.com/@D8TAOPS" className="footer-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
            {/* Copyright */}
            <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.28)', fontWeight: 500, whiteSpace: 'nowrap' }}>© 2026 D8TAOPS. All rights reserved.</span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 24 }} />

        {/* Bottom row: address · quote · legal links on one line */}
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', gap: 32 }}>
          {/* Address */}
          <address style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 12, color: 'rgba(255,255,255,0.32)',
            fontStyle: 'normal', lineHeight: 1.6,
            flex: 1, textAlign: 'center',
          }}>
            4145 Southwest Watson Avenue, Suite 350<br />
            Beaverton, Oregon 97005, United States
          </address>

          {/* Quote */}
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.32)', fontStyle: 'italic', margin: '0', flex: 1, textAlign: 'center' }}>Nowhere is the dreamer or the misfit so alone.</p>

          {/* Legal links */}
          <div style={{ display: 'flex', gap: 20, alignItems: 'center', flex: 1, justifyContent: 'center' }}>
            <a href="/privacy" className="footer-link" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12 }}>Privacy Policy</a>
            <a href="/terms" className="footer-link" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12 }}>Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// WHAT D8TAOPS DOES — white section, 3-card grid
// ═══════════════════════════════════════════════════════════════════════════════
const WHAT_CARDS = [
  {
    h3: 'Agents that run in your environment',
    body: 'D8TAOPS agents deploy inside your existing cloud or on-prem infrastructure. No new vendors. No data leaving your perimeter.',
  },
  {
    h3: 'Production-ready in 6 weeks',
    body: 'We scope a Micro-MVP, validate it with your team, and go live. Most clients are in production within 6 weeks of kickoff.',
  },
  {
    h3: 'You own it. We maintain it.',
    body: 'Human-in-the-loop design means your team reviews, overrides, and approves what the agents produce. AI handles volume. People handle judgment.',
  },
];

function WhatD8TAOPSDoes() {
  return (
    <section style={{ background: WHITE, padding: '88px clamp(1.5rem, 5vw, 80px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <h2 style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
          color: NAVY, letterSpacing: '-0.02em', lineHeight: 1.1,
          marginBottom: 48,
        }}>
          <span style={{ color: NAVY, fontStyle: 'normal' }}>We send AI agents to your data. </span>
          <span style={{ color: BLUE, fontStyle: 'italic' }}>You don't move a thing.</span>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {WHAT_CARDS.map((card) => (
            <div key={card.h3} className="d8-what-card">
              <h3 style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: 600, fontSize: 18,
                color: NAVY, lineHeight: 1.3,
                margin: '0 0 16px',
              }}>{card.h3}</h3>
              <p style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 15, color: BODY, lineHeight: 1.68,
                margin: 0,
              }}>{card.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Null stubs for backward compatibility ─────────────────────────────────────
function ComparisonSection() { return null; }
function WhoWeAreSection()   { return null; }
function IngestAgentDemo()   { return null; }
function DashboardShowcase() { return null; }

// ═══════════════════════════════════════════════════════════════════════════════
// ACM ANNOUNCEMENT BANNER — sits at bottom of HeroSection
// ═══════════════════════════════════════════════════════════════════════════════
function ACMAnnouncementBanner() {
  const [visible, setVisible] = React.useState(() => {
    try { return sessionStorage.getItem('acm-banner-dismissed') !== '1'; }
    catch { return true; }
  });
  const [ctaHovered, setCtaHovered] = React.useState(false);

  const dismiss = () => {
    setVisible(false);
    try { sessionStorage.setItem('acm-banner-dismissed', '1'); } catch {}
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 10,
      background: 'transparent',
    }}>
      {/* Mirror the hero content container so content left-edge aligns with the h1 */}
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '16px clamp(2rem, 5%, 64px)',
        display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px 12px',
        fontFamily: "'IBM Plex Sans', sans-serif",
        position: 'relative',
      }}>
        {/* Eyebrow label — dot + bold text, no background shape */}
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
          <span style={{ width: 7, height: 7, borderRadius: 2, background: BLUE, flexShrink: 0 }} />
          <span style={{
            fontSize: 11, fontWeight: 800, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: BLUE,
          }}>Early Access</span>
        </span>

        <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: 13, flexShrink: 0 }}>|</span>

        <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.85)' }}>
          Adaptive Compliance Management (ACM) —
        </span>

        <a
          href="/platform#acm"
          onMouseEnter={() => setCtaHovered(true)}
          onMouseLeave={() => setCtaHovered(false)}
          style={{
            fontSize: 14, fontWeight: 600,
            color: ctaHovered ? WHITE : 'rgba(255,255,255,0.9)',
            textDecoration: 'none',
            borderBottom: `1px solid rgba(255,255,255,${ctaHovered ? '0.7' : '0.3'})`,
            paddingBottom: 1,
            transition: 'color 0.15s, border-color 0.15s',
            flexShrink: 0,
          }}
        >
          define what your agents can do →
        </a>

        <button
          onClick={dismiss}
          aria-label="Dismiss announcement"
          style={{
            position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'rgba(255,255,255,0.25)', padding: 8, lineHeight: 1,
            fontSize: 20, transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(255,255,255,0.55)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.25)'}
        >×</button>
      </div>
    </div>
  );
}

export {
  GLOBAL_CSS,
  HeroSection,
  TickerBar,
  StatsSection,
  ComparisonSection,
  WhoWeAreSection,
  WhatWeDoSection,
  WhatWeDoGrid,
  WhatD8TAOPSDoes,
  WhoItIsSection,
  D8ViewSection,
  IngestAgentDemo,
  DashboardShowcase,
  ProofBlockSection,
  ClosingCTA,
  GlobalFooter,
  ACMAnnouncementBanner,
};

// ═══════════════════════════════════════════════════════════════════════════════
// DATA FLOW STRIP — for platform page
// ═══════════════════════════════════════════════════════════════════════════════
const DF_NODES = [
  { name: 'D8:INGEST', role: 'Connect'     },
  { name: 'D8:CAT',    role: 'Catalog'     },
  { name: 'D8:CURATE', role: 'Clean'       },
  { name: 'D8:SEC',    role: 'Secure'      },
  { name: 'D8:FLOW',   role: 'Orchestrate' },
];
const DF_TARGET = 4200000;

function DataFlowStrip() {
  const wrapRef   = React.useRef(null);
  const playedRef = React.useRef(false);

  const [count,       setCount]       = React.useState(0);
  const [activeNodes, setActiveNodes] = React.useState(0);
  const [statsIn,     setStatsIn]     = React.useState(false);
  const [dashIn,      setDashIn]      = React.useState(false);
  const [ctaIn,       setCtaIn]       = React.useState(false);

  React.useEffect(() => {
    const el = wrapRef.current; if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || playedRef.current) return;
      playedRef.current = true;
      io.disconnect();

      if (reduced) {
        setCount(DF_TARGET); setActiveNodes(DF_NODES.length);
        setStatsIn(true); setDashIn(true); setCtaIn(true);
        return;
      }

      // Beat 1 — counter easeOut cubic over 1400ms
      const t0 = performance.now();
      const tick = (now) => {
        const t    = Math.min((now - t0) / 1400, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        setCount(Math.round(ease * DF_TARGET));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);

      // Beat 2 — nodes stagger (150ms apart, starting at 200ms)
      DF_NODES.forEach((_, i) =>
        setTimeout(() => setActiveNodes(n => n + 1), 200 + i * 150)
      );

      // Beat 3 — stats after node 3 lights up
      setTimeout(() => setStatsIn(true), 200 + 2 * 150 + 120);

      // Beat 4 — dashboard after all nodes + 300ms
      const allNodesMs = 200 + (DF_NODES.length - 1) * 150;
      setTimeout(() => setDashIn(true), allNodesMs + 300);
      setTimeout(() => setCtaIn(true),  allNodesMs + 680);
    }, { threshold: 0.25 });

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const fmtCount = (n) =>
    n >= 1000000 ? (n / 1000000).toFixed(1) + 'M'
    : n >= 1000  ? Math.round(n / 1000) + 'K'
    : String(n);

  return (
    <section style={{
      background: NAVY,
      backgroundImage: `radial-gradient(circle, rgba(4,119,191,0.18) 1px, transparent 1px)`,
      backgroundSize: '24px 24px',
      padding: '72px clamp(1.5rem, 5vw, 64px)',
      overflow: 'hidden', position: 'relative', boxSizing: 'border-box',
    }}>
      <style>{`
        @keyframes dfDot {
          0%   { left: -6%; opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { left: 106%; opacity: 0; }
        }
      `}</style>

      <div ref={wrapRef} style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* Eyebrow */}
        <div style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 11, fontWeight: 600, letterSpacing: '0.18em',
          color: 'rgba(4,119,191,0.65)', textTransform: 'uppercase',
          textAlign: 'center', marginBottom: 40,
        }}>THE PLATFORM IN ACTION</div>

        {/* ── Main row ── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>

          {/* Counter */}
          <div style={{ flexShrink: 0, width: 120, textAlign: 'right' }}>
            <div style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 'clamp(30px, 3.2vw, 50px)', fontWeight: 700,
              color: GREEN, lineHeight: 1, letterSpacing: '-0.02em',
              fontVariantNumeric: 'tabular-nums',
            }}>{fmtCount(count)}</div>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, fontWeight: 600,
              letterSpacing: '0.14em', color: 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase', marginTop: 5,
            }}>records</div>
          </div>

          {/* Entry arrow */}
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
            <line x1="0" y1="6" x2="13" y2="6" stroke="rgba(4,119,191,0.4)" strokeWidth="1.5"/>
            <path d="M11 3L17 6L11 9" stroke="rgba(4,119,191,0.4)" strokeWidth="1.5" fill="none"/>
          </svg>

          {/* Pipeline nodes */}
          <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'center' }}>
            {DF_NODES.map((node, i) => (
              <React.Fragment key={node.name}>
                <div style={{
                  flexShrink: 0, width: 90, height: 52,
                  background: activeNodes > i ? WHITE : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${activeNodes > i ? BLUE : 'rgba(4,119,191,0.18)'}`,
                  borderRadius: 10,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', gap: 3,
                  boxShadow: activeNodes > i ? '0 0 18px rgba(4,119,191,0.28)' : 'none',
                  transition: 'background 280ms ease, border-color 280ms ease, box-shadow 280ms ease',
                }}>
                  <span style={{
                    fontFamily: "'IBM Plex Sans', sans-serif",
                    fontSize: 10, fontWeight: 700,
                    color: activeNodes > i ? NAVY : 'rgba(255,255,255,0.25)',
                    lineHeight: 1, transition: 'color 280ms ease',
                  }}>{node.name}</span>
                  <span style={{
                    fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 8.5,
                    color: activeNodes > i ? BLUE : 'rgba(255,255,255,0.18)',
                    lineHeight: 1, transition: 'color 280ms ease',
                  }}>{node.role}</span>
                </div>

                {i < DF_NODES.length - 1 && (
                  <div style={{
                    flex: 1, minWidth: 8, height: 52,
                    display: 'flex', alignItems: 'center', position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute', left: 0, right: 0,
                      height: 2, background: 'rgba(4,119,191,0.18)',
                    }} />
                    {activeNodes > i && (
                      <div style={{
                        position: 'absolute', width: 7, height: 7, borderRadius: '50%',
                        background: GREEN, top: '50%', marginTop: -3.5,
                        animation: `dfDot 1600ms linear infinite`,
                        animationDelay: `${i * 300}ms`,
                      }} />
                    )}
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Exit arrow */}
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
            <line x1="0" y1="6" x2="13" y2="6"
              stroke={dashIn ? 'rgba(62,207,142,0.55)' : 'rgba(4,119,191,0.18)'}
              strokeWidth="1.5" style={{ transition: 'stroke 400ms ease' }}/>
            <path d="M11 3L17 6L11 9"
              stroke={dashIn ? 'rgba(62,207,142,0.55)' : 'rgba(4,119,191,0.18)'}
              strokeWidth="1.5" fill="none" style={{ transition: 'stroke 400ms ease' }}/>
          </svg>

          {/* Dashboard tile */}
          <div style={{
            flexShrink: 0, width: 148,
            background: dashIn ? WHITE : 'rgba(255,255,255,0.04)',
            border: `1.5px solid ${dashIn ? GREEN : 'rgba(62,207,142,0.12)'}`,
            borderRadius: 12, padding: '14px 16px',
            opacity: dashIn ? 1 : 0,
            transform: dashIn ? 'translateX(0)' : 'translateX(16px)',
            transition: 'opacity 400ms cubic-bezier(0.22,1,0.36,1), transform 400ms cubic-bezier(0.22,1,0.36,1), background 400ms ease, border-color 400ms ease',
          }}>
            <div style={{
              fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, fontWeight: 600,
              color: BLUE, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 7,
            }}>OUTPUT</div>
            <div style={{
              fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 26, fontWeight: 700,
              color: NAVY, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 2,
            }}>100%</div>
            <div style={{
              fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 10,
              color: MUTED, lineHeight: 1.4, marginBottom: 10,
            }}>portfolio coverage</div>
            <svg width="100%" height="22" viewBox="0 0 114 22" fill="none" aria-label="Trending upward">
              <polygon points="0,20 19,16 38,17 57,10 76,6 95,3 114,1 114,22 0,22" fill="rgba(62,207,142,0.08)"/>
              <polyline points="0,20 19,16 38,17 57,10 76,6 95,3 114,1"
                stroke={GREEN} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* ── Stats strip ── */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 56, marginTop: 36,
          opacity: statsIn ? 1 : 0,
          transform: statsIn ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 320ms ease, transform 320ms ease',
        }}>
          {[
            { num: '4.2M',  label: 'records per run'            },
            { num: '6 sec', label: 'avg processing time'        },
            { num: '100%',  label: 'portfolio coverage'         },
          ].map(({ num, label }) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 20, fontWeight: 700,
                color: GREEN, lineHeight: 1, letterSpacing: '-0.01em',
              }}>{num}</div>
              <div style={{
                fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, fontWeight: 500,
                letterSpacing: '0.1em', color: 'rgba(255,255,255,0.38)',
                textTransform: 'uppercase', marginTop: 5,
              }}>{label}</div>
            </div>
          ))}
        </div>

        {/* ── CTA ── */}
        <div style={{
          textAlign: 'center', marginTop: 28,
          opacity: ctaIn ? 1 : 0,
          transform: ctaIn ? 'translateY(0)' : 'translateY(8px)',
          transition: 'opacity 300ms ease 80ms, transform 300ms ease 80ms',
        }}>
          <a href="/platform" style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 13, fontWeight: 600,
            color: BLUE, textDecoration: 'none',
          }}>See how it works in your stack →</a>
        </div>

      </div>
    </section>
  );
}

