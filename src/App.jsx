import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomepageNav from './components/HomepageNav';
import D8Button from './components/D8Button';
import ParticleCanvas from './components/ParticleCanvas';
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

function ComingSoonPage() {
  const { pathname } = useLocation();
  const label = pathname.replace('/', '').replace(/-/g, ' ').toUpperCase() || 'PAGE';
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />
      <HomepageNav />
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
          <D8Button href="mailto:hello@d8taops.com" style={{ marginTop: 8 }}>Get in touch</D8Button>
        </div>
      </div>
    </>
  );
}

function Homepage() {
  return (
    <>
      <HomepageNav />
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/platform" element={<PlatformPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/lab" element={<D8LABPage />} />
        <Route path="*" element={<ComingSoonPage />} />
      </Routes>
    </BrowserRouter>
  );
}
