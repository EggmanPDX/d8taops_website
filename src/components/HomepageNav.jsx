import React from 'react';

// HomepageNav.jsx — flat white top bar, full-width, with wordmark + 7 links + CTA
function HomepageNav({ onCta }) {
  const links = [
    { label: 'Platform', href: '#platform' },
    { label: 'Agents', href: '#agents' },
    { label: 'Use Cases', href: '#use-cases' },
  ];
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: '#FFFFFF',
      borderBottom: '1px solid rgba(8, 31, 92, 0.08)',
      boxShadow: '0 1px 4px rgba(8, 31, 92, 0.06)',
      fontFamily: 'var(--font-sans)',
    }}>
      <div style={{
        width: '100%', padding: '0 24px', height: 88,
        display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, justifySelf: 'start' }}>
          <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <div style={{
              fontSize: '22px', fontWeight: 800, color: '#081F5C',
              letterSpacing: '-0.03em', fontFamily: 'var(--font-sans)',
            }}>
              D8TAOPS
            </div>
          </a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <a href="#platform" style={{ color: 'rgba(8,31,92,0.7)', fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>Platform</a>
          <a href="#agents" style={{ color: 'rgba(8,31,92,0.7)', fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>Agents</a>
          <a href="#use-cases" style={{ color: 'rgba(8,31,92,0.7)', fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>Use Cases</a>
        </div>

        <div style={{ justifySelf: 'end' }}>
          <a href="#contact" style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            padding: '8px 20px', fontSize: 13, fontWeight: 600, letterSpacing: '0.01em',
            background: 'transparent', color: '#081F5C',
            border: '1.5px solid #1B3A8C', borderRadius: 24,
            textDecoration: 'none', whiteSpace: 'nowrap',
          }}>
            Get in touch.
          </a>
        </div>
      </div>
    </nav>
  );
}
export default HomepageNav;
