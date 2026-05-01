import React from 'react';
import HomepageNav from './HomepageNav';
import { GLOBAL_CSS, GlobalFooter } from './HomepageSections';
import D8Button from './D8Button';
import ParticleCanvas from './ParticleCanvas';

// ── Brand tokens ──────────────────────────────────────────────────────────────
const NAVY  = '#081F5C';
const BLUE  = '#0477BF';
const BODY  = '#333333';
const MUTED = '#515151';
const WHITE = '#FFFFFF';
const GREEN = '#3ecf8e';

// ── Platform-specific CSS ─────────────────────────────────────────────────────
const PLATFORM_CSS = `
  /* ── Pipeline ── */
  @keyframes plt-dot-travel {
    0%   { left: 0;    opacity: 0; }
    8%   { opacity: 1; }
    92%  { opacity: 1; }
    100% { left: 100%; opacity: 0; }
  }

  .plt-dot {
    position: absolute;
    width: 8px; height: 8px;
    border-radius: 50%;
    background: ${GREEN};
    top: 50%; margin-top: -4px;
    animation: plt-dot-travel 1800ms linear infinite;
    pointer-events: none;
  }

  .plt-node {
    flex-shrink: 0;
    width: 120px; height: 64px;
    background: ${WHITE};
    border: 1px solid rgba(4,119,191,0.30);
    border-radius: 10px;
    display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    gap: 3px;
    cursor: pointer;
    transition: border-color 120ms ease, box-shadow 120ms ease, transform 120ms ease;
    box-sizing: border-box;
  }
  .plt-node:hover, .plt-node.active {
    border-color: ${BLUE};
    box-shadow: 0 4px 16px rgba(4,119,191,0.18);
    transform: translateY(-2px);
  }
  .plt-node:focus-visible {
    outline: 2px solid ${BLUE};
    outline-offset: 3px;
  }

  .plt-connector {
    flex: 1; min-width: 16px;
    position: relative;
    height: 64px;
    display: flex; align-items: center;
  }
  .plt-connector-line {
    position: absolute; left: 0; right: 0;
    height: 2px; background: rgba(4,119,191,0.20);
  }

  .plt-panel {
    background: ${WHITE};
    border: 1px solid ${BLUE};
    border-radius: 12px;
    padding: 20px 24px;
    box-shadow: 0 8px 32px rgba(8,31,92,0.12);
    animation: plt-panel-in 300ms cubic-bezier(0.22,1,0.36,1) both;
    position: relative;
  }
  @keyframes plt-panel-in {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── Use case cards ── */
  .plt-card {
    background: ${WHITE};
    border: 1px solid rgba(8,31,92,0.12);
    border-radius: 16px;
    padding: 36px 32px;
    transition: transform 0.18s ease, box-shadow 0.18s ease;
    display: flex; flex-direction: column;
    box-sizing: border-box;
  }
  .plt-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(8,31,92,0.1);
  }

  /* ── Callout cards ── */
  .plt-callout {
    background: ${WHITE};
    border: 1px solid rgba(8,31,92,0.12);
    border-radius: 16px;
    padding: 24px;
    transition: box-shadow 120ms ease, border-color 120ms ease;
  }
  .plt-callout:hover {
    box-shadow: 0 6px 20px rgba(8,31,92,0.08);
    border-color: rgba(4,119,191,0.30);
  }

  /* ── Decision tree tooltip ── */
  .plt-tooltip {
    display: none;
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%; transform: translateX(-50%);
    background: ${WHITE};
    border: 1px solid ${BLUE};
    border-radius: 8px;
    padding: 10px 14px;
    box-shadow: 0 4px 16px rgba(8,31,92,0.12);
    white-space: nowrap;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 12px;
    color: ${BODY};
    z-index: 10;
    pointer-events: none;
  }
  .plt-has-tooltip { position: relative; }
  .plt-has-tooltip:hover .plt-tooltip { display: block; }

  /* ── Responsive ── */
  @media (max-width: 900px) {
    .plt-pipe-row {
      flex-direction: column !important;
      align-items: stretch !important;
    }
    .plt-node {
      width: 100% !important;
      height: 48px !important;
      flex-direction: row !important;
      justify-content: flex-start !important;
      gap: 12px !important;
      padding: 0 16px !important;
    }
    .plt-connector {
      flex: none !important;
      width: 2px !important; height: 24px !important;
      align-self: center !important;
    }
    .plt-connector-line {
      left: 0 !important; right: auto !important;
      width: 2px !important; height: 100% !important;
      top: 0 !important;
    }
    .plt-dot {
      left: 50% !important; margin-left: -4px !important;
      margin-top: 0 !important;
      animation-name: plt-dot-travel-vert !important;
    }
    @keyframes plt-dot-travel-vert {
      0%   { top: 0;    opacity: 0; }
      8%   { opacity: 1; }
      92%  { opacity: 1; }
      100% { top: 100%; opacity: 0; }
    }
    .plt-two-col { flex-direction: column !important; }
    .plt-two-col > * { width: 100% !important; }
    .plt-arch-outer { font-size: 10px !important; }
    .plt-cards-grid { grid-template-columns: 1fr !important; }
    .plt-callouts-grid { grid-template-columns: 1fr !important; }
    .plt-stats-3 { grid-template-columns: 1fr !important; gap: 24px !important; }
    .plt-tree { zoom: 0.9; }
  }

  @media (max-width: 600px) {
    .plt-tree { zoom: 0.75; }
  }

  @media (prefers-reduced-motion: reduce) {
    .plt-dot { animation: none !important; display: none !important; }
    .plt-panel { animation: none !important; }
    .plt-node { transition: none !important; }
  }
`;

