import React from 'react';
import HomepageNav from './HomepageNav';
import { GLOBAL_CSS, GlobalFooter } from './HomepageSections';
import D8Button from './D8Button';

// ── Brand tokens ──────────────────────────────────────────────────────────────
const NAVY      = '#081F5C';
const NAVY_DARK = '#0A1628';
const BLUE      = '#0477BF';
const BLUE_LIGHT = '#4db8ff';
const BODY      = '#333333';
const MUTED     = '#515151';
const WHITE     = '#FFFFFF';
const SURFACE   = '#F5F6FA';

// ── About CSS ─────────────────────────────────────────────────────────────────
const ABOUT_CSS = `
  /* ── reveal ── */
  .ab-reveal {
    opacity: 0; transform: translateY(28px);
    transition: opacity 0.72s cubic-bezier(0.22,1,0.36,1),
                transform 0.72s cubic-bezier(0.22,1,0.36,1);
  }
  .ab-reveal.in { opacity: 1; transform: translateY(0); }

  /* ── why we exist insights ── */
  .ab-insight-row {
    display: flex; align-items: flex-start;
    gap: 18px; margin-bottom: 28px;
  }
  .ab-insight-num {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px; font-weight: 600; letter-spacing: 0.1em;
    color: ${BLUE}; text-transform: uppercase;
    padding: 4px 10px;
    border: 1px solid rgba(4,119,191,0.3);
    border-radius: 20px;
    flex-shrink: 0; margin-top: 2px;
  }

  /* ── infographic — light mode ── */
  .ab-cloud-box {
    position: relative;
    border: 1.5px dashed rgba(8,31,92,0.18);
    border-radius: 16px;
    padding: 28px 24px;
    background: #F8FAFD;
  }
  .ab-cloud-label {
    position: absolute; top: -10px; left: 24px;
    background: ${WHITE};
    padding: 0 10px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px; font-weight: 600;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: ${BLUE};
  }
  .ab-source-chip {
    background: ${WHITE};
    border: 1px solid rgba(8,31,92,0.12);
    border-radius: 6px;
    padding: 7px 10px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 11px; color: ${MUTED};
    text-align: center; box-sizing: border-box;
  }
  .ab-agents-bar {
    background: ${NAVY};
    border: 1px solid rgba(8,31,92,0.12);
    border-radius: 10px;
    padding: 14px 18px;
    display: flex; align-items: center;
    justify-content: space-between;
    flex-wrap: wrap; gap: 8px;
  }
  .ab-agent-pill {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px; font-weight: 600;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: ${BLUE_LIGHT};
    padding: 3px 8px;
    background: rgba(4,119,191,0.14);
    border-radius: 4px;
  }
  .ab-output-box {
    background: rgba(4,119,191,0.08);
    border: 1px solid rgba(4,119,191,0.28);
    border-radius: 8px; padding: 12px 16px;
    text-align: center;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 13px; font-weight: 600;
    color: ${BLUE};
    letter-spacing: 0.04em;
  }
  .ab-arrow-v {
    display: flex; justify-content: center;
    margin: 10px 0;
  }

  /* ── stat cards — light mode ── */
  .ab-stats-row {
    display: grid; grid-template-columns: repeat(4, 1fr);
    gap: 16px; margin-top: 40px;
  }
  .ab-stat-card {
    background: ${SURFACE};
    border-top: 3px solid ${BLUE};
    border-radius: 12px; padding: 24px 20px;
    box-sizing: border-box;
  }

  /* ── quote card ── */
  .ab-quote-card {
    position: relative; overflow: hidden;
    background: ${WHITE};
    border-radius: 20px;
    padding: 56px 64px;
    max-width: 860px; margin: 0 auto;
    box-shadow: 0 24px 64px rgba(8,31,92,0.10);
    box-sizing: border-box;
  }
  .ab-quote-ghost {
    position: absolute; top: -20px; left: -8px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 200px; font-weight: 700;
    color: ${BLUE}; opacity: 0.05;
    line-height: 1; pointer-events: none;
    user-select: none; z-index: 0;
  }
  .ab-quote-inner { position: relative; z-index: 1; }

  /* ── two-col grid ── */
  .ab-two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 64px; align-items: start;
  }

  /* ── responsive ── */
  @media (max-width: 900px) {
    .ab-two-col { grid-template-columns: 1fr !important; gap: 40px !important; }
    .ab-quote-card { padding: 36px 28px !important; }
    .ab-quote-ghost { font-size: 120px !important; }
    .ab-stats-row { grid-template-columns: repeat(2, 1fr) !important; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ab-reveal { transition: none !important; opacity: 1 !important; transform: none !important; }
    .ab-word-span { transition: none !important; opacity: 1 !important; transform: none !important; }
  }
`;

