import Image from "next/image";
import Link from "next/link";
import { profile } from "@/lib/profile";
import { findImage } from "@/lib/image";
import Reveal from "@/components/Reveal";

export const metadata = {
  title: "About",
  description: "About Julio Herrera Velutini: biography, heritage, career milestones and approach to finance.",
};

const card = "transition duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-[0_18px_50px_-18px_rgba(201,162,75,0.45)]";

const facts = [
  ["Full name", "Julio Martin Herrera Velutini"],
  ["Born", profile.born],
  ["Nationality", profile.nationality],
  ["Education", "The American School in England"],
  ["Known for", "Founder of Britannia Financial Group"],
  ["Experience", "30+ years in banking and finance"],
];

// Biography sections: edit the text here.
const story = [
  {
    title: "Heritage",
    text: [
      "Julio Herrera Velutini was born in Caracas into the Herrera-Velutini family, which has a long history in Venezuelan banking and is also known as one of the country's larger landowning families. Published profiles describe him as a seventh-generation banker.",
      "The family name is linked to Banco Caracas, one of Venezuela's historic banks, through his ancestor Julio Cesar Velutini Couturier.",
    ],
  },
  {
    title: "Career",
    text: [
      "He began his career in Venezuelan finance in the 1990s. In 2006, together with partners, he acquired control of Banco Real and Banreal International Bank, and in 2008 he founded Bancredito International Bank & Trust in Puerto Rico.",
      "Over three decades his work has spanned private banking, asset management, investment advisory and securities across Latin America, Europe and the United States.",
    ],
  },
  {
    title: "Britannia Financial Group",
    text: [
      "In 2012 he founded Britannia Wealth Management in Geneva, a member of the Association Suisse des Gerants de Fortune (ASG). In 2016 he founded Britannia Financial Group, which brings together banking, securities, consulting and investment management, with shareholdings in financial institutions around the world.",
    ],
  },
];

export default function AboutPage() {
  const photo = findImage("juliohe") ?? findImage("julio");

  return (
    <>
      {/* Page hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="glow pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(201,162,75,0.2),transparent_55%)]" />
        <div className="relative grid items-center gap-12 section lg:grid-cols-5">
          <div className="lg:col-span-3">
            <p className="eyebrow hero-in">About</p>
            <h1 className="mt-5 text-4xl leading-tight text-white serif hero-in sm:text-6xl" style={{ animationDelay: "150ms" }}>
               <span className="text-gold">{profile.name}</span>
            </h1>
            <p className="max-w-2xl mt-6 text-lg hero-in text-neutral-300" style={{ animationDelay: "300ms" }}>{profile.intro}</p>
          </div>
          <div className="hero-slide lg:col-span-2">
            <div className="relative w-full max-w-xs mx-auto group">
              <div className="absolute w-full h-full transition duration-500 border -bottom-3 -left-3 rounded-2xl border-gold/50 group-hover:-bottom-5 group-hover:-left-5" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-neutral-900">
                {photo ? (
                  <Image src={photo} alt={profile.name} fill priority sizes="20rem" className="object-cover transition duration-700 group-hover:scale-105" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <span className="text-6xl serif text-gold/70">JHV</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Biography + quick facts */}
      <section className="section">
        <div className="grid gap-12 lg:grid-cols-3">
          <div className="space-y-12 lg:col-span-2">
            <Reveal from="left">
              <p className="eyebrow">Biography</p>
              <div className="mt-5 space-y-5 text-xl leading-relaxed text-neutral-200">
                {profile.about.map((p) => <p key={p}>{p}</p>)}
              </div>
            </Reveal>
            {story.map((s) => (
              <Reveal key={s.title} from="left">
                <h2 className="pl-4 text-2xl text-white border-l-2 serif border-gold sm:text-3xl">{s.title}</h2>
                <div className="mt-4 space-y-4 text-lg text-neutral-300">
                  {s.text.map((t) => <p key={t}>{t}</p>)}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal from="right">
            <aside className="border rounded-2xl border-white/10 bg-neutral-950 p-7 lg:sticky lg:top-24">
              <p className="eyebrow">Quick facts</p>
              <dl className="mt-5 space-y-4 text-sm">
                {facts.map(([k, v]) => (
                  <div key={k} className="pb-3 border-b border-white/10 last:border-0">
                    <dt className="text-neutral-500">{k}</dt>
                    <dd className="mt-0.5 text-neutral-100">{v}</dd>
                  </div>
                ))}
              </dl>
            </aside>
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
              <Reveal key={a.n} from="zoom" delay={i * 120}>
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

      {/* Ventures */}
      <section className="section">
        <Reveal>
          <p className="eyebrow">Ventures</p>
          <h2 className="mt-3 text-3xl text-white serif sm:text-4xl">Companies and institutions</h2>
        </Reveal>
        <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
          {profile.ventures.map((v, i) => (
            <Reveal key={v.name} from={i % 2 ? "right" : "left"}>
              <div className="grid gap-2 py-6 transition group hover:bg-neutral-950 sm:grid-cols-3 sm:items-center sm:px-4">
                <h3 className="text-xl text-white transition serif group-hover:text-gold-soft">{v.name}</h3>
                <span className="text-xs tracking-wider uppercase text-gold">{v.tag}</span>
                <p className="text-sm text-neutral-400">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 text-center">
          <Link href="/news" className="inline-block px-8 py-3 text-sm font-semibold transition border rounded-full border-gold text-gold hover:bg-gold hover:text-black">Read the latest news</Link>
        </Reveal>
      </section>
    </>
  );
}