// ── Utility: IntersectionObserver reveal ─────────────────────────────────────
function useReveal(threshold = 0.12) {
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

// ── Utility: stagger-reveal group ────────────────────────────────────────────
function useStaggerReveal(count, threshold = 0.12) {
  const ref = React.useRef(null);
  const [visibleCount, setVisibleCount] = React.useState(0);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        io.disconnect();
        let i = 0;
        const step = () => {
          setVisibleCount(n => n + 1);
          if (++i < count) setTimeout(step, 80);
        };
        step();
      }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [count, threshold]);
  return [ref, visibleCount];
}

// ── Eyebrow / Section header helpers ─────────────────────────────────────────
function Eyebrow({ children }) {
  return (
    <div style={{
      fontFamily: "'IBM Plex Mono', monospace",
      fontSize: 13, fontWeight: 600, letterSpacing: '0.15em',
      color: BLUE, textTransform: 'uppercase', marginBottom: 16,
    }}>{children}</div>
  );
}

function SectionH2({ children, light, style }) {
  return (
    <h2 style={{
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontWeight: 700, fontSize: 'clamp(30px, 4vw, 50px)',
      color: light ? WHITE : NAVY,
      lineHeight: 1.1, letterSpacing: '-0.03em',
      margin: '0 0 16px',
      textWrap: 'balance',
      ...style,
    }}>{children}</h2>
  );
}