// ── Hooks ─────────────────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); io.disconnect(); }
    }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useStaggerReveal(count, threshold = 0.12) {
  const ref = React.useRef(null);
  const [visibleCount, setVisibleCount] = React.useState(0);
  React.useEffect(() => {
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
  const ref = React.useRef(null);
  React.useEffect(() => {
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

// ── S1 — HERO ─────────────────────────────────────────────────────────────────
function AboutHero() {
  return (
    <section aria-label="About D8TAOPS" style={{ position: 'relative', overflow: 'hidden' }}>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS + ABOUT_CSS }} />
      <div style={{
        position: 'relative', width: '100%',
        minHeight: 'max(520px, 68vh)',
        display: 'flex', alignItems: 'center',
        backgroundImage: `radial-gradient(circle, rgba(4,119,191,0.18) 1px, transparent 1px), linear-gradient(160deg, #0c1428 0%, #0f2560 45%, #081F5C 100%)`,
        backgroundSize: '24px 24px, 100% 100%',
      }}>
        <ParticleCanvas scale={2} />
        <div style={{
          position: 'relative', zIndex: 1, width: '100%', maxWidth: 1200,
          margin: '0 auto', padding: '100px clamp(1.5rem, 5vw, 80px) 80px',
        }}>
          <div style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 13, fontWeight: 600, letterSpacing: '0.15em',
            color: BLUE, textTransform: 'uppercase', marginBottom: 24,
            opacity: 0, animation: 'ab-hero-in 720ms 80ms cubic-bezier(0.22,1,0.36,1) both',
          }}>ABOUT D8TAOPS</div>
          <h1 style={{
            fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 700,
            fontSize: 'clamp(40px, 5vw, 68px)',
            color: WHITE, lineHeight: 1.06, letterSpacing: '-0.03em',
            margin: '0 0 32px', maxWidth: 740,
            opacity: 0, animation: 'ab-hero-in 720ms 160ms cubic-bezier(0.22,1,0.36,1) both',
          }}>
            AI gets the credit.<br /><span style={{ color: BLUE, fontStyle: 'italic' }}>The real work is ours.</span>
          </h1>
          <p style={{
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontSize: 'clamp(16px, 1.8vw, 20px)', fontWeight: 400,
            color: 'rgba(255,255,255,0.75)',
            lineHeight: 1.6, margin: 0, maxWidth: 520,
            opacity: 0, animation: 'ab-hero-in 720ms 240ms cubic-bezier(0.22,1,0.36,1) both',
          }}>
            Before AI gets the credit, eight agents have already done the work that made it possible.
          </p>
        </div>
      </div>
      <style>{`
        @keyframes ab-hero-in {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

// ── S2 — WHY WE EXIST ─────────────────────────────────────────────────────────
const INSIGHTS = [
  {
    num: '01',
    headline: 'The data exists.',
    body: "Most organizations have what they need. It's trapped in systems that were never connected.",
  },
  {
    num: '02',
    headline: "The gap isn't the data.",
    body: "It's the infrastructure around it. The connective tissue between systems that no one ever built.",
  },
  {
    num: '03',
    headline: 'We build that infrastructure.',
    body: 'Inside your cloud environment. Without moving your data. In 6 weeks.',
  },
];

function WhyWeExist() {
  const [ref, visible] = useReveal();
  const [insightRef, insightCount] = useStaggerReveal(3, 0.1);

  return (
    <section aria-label="Why we exist" style={{ background: WHITE, width: '100%', padding: '96px 0', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 80px)' }}>
        <div className="ab-two-col">
          <div ref={ref}>
            <div className={`ab-reveal${visible ? ' in' : ''}`} style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 13, fontWeight: 600, letterSpacing: '0.15em',
              color: BLUE, textTransform: 'uppercase', marginBottom: 20,
            }}>WHY WE EXIST</div>
            <h2 className={`ab-reveal${visible ? ' in' : ''}`} style={{
              fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 700,
              fontSize: 'clamp(28px, 3.5vw, 46px)',
              color: NAVY, lineHeight: 1.1, letterSpacing: '-0.02em',
              margin: '0 0 28px', transitionDelay: '80ms', textWrap: 'balance',
            }}>
              We saw the same pattern everywhere. Data piled up. Nobody could use it.
            </h2>
            <p className={`ab-reveal${visible ? ' in' : ''}`} style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 16, color: BODY, lineHeight: 1.75,
              margin: 0, maxWidth: '48ch', transitionDelay: '160ms',
            }}>
              Generative AI went from theoretical to practical almost overnight. But for most organizations, the answer to "is your data ready for AI?" is still no, not because the technology isn't ready, but because the infrastructure around the data never got built.
            </p>
          </div>
          <div ref={insightRef} style={{ paddingTop: 4 }}>
            {INSIGHTS.map(({ num, headline, body }, i) => (
              <div
                key={num}
                className="ab-insight-row"
                style={{
                  opacity: insightCount > i ? 1 : 0,
                  transform: insightCount > i ? 'translateX(0)' : 'translateX(16px)',
                  transition: `opacity 480ms ${i * 100}ms cubic-bezier(0.22,1,0.36,1), transform 480ms ${i * 100}ms cubic-bezier(0.22,1,0.36,1)`,
                }}
              >
                <div className="ab-insight-num">{num}</div>
                <div>
                  <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 15, fontWeight: 700, color: NAVY, marginBottom: 4 }}>{headline}</div>
                  <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 14, color: BODY, lineHeight: 1.65, margin: 0 }}>{body}</p>
                </div>
              </div>
            ))}
            <div style={{
              marginTop: 8, paddingTop: 24,
              borderTop: '1px solid rgba(8,31,92,0.10)',
              opacity: insightCount >= 3 ? 1 : 0,
              transition: 'opacity 480ms 360ms cubic-bezier(0.22,1,0.36,1)',
            }}>
              <p style={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontSize: 14, fontStyle: 'italic',
                color: MUTED, lineHeight: 1.65, margin: 0,
              }}>
                Think of it like warehouse robotics: you don't rebuild the warehouse. You deploy robots into what already exists. That's how D8TAOPS works.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── S3 — TROY QUOTE (animated word-stagger) ───────────────────────────────────
const QUOTE_TEXT = '"Your real advantage is your own data. That\'s your history, your decisions, your operations. That\'s the part no public model can truly understand."';

function AnimatedQuote({ text, inView }) {
  const words = text.trim().split(/\s+/);
  const attrDelay = Math.min(words.length * 28, 1200) + 150;

  return (
    <div className="ab-quote-inner">
      {/* Quote text — word by word stagger */}
      <p style={{
        fontFamily: "'IBM Plex Sans', sans-serif",
        fontSize: 'clamp(1.15rem, 2.2vw, 1.75rem)',
        fontWeight: 600, color: NAVY, lineHeight: 1.55,
        margin: '0 0 40px',
      }}>
        {words.map((word, i) => (
          <span
            key={i}
            className="ab-word-span"
            style={{
              display: 'inline-block', marginRight: '0.28em',
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateY(0)' : 'translateY(18px)',
              transition: `opacity 480ms ${i * 28}ms cubic-bezier(0.22,1,0.36,1), transform 480ms ${i * 28}ms cubic-bezier(0.22,1,0.36,1)`,
            }}
          >{word}</span>
        ))}
      </p>

      {/* Divider + attribution — enter after words settle */}
      <div style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(10px)',
        transition: `opacity 480ms ${attrDelay}ms cubic-bezier(0.22,1,0.36,1), transform 480ms ${attrDelay}ms cubic-bezier(0.22,1,0.36,1)`,
      }}>
        <div style={{ width: 48, height: 2, background: BLUE, marginBottom: 24 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div aria-hidden="true" style={{
            width: 48, height: 48, borderRadius: '50%',
            background: `linear-gradient(135deg, ${BLUE}, #0a3d8f)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0, fontFamily: "'IBM Plex Sans', sans-serif",
            fontWeight: 700, fontSize: 16, color: WHITE,
          }}>TW</div>
          <div>
            <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 600, fontSize: 15, color: NAVY, marginBottom: 3 }}>Troy Wyatt</div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', color: BLUE }}>Founder &amp; CEO, D8TAOPS</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TroyQuote() {
  const [ref, visible] = useReveal();

  return (
    <section aria-label="Founder quote" style={{ background: SURFACE, padding: '96px clamp(1.5rem, 5vw, 80px)' }}>
      <div
        ref={ref}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 720ms cubic-bezier(0.22,1,0.36,1), transform 720ms cubic-bezier(0.22,1,0.36,1)',
        }}
      >
        <div className="ab-quote-card">
          <div className="ab-quote-ghost" aria-hidden="true">"</div>
          <AnimatedQuote text={QUOTE_TEXT} inView={visible} />
        </div>
      </div>
    </section>
  );
}

