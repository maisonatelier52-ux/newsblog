import Link from "next/link";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";

export const metadata = {
  title: "Ventures",
  description: "Companies and institutions founded, acquired and led by Julio Herrera Velutini, including Britannia Financial Group, Britannia Wealth Management and the Bancredito Group.",
};

const card = "transition duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_18px_50px_-18px_rgba(201,162,75,0.45)]";

// Ventures: edit the text here. Newest first.
const ventures = [
  {
    name: "Britannia Financial Group", tag: "London", year: "2016", type: "Financial services group", location: "London, United Kingdom",
    text: "Founded in 2016, Britannia Financial Group brings together banking, securities, consulting and investment management. It is a shareholder in a number of financial institutions around the world.",
    points: ["Banking and private banking", "Securities and capital markets", "Consulting and investment management", "Shareholdings in financial institutions worldwide"],
  },
  {
    name: "Consultiva Wealth Management", tag: "Puerto Rico / New York", year: "2016", type: "Investment advisory (acquired)", location: "Puerto Rico and New York",
    text: "An investment advisory firm registered with the U.S. Securities and Exchange Commission (SEC). It was acquired by the Bancredito Group in 2016, adding regulated investment advice to the group.",
    points: ["SEC-registered investment adviser", "Offices in Puerto Rico and New York", "Acquired by the Bancredito Group in 2016"],
  },
  {
    name: "Britannia Wealth Management", tag: "Geneva", year: "2012", type: "Asset management", location: "Geneva, Switzerland",
    text: "Founded in 2012 as the start of his European financial group. The Geneva-based firm manages assets for international private clients and is a member of the Association Suisse des Gerants de Fortune (ASG).",
    points: ["Member of the ASG, the Swiss association of independent asset managers", "Serves international private clients", "The foundation of the wider Britannia group"],
  },
  {
    name: "Bancredito Group", tag: "Puerto Rico", year: "2008", type: "Bank, trust and financial services", location: "Puerto Rico",
    text: "Centred on Bancredito International Bank & Trust, the group also includes Bancredito Financial Services and the Bancredito Foundation, and has a presence in Puerto Rico and the United States.",
    points: ["Bancredito International Bank & Trust", "Bancredito Financial Services", "Bancredito Foundation"],
  },
  {
    name: "Banco Real and Banreal International Bank", tag: "Latin America", year: "2006", type: "Banking (acquired control)", location: "Latin America",
    text: "In 2006, together with his partners, he acquired control of Banco Real and Banreal International Bank, an early step into owning and leading banks.",
    points: ["Control acquired with partners", "Early step into bank ownership"],
  },
];

const [featured, ...others] = ventures;

const meta = (v) => [["Founded", v.year], ["Based in", v.location], ["Type", v.type]];