function SectionH3({ children, light, style }) {
  return (
    <h3 style={{
      fontFamily: "'IBM Plex Sans', sans-serif",
      fontSize: 18, fontWeight: 600,
      color: light ? 'rgba(255,255,255,0.75)' : BLUE,
      lineHeight: 1.45, margin: '0 0 24px',
      textWrap: 'balance',
      ...style,
    }}>{children}</h3>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// S1 — HERO
// ═══════════════════════════════════════════════════════════════════════════════
function PlatformHero() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS + PLATFORM_CSS }} />
      <div style={{
        position: 'relative',
        width: '100%',
        minHeight: 'max(520px, 70vh)',
        display: 'flex', alignItems: 'center',
        backgroundImage: `radial-gradient(circle, rgba(4,119,191,0.18) 1px, transparent 1px), linear-gradient(160deg, #0c1428 0%, #0f2560 45%, #081F5C 100%)`,
        backgroundSize: '24px 24px, 100% 100%',
      }}>
        <ParticleCanvas scale={2} />
        <div style={{
          position: 'relative', zIndex: 1,
          width: '100%', maxWidth: 1200,
          margin: '0 auto',
          padding: '100px clamp(1.5rem, 5vw, 80px) 80px',
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 13, fontWeight: 600, letterSpacing: '0.15em',
            color: BLUE, textTransform: 'uppercase', marginBottom: 20,
            opacity: 0, animation: 'plt-hero-in 720ms 80ms cubic-bezier(0.22,1,0.36,1) both',
          }}>PLATFORM</div>

          <h1 style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(40px, 5vw, 68px)',
            color: WHITE,
            lineHeight: 1.08, letterSpacing: '-0.02em',
            margin: '0 0 28px',
            maxWidth: 700,
            opacity: 0, animation: 'plt-hero-in 720ms 160ms cubic-bezier(0.22,1,0.36,1) both',
          }}>
            <>This is how we get your data{' '}<span style={{ color: BLUE, fontStyle: 'italic' }}>ready for AI.</span></>
          </h1>

          <h3 style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 18, fontWeight: 600,
            color: BLUE,
            lineHeight: 1.45, margin: 0,
            maxWidth: 520,
            opacity: 0, animation: 'plt-hero-in 720ms 240ms cubic-bezier(0.22,1,0.36,1) both',
          }}>
            Eight specialized agents. One governed platform.<br />
            Agents execute. ACM controls. Here's exactly how it works.
          </h3>
        </div>
      </div>
      <style>{`
        @keyframes plt-hero-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// S2 — AGENTS PIPELINE
// ═══════════════════════════════════════════════════════════════════════════════
const AGENTS = [
  {
    id: 'INGEST',  name: 'D8:INGEST',  role: 'Connect',
    desc: 'Connects directly to your existing data sources. No migration. No new infrastructure. Your data stays where it lives — agents come to it.',
  },
  {
    id: 'CAT',     name: 'D8:CAT',     role: 'Catalog',
    desc: 'Discovers and classifies every dataset in your environment. Maintains full lineage tracking so every record is traceable from origin to output.',
  },
  {
    id: 'CURATE',  name: 'D8:CURATE',  role: 'Clean',
    desc: 'Validates data before it reaches any AI model. Flags incomplete records, removes noise, and ensures only reliable data moves forward.',
  },
  {
    id: 'SEC',     name: 'D8:SEC',     role: 'Secure',
    desc: 'Enforces access controls and governance policies across every data source and touchpoint. Built into the pipeline — not bolted on after the fact.',
  },
  {
    id: 'FLOW',    name: 'D8:FLOW',    role: 'Orchestrate',
    desc: 'Manages the entire workflow. Routes tasks in the correct sequence, coordinates handoffs, and escalates to human review when a decision requires it.',
  },
  {
    id: 'OBSERVE', name: 'D8:OBSERVE', role: 'Monitor',
    desc: 'Watches the pipeline in real time. Detects anomalies before they become incidents. Logs every action for a complete, audit-ready record.',
  },
  {
    id: 'STAGE',   name: 'D8:STAGE',   role: 'Deliver',
    desc: 'Prepares final data products for downstream use. Validated, formatted, and ready for the systems and teams that need them.',
  },
  {
    id: 'VIEW',    name: 'D8:VIEW',    role: 'Surface',
    desc: 'The human-facing layer. Clean, governed data delivered as dashboards, reports, and APIs — in real time, when your team needs it.',
  },
];

function AgentsSection() {
  const [activeId, setActiveId] = React.useState('INGEST');
  const activeAgent = AGENTS.find(a => a.id === activeId);
  const [headerRef, headerVisible] = useReveal();
  const [pipeRef, pipeVisible] = useReveal(0.08);

  const toggle = (id) => setActiveId(prev => prev === id ? null : id);

  return (
    <section style={{ background: WHITE, width: '100%', padding: '96px 0', boxSizing: 'border-box', position: 'relative' }}>
      <div aria-hidden="true" className="d8-section-label" style={{
        position: 'absolute', left: 'clamp(4px, 1.5vw, 18px)', top: '50%',
        transform: 'translateY(-50%) rotate(180deg)',
        writingMode: 'vertical-rl',
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 600,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'rgba(4,119,191,0.35)', userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>THE AGENTS</div>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 80px)' }}>

        {/* Header */}
        <div ref={headerRef}>
          <div className={`d8-reveal${headerVisible ? ' in' : ''}`}>
            <Eyebrow>THE AGENTS</Eyebrow>
          </div>
          <SectionH2 className={`d8-reveal${headerVisible ? ' in' : ''}`} style={{ transitionDelay: '80ms', maxWidth: 700 }}>
            One orchestrated pipeline. Each agent doing its singular job extremely well.
          </SectionH2>
          <SectionH3 style={{ transitionDelay: '160ms', maxWidth: 560 }}>
            Here's exactly what happens between raw data and AI-ready output.
          </SectionH3>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 16, color: BODY, lineHeight: 1.7, maxWidth: 640, margin: '0 0 20px' }}>
            This is not eight separate tools. It's one connected pipeline. Each agent does a single job — and hands off to the next only when it's done.
          </p>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 16, color: BODY, lineHeight: 1.7, maxWidth: 640, margin: '0 0 48px' }}>
            Skip D8:CURATE and unvalidated data reaches your models. Skip D8:SEC and your governance layer doesn't exist. The sequence is the product.
          </p>
        </div>

        {/* Pipeline */}
        <p style={{
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 500,
          letterSpacing: '0.08em', color: 'rgba(4,119,191,0.5)',
          margin: '0 0 14px', display: 'flex', alignItems: 'center', gap: 6,
        }}>
          Select any agent to explore its role →
        </p>
        <div ref={pipeRef} style={{ overflowX: 'auto', paddingBottom: 8 }}>
          <div
            className="plt-pipe-row"
            style={{
              display: 'flex', alignItems: 'center',
              minWidth: 900,
            }}
          >
            {AGENTS.map((agent, i) => (
              <React.Fragment key={agent.id}>
                <button
                  className={`plt-node${activeId === agent.id ? ' active' : ''}`}
                  style={{
                    opacity: pipeVisible ? 1 : 0,
                    transform: pipeVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(8px)',
                    transition: `opacity 480ms ${i * 60}ms cubic-bezier(0.22,1,0.36,1), transform 480ms ${i * 60}ms cubic-bezier(0.22,1,0.36,1), border-color 120ms ease, box-shadow 120ms ease`,
                    background: 'none',
                  }}
                  onClick={() => toggle(agent.id)}
                  aria-expanded={activeId === agent.id}
                  aria-label={`${agent.name} — ${agent.role}`}
                >
                  <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, fontWeight: 700, color: NAVY, lineHeight: 1 }}>{agent.name}</span>
                  <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 10, color: BLUE, lineHeight: 1 }}>{agent.role}</span>
                </button>

                {i < AGENTS.length - 1 && (
                  <div className="plt-connector" aria-hidden="true">
                    <div className="plt-connector-line" />
                    <div
                      className="plt-dot"
                      style={{
                        animationDelay: pipeVisible ? `${i * 200}ms` : '99999s',
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Expand panel */}
        {activeAgent && (
          <div key={activeAgent.id} className="plt-panel" style={{ marginTop: 20, maxWidth: 540 }}>
            <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 8 }}>
              {activeAgent.name} — {activeAgent.role}
            </div>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14, color: BODY, lineHeight: 1.6, margin: 0 }}>
              {activeAgent.desc}
            </p>
          </div>
        )}

        {/* Proof attribution */}
        <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: 'rgba(51,51,51,0.55)', marginTop: 36, marginBottom: 0 }}>
          97% faster. 99.5% accuracy. $1.2M+ projected savings. — Kitsap Credit Union
        </p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// S3 — THE PLATFORM
// ═══════════════════════════════════════════════════════════════════════════════
function ArchDiagram() {
  const sources = ['Core Banking System', 'ERP / GL', 'CRM', 'Data Warehouse'];
  return (
    <div style={{ position: 'relative', fontFamily: "'IBM Plex Sans', sans-serif" }}>
      {/* Outer cloud container */}
      <div className="plt-arch-outer" style={{
        border: '2px dashed rgba(8,31,92,0.20)',
        borderRadius: 16,
        padding: '20px 20px 20px 20px',
        background: 'rgba(8,31,92,0.025)',
        position: 'relative',
        marginBottom: 12,
      }}>
        {/* Label */}
        <div style={{
          position: 'absolute', top: -11, left: 16,
          background: WHITE,
          padding: '0 8px',
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 10, fontWeight: 600, color: BLUE,
          textTransform: 'uppercase', letterSpacing: '0.08em',
        }}>YOUR CLOUD ENVIRONMENT</div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Source systems */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
            {sources.map(s => (
              <div key={s} style={{
                fontSize: 11, color: BODY,
                background: WHITE,
                border: '1px solid rgba(8,31,92,0.12)',
                borderRadius: 6, padding: '6px 10px',
                textAlign: 'center',
              }}>{s}</div>
            ))}
          </div>

          {/* Arrows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
            {sources.map((_, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', height: 33 }}>
                <div style={{ width: 20, height: 1, background: BLUE, opacity: 0.5 }} />
                <svg width="6" height="8" viewBox="0 0 6 8" fill="none" aria-hidden="true">
                  <path d="M0 0L6 4L0 8Z" fill={BLUE} opacity="0.5" />
                </svg>
              </div>
            ))}
          </div>

          {/* D8:PLATFORM box */}
          <div style={{
            background: NAVY,
            color: WHITE,
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 13, fontWeight: 700,
            padding: '14px 18px',
            borderRadius: 8,
            textAlign: 'center',
            flexShrink: 0,
            letterSpacing: '0.01em',
          }}>D8:PLATFORM</div>
        </div>
      </div>

      {/* External Servers — outside the container */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end', paddingRight: 8 }}>
        <div style={{
          border: '1px solid rgba(200,0,0,0.25)',
          borderRadius: 8, padding: '6px 12px',
          background: 'rgba(200,0,0,0.04)',
          display: 'flex', alignItems: 'center', gap: 8,
          position: 'relative',
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="7" stroke="rgba(200,0,0,0.4)" strokeWidth="1.5" />
            <line x1="3" y1="3" x2="13" y2="13" stroke="rgba(200,0,0,0.55)" strokeWidth="1.5" />
          </svg>
          <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 11, color: MUTED }}>External Servers</span>
        </div>
        <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 10, color: MUTED, fontStyle: 'italic' }}>Data never goes here</span>
      </div>
    </div>
  );
}

function ThePlatformSection() {
  const [ref, visible] = useReveal();

  return (
    <section style={{ background: '#f0f4f8', width: '100%', boxSizing: 'border-box' }}>
      {/* Two-column body */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '96px clamp(1.5rem, 5vw, 80px) 0' }}>
        <div ref={ref}>
          <div className={`d8-reveal${visible ? ' in' : ''}`}>
            <Eyebrow>D8:PLATFORM</Eyebrow>
          </div>
          <SectionH2 style={{ maxWidth: 680, transitionDelay: '80ms' }}>
            Your infrastructure. Our agents. Nothing moves.
          </SectionH2>
          <SectionH3 style={{ maxWidth: 560, transitionDelay: '160ms' }}>
            Deploys inside your cloud. Your rules, your policies,<br />your environment.
          </SectionH3>
        </div>

        <div className="plt-two-col" style={{ display: 'flex', gap: 64, marginTop: 40, alignItems: 'flex-start' }}>
          {/* Left — body copy (60%) */}
          <div style={{ flex: '0 0 58%' }}>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 16, color: BODY, lineHeight: 1.75, margin: '0 0 20px' }}>
              Most AI deployments start with a migration. Move your data to a new warehouse. Rebuild your infrastructure around a new tool. Six to eighteen months before you see results — if the project survives that long.
            </p>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 16, fontWeight: 600, color: NAVY, lineHeight: 1.75, margin: '0 0 20px' }}>
              No migration. No new infrastructure. No security exceptions.
            </p>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 16, color: BODY, lineHeight: 1.75, margin: '0 0 20px' }}>
              D8:PLATFORM provisions inside your existing cloud tenant — AWS, Azure, or GCP. The agents run where your data already lives. Your IT team doesn't file a security exception. Your CIO doesn't approve a data transfer. The pipeline exists entirely within your walls.
            </p>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 16, fontWeight: 600, color: NAVY, lineHeight: 1.75, margin: 0 }}>
              Kitsap Credit Union was in production in 6 weeks.
            </p>
          </div>

          {/* Right — architecture diagram (40%) */}
          <div style={{ flex: 1 }}>
            <ArchDiagram />
          </div>
        </div>
      </div>

      {/* Proof block */}
      <div style={{
        marginTop: 80,
        backgroundImage: `radial-gradient(circle, rgba(4,119,191,0.18) 1px, transparent 1px), linear-gradient(160deg, #0c1428 0%, #0f2560 45%, #081F5C 100%)`,
        backgroundSize: '24px 24px, 100% 100%',
        padding: '64px clamp(1.5rem, 5vw, 80px)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Particles */}
        <ParticleCanvas />
        {/* Radial glows */}
        <div aria-hidden="true" style={{
          position: 'absolute', width: 340, height: 340, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(62,207,142,0.08) 0%, transparent 70%)',
          top: '-10%', right: '5%', pointerEvents: 'none', zIndex: 0,
        }} />
        <div aria-hidden="true" style={{
          position: 'absolute', width: 220, height: 220, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(62,207,142,0.06) 0%, transparent 70%)',
          bottom: '5%', left: '12%', pointerEvents: 'none', zIndex: 0,
        }} />
        {/* Rotated label */}
        <div aria-hidden="true" className="d8-section-label" style={{
          position: 'absolute', left: 'clamp(4px, 1.5vw, 18px)', top: '50%',
          transform: 'translateY(-50%) rotate(180deg)',
          writingMode: 'vertical-rl',
          fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 600,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.18)', userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
          zIndex: 1,
        }}>D8:PLATFORM</div>

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="plt-stats-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { num: '6 weeks', ghost: '6w',   label: 'Time to production',            sub: 'Micro-MVP to production. No multi-year migrations.' },
              { num: '0',       ghost: '0',     label: 'Data migration required',       sub: 'Agents run where your data already lives.' },
              { num: '100%',    ghost: '100%',  label: 'Data stays in your environment', sub: 'Inside your cloud tenant — AWS, Azure, or GCP.' },
            ].map(({ num, ghost, label, sub }) => (
              <div key={label} style={{
                background: 'rgba(255,255,255,0.05)',
                borderTop: '2px solid rgba(62,207,142,0.32)',
                borderRadius: 12, padding: 24,
                position: 'relative', overflow: 'hidden',
              }}>
                {/* Ghost watermark */}
                <div aria-hidden="true" style={{
                  position: 'absolute', right: '-4%', bottom: '-8%',
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontSize: '4rem', fontWeight: 700,
                  color: 'rgba(62,207,142,0.07)',
                  lineHeight: 1, pointerEvents: 'none', userSelect: 'none', zIndex: 0,
                }}>{ghost}</div>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 700, color: GREEN, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 8 }}>{num}</div>
                  <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: WHITE, marginBottom: 6 }}>{label}</div>
                  <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, color: 'rgba(255,255,255,0.45)', textAlign: 'center', marginTop: 28, marginBottom: 0 }}>
            Kitsap Credit Union — deployed on existing infrastructure
          </p>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// S4 — ACM
