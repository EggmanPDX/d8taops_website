import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SlideTabs({ items = [], activePath = '/' }) {
  const initialSelected = items.findIndex(item => item.href === activePath);
  const [selected, setSelected] = useState(initialSelected);
  const [hovered, setHovered] = useState(null);
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 });
  const tabsRef = useRef([]);

  useEffect(() => {
    const tab = tabsRef.current[selected];
    if (tab) {
      const { width } = tab.getBoundingClientRect();
      setPosition({ left: tab.offsetLeft, width, opacity: 1 });
    } else {
      setPosition(p => ({ ...p, opacity: 0 }));
    }
  }, [selected]);

  const snapToSelected = () => {
    setHovered(null);
    const tab = tabsRef.current[selected];
    if (tab) {
      const { width } = tab.getBoundingClientRect();
      setPosition({ left: tab.offsetLeft, width, opacity: 1 });
    } else {
      setPosition(p => ({ ...p, opacity: 0 }));
    }
  };

  return (
    <ul
      onMouseLeave={snapToSelected}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        listStyle: 'none',
        margin: 0,
        padding: '3px',
        background: 'rgba(4, 119, 191, 0.08)',
        borderRadius: 9999,
        border: '1px solid rgba(4, 119, 191, 0.18)',
        gap: 0,
      }}
    >
      {items.map((item, i) => {
        const isActive = hovered === i || (hovered === null && selected === i);
        return (
          <li
            key={item.label}
            ref={el => (tabsRef.current[i] = el)}
            onClick={() => {
              setSelected(i);
              window.location.href = item.href;
            }}
            onMouseEnter={() => {
              setHovered(i);
              const tab = tabsRef.current[i];
              if (!tab) return;
              const { width } = tab.getBoundingClientRect();
              setPosition({ left: tab.offsetLeft, width, opacity: 1 });
            }}
            style={{
              position: 'relative',
              zIndex: 10,
              cursor: 'pointer',
              padding: '7px 16px',
              fontSize: 13,
              fontWeight: 500,
              fontFamily: "'IBM Plex Sans', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: isActive ? '#FFFFFF' : '#081F5C',
              transition: 'color 0.15s ease',
              whiteSpace: 'nowrap',
              userSelect: 'none',
            }}
          >
            {item.label}
          </li>
        );
      })}

      <motion.li
        animate={position}
        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
        style={{
          position: 'absolute',
          zIndex: 0,
          top: 3,
          height: 'calc(100% - 6px)',
          borderRadius: 9999,
          background: '#0477BF',
          listStyle: 'none',
          pointerEvents: 'none',
        }}
      />
    </ul>
  );
}
