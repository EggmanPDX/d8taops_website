import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const BLUE = '#0477BF'
const NAVY = '#081F5C'

const movingMap = {
  TOP:    `radial-gradient(20.7% 50% at 50% 0%,   ${BLUE} 0%, rgba(4,119,191,0) 100%)`,
  LEFT:   `radial-gradient(16.6% 43.1% at 0% 50%, ${BLUE} 0%, rgba(4,119,191,0) 100%)`,
  BOTTOM: `radial-gradient(20.7% 50% at 50% 100%, ${BLUE} 0%, rgba(4,119,191,0) 100%)`,
  RIGHT:  `radial-gradient(16.2% 41.2% at 100% 50%, ${BLUE} 0%, rgba(4,119,191,0) 100%)`,
}

const highlight = `radial-gradient(75% 181.16% at 50% 50%, ${BLUE} 0%, rgba(4,119,191,0) 100%)`

const DIRECTIONS = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT']

export default function D8Button({
  children,
  as: Element = 'a',
  duration = 1.4,
  clockwise = true,
  style,
  innerStyle,
  ...props
}) {
  const [hovered, setHovered] = useState(false)
  const [direction, setDirection] = useState('BOTTOM')

  const rotateDirection = (cur) => {
    const i = DIRECTIONS.indexOf(cur)
    const next = clockwise
      ? (i - 1 + DIRECTIONS.length) % DIRECTIONS.length
      : (i + 1) % DIRECTIONS.length
    return DIRECTIONS[next]
  }

  useEffect(() => {
    if (hovered) return
    const id = setInterval(() => setDirection((d) => rotateDirection(d)), duration * 1000)
    return () => clearInterval(id)
  }, [hovered, duration, clockwise])

  return (
    <Element
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 9999,
        padding: 1,
        cursor: 'pointer',
        textDecoration: 'none',
        overflow: 'visible',
        background: 'rgba(8,31,92,0.5)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        border: 'none',
        transition: 'transform 0.18s ease',
        ...(hovered ? { transform: 'translateY(-1px)' } : {}),
        ...style,
      }}
      {...props}
    >
      {/* text layer */}
      <span
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          borderRadius: 9999,
          padding: '14px 32px',
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontSize: 15,
          fontWeight: 600,
          color: '#ffffff',
          whiteSpace: 'nowrap',
          ...innerStyle,
        }}
      >
        {children}
      </span>

      {/* animated gradient border */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          borderRadius: 'inherit',
          overflow: 'hidden',
          filter: 'blur(2px)',
          width: '100%',
          height: '100%',
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: 'linear', duration }}
      />

      {/* solid navy fill — shows through as the "inner" button face */}
      <div
        style={{
          position: 'absolute',
          inset: 2,
          zIndex: 1,
          borderRadius: 9999,
          background: NAVY,
        }}
      />
    </Element>
  )
}
