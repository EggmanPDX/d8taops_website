import React from 'react';

// Ported from the shadcn/Tailwind GooeyText component to plain React + inline styles.
// The `prefix` prop renders static text OUTSIDE the gooey filter so it never morphs.
// Only the cycling `texts` are subject to the blur+threshold effect.
export function GooeyText({ texts, prefix, morphTime = 1, cooldownTime = 0.25, style = {}, textStyle = {} }) {
  const text1Ref = React.useRef(null);
  const text2Ref = React.useRef(null);
  const filterId = React.useRef('gooey-' + Math.random().toString(36).slice(2, 8)).current;

  React.useEffect(() => {
    let textIndex = texts.length - 1;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;
    let rafId;
    let cancelled = false;

    const setMorph = (fraction) => {
      if (!text1Ref.current || !text2Ref.current) return;
      text2Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      text2Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
      fraction = 1 - fraction;
      text1Ref.current.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      text1Ref.current.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;
    };

    const doCooldown = () => {
      morph = 0;
      if (!text1Ref.current || !text2Ref.current) return;
      text2Ref.current.style.filter = '';
      text2Ref.current.style.opacity = '100%';
      text1Ref.current.style.filter = '';
      text1Ref.current.style.opacity = '0%';
    };

    const doMorph = () => {
      morph -= cooldown;
      cooldown = 0;
      let fraction = morph / morphTime;
      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }
      setMorph(fraction);
    };

    const animate = () => {
      if (cancelled) return;
      rafId = requestAnimationFrame(animate);
      const newTime = new Date();
      const shouldIncrementIndex = cooldown > 0;
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;
      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex = (textIndex + 1) % texts.length;
          if (text1Ref.current) text1Ref.current.textContent = texts[textIndex % texts.length];
          if (text2Ref.current) text2Ref.current.textContent = texts[(textIndex + 1) % texts.length];
        }
        doMorph();
      } else {
        doCooldown();
      }
    };

    animate();
    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
    };
  }, [texts, morphTime, cooldownTime]);

  // Without prefix: spans are centered, morphing div fills container.
  // With prefix: prefix sits outside the filter on the left, text is left-aligned.
  const spanStyle = {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
    textAlign: prefix ? 'left' : 'center',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    ...textStyle,
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      ...style,
    }}>
      <svg style={{ position: 'absolute', height: 0, width: 0 }} aria-hidden="true" focusable="false">
        <defs>
          <filter id={filterId}>
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      {/* Static prefix — lives outside the filter, never morphs */}
      {prefix && (
        <span style={{
          ...textStyle,
          flexShrink: 0,
          marginRight: '0.3em',
          position: 'relative',
          zIndex: 1,
        }}>
          {prefix}
        </span>
      )}

      {/* Morphing text — filtered for the gooey effect */}
      <div style={{
        position: 'relative',
        flex: prefix ? '0 0 auto' : '1',
        width: prefix ? 'clamp(320px, 42vw, 640px)' : '100%',
        height: '100%',
        filter: `url(#${filterId})`,
      }}>
        <span ref={text1Ref} style={spanStyle} />
        <span ref={text2Ref} style={spanStyle} />
      </div>
    </div>
  );
}