// ═══════════════════════════════════════════════════════════════════════════════
function DecisionTree() {
  const nodeBase = {
    fontFamily: "'IBM Plex Sans', sans-serif",
    borderRadius: 8, padding: '10px 16px',
    textAlign: 'center', boxSizing: 'border-box',
    display: 'inline-block',
  };
  const arrow = (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '4px 0' }} aria-hidden="true">
      <svg width="2" height="20" viewBox="0 0 2 20" fill="none">
        <line x1="1" y1="0" x2="1" y2="16" stroke={BLUE} strokeWidth="1.5" />
        <path d="M-3 14L1 20L5 14" fill={BLUE} />
      </svg>
    </div>
  );

  return (
    <div className="plt-tree" style={{ fontFamily: "'IBM Plex Sans', sans-serif", display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' }}>
      {/* Node 1 */}
      <div style={{ ...nodeBase, background: NAVY, color: WHITE, fontSize: 13, fontWeight: 700, minWidth: 180 }}>
        Data pipeline running
      </div>
      {arrow}

      {/* Diamond */}
      <div style={{ position: 'relative', width: 160, height: 60, margin: '0 auto' }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%) rotate(45deg)',
          width: 90, height: 90,
          background: WHITE, border: `2px solid ${BLUE}`,
          borderRadius: 4,
        }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%,-50%)',
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 11, fontWeight: 600, color: NAVY,
          textAlign: 'center', width: 110, lineHeight: 1.3,
        }}>Regulated field detected?</div>
      </div>

      {/* Two branches */}
      <div style={{ display: 'flex', gap: 40, marginTop: 4 }}>
        {/* No branch */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" aria-hidden="true">
              <line x1="40" y1="0" x2="0" y2="24" stroke={BODY} strokeWidth="1" opacity="0.4" />
            </svg>
            <span style={{ fontSize: 11, color: BODY, fontWeight: 500 }}>No</span>
          </div>
          {arrow}
          <div style={{ ...nodeBase, background: `rgba(62,207,142,0.15)`, border: `1px solid ${GREEN}`, fontSize: 12, color: NAVY, minWidth: 120 }}>
            Pipeline continues
          </div>
        </div>

        {/* Yes branch */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 11, color: BLUE, fontWeight: 500 }}>Yes</span>
            <svg width="40" height="24" viewBox="0 0 40 24" fill="none" aria-hidden="true">
              <line x1="0" y1="0" x2="40" y2="24" stroke={BLUE} strokeWidth="1" opacity="0.6" />
            </svg>
          </div>
          {arrow}
          <div className="plt-has-tooltip" style={{ ...nodeBase, background: `rgba(4,119,191,0.10)`, border: `1px solid ${BLUE}`, fontSize: 12, color: NAVY, minWidth: 160, cursor: 'default' }}>
            Routed for human approval
            <div className="plt-tooltip">Agentic Capital Management (ACM) logs the reason, the reviewer, and the timestamp.</div>
          </div>
          {arrow}
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ ...nodeBase, background: `rgba(62,207,142,0.15)`, border: `1px solid ${GREEN}`, fontSize: 11, color: NAVY, minWidth: 90 }}>
              Approved →<br />continues
            </div>
            <div style={{ ...nodeBase, background: `rgba(255,107,107,0.10)`, border: `1px solid #FF6B6B`, fontSize: 11, color: NAVY, minWidth: 90 }}>
              Held →<br />flagged
            </div>
          </div>
        </div>
      </div>

      <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 11, color: BLUE, fontStyle: 'italic', textAlign: 'center', margin: '16px 0 0' }}>
        Full audit trail logged at every step
      </p>
    </div>
  );
}

