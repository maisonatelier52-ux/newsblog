"use client";
import { useState } from "react";
import ArticleCard from "./ArticleCard";
import Reveal from "./Reveal";

export default function NewsBrowser({ articles }) {
  const cats = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];
  const [cat, setCat] = useState("All");
  const list = cat === "All" ? articles : articles.filter((a) => a.category === cat);
  const [first, ...rest] = list;

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setCat(c)}
            className={`rounded-full border px-4 py-1.5 text-sm transition ${c === cat ? "border-gold bg-gold text-black" : "border-white/15 text-neutral-300 hover:border-gold hover:text-gold"}`}>
            {c}
          </button>
        ))}
      </div>
      {first ? (
        <div key={cat}>
          <Reveal className="mt-10"><ArticleCard a={first} large /></Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a, i) => <Reveal key={a.slug} delay={(i % 3) * 100}><ArticleCard a={a} /></Reveal>)}
          </div>
        </div>
      ) : (
        <p className="mt-10 text-neutral-400">No articles in this category yet.</p>
      )}
    </>
  );
}
