"use client";

export default function BackToTop() {
  return (
    <button type="button" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="group flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-gold transition duration-300 hover:-translate-y-1 hover:bg-gold hover:text-black hover:shadow-[0_0_22px_rgba(201,162,75,0.55)]">
      <span className="transition-transform duration-300 group-hover:-translate-y-0.5">&uarr;</span>
    </button>
  );
}