function ACMSection() {
  const [ref, visible] = useReveal();
  const [calloutsRef, calloutsVisible] = useStaggerReveal(3);

  return (
    <section style={{ background: WHITE, width: '100%', padding: '96px clamp(1.5rem, 5vw, 80px)', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div ref={ref}>
          <div className={`d8-reveal${visible ? ' in' : ''}`}>
            <Eyebrow>ACM</Eyebrow>
          </div>
          <SectionH2 style={{ maxWidth: 600, transitionDelay: '80ms' }}>
            You control what the agents can do.
          </SectionH2>
          <SectionH3 style={{ maxWidth: 500, transitionDelay: '160ms' }}>
            ACM defines the rules. You set them.<br />Nothing executes without your permission.
          </SectionH3>
        </div>

        {/* Two-column */}
        <div className="plt-two-col" style={{ display: 'flex', gap: 64, marginTop: 40, alignItems: 'flex-start' }}>
          {/* Left — body copy (55%) */}
          <div style={{ flex: '0 0 52%' }}>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 16, color: BODY, lineHeight: 1.75, margin: '0 0 20px' }}>
              Agentic automation works best when humans stay in charge of the decisions that matter.
            </p>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 16, color: BODY, lineHeight: 1.75, margin: '0 0 20px' }}>
              ACM is the governance layer that makes that possible. It defines what each agent is allowed to do, what data it can access, and what requires human approval before an action runs. Role-based permissions. Policy-based execution. A complete, auditable record of every decision — so nothing happens in a black box.
            </p>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 16, color: BODY, lineHeight: 1.75, margin: '0 0 20px' }}>
              When a workflow touches sensitive data, a regulated process, or anything that requires a second set of eyes, ACM stops and routes it for review. The agents handle the volume. Your team handles the judgment calls.
            </p>
            <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 16, color: BODY, lineHeight: 1.75, margin: 0 }}>
              A workflow that touches a regulated data field doesn't just slow down — it stops, routes to the right person, and waits for approval. With a full log of why.
            </p>
          </div>

          {/* Right — decision tree (45%) */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <DecisionTree />
          </div>
        </div>

        {/* Three callouts */}
        <div
          ref={calloutsRef}
          className="plt-callouts-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 56 }}
        >
          {[
            {
              label: 'Role-based permissions',
              body: 'Define exactly who can see, access, and act on each data source.',
            },
            {
              label: 'Full audit trail',
              body: 'Every agent action logged. Every decision traceable. Every workflow reproducible.',
            },
            {
              label: 'Stop-and-review governance',
              body: 'Flag any action for human review before it executes. You always have the override.',
            },
          ].map(({ label, body }, i) => (
            <div
              key={label}
              className="plt-callout"
              style={{
                opacity: calloutsVisible > i ? 1 : 0,
                transform: calloutsVisible > i ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 480ms cubic-bezier(0.22,1,0.36,1), transform 480ms cubic-bezier(0.22,1,0.36,1)',
              }}
            >
              <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 15, fontWeight: 600, color: NAVY, marginBottom: 10 }}>{label}</div>
              <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14, color: BODY, lineHeight: 1.6, margin: 0 }}>{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// S5 — WORKFLOWS IN PRACTICE
// ═══════════════════════════════════════════════════════════════════════════════
function CardIllustration({ agents, image, imageAlt }) {
  if (image) {
    return (
      <div style={{ marginBottom: 20 }}>
        <img
          src={image}
          alt={imageAlt || 'Agent workflow diagram'}
          style={{ width: '100%', height: 'auto', borderRadius: 8, display: 'block' }}
        />
      </div>
    );
  }
  const arrowSvg = (
    <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true" style={{ flexShrink: 0 }}>
      <line x1="0" y1="4" x2="10" y2="4" stroke={BLUE} strokeWidth="1" opacity="0.4" />
      <path d="M8 1.5L12 4L8 6.5" stroke={BLUE} strokeWidth="1" opacity="0.4" fill="none" />
    </svg>
  );
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 9, fontWeight: 600,
        letterSpacing: '0.14em', color: 'rgba(4,119,191,0.5)',
        textTransform: 'uppercase', marginBottom: 8,
      }}>AGENT SEQUENCE</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {agents.map((agent, i) => (
          <React.Fragment key={agent.name}>
            <div style={{
              flex: 1, minWidth: 0,
              background: WHITE,
              border: '1px solid rgba(4,119,191,0.28)',
              borderRadius: 6,
              padding: '5px 4px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center',
              gap: 2,
            }}>
              <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 9, fontWeight: 700, color: NAVY, lineHeight: 1, whiteSpace: 'nowrap' }}>{agent.name}</span>
              <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 8, color: BLUE, lineHeight: 1 }}>{agent.role}</span>
            </div>
            {i < agents.length - 1 && arrowSvg}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

