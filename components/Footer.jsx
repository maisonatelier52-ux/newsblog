import Link from "next/link";
import { getArticles } from "@/lib/articles";
import { formatDate } from "@/lib/format";
import BackToTop from "./BackToTop";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/career", label: "Career" },
  { href: "/ventures", label: "Ventures" },
  { href: "/news", label: "News" },
];

const heading = "text-xs font-semibold uppercase tracking-[0.25em] text-gold";

export default function Footer() {
  const latest = getArticles().slice(0, 3);

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-neutral-950">
      {/* gold line + glow */}
      <div className="absolute inset-x-0 top-0 h-px pointer-events-none bg-gradient-to-r from-transparent via-gold to-transparent" />
      <div className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
      {/* faint watermark */}
      <p aria-hidden className="serif pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap text-[7rem] leading-none text-white/[0.03] sm:text-[11rem]">
        Herrera Velutini
      </p>

      <div className="relative grid max-w-6xl gap-12 px-5 pt-16 pb-12 mx-auto md:grid-cols-12">
        {/* Brand */}
        <div className="md:col-span-5">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <span className="serif flex h-12 w-12 items-center justify-center rounded-full border border-gold/70 text-gold transition duration-300 group-hover:bg-gold group-hover:text-black group-hover:shadow-[0_0_20px_rgba(201,162,75,0.6)]">JHV</span>
            <span className="text-xl text-white serif">Julio Herrera <span className="text-gold">Velutini</span></span>
          </Link>
          <p className="max-w-sm mt-5 text-sm leading-relaxed text-neutral-400">
            Banker and founder of Britannia Financial Group, with more than three decades of experience in international banking and wealth management.
          </p>
          <div className="flex flex-wrap gap-2 mt-6">
            {["Private Banking", "Wealth Management", "Geneva", "London"].map((t) => (
              <span key={t} className="px-3 py-1 text-xs transition border rounded-full border-white/10 text-neutral-400 hover:border-gold hover:text-gold">{t}</span>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div className="md:col-span-3">
          <h3 className={heading}>Explore</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-flex items-center gap-2 transition group text-neutral-300 hover:text-gold">
                  <span className="w-0 h-px transition-all duration-300 bg-gold group-hover:w-4" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Latest news */}
        <div className="md:col-span-4">
          <h3 className={heading}>Latest news</h3>
          <ul className="mt-5 space-y-4">
            {latest.map((a) => (
              <li key={a.slug}>
                <Link href={`/news/${a.slug}`} className="block pl-4 transition border-l group border-white/10 hover:border-gold">
                  <p className="text-xs text-neutral-500">{formatDate(a.date)}</p>
                  <p className="serif mt-0.5 leading-snug text-neutral-200 transition group-hover:text-gold-soft">{a.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative border-t border-white/10">
        <div className="flex flex-col items-center justify-between max-w-6xl gap-4 px-5 py-6 mx-auto text-xs text-neutral-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Julio Herrera Velutini. All rights reserved.</p>
          <p className="text-center">Biographical details are compiled from public sources.</p>
          <BackToTop />
        </div>
      </div>
    </footer>
  );
}