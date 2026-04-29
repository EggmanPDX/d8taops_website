import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomepageNav from './components/HomepageNav';
import {
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

const NAVY = '#081F5C';
const BLUE = '#0477BF';

function ComingSoonPage() {
  const { pathname } = useLocation();
  const label = pathname.replace('/', '').replace(/-/g, ' ').toUpperCase() || 'PAGE';
  return (
    <>
      <HomepageNav />
      <div style={{
        minHeight: '100vh',
        background: NAVY,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 24,
        padding: '0 24px',
        textAlign: 'center',
        fontFamily: "'IBM Plex Sans', sans-serif",
      }}>
        <span style={{
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 13,
          fontWeight: 600,
          color: BLUE,
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
        }}>{label}</span>
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 60px)',
          fontWeight: 700,
          color: '#ffffff',
          letterSpacing: '-0.03em',
          lineHeight: 1.1,
          maxWidth: 640,
        }}>
          This page is{' '}
          <span style={{ color: BLUE, fontStyle: 'italic' }}>coming soon.</span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 18, maxWidth: 480, lineHeight: 1.6 }}>
          We're building it out. In the meantime, get in touch and we'll walk you through it directly.
        </p>
        <a
          href="mailto:hello@d8taops.com"
          style={{
            marginTop: 8,
            display: 'inline-flex',
            alignItems: 'center',
            background: BLUE,
            color: '#ffffff',
            fontFamily: "'IBM Plex Sans', sans-serif",
            fontWeight: 600,
            fontSize: 15,
            padding: '12px 28px',
            borderRadius: 8,
            textDecoration: 'none',
          }}
        >
          Get in touch
        </a>
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
        <Route path="*" element={<ComingSoonPage />} />
      </Routes>
    </BrowserRouter>
  );
}