const WORKFLOW_CARDS = [
  {
    eyebrow: 'FINANCIAL SERVICES',
    image: '/images/workflow-financial.svg',
    imageAlt: 'Financial services workflow: Core Banking, ERP/GL, and Data Warehouse connect through D8:INGEST → D8:CURATE → D8:FLOW → D8:OBSERVE to produce GL Match Report and NCUA Filing',
    agents: [
      { name: 'D8:INGEST',  role: 'Connect' },
      { name: 'D8:CURATE',  role: 'Clean' },
      { name: 'D8:FLOW',    role: 'Orchestrate' },
      { name: 'D8:OBSERVE', role: 'Monitor' },
    ],
    headline: 'Month-end close in 4 days. NCUA filing ready before the examiner asks.',
    trigger: 'Manual re-keying. Fragmented sources. No validation layer between source and filing.',
    workflow: 'D8:AGENTS connect the data corridor, match GL entries against NCUA Call Report schedules in real time, and route exceptions automatically — so the Controller reviews only true outliers.',
    stats: [
      { num: '70% faster',   label: 'Close cycle — 10–14 days → under 4 days' },
      { num: '$180K–$320K',  label: 'Annual leakage recovered' },
      { num: '35 hrs/week',  label: 'Returned to the accounting team' },
      { num: 'Every day',    label: 'NCUA filing readiness — continuous' },
    ],
  },
  {
    eyebrow: 'MEDIA & ADVERTISING',
    image: '/images/workflow-media.svg',
    imageAlt: 'Media & Advertising workflow: Vendor Invoices and Insertion Orders connect through D8:INGEST → D8:CAT → D8:CURATE → D8:FLOW to produce Finance-Ready Report, with Discrepancy Flagged exception path',
    agents: [
      { name: 'D8:INGEST', role: 'Connect' },
      { name: 'D8:CAT',    role: 'Catalog' },
      { name: 'D8:CURATE', role: 'Clean' },
      { name: 'D8:FLOW',   role: 'Orchestrate' },
    ],
    headline: 'Real-time campaign profitability. Before the margin disappears — not after.',
    trigger: '12 days to reconcile a billing cycle. By the time you find the gap, the campaign is closed.',
    workflow: 'D8:AGENTS cross-reference invoice actuals against approved insertion orders in real time and flag discrepancies before they reach finance.',
    stats: [
      { num: '70% faster',    label: 'Reconciliation cycle — 12 days → under 4 days' },
      { num: '$180K–$340K',   label: 'Annual recovery in overbilling and unbilled scope' },
      { num: '35 hrs/week',   label: 'Returned to account and operations staff' },
      { num: 'Real-time',     label: 'Campaign profitability — live, not post-mortem' },
    ],
  },
  {
    eyebrow: 'MANUFACTURING & OPERATIONS',
    agents: [
      { name: 'D8:INGEST', role: 'Connect' },
      { name: 'D8:CAT',    role: 'Catalog' },
      { name: 'D8:FLOW',   role: 'Orchestrate' },
      { name: 'D8:VIEW',   role: 'Surface' },
    ],
    headline: 'The diagnostic intelligence was always there. It was just trapped in a WhatsApp thread.',
    trigger: 'Fault intelligence written in a WhatsApp message. Summarized away before it reaches the manager.',
    workflow: 'D8:AGENTS ingest shift logs and fault notes from existing CMMS and ERP systems, classify every fault by machine and severity, and surface a prioritized maintenance feed — automatically.',
    stats: [
      { num: '18–25%',        label: 'Reduction in unplanned downtime' },
      { num: '$200K–$800K',   label: 'Recovered annually depending on line throughput' },
      { num: '6–9 hrs/week',  label: 'Returned to maintenance planners' },
      { num: '45 min → 15',   label: 'Shift handover meeting time' },
    ],
  },
];

