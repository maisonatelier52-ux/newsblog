import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles, getArticle } from "@/lib/articles";
import { formatDate } from "@/lib/format";
import Cover from "@/components/Cover";
import ArticleCard from "@/components/ArticleCard";
import Reveal from "@/components/Reveal";
import { ReadingProgress, ShareButtons } from "@/components/ArticleExtras";

export const dynamicParams = false;
export const generateStaticParams = () => getArticles().map((a) => ({ slug: a.slug }));

export function generateMetadata({ params }) {
  const a = getArticle(params.slug);
  if (!a) return { title: "Article not found" };
  return { title: a.title, description: a.summary, openGraph: { title: a.title, description: a.summary, type: "article", images: a.image ? [a.image] : [] } };
}

function Block({ b, first }) {
  switch (b.type) {
    case "heading":
      return <h2 className="serif mt-12 border-l-2 border-gold pl-4 text-2xl text-white sm:text-3xl">{b.text}</h2>;
    case "list":
      return (
        <ul className="my-6 space-y-3">
          {b.items.map((it, i) => (
            <li key={i} className="flex gap-3"><span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" /><span>{it}</span></li>
          ))}
        </ul>
      );
    case "callout":
      return (
        <aside className="my-8 rounded-2xl border border-gold/40 bg-gradient-to-br from-gold/10 to-transparent p-6">
          {b.title && <p className="eyebrow">{b.title}</p>}
          <p className="mt-2 text-neutral-100">{b.text}</p>
        </aside>
      );
    case "quote":
      return (
        <blockquote className="serif my-10 border-l-4 border-gold pl-6 text-2xl italic leading-snug text-white">
          &ldquo;{b.text}&rdquo;
          {b.cite && <footer className="mt-3 text-sm not-italic text-neutral-400">{b.cite}</footer>}
        </blockquote>
      );
    case "image":
      return (
        <figure className="my-10">
          <Cover src={b.src} alt={b.caption ?? ""} className="aspect-[16/9] rounded-2xl border border-white/10" sizes="(min-width:768px) 48rem, 100vw" />
          {b.caption && <figcaption className="mt-2 text-center text-sm text-neutral-500">{b.caption}</figcaption>}
        </figure>
      );
    default:
      return (
        <p className={first ? "text-xl leading-relaxed text-neutral-200 first-letter:float-left first-letter:pr-3 first-letter:pt-1 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.8] first-letter:text-gold" : ""}>
          {b.text}
        </p>
      );
  }
}

export default function ArticlePage({ params }) {
  const all = getArticles();
  const idx = all.findIndex((x) => x.slug === params.slug);
  if (idx < 0) notFound();
  const a = all[idx];
  const prev = all[idx + 1];
  const next = all[idx - 1];
  const more = all.filter((x) => x.slug !== a.slug).slice(0, 3);
  const firstPara = a.content.findIndex((b) => b.type === "paragraph");

  return (
    <>
      <ReadingProgress />
      <header className="relative overflow-hidden border-b border-white/10">
        <div className="glow pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,162,75,0.16),transparent_60%)]" />
        <div className="relative mx-auto max-w-4xl px-5 pb-14 pt-12 sm:pt-16">
          <Link href="/news" className="hero-in text-sm text-gold hover:underline">&larr; All news</Link>
          <div className="hero-in mt-6 flex flex-wrap items-center gap-3 text-xs" style={{ animationDelay: "100ms" }}>
            <span className="rounded-full bg-gold px-3 py-1 font-semibold uppercase tracking-wider text-black">{a.category}</span>
            <time dateTime={a.date} className="text-neutral-400">{formatDate(a.date, true)}</time>
            <span className="text-neutral-600">&bull;</span>
            <span className="text-neutral-400">{a.readTime} min read</span>
          </div>
          <h1 className="serif hero-in mt-5 text-4xl leading-tight text-white sm:text-6xl" style={{ animationDelay: "200ms" }}>{a.title}</h1>
          <p className="hero-in mt-6 max-w-3xl text-xl text-neutral-300" style={{ animationDelay: "300ms" }}>{a.summary}</p>
          <div className="hero-in mt-8 flex items-center gap-3" style={{ animationDelay: "400ms" }}>
            <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 bg-neutral-900 font-serif text-gold">{a.author.slice(0, 1)}</span>
            <div className="text-sm"><p className="text-white">{a.author}</p><p className="text-neutral-500">Author</p></div>
          </div>
        </div>
      </header>

      <div className="mx-auto -mt-2 max-w-5xl px-5 pt-10">
        <Reveal from="zoom">
          <Cover src={a.image} alt={a.title} label={a.category} priority sizes="(min-width:1024px) 64rem, 100vw"
            className="group aspect-[16/8] rounded-2xl border border-white/10" />
        </Reveal>
      </div>

      <article className="mx-auto max-w-3xl px-5 py-14">
        <div className="space-y-5 text-lg leading-relaxed text-neutral-300">
          {a.content.map((b, i) => <Block key={i} b={b} first={i === firstPara} />)}
        </div>

        {a.tags.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2 border-t border-white/10 pt-6">
            {a.tags.map((t) => <span key={t} className="rounded-full bg-neutral-900 px-3 py-1 text-xs text-neutral-300">#{t}</span>)}
          </div>
        )}
        <div className="mt-6"><ShareButtons title={a.title} /></div>

        <div className="mt-10 flex items-center gap-4 rounded-2xl border border-white/10 bg-neutral-950 p-6">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-black font-serif text-2xl text-gold">{a.author.slice(0, 1)}</span>
          <div><p className="text-white">Written by {a.author}</p><p className="text-sm text-neutral-400">Stories and profiles compiled from public information.</p></div>
        </div>
      </article>

      {(prev || next) && (
        <nav className="mx-auto grid max-w-5xl gap-4 px-5 pb-16 sm:grid-cols-2">
          {prev ? (
            <Link href={`/news/${prev.slug}`} className="group rounded-2xl border border-white/10 p-6 transition hover:border-gold/60">
              <p className="text-xs uppercase tracking-wider text-neutral-500">&larr; Previous</p>
              <p className="serif mt-2 text-lg text-white transition group-hover:text-gold-soft">{prev.title}</p>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/news/${next.slug}`} className="group rounded-2xl border border-white/10 p-6 text-right transition hover:border-gold/60 sm:col-start-2">
              <p className="text-xs uppercase tracking-wider text-neutral-500">Next &rarr;</p>
              <p className="serif mt-2 text-lg text-white transition group-hover:text-gold-soft">{next.title}</p>
            </Link>
          ) : null}
        </nav>
      )}

      {more.length > 0 && (
        <section className="border-t border-white/10 bg-neutral-950">
          <div className="section">
            <Reveal><h2 className="serif text-3xl text-white">More stories</h2></Reveal>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {more.map((m, i) => <Reveal key={m.slug} delay={i * 120}><ArticleCard a={m} /></Reveal>)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
