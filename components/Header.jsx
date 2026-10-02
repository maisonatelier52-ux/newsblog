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

  // While the menu is open: lock page scrolling and close with the Escape key
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href) =>
    !href.includes("#") && (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const newsActive = pathname.startsWith("/news");
  const mobileLinks = [...links, { href: "/news", label: "News" }];

  return (
    <>
      <header
        className={`sticky top-0 z-50 border-b transition-all duration-300 ${
          scrolled
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
          <button
            type="button"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
            className="group flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border border-white/15 transition hover:border-gold md:hidden"
          >
            <span className="w-5 h-px transition-all duration-300 bg-white group-hover:w-6 group-hover:bg-gold" />
            <span className="w-4 h-px transition-all duration-300 bg-white group-hover:w-6 group-hover:bg-gold" />
            <span className="w-5 h-px transition-all duration-300 bg-white group-hover:w-6 group-hover:bg-gold" />
          </button>
        </div>

        {/* Gold line at the bottom edge */}
        <div className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent transition-opacity duration-500 ${scrolled ? "opacity-80" : "opacity-0"}`} />
      </header>

      {/* Mobile menu: dark overlay + panel that slides in from the right.
          These sit OUTSIDE <header> on purpose, because the header's blur would otherwise trap them inside it. */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm transition-opacity duration-500 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        aria-label="Mobile menu"
        aria-hidden={!open}
        className={`fixed right-0 top-0 z-[70] flex h-full w-[82%] max-w-sm flex-col overflow-y-auto border-l border-gold/30 bg-black shadow-[-20px_0_60px_-20px_rgba(201,162,75,0.35)] transition-[transform,visibility] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] md:hidden ${
          open ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
      >
        <div className="absolute w-64 h-64 rounded-full pointer-events-none -right-24 -top-24 bg-gold/15 blur-3xl" />

        {/* Top row: name + close button */}
        <div className="relative flex items-center justify-between px-6 py-5 border-b border-white/10">
          <span className="text-lg text-white serif">
            Julio Herrera <span className="text-gold">Velutini</span>
          </span>
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex items-center justify-center w-10 h-10 text-white transition border rounded-full group border-white/15 hover:rotate-90 hover:border-gold hover:text-gold"
          >
            <span className="text-xl leading-none">&times;</span>
          </button>
        </div>

        {/* Links slide in one after another */}
        <nav className="relative flex-1 px-6 py-6">
          {mobileLinks.map((l, i) => {
            const active = l.label === "News" ? newsActive : isActive(l.href);
            return (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${150 + i * 70}ms` : "0ms" }}
                className={`group flex items-center gap-4 border-b border-white/10 py-5 transition duration-500 hover:pl-2 ${
                  open ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                }`}
              >
                <span className="text-sm serif text-gold/60">{String(i + 1).padStart(2, "0")}</span>
                <span className={`serif text-2xl transition-colors duration-300 group-hover:text-gold ${active ? "text-gold" : "text-white"}`}>
                  {l.label}
                </span>
                {active && <span className="ml-auto h-2 w-2 rounded-full bg-gold shadow-[0_0_10px_rgba(201,162,75,0.9)]" />}
              </Link>
            );
          })}
        </nav>

        {/* Bottom note */}
        <div
          style={{ transitionDelay: open ? "550ms" : "0ms" }}
          className={`relative border-t border-white/10 px-6 py-6 text-xs uppercase tracking-[0.2em] text-gold-soft transition duration-500 ${open ? "opacity-100" : "opacity-0"}`}
        >
          Banker &nbsp;|&nbsp; Founder, Britannia Financial Group
        </div>
      </aside>
    </>
  );
}