// ── S4 — THE APPROACH (white background) ──────────────────────────────────────
function CloudInfographic() {
  const sources = ['Core Banking', 'ERP / GL', 'CRM', 'Data Wh.'];
  const agents  = ['D8:INGEST', 'D8:CAT', 'D8:CURATE', 'D8:SEC', 'D8:FLOW'];
  const arrowV = (
    <div className="ab-arrow-v" aria-hidden="true">
      <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
        <line x1="8" y1="0" x2="8" y2="18" stroke={BLUE} strokeWidth="1.5" opacity="0.4" />
        <path d="M3 15L8 22L13 15" stroke={BLUE} strokeWidth="1.5" fill="none" opacity="0.4" />
      </svg>
    </div>
  );

  return (
    <div className="ab-cloud-box">
      <div className="ab-cloud-label">YOUR CLOUD ENVIRONMENT: AWS / AZURE / GCP</div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, width: '100%', boxSizing: 'border-box' }}>
        {sources.map(s => <div key={s} className="ab-source-chip">{s}</div>)}
      </div>

      {arrowV}

      <div className="ab-agents-bar">
        <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 11, fontWeight: 700, color: WHITE, letterSpacing: '0.05em', flexShrink: 0 }}>D8:AGENTS</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {agents.map(a => <span key={a} className="ab-agent-pill">{a}</span>)}
        </div>
      </div>

      {arrowV}

      <div className="ab-output-box">AI-READY OUTPUT → YOUR TEAMS</div>

      <div style={{
        marginTop: 16,
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 14px',
        background: 'rgba(255,80,80,0.05)',
        border: '1px solid rgba(255,80,80,0.18)',
        borderRadius: 8,
      }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <circle cx="8" cy="8" r="7" stroke="rgba(220,60,60,0.45)" strokeWidth="1.5" />
          <line x1="4" y1="4" x2="12" y2="12" stroke="rgba(220,60,60,0.55)" strokeWidth="1.5" />
        </svg>
        <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 11, color: MUTED, fontStyle: 'italic' }}>
          External servers. Your data never crosses this boundary.
        </span>
      </div>
    </div>
  );
}

