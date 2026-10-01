"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/career", label: "Career" },
  { href: "/ventures", label: "Ventures" },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Header gets a stronger look after you scroll a little
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Close the mobile menu when the page changes
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href) =>
    !href.includes("#") && (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const newsActive = pathname.startsWith("/news");

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        scrolled || open
          ? "border-gold/20 bg-black/90 shadow-[0_10px_35px_-15px_rgba(201,162,75,0.35)] backdrop-blur-xl"
          : "border-white/10 bg-black/50 backdrop-blur-md"
      }`}
    >
      <div className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}>
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <span className="serif flex h-10 w-10 items-center justify-center rounded-full border border-gold/70 text-sm tracking-wider text-gold transition duration-300 group-hover:bg-gold group-hover:text-black group-hover:shadow-[0_0_20px_rgba(201,162,75,0.6)]">
            JHV
          </span>
          <span className="text-lg tracking-wide text-white serif">
            Julio Herrera <span className="text-gold">Velutini</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="items-center hidden gap-8 text-sm md:flex">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className={`relative py-1 tracking-wide transition-colors duration-300 hover:text-gold after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-gold after:transition-all after:duration-300 hover:after:w-full ${
                isActive(l.href) ? "text-gold after:w-full" : "text-neutral-300 after:w-0"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/news"
            className={`group inline-flex items-center gap-2 rounded-full px-5 py-2 font-semibold transition duration-300 hover:shadow-[0_0_25px_rgba(201,162,75,0.55)] ${
              newsActive ? "bg-gold-soft text-black" : "bg-gold text-black hover:bg-gold-soft"
            }`}
          >
            News
            <span className="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button type="button" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen((o) => !o)} className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-white/15 transition hover:border-gold md:hidden">
          <span className={`h-px w-5 bg-white transition duration-300 ${open ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`h-px w-5 bg-white transition duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-5 bg-white transition duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* Mobile menu panel */}
      <div className={`grid transition-[grid-template-rows] duration-300 md:hidden ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
        <nav className="overflow-hidden">
          <div className="flex flex-col max-w-6xl px-5 pt-2 pb-6 mx-auto">
            {[...links, { href: "/news", label: "News" }].map((l, i) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${i * 60}ms` : "0ms" }}
                className={`border-b border-white/10 py-4 text-lg transition duration-300 hover:pl-2 hover:text-gold ${
                  open ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                } ${(l.label === "News" ? newsActive : isActive(l.href)) ? "text-gold" : "text-neutral-200"}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>

      {/* Gold line at the bottom edge */}
      <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent transition-opacity duration-500 ${scrolled ? "opacity-80" : "opacity-0"}`} />
    </header>
  );
}