export default function VenturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="glow pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,75,0.2),transparent_55%)]" />
        <div className="relative section">
          <p className="eyebrow hero-in">Ventures</p>
          <h1 className="max-w-3xl mt-5 text-4xl leading-tight text-white serif hero-in sm:text-6xl" style={{ animationDelay: "150ms" }}>
            Institutions built across <span className="text-gold">three continents</span>
          </h1>
          <p className="max-w-2xl mt-6 text-lg hero-in text-neutral-300" style={{ animationDelay: "300ms" }}>
            Banks, wealth managers and advisory firms founded, acquired and led by Julio Herrera Velutini, from Puerto Rico and Latin America to Geneva and London.
          </p>
          <dl className="grid max-w-2xl grid-cols-3 gap-6 mt-12 hero-in" style={{ animationDelay: "450ms" }}>
            {[["5", "Institutions"], ["4", "Financial centres"], ["10", "Years of building"]].map(([v, l]) => (
              <div key={l} className="pl-4 border-l border-gold/60">
                <dt className="text-4xl serif text-gold"><CountUp value={v} /></dt>
                <dd className="mt-1 text-xs tracking-wider uppercase text-neutral-400">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Featured venture */}
      <section className="section">
        <Reveal from="zoom">
          <div className="group relative overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-br from-neutral-900 via-neutral-950 to-black p-8 transition duration-500 hover:shadow-[0_25px_70px_-25px_rgba(201,162,75,0.5)] sm:p-12">
            <div className="absolute transition duration-700 rounded-full pointer-events-none -right-20 -top-20 h-72 w-72 bg-gold/10 blur-3xl group-hover:bg-gold/20" />
            <div className="relative grid gap-10 lg:grid-cols-5">
              <div className="lg:col-span-3">
                <span className="px-3 py-1 text-xs font-semibold tracking-wider text-black uppercase rounded-full bg-gold">Flagship</span>
                <h2 className="mt-5 text-3xl text-white serif sm:text-5xl">{featured.name}</h2>
                <p className="mt-5 text-lg text-neutral-300">{featured.text}</p>
                <ul className="grid gap-3 mt-6 sm:grid-cols-2">
                  {featured.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-neutral-300"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />{p}</li>
                  ))}
                </ul>
              </div>
              <dl className="space-y-4 text-sm border-gold/30 lg:col-span-2 lg:border-l lg:pl-10">
                {meta(featured).map(([k, v]) => (
                  <div key={k}><dt className="text-neutral-500">{k}</dt><dd className="serif mt-0.5 text-xl text-white">{v}</dd></div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </section>

      {/* All other ventures */}
      <section className="border-y border-white/10 bg-neutral-950">
        <div className="section">
          <Reveal>
            <p className="eyebrow">Portfolio</p>
            <h2 className="mt-3 text-3xl text-white serif sm:text-4xl">Companies and institutions</h2>
          </Reveal>
          <div className="mt-12 space-y-6">
            {others.map((v, i) => (
              <Reveal key={v.name} from={i % 2 ? "right" : "left"}>
                <div className={`group grid gap-6 rounded-2xl border border-white/10 bg-black p-7 sm:p-8 lg:grid-cols-12 ${card}`}>
                  <div className="lg:col-span-2">
                    <p className="text-5xl transition duration-300 serif text-gold/40 group-hover:text-gold">{v.year}</p>
                  </div>
                  <div className="lg:col-span-6">
                    <span className="px-3 py-1 text-xs tracking-wider uppercase transition border rounded-full border-gold/50 text-gold group-hover:bg-gold group-hover:text-black">{v.tag}</span>
                    <h3 className="mt-4 text-2xl text-white serif">{v.name}</h3>
                    <p className="mt-3 text-neutral-400">{v.text}</p>
                  </div>
                  <ul className="space-y-2 text-sm text-neutral-300 lg:col-span-4">
                    {v.points.map((p) => (
                      <li key={p} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />{p}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Two platforms */}
      <section className="section">
        <Reveal>
          <p className="eyebrow">Structure</p>
          <h2 className="mt-3 text-3xl text-white serif sm:text-4xl">Two platforms, one outlook</h2>
          <p className="max-w-2xl mt-4 text-neutral-400">His ventures sit in two main groups, one rooted in the Americas and one in Europe.</p>
        </Reveal>
        <div className="grid gap-6 mt-12 md:grid-cols-2">
          {[
            { title: "Americas", sub: "Bancredito Group", items: ["Bancredito International Bank & Trust", "Bancredito Financial Services", "Consultiva Wealth Management", "Banco Real and Banreal (acquired 2006)"] },
            { title: "Europe", sub: "Britannia", items: ["Britannia Wealth Management, Geneva", "Britannia Financial Group, London"] },
          ].map((g, i) => (
            <Reveal key={g.title} from={i ? "right" : "left"}>
              <div className={`h-full rounded-2xl border border-white/10 bg-neutral-950 p-8 ${card}`}>
                <p className="eyebrow">{g.sub}</p>
                <h3 className="mt-3 text-3xl text-white serif">{g.title}</h3>
                <ul className="mt-5 space-y-3 text-neutral-300">
                  {g.items.map((it) => (
                    <li key={it} className="flex gap-3"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />{it}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="flex flex-wrap justify-center gap-4 mt-14">
          <Link href="/career" className="px-8 py-3 text-sm font-semibold transition border rounded-full border-gold text-gold hover:bg-gold hover:text-black">See the career timeline</Link>
          <Link href="/news" className="px-8 py-3 text-sm font-semibold text-black transition rounded-full bg-gold hover:bg-gold-soft">Latest news</Link>
        </Reveal>
      </section>
    </>
  );
}