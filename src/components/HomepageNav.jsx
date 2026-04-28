import React from 'react';

export default function HomepageNav() {
  const [hidden, setHidden] = React.useState(false);
  const [atTop, setAtTop]   = React.useState(true);
  const lastY = React.useRef(0);

  React.useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setAtTop(y < 60);
      if (y > lastY.current && y > 80) setHidden(true);
      else if (y < lastY.current) setHidden(false);
      lastY.current = y;
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <style>{`
        .d8-nav-link { transition: color 0.15s ease; }
        .d8-nav-link:hover { color: #081F5C !important; }
        .d8-nav-link:focus-visible { outline: 2px solid #0477BF; outline-offset: 4px; border-radius: 4px; }
        .d8-nav-pill { transition: background 0.25s ease, box-shadow 0.25s ease, transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease; }
        .d8-btn-colorful {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; justify-content: center;
          cursor: pointer; border: none;
          font-family: 'IBM Plex Sans', sans-serif;
          font-weight: 600; color: #ffffff !important;
          border-radius: 24px; background: #081F5C;
          transition: transform 0.18s ease;
          text-decoration: none !important;
          white-space: nowrap; flex-shrink: 0;
        }
        .d8-btn-colorful:hover { transform: translateY(-1px); }
        .d8-btn-glow {
          position: absolute; inset: -4px;
          background: linear-gradient(135deg, #0477BF 0%, #3ecf8e 50%, #0477BF 100%);
          opacity: 0.28; filter: blur(12px);
          transition: opacity 0.45s ease;
          pointer-events: none; border-radius: 24px;
        }
        .d8-btn-colorful:hover .d8-btn-glow { opacity: 0.88; }
        .d8-btn-inner {
          position: relative; z-index: 1;
          display: flex; align-items: center; gap: 6px;
        }
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
            background: atTop ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(8,31,92,0.1)',
            boxShadow: atTop ? '0 2px 8px rgba(8,31,92,0.06)' : '0 4px 24px rgba(8,31,92,0.1)',
            borderRadius: 14,
            pointerEvents: hidden ? 'none' : 'all',
            transform: hidden ? 'translateY(-110%)' : 'translateY(0)',
            opacity: hidden ? 0 : 1,
          }}
        >
          {/* Logo */}
          <a href="/" style={{ textDecoration: 'none', flexShrink: 0 }}>
            <img
              src="/images/d8taops-logo.png"
              alt="Loop"
              style={{ height: 36, width: 'auto', display: 'block' }}
            />
          </a>

          {/* Center links */}
          <div
            className="d8-nav-links-center"
            style={{ display: 'flex', alignItems: 'center', gap: 28 }}
          >
            {[
              { label: 'PLATFORM',     href: '/platform' },
              { label: 'CASE STUDIES', href: '/case-studies' },
              { label: 'ABOUT',        href: '/about' },
              { label: 'LAB',          href: '/lab' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="d8-nav-link"
                style={{
                  color: '#0477BF',
                  fontSize: 14, fontWeight: 500,
                  fontFamily: "'IBM Plex Sans', sans-serif",
                  textDecoration: 'none',
                }}
              >{label}</a>
            ))}
          </div>

          {/* CTA */}
          <a href="#contact" className="d8-btn-colorful" style={{ fontSize: 13, padding: '9px 22px' }}>
            <div className="d8-btn-glow" aria-hidden="true" />
            <span className="d8-btn-inner">Book a demo</span>
          </a>
        </div>
      </nav>
    </>
  );
}
