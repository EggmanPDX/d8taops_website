import React from 'react';
import D8Button from './D8Button';

export default function HomepageNav({ activePath }) {
  const currentPath = activePath || (typeof window !== 'undefined' ? window.location.pathname : '/');
  const [atTop, setAtTop] = React.useState(true);

  React.useEffect(() => {
    const handler = () => setAtTop(window.scrollY < 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <style>{`
        .d8-nav-link { transition: color 0.15s ease; }
        .d8-nav-link:hover { color: #081F5C !important; }
        .d8-nav-link:focus-visible { outline: 2px solid #0477BF; outline-offset: 4px; border-radius: 4px; }
        .d8-nav-link-active { color: #081F5C !important; font-weight: 600 !important; border-bottom: 2px solid #0477BF; padding-bottom: 2px; }
        .d8-nav-pill { transition: background 0.25s ease, box-shadow 0.25s ease, transform 0.3s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease; }
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
            background: atTop ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.98)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: atTop ? '1px solid rgba(8,31,92,0.1)' : '1px solid rgba(8,31,92,0.18)',
            boxShadow: atTop ? '0 2px 8px rgba(8,31,92,0.06)' : '0 8px 32px rgba(8,31,92,0.14)',
            borderRadius: 14,
            pointerEvents: 'all',
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
              { label: 'HOME',         href: '/' },
              { label: 'PLATFORM',     href: '/platform' },
              { label: 'CASE STUDIES', href: '/case-studies' },
              { label: 'ABOUT',        href: '/about' },
              { label: 'LABS',         href: '/lab' },
            ].map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={`d8-nav-link${currentPath === href ? ' d8-nav-link-active' : ''}`}
                aria-current={currentPath === href ? 'page' : undefined}
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
          <D8Button href="#contact" innerStyle={{ fontSize: 13, padding: '9px 22px' }}>Book a demo</D8Button>
        </div>
      </nav>
    </>
  );
}
