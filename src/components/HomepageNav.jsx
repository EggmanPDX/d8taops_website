import React from 'react';

export default function HomepageNav() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <style>{`
        .d8-nav-link { transition: color 0.15s ease; }
        .d8-nav-link:hover { color: #ffffff !important; }
        .d8-nav-link:focus-visible { outline: 2px solid #0477BF; outline-offset: 4px; border-radius: 4px; }
        .d8-nav-cta { transition: filter 0.15s ease; }
        .d8-nav-cta:hover { filter: brightness(1.12); }
        .d8-nav-cta:focus-visible { outline: 2px solid #ffffff; outline-offset: 3px; border-radius: 8px; }
        .d8-nav-pill { transition: background 0.3s ease; }
        @media (max-width: 768px) {
          .d8-nav-links-center { display: none !important; }
        }
      `}</style>
      <nav
        aria-label="Main navigation"
        style={{
          position: 'fixed', top: 16, left: 0, right: 0,
          zIndex: 1000,
          display: 'flex', justifyContent: 'center',
          padding: '0 20px',
          pointerEvents: 'none',
        }}
      >
        <div
          className="d8-nav-pill"
          style={{
            width: '100%', maxWidth: 1200,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            height: 54, padding: '0 24px 0 28px',
            background: scrolled ? 'rgba(4,14,46,0.96)' : 'rgba(4,14,46,0.82)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.09)',
            borderRadius: 14,
            pointerEvents: 'all',
          }}
        >
          {/* Logo */}
          <a href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <span style={{
              fontFamily: "'IBM Plex Sans', sans-serif",
              fontSize: 20, fontWeight: 800,
              color: '#ffffff', letterSpacing: '-0.03em',
            }}>D8TAOPS</span>
          </a>

          {/* Center links */}
          <div
            className="d8-nav-links-center"
            style={{ display: 'flex', alignItems: 'center', gap: 28 }}
          >
            {[
              { label: 'Platform', href: '#platform' },
              { label: 'Agents', href: '#agents' },
              { label: 'Use Cases', href: '#use-cases' },
              { label: 'Consulting', href: '#consulting' },
              { label: 'Contact', href: '#contact' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="d8-nav-link"
                style={{
                  color: 'rgba(255,255,255,0.72)',
                  fontSize: 14, fontWeight: 500,
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  textDecoration: 'none',
                }}
              >{label}</a>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="d8-nav-cta"
            style={{
              display: 'inline-flex', alignItems: 'center',
              padding: '9px 20px',
              fontSize: 13, fontWeight: 600,
              background: '#0477BF', color: '#ffffff',
              fontFamily: "'IBM Plex Sans', sans-serif",
              borderRadius: 8, textDecoration: 'none',
              whiteSpace: 'nowrap', flexShrink: 0,
            }}
          >Get in touch.</a>
        </div>
      </nav>
    </>
  );
}
