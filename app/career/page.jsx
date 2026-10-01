import Link from "next/link";
import { profile } from "@/lib/profile";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";

export const metadata = {
  title: "Career",
  description: "The career of Julio Herrera Velutini: from Venezuelan finance in the 1990s to Britannia Financial Group in Geneva and London.",
};

const card = "transition duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_18px_50px_-18px_rgba(201,162,75,0.45)]";

// Career phases: edit the text here.
const phases = [
  {
    n: "01", years: "1990s", title: "Early career in Venezuela",
    text: "Born into a family with a long history in Venezuelan banking, he began his own career in Venezuelan finance and capital markets, learning the business first-hand in Caracas.",
    points: ["Started in Venezuelan finance and capital markets", "Built on a family banking tradition"],
  },
  {
    n: "02", years: "2006 - 2008", title: "Building banks",
    text: "He moved from working in finance to owning and leading financial institutions, acquiring control of established banks and founding a new one in Puerto Rico.",
    points: ["2006: acquires control of Banco Real and Banreal International Bank, with partners", "2008: founds Bancredito International Bank & Trust in Puerto Rico", "Creates the Bancredito Foundation and Bancredito Financial Services"],
  },
  {
    n: "03", years: "2012", title: "Expanding into Europe",
    text: "He launched a European financial group, founding Britannia Wealth Management in Geneva, Switzerland, to serve international private clients.",
    points: ["Britannia Wealth Management founded in Geneva", "Member of the Association Suisse des Gerants de Fortune (ASG)"],
  },
  {
    n: "04", years: "2016", title: "Britannia Financial Group",
    text: "In 2016 he founded Britannia Financial Group, combining banking, securities, consulting and investment management, while the Bancredito Group widened its reach in the United States.",
    points: ["Britannia Financial Group founded, with shareholdings in financial institutions worldwide", "Bancredito Group acquires Consultiva Wealth Management, an SEC-registered adviser in Puerto Rico and New York"],
  },
];

const roles = [
  { role: "Founding Chairman", org: "Britannia Financial Group" },
  { role: "Founding Chairman", org: "Britannia Wealth Management" },
  { role: "Founding Chairman", org: "Bancredito International Bank & Trust Corporation" },
  { role: "Owner and shareholder", org: "Intermedia Limited" },
];

const expertise = ["Private Banking", "Wealth Management", "Asset Management", "Investment Advisory", "Securities", "Cross-border Finance", "Bank Ownership", "Financial Consulting"];

