"use client";
import { useEffect, useState } from "react";

export function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setP(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <div className="fixed left-0 top-0 z-[60] h-[3px] bg-gold transition-[width] duration-100" style={{ width: `${p}%` }} />;
}

export function ShareButtons({ title }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");
  useEffect(() => setUrl(window.location.href), []);
  const enc = encodeURIComponent;
  const btn = "rounded-full border border-white/15 px-4 py-1.5 text-sm text-neutral-300 transition hover:border-gold hover:text-gold";
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm text-neutral-500">Share</span>
      <a className={btn} target="_blank" rel="noopener noreferrer" href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`}>LinkedIn</a>
      <a className={btn} target="_blank" rel="noopener noreferrer" href={`https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`}>X</a>
      <a className={btn} target="_blank" rel="noopener noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`}>Facebook</a>
      <button className={btn} onClick={async () => { try { await navigator.clipboard.writeText(url); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch {} }}>
        {copied ? "Copied" : "Copy link"}
      </button>
    </div>
  );
}