function WorkflowsSection() {
  const [headerRef, headerVisible] = useReveal();
  const [cardsRef, cardsVisible] = useStaggerReveal(3, 0.05);

  return (
    <section style={{ background: '#f0f4f8', width: '100%', padding: '96px clamp(1.5rem, 5vw, 80px)', boxSizing: 'border-box', position: 'relative' }}>
      <div aria-hidden="true" className="d8-section-label" style={{
        position: 'absolute', left: 'clamp(4px, 1.5vw, 18px)', top: '50%',
        transform: 'translateY(-50%) rotate(180deg)',
        writingMode: 'vertical-rl',
        fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 600,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: 'rgba(4,119,191,0.35)', userSelect: 'none', pointerEvents: 'none', whiteSpace: 'nowrap',
      }}>WORKFLOWS</div>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div ref={headerRef}>
          <div className={`d8-reveal${headerVisible ? ' in' : ''}`}>
            <Eyebrow>WORKFLOWS IN PRACTICE</Eyebrow>
          </div>
          <SectionH2 style={{ maxWidth: 640, transitionDelay: '80ms' }}>
            The same platform. Three unique solutions.
          </SectionH2>
          <SectionH3 style={{ maxWidth: 540, transitionDelay: '160ms' }}>
            Rule-heavy. High-volume. Manual today. Automated in 6 weeks.
          </SectionH3>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 16, color: BODY, lineHeight: 1.75, maxWidth: 640, margin: '0 0 12px' }}>
            The D8:Agents solve the same structural problem wherever it shows up — complex, rule-heavy work that humans are doing manually because no one ever built the connective tissue between the systems.
          </p>
          <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 16, color: BODY, lineHeight: 1.75, maxWidth: 640, margin: '0 0 56px' }}>
            Here's what that looks like across three different operations.
          </p>
        </div>

        {/* Cards */}
        <div ref={cardsRef} className="plt-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          {WORKFLOW_CARDS.map((card, i) => (
            <div
              key={card.eyebrow}
              className="plt-card"
              style={{
                opacity: cardsVisible > i ? 1 : 0,
                transform: cardsVisible > i ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 480ms ${i * 100}ms cubic-bezier(0.22,1,0.36,1), transform 480ms ${i * 100}ms cubic-bezier(0.22,1,0.36,1)`,
              }}
            >
              {/* Eyebrow */}
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, fontWeight: 600, color: BLUE, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>
                {card.eyebrow}
              </div>

              {/* Headline */}
              <h3 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 18, fontWeight: 700, color: NAVY, lineHeight: 1.3, margin: '0 0 10px', textWrap: 'balance' }}>
                {card.headline}
              </h3>

              {/* Trigger */}
              <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, fontStyle: 'italic', color: `rgba(51,51,51,0.70)`, lineHeight: 1.6, margin: '0 0 14px', textWrap: 'pretty' }}>
                {card.trigger}
              </p>

              {/* Workflow */}
              <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14, color: BODY, lineHeight: 1.6, margin: '0 0 20px', textWrap: 'pretty', flex: 1 }}>
                {card.workflow}
              </p>

              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(8,31,92,0.10)', margin: '0 0 20px' }} />

              {/* Stats 2×2 */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {card.stats.map(({ num, label }) => (
                  <div key={label}>
                    <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 18, fontWeight: 700, color: BLUE, lineHeight: 1, marginBottom: 4 }}>{num}</div>
                    <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 11, color: BODY, lineHeight: 1.4, textWrap: 'pretty' }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer disclaimer */}
        <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 13, color: `rgba(51,51,51,0.60)`, textAlign: 'center', marginTop: 40, marginBottom: 0, maxWidth: 700, marginLeft: 'auto', marginRight: 'auto' }}>
          These patterns are illustrative of the workflows D8TAOPS addresses across industries. No two deployments are identical. Every engagement starts with your actual data corridor.
        </p>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// S6 — CLOSING CTA
// ═══════════════════════════════════════════════════════════════════════════════
function PlatformClosingCTA() {
  return (
    <section style={{
      backgroundImage: `radial-gradient(circle, rgba(4,119,191,0.18) 1px, transparent 1px), linear-gradient(160deg, #0c1428 0%, #0f2560 45%, #081F5C 100%)`,
      backgroundSize: '24px 24px, 100% 100%',
      padding: '96px clamp(1.5rem, 5vw, 80px)',
      textAlign: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <ParticleCanvas />
      {/* Radial glows */}
      <div aria-hidden="true" style={{
        position: 'absolute', width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(62,207,142,0.07) 0%, transparent 70%)',
        top: '-15%', right: '10%', pointerEvents: 'none', zIndex: 0,
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', width: 280, height: 280, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(62,207,142,0.05) 0%, transparent 70%)',
        bottom: '0%', left: '5%', pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{ maxWidth: 620, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h2 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, color: WHITE, lineHeight: 1.15, letterSpacing: '-0.02em', margin: '0 0 20px' }}>
          You've seen how it works. Now see it in your stack.
        </h2>
        <h3 style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 18, fontWeight: 600, color: BLUE, lineHeight: 1.5, margin: '0 0 40px' }}>
          We'll map the D8:AGENTS to your actual data environment.<br />One conversation. No pitch deck.
        </h3>
        <D8Button href="mailto:hello@d8taops.com" innerStyle={{ fontSize: 16, padding: '17px 40px' }}>Map the D8:Agents to your stack</D8Button>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════════════════
export default function PlatformPage() {
  return (
    <>
      <HomepageNav activePath="/platform" />
      <PlatformHero />
      <AgentsSection />
      <ThePlatformSection />
      <ACMSection />
      <WorkflowsSection />
      <PlatformClosingCTA />
      <GlobalFooter />
    </>
  );
}
