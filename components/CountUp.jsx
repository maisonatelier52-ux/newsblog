"use client";
import { useEffect, useRef, useState } from "react";

// Counts small numbers up when visible (e.g. "30+"). Large values such as years are shown as-is.
export default function CountUp({ value }) {
  const m = String(value).match(/^(\d+)(.*)$/);
  const target = m ? parseInt(m[1], 10) : 0;
  const animate = m && target < 100;
  const [n, setN] = useState(animate ? 0 : target);
  const ref = useRef(null);
  useEffect(() => {
    if (!animate) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min(1, (t - start) / 1400);
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [animate, target]);
  return <span ref={ref}>{m ? n : value}{m ? m[2] : ""}</span>;
}