function TheApproach() {
  const [ref, visible] = useReveal();
  const [statsRef, statsCount] = useStaggerReveal(3, 0.1);

  const stats = [
    { num: '6 weeks', label: 'Time to production',             sub: 'Micro-MVP to production.' },
    { num: '0',       label: 'Data migration required',        sub: 'Agents come to your data.' },
    { num: '100%',    label: 'Data stays in your environment', sub: 'AWS, Azure, or GCP.' },
  ];

  return (
    <section aria-label="The approach" style={{ background: WHITE, padding: '96px 0', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 clamp(1.5rem, 5vw, 80px)' }}>
        <div className="ab-two-col">
          {/* Left — text */}
          <div ref={ref}>
            <div className={`ab-reveal${visible ? ' in' : ''}`} style={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: 13, fontWeight: 600, letterSpacing: '0.15em',
              color: BLUE, textTransform: 'uppercase', marginBottom: 20,
            }}>THE APPROACH</div>
            <h2 className={`ab-reveal${visible ? ' in' : ''}`} style={{
              fontFamily: "'IBM Plex Sans', sans-serif", fontWeight: 700,
              fontSize: 'clamp(28px, 3.5vw, 46px)',
              color: NAVY, lineHeight: 1.1, letterSpacing: '-0.02em',
              margin: '0 0 28px', transitionDelay: '80ms', textWrap: 'balance',
            }}>
              One belief. Applied consistently.
            </h2>
            <p className={`ab-reveal${visible ? ' in' : ''}`} style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 16, color: BODY, lineHeight: 1.75,
              margin: '0 0 20px', maxWidth: '44ch', transitionDelay: '160ms',
            }}>
              The world is chasing public models. OpenAI, Anthropic, Grok: powerful tools built on public information.
            </p>
            <p className={`ab-reveal${visible ? ' in' : ''}`} style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 16, color: BODY, lineHeight: 1.75,
              margin: '0 0 20px', maxWidth: '44ch', transitionDelay: '200ms',
            }}>
              Your competitive edge isn't there. It's in your systems: your transaction history, your operational decisions, the institutional knowledge your team has built over years.
            </p>
            <p className={`ab-reveal${visible ? ' in' : ''}`} style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 16, fontWeight: 600, color: NAVY,
              lineHeight: 1.65, margin: 0, maxWidth: '44ch', transitionDelay: '240ms',
            }}>
              We provision inside your existing cloud environment. Your security rules govern everything. The intelligence comes to your data.
            </p>
          </div>

          {/* Right — infographic */}
          <div className={`ab-reveal${visible ? ' in' : ''}`} style={{ transitionDelay: '200ms' }}>
            <CloudInfographic />
          </div>
        </div>

        {/* Stats — full width below */}
        <div ref={statsRef} className="ab-stats-row">
          {stats.map(({ num, label, sub }, i) => (
            <div
              key={label}
              className="ab-stat-card"
              style={{
                opacity: statsCount > i ? 1 : 0,
                transform: statsCount > i ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 480ms ${i * 100}ms cubic-bezier(0.22,1,0.36,1), transform 480ms ${i * 100}ms cubic-bezier(0.22,1,0.36,1)`,
              }}
            >
              <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 700, color: NAVY, lineHeight: 1, letterSpacing: '-0.02em', marginBottom: 10 }}>{num}</div>
              <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: BLUE, marginBottom: 4 }}>{label}</div>
              <div style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 12, color: MUTED, lineHeight: 1.5 }}>{sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── S5 — CTA ──────────────────────────────────────────────────────────────────
function AboutCTA() {
  return (
    <section aria-label="Get in touch" style={{
      backgroundImage: `radial-gradient(circle, rgba(4,119,191,0.18) 1px, transparent 1px), linear-gradient(160deg, #0c1428 0%, #0f2560 45%, #081F5C 100%)`,
      backgroundSize: '24px 24px, 100% 100%',
      padding: '96px clamp(1.5rem, 5vw, 80px)',
      position: 'relative', overflow: 'hidden',
    }}>
      <ParticleCanvas />
      <div aria-hidden="true" style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(62,207,142,0.07) 0%, transparent 70%)', top: '-15%', right: '10%', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <h2 style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 'clamp(28px, 4vw, 48px)',
          fontWeight: 700, color: WHITE,
          lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 20px',
        }}>
          Six weeks to production. Zero migration.
        </h2>
        <p style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 18, fontWeight: 500,
          color: 'rgba(255,255,255,0.75)',
          lineHeight: 1.6, margin: '0 0 40px',
        }}>
          One conversation. No pitch deck. We'll map the D8:Agents to your actual data stack.
        </p>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
          <D8Button href="mailto:hello@d8taops.com" innerStyle={{ fontSize: 16, padding: '17px 40px' }}>Get in touch</D8Button>
          <a href="/platform#agents" style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.65)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: 2, transition: 'color 0.18s ease, border-color 0.18s ease' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
          >See how it works →</a>
        </div>
      </div>
    </section>
  );
}

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      <HomepageNav activePath="/about" />
      <main>
        <AboutHero />
        <WhyWeExist />
        <TroyQuote />
        <TheApproach />
        <AboutCTA />
      </main>
      <GlobalFooter />
    </>
  );
}
