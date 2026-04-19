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
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24,
      }}>
        <a href="#" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0, width: 140 }}>
          <div style={{
            fontSize: '22px',
            fontWeight: 800,
            color: '#081F5C',
            letterSpacing: '-0.03em',
            fontFamily: 'var(--font-sans)'
          }}>
            D8TAOPS
          </div>
        </a>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px'
        }}>
          <a href="#platform" style={{ color: 'rgba(8,31,92,0.7)', fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>Platform</a>
          <a href="#agents" style={{ color: 'rgba(8,31,92,0.7)', fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>Agents</a>
          <a href="#use-cases" style={{ color: 'rgba(8,31,92,0.7)', fontSize: 15, fontWeight: 500, textDecoration: 'none' }}>Use Cases</a>
          <a href="#contact" style={{ color: '#0477BF', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
            Get in touch.
          </a>
        </div>

        <div style={{ flexShrink: 0, width: 140 }}></div>
      </div>
    </nav>
  );
}
export default HomepageNav;
