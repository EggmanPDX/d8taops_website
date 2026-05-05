import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomepageNav from './components/HomepageNav';
import D8Button from './components/D8Button';
import {
  GLOBAL_CSS,
  HeroSection,
  TickerBar,
  StatsSection,
  WhatD8TAOPSDoes,
  WhoItIsSection,
  WhatWeDoGrid,
  WhatWeDoSection,
  D8ViewSection,
  ProofBlockSection,
  ClosingCTA,
  GlobalFooter,
} from './components/HomepageSections';
import PlatformPage from './components/PlatformPage';
import AboutPage from './components/AboutPage';
import D8LABPage from './components/D8LABPage';
import PrivacyPage from './components/PrivacyPage';
import TermsPage from './components/TermsPage';

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

function ComingSoonPage() {
  const { pathname } = useLocation();
  const label = pathname.replace('/', '').replace(/-/g, ' ').toUpperCase() || 'PAGE';
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <HomepageNav activePath={pathname} />
      <div style={{
        minHeight: '100vh',
        backgroundImage: `radial-gradient(circle, rgba(4,119,191,0.18) 1px, transparent 1px), linear-gradient(160deg, #0c1428 0%, #0f2560 45%, #081F5C 100%)`,
        backgroundSize: '24px 24px, 100% 100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <ParticleCanvas scale={1.5} />
        <div style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 24,
          padding: '0 clamp(1.5rem, 5vw, 80px)',
          textAlign: 'center',
          fontFamily: "'IBM Plex Sans', sans-serif",
        }}>
          <span style={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: 13,
            fontWeight: 600,
            color: '#0477BF',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
          }}>{label}</span>
          <h1 style={{
            fontSize: 'clamp(40px, 5vw, 68px)',
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: '-0.03em',
            lineHeight: 1.08,
            maxWidth: 640,
            margin: 0,
          }}>
            This page is{' '}
            <span style={{ color: '#0477BF', fontStyle: 'italic' }}>coming soon.</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, maxWidth: 480, lineHeight: 1.6, margin: 0 }}>
            We're building it out. In the meantime, get in touch and we'll walk you through it directly.
          </p>
          <D8Button href="mailto:hello@d8taops.com" style={{ marginTop: 8 }} innerStyle={{ fontSize: 16, padding: '17px 40px' }}>Get in touch</D8Button>
        </div>
      </div>
    </>
  );
}

function Homepage() {
  return (
    <>
      <HomepageNav activePath="/" />
      <HeroSection />
      <TickerBar />
      <StatsSection />
      <WhatD8TAOPSDoes />
      <WhoItIsSection />
      <WhatWeDoGrid />
      <WhatWeDoSection />
      <D8ViewSection />
      <ProofBlockSection />
      <ClosingCTA />
      <GlobalFooter />
    </>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function ScrollToHash() {
  const { pathname, hash } = useLocation();
  React.useEffect(() => {
    if (!hash) return;
    const el = document.querySelector(hash);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      const timer = setTimeout(() => {
        const el2 = document.querySelector(hash);
        if (el2) el2.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/platform" element={<PlatformPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/lab" element={<D8LABPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<ComingSoonPage />} />
      </Routes>
    </BrowserRouter>
  );
}
