"use client";
import { useEffect, useRef } from "react";

// Slides/fades its children in when they scroll into view. from: up | left | right | zoom
export default function Reveal({ children, from = "up", delay = 0, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} data-from={from} style={{ "--d": `${delay}ms` }} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
