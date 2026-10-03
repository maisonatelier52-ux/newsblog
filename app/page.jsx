import Image from "next/image";
import { profile } from "@/lib/profile";
import { findImage } from "@/lib/image";
import Reveal from "@/components/Reveal";
import CountUp from "@/components/CountUp";

const ribbon = ["Private Banking", "Wealth Management", "Asset Management", "Investment Advisory", "Securities", "Cross-border Finance"];
const card = "transition duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_18px_50px_-18px_rgba(201,162,75,0.45)]";

export default function Home() {
  const photo = findImage("juliohe");
  const jsonLd = {
    "@context": "https://schema.org", "@type": "Person", name: profile.name,
    jobTitle: "Banker and Founder", birthDate: "1971-12-15", worksFor: { "@type": "Organization", name: "Britannia Financial Group" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="glow pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,75,0.22),transparent_55%)]" />
        <div className="relative grid items-center section gap-10 lg:gap-14 lg:grid-cols-2">
          <div>
            <p className="eyebrow hero-in">{profile.name}</p>
            <h1 className="mt-5 text-[2rem] leading-tight text-white serif hero-in min-[380px]:text-4xl sm:text-6xl" style={{ animationDelay: "150ms" }}>{profile.headline}</h1>
            <p className="max-w-xl mt-6 text-lg hero-in text-neutral-300" style={{ animationDelay: "300ms" }}>{profile.intro}</p>
            <p className="hero-in mt-8 text-sm uppercase tracking-[0.2em] text-gold-soft" style={{ animationDelay: "450ms" }}>{profile.title}</p>
          </div>
          <div className="hero-slide">
            <div className="relative w-full max-w-sm mx-auto float group lg:max-w-md">
              <div className="absolute w-full h-full transition duration-500 border -bottom-4 -right-4 rounded-2xl border-gold/50 group-hover:-bottom-6 group-hover:-right-6" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
                {photo ? (
                  <Image src={photo} alt={profile.name} fill priority sizes="(min-width:1024px) 28rem, 90vw"
                    className="object-cover transition duration-700 group-hover:scale-105" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(201,162,75,0.25),transparent_60%)]">
                    <span className="serif text-7xl text-gold/70">JHV</span>
                  </div>
                )}
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sliding ribbon */}
      <div className="py-3 overflow-hidden text-black border-b marquee border-white/10 bg-gold">
        <div className="marquee-track">
          {[...ribbon, ...ribbon, ...ribbon, ...ribbon].map((t, i) => (
            <span key={i} className="mx-6 text-lg serif whitespace-nowrap">{t} <span className="mx-6 opacity-50">&#9670;</span></span>
          ))}
        </div>
      </div>

      {/* Stats */}
      <section className="border-b border-white/10 bg-neutral-950">
        <dl className="grid max-w-6xl grid-cols-2 gap-8 px-5 py-12 mx-auto sm:grid-cols-4">
          {profile.stats.map((s, i) => (
            <Reveal key={s.label} from="zoom" delay={i * 120} className="text-center">
              <dt className="text-4xl serif text-gold"><CountUp value={s.value} /></dt>
              <dd className="mt-1 text-xs tracking-wider uppercase text-neutral-400">{s.label}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* About */}
      <section id="about" className="section scroll-mt-16">
        <div className="grid gap-12 lg:grid-cols-5">
          <Reveal from="left" className="lg:col-span-2">
            <p className="eyebrow">About</p>
            <h2 className="mt-3 text-3xl text-white serif sm:text-4xl">A career built on finance</h2>
            <dl className="pl-5 mt-8 space-y-4 text-sm border-l border-gold/60">
              <div><dt className="text-neutral-500">Born</dt><dd className="text-neutral-200">{profile.born}</dd></div>
              <div><dt className="text-neutral-500">Nationality</dt><dd className="text-neutral-200">{profile.nationality}</dd></div>
              <div><dt className="text-neutral-500">Known for</dt><dd className="text-neutral-200">Founder of Britannia Financial Group</dd></div>
            </dl>
          </Reveal>
          <Reveal from="right" className="space-y-5 text-lg text-neutral-300 lg:col-span-3">
            {profile.about.map((p) => <p key={p}>{p}</p>)}
          </Reveal>
        </div>
      </section>

      {/* Approach */}
      <section className="border-y border-white/10 bg-neutral-950">
        <div className="section">
          <Reveal>
            <p className="eyebrow">Approach</p>
            <h2 className="mt-3 text-3xl text-white serif sm:text-4xl">How he thinks about finance</h2>
          </Reveal>
          <div className="grid gap-5 mt-12 sm:grid-cols-2 lg:grid-cols-4">
            {profile.approach.map((a, i) => (
              <Reveal key={a.n} delay={i * 120}>
                <div className={`group h-full rounded-2xl border border-white/10 bg-black p-7 ${card}`}>
                  <p className="text-4xl transition duration-300 serif text-gold/50 group-hover:text-gold">{a.n}</p>
                  <h3 className="mt-4 text-xl text-white serif">{a.title}</h3>
                  <div className="w-8 h-px mt-3 transition-all duration-500 bg-gold group-hover:w-full" />
                  <p className="mt-3 text-sm text-neutral-400">{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Career timeline */}
      <section id="career" className="section scroll-mt-16">
        <Reveal>
          <p className="eyebrow">Career</p>
          <h2 className="mt-3 text-3xl text-white serif sm:text-4xl">Milestones</h2>
        </Reveal>
        <ol className="relative space-y-10 mt-14 before:absolute before:left-3 before:top-2 before:h-full before:w-px before:bg-white/15 md:before:left-1/2">
          {profile.timeline.map((t, i) => (
            <li key={t.year} className="relative pl-12 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
              <span className="absolute left-[7px] top-2 h-3 w-3 rounded-full bg-gold ring-4 ring-black md:left-1/2 md:-ml-1.5" />
              <Reveal from={i % 2 ? "right" : "left"} className={i % 2 ? "md:col-start-2" : "md:text-right"}>
                <div className={`rounded-2xl border border-white/10 bg-neutral-950 p-6 ${card}`}>
                  <p className="text-3xl serif text-gold">{t.year}</p>
                  <p className="mt-2 text-neutral-300">{t.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      {/* Ventures */}
      <section id="ventures" className="border-t scroll-mt-16 border-white/10 bg-neutral-950">
        <div className="section">
          <Reveal>
            <p className="eyebrow">Ventures</p>
            <h2 className="mt-3 text-3xl text-white serif sm:text-4xl">Companies and institutions</h2>
          </Reveal>
          <div className="grid gap-5 mt-12 sm:grid-cols-2">
            {profile.ventures.map((v, i) => (
              <Reveal key={v.name} from={i % 2 ? "right" : "left"} delay={(i % 2) * 100}>
                <div className={`group h-full rounded-2xl border border-white/10 bg-black p-7 ${card}`}>
                  <span className="px-3 py-1 text-xs tracking-wider uppercase transition border rounded-full border-gold/50 text-gold group-hover:bg-gold group-hover:text-black">{v.tag}</span>
                  <h3 className="mt-4 text-2xl text-white serif">{v.name}</h3>
                  <p className="mt-2 text-sm text-neutral-400">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}