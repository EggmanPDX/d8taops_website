import React from 'react'

const GRAB_DIST = 220
const LINE_DIST = 160
const MAX_EXTRA  = 40   // cap on click-spawned extras

export default function ParticleCanvas({ count = 100, scale = 1 }) {
  const ref = React.useRef(null)

  React.useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles = [], raf
    let t = 0
    const mouse = { x: -9999, y: -9999, active: false }

    const mkParticle = (x, y, w, h) => ({
      x: x ?? Math.random() * w,
      y: y ?? Math.random() * h,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 0.8,
      size: Math.random() * 2 + 0.8,
      baseOpacity: Math.random() * 0.35 + 0.25,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.6 + 0.4,
    })

    const resize = () => {
      const parent = canvas.parentElement
      const r = parent.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width  = r.width  * dpr
      canvas.height = r.height * dpr
      canvas.style.width  = r.width  + 'px'
      canvas.style.height = r.height + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = Array.from({ length: count }, () => mkParticle(null, null, r.width, r.height))
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas.parentElement)

    const parent = canvas.parentElement

    const onMove = (e) => {
      const r = parent.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
      mouse.active = true
    }
    const onLeave = () => { mouse.active = false; mouse.x = -9999; mouse.y = -9999 }
    const onClick = (e) => {
      const r = parent.getBoundingClientRect()
      const cx = e.clientX - r.left
      const cy = e.clientY - r.top
      const w = canvas.width  / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)
      for (let i = 0; i < 4; i++) {
        particles.push(mkParticle(cx + (Math.random() - 0.5) * 20, cy + (Math.random() - 0.5) * 20, w, h))
      }
      // keep pool bounded
      if (particles.length > count + MAX_EXTRA) particles.splice(0, 4)
    }

    parent.addEventListener('mousemove', onMove)
    parent.addEventListener('mouseleave', onLeave)
    parent.addEventListener('click', onClick)

    const animate = () => {
      const w = canvas.width  / (window.devicePixelRatio || 1)
      const h = canvas.height / (window.devicePixelRatio || 1)
      ctx.clearRect(0, 0, w, h)
      t += 0.016

      for (const p of particles) {
        // Grab: soft attraction toward cursor
        if (mouse.active) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < GRAB_DIST && d > 0) {
            const force = (1 - d / GRAB_DIST) * 0.012
            p.vx += (dx / d) * force
            p.vy += (dy / d) * force
          }
        }
        // Velocity damping
        p.vx *= 0.99
        p.vy *= 0.99
        p.x += p.vx
        p.y += p.vy
        // Bounce edges
        if (p.x < 0)  { p.x = 0;  p.vx *= -1 }
        if (p.x > w)  { p.x = w;  p.vx *= -1 }
        if (p.y < 0)  { p.y = 0;  p.vy *= -1 }
        if (p.y > h)  { p.y = h;  p.vy *= -1 }
      }

      // Particle-to-particle lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < LINE_DIST) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(4,119,191,${(1 - d / LINE_DIST) * 0.4 * scale})`
            ctx.lineWidth = 1.2
            ctx.stroke()
          }
        }
        // Grab lines to cursor
        if (mouse.active) {
          const dx = mouse.x - particles[i].x
          const dy = mouse.y - particles[i].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < GRAB_DIST) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(4,119,191,${(1 - d / GRAB_DIST) * 0.75 * scale})`
            ctx.lineWidth = 0.8
            ctx.stroke()
          }
        }
      }

      // Draw particles with pulsating opacity
      for (const p of particles) {
        const opacity = Math.min(1, p.baseOpacity * (0.7 + 0.3 * Math.sin(t * p.speed + p.phase)) * scale)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(4,119,191,${opacity})`
        ctx.fill()
      }

      raf = requestAnimationFrame(animate)
    }

    raf = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      parent.removeEventListener('mousemove', onMove)
      parent.removeEventListener('mouseleave', onLeave)
      parent.removeEventListener('click', onClick)
    }
  }, [count, scale])

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  )
}