export default function CareerPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="glow pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,162,75,0.2),transparent_55%)]" />
        <div className="relative section">
          <p className="eyebrow hero-in">Career</p>
          <h1 className="max-w-3xl mt-5 text-4xl leading-tight text-white serif hero-in sm:text-6xl" style={{ animationDelay: "150ms" }}>
            Three decades in <span className="text-gold">banking and finance</span>
          </h1>
          <p className="max-w-2xl mt-6 text-lg hero-in text-neutral-300" style={{ animationDelay: "300ms" }}>
            From Venezuelan finance in the 1990s to wealth management in Geneva and London, a career built across Latin America, Europe and the United States.
          </p>
          <dl className="grid max-w-2xl grid-cols-3 gap-6 mt-12 hero-in" style={{ animationDelay: "450ms" }}>
            {[["30+", "Years in finance"], ["4", "Banking and advisory groups"], ["3", "Regions of operation"]].map(([v, l]) => (
              <div key={l} className="pl-4 border-l border-gold/60">
                <dt className="text-4xl serif text-gold"><CountUp value={v} /></dt>
                <dd className="mt-1 text-xs tracking-wider uppercase text-neutral-400">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Phases */}
      <section className="section">
        <Reveal>
          <p className="eyebrow">Career phases</p>
          <h2 className="mt-3 text-3xl text-white serif sm:text-4xl">How the career unfolded</h2>
        </Reveal>
        <div className="grid gap-6 mt-12 md:grid-cols-2">
          {phases.map((p, i) => (
            <Reveal key={p.n} from={i % 2 ? "right" : "left"}>
              <div className={`group h-full rounded-2xl border border-white/10 bg-neutral-950 p-8 ${card}`}>
                <div className="flex items-baseline justify-between">
                  <span className="text-5xl transition duration-300 serif text-gold/40 group-hover:text-gold">{p.n}</span>
                  <span className="px-3 py-1 text-xs tracking-wider uppercase transition border rounded-full border-gold/50 text-gold group-hover:bg-gold group-hover:text-black">{p.years}</span>
                </div>
                <h3 className="mt-4 text-2xl text-white serif">{p.title}</h3>
                <p className="mt-3 text-neutral-300">{p.text}</p>
                <ul className="mt-5 space-y-2 text-sm text-neutral-400">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-3"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />{pt}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section className="border-y border-white/10 bg-neutral-950">
        <div className="section">
          <Reveal>
            <p className="eyebrow">Timeline</p>
            <h2 className="mt-3 text-3xl text-white serif sm:text-4xl">Key milestones</h2>
          </Reveal>
          <ol className="relative space-y-10 mt-14 before:absolute before:left-3 before:top-2 before:h-full before:w-px before:bg-white/15 md:before:left-1/2">
            {profile.timeline.map((t, i) => (
              <li key={t.year} className="relative pl-12 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
                <span className="absolute left-[7px] top-2 h-3 w-3 rounded-full bg-gold ring-4 ring-neutral-950 md:left-1/2 md:-ml-1.5" />
                <Reveal from={i % 2 ? "right" : "left"} className={i % 2 ? "md:col-start-2" : "md:text-right"}>
                  <div className={`rounded-2xl border border-white/10 bg-black p-6 ${card}`}>
                    <p className="text-3xl serif text-gold">{t.year}</p>
                    <p className="mt-2 text-neutral-300">{t.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Roles */}
      <section className="section">
        <div className="grid gap-12 lg:grid-cols-3">
          <Reveal from="left">
            <p className="eyebrow">Positions</p>
            <h2 className="mt-3 text-3xl text-white serif sm:text-4xl">Leadership roles</h2>
            <p className="mt-4 text-neutral-400">Positions held across the groups he founded and owns.</p>
          </Reveal>
          <div className="space-y-4 lg:col-span-2">
            {roles.map((r, i) => (
              <Reveal key={r.org} from="right" delay={i * 100}>
                <div className={`group flex flex-col gap-1 rounded-2xl border border-white/10 bg-neutral-950 p-6 sm:flex-row sm:items-center sm:justify-between ${card}`}>
                  <h3 className="text-xl text-white transition serif group-hover:text-gold-soft">{r.org}</h3>
                  <span className="text-sm tracking-wider uppercase text-gold">{r.role}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="border-y border-white/10 bg-neutral-950">
        <div className="section">
          <Reveal>
            <p className="eyebrow">Expertise</p>
            <h2 className="mt-3 text-3xl text-white serif sm:text-4xl">Areas of work</h2>
          </Reveal>
          <div className="flex flex-wrap gap-3 mt-10">
            {expertise.map((e, i) => (
              <Reveal key={e} from="zoom" delay={i * 70}>
                <span className="inline-block cursor-default rounded-full border border-white/15 px-5 py-2.5 text-neutral-200 transition duration-300 hover:-translate-y-1 hover:border-gold hover:bg-gold hover:text-black">{e}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Companies */}
      <section className="section">
        <Reveal>
          <p className="eyebrow">Companies</p>
          <h2 className="mt-3 text-3xl text-white serif sm:text-4xl">Institutions he built and led</h2>
        </Reveal>
        <div className="grid gap-5 mt-12 sm:grid-cols-2">
          {profile.ventures.map((v, i) => (
            <Reveal key={v.name} from={i % 2 ? "right" : "left"}>
              <div className={`group h-full rounded-2xl border border-white/10 bg-neutral-950 p-7 ${card}`}>
                <span className="px-3 py-1 text-xs tracking-wider uppercase transition border rounded-full border-gold/50 text-gold group-hover:bg-gold group-hover:text-black">{v.tag}</span>
                <h3 className="mt-4 text-2xl text-white serif">{v.name}</h3>
                <p className="mt-2 text-sm text-neutral-400">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="flex flex-wrap justify-center gap-4 mt-14">
          <Link href="/about" className="px-8 py-3 text-sm font-semibold transition border rounded-full border-gold text-gold hover:bg-gold hover:text-black">Read his biography</Link>
          <Link href="/news" className="px-8 py-3 text-sm font-semibold text-black transition rounded-full bg-gold hover:bg-gold-soft">Latest news</Link>
        </Reveal>
      </section>
    </>
  );
}