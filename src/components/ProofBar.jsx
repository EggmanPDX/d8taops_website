import { useEffect, useRef, useState } from "react";

/* ─── Data ───────────────────────────────────────────────── */
const stats = [
  {
    value: 97,
    suffix: "%",
    prefix: "",
    label: "Faster audit cycles",
    sub: "From a single 90-day deployment",
  },
  {
    value: 1.2,
    suffix: "M+",
    prefix: "$",
    label: "Projected savings",
    sub: "From a single 90-day deployment",
  },
  {
    value: 100,
    suffix: "%",
    prefix: "",
    label: "Record coverage. Zero sampling.",
    sub: "From a single 90-day deployment",
  },
];

/* ─── Hook ───────────────────────────────────────────────── */
function useCountUp(target, duration = 600, shouldStart = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    // Respect reduced motion — skip to final value immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target);
      return;
    }

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // ease-out curve
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(target < 10 ? 1 : 0)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [shouldStart, target, duration]);

  return count;
}

/* ─── StatCard ───────────────────────────────────────────── */
function StatCard({ stat, shouldStart, delay }) {
  const count = useCountUp(stat.value, 600, shouldStart);

  return (
    <div
      style={{
        opacity: shouldStart ? 1 : 0,
        transform: shouldStart ? "translateY(0)" : "translateY(8px)",
        transition: `opacity 400ms ease-out ${delay}ms, transform 400ms ease-out ${delay}ms`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "0 1.5rem",
      }}
    >
      {/* Divider — hidden on first card */}
      <span
        style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
          lineHeight: 1,
          color: "#0477BF",
          letterSpacing: "-0.02em",
        }}
      >
        {stat.prefix}{count}{stat.suffix}
      </span>

      <span
        style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontWeight: 600,
          fontSize: "1rem",
          color: "#081F5C",
          marginTop: "0.5rem",
          lineHeight: 1.3,
        }}
      >
        {stat.label}
      </span>

      <span
        style={{
          fontFamily: "'IBM Plex Sans', sans-serif",
          fontWeight: 400,
          fontSize: "0.75rem",
          color: "rgba(8, 31, 92, 0.45)",
          marginTop: "0.375rem",
          letterSpacing: "0.02em",
        }}
      >
        {stat.sub}
      </span>
    </div>
  );
}

/* ─── ProofBar ───────────────────────────────────────────── */
export default function ProofBar() {
  const [hasTriggered, setHasTriggered] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasTriggered(true);
          observer.disconnect(); // trigger once only
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .proof-bar-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
        }
        .proof-bar-grid .proof-divider {
          border-left: 1px solid rgba(8, 31, 92, 0.1);
        }
        @media (max-width: 640px) {
          .proof-bar-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .proof-bar-grid .proof-divider {
            border-left: none;
            border-top: 1px solid rgba(8, 31, 92, 0.1);
            padding-top: 2.5rem;
          }
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          backgroundColor: "#F5F6FA",
          padding: "clamp(3rem, 6vw, 5rem) clamp(1rem, 5vw, 3rem)",
        }}
      >
        <div
          style={{ maxWidth: "1280px", margin: "0 auto" }}
          className="proof-bar-grid"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className={i > 0 ? "proof-divider" : ""}
            >
              <StatCard
                stat={stat}
                shouldStart={hasTriggered}
                delay={i * 100}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
