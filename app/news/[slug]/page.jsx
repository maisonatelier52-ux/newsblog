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
      return <h2 className="pl-4 mt-12 text-2xl text-white border-l-2 serif border-gold sm:text-3xl">{b.text}</h2>;
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
        <aside className="p-6 my-8 border rounded-2xl border-gold/40 bg-gradient-to-br from-gold/10 to-transparent">
          {b.title && <p className="eyebrow">{b.title}</p>}
          <p className="mt-2 text-neutral-100">{b.text}</p>
        </aside>
      );
    case "quote":
      return (
        <blockquote className="pl-6 my-10 text-2xl italic leading-snug text-white border-l-4 serif border-gold">
          &ldquo;{b.text}&rdquo;
          {b.cite && <footer className="mt-3 text-sm not-italic text-neutral-400">{b.cite}</footer>}
        </blockquote>
      );
    case "image":
      return (
        <figure className="my-10">
          <Cover src={b.src} alt={b.caption ?? ""} className="aspect-[16/9] rounded-2xl border border-white/10" sizes="(min-width:768px) 48rem, 100vw" />
          {b.caption && <figcaption className="mt-2 text-sm text-center text-neutral-500">{b.caption}</figcaption>}
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
        <div className="relative max-w-4xl px-5 pt-12 mx-auto pb-14 sm:pt-16">
          <Link href="/news" className="text-sm hero-in text-gold hover:underline">&larr; All news</Link>
          <div className="flex flex-wrap items-center gap-3 mt-6 text-xs hero-in" style={{ animationDelay: "100ms" }}>
            <span className="px-3 py-1 font-semibold tracking-wider text-black uppercase rounded-full bg-gold">{a.category}</span>
            <time dateTime={a.date} className="text-neutral-400">{formatDate(a.date, true)}</time>
            <span className="text-neutral-600">&bull;</span>
            <span className="text-neutral-400">{a.readTime} min read</span>
          </div>
          <h1 className="mt-5 text-4xl leading-tight text-white serif hero-in sm:text-6xl" style={{ animationDelay: "200ms" }}>{a.title}</h1>
          <p className="max-w-3xl mt-6 text-xl hero-in text-neutral-300" style={{ animationDelay: "300ms" }}>{a.summary}</p>
          <div className="flex items-center gap-3 mt-8 hero-in" style={{ animationDelay: "400ms" }}>
            <span className="flex items-center justify-center font-serif border rounded-full h-11 w-11 border-gold/60 bg-neutral-900 text-gold">{a.author.slice(0, 1)}</span>
            <div className="text-sm"><p className="text-white">{a.author}</p><p className="text-neutral-500">Author</p></div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl px-5 pt-10 mx-auto -mt-2">
        <Reveal from="zoom">
          <Cover src={a.image} alt={a.title} label={a.category} priority sizes="(min-width:1024px) 64rem, 100vw"
            className="group aspect-[16/8] rounded-2xl border border-white/10" />
        </Reveal>
      </div>

      <article className="max-w-3xl px-5 mx-auto py-14">
        <div className="space-y-5 text-lg leading-relaxed text-neutral-300">
          {a.content.map((b, i) => <Block key={i} b={b} first={i === firstPara} />)}
        </div>

        {a.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-6 mt-12 border-t border-white/10">
            {a.tags.map((t) => <span key={t} className="px-3 py-1 text-xs rounded-full bg-neutral-900 text-neutral-300">#{t}</span>)}
          </div>
        )}
        <div className="mt-6"><ShareButtons title={a.title} /></div>

        <div className="flex items-center gap-4 p-6 mt-10 border rounded-2xl border-white/10 bg-neutral-950">
          <span className="flex items-center justify-center font-serif text-2xl bg-black border rounded-full h-14 w-14 shrink-0 border-gold/60 text-gold">{a.author.slice(0, 1)}</span>
          <div><p className="text-white">Written by {a.author}</p><p className="text-sm text-neutral-400">Stories and profiles compiled from public information.</p></div>
        </div>
      </article>

      {(prev || next) && (
        <nav className="grid max-w-5xl gap-4 px-5 pb-16 mx-auto sm:grid-cols-2">
          {prev ? (
            <Link href={`/news/${prev.slug}`} className="p-6 transition border group rounded-2xl border-white/10 hover:border-gold/60">
              <p className="text-xs tracking-wider uppercase text-neutral-500">&larr; Previous</p>
              <p className="mt-2 text-lg text-white transition serif group-hover:text-gold-soft">{prev.title}</p>
            </Link>
          ) : <span />}
          {next ? (
            <Link href={`/news/${next.slug}`} className="p-6 text-right transition border group rounded-2xl border-white/10 hover:border-gold/60 sm:col-start-2">
              <p className="text-xs tracking-wider uppercase text-neutral-500">Next &rarr;</p>
              <p className="mt-2 text-lg text-white transition serif group-hover:text-gold-soft">{next.title}</p>
            </Link>
          ) : null}
        </nav>
      )}

      {more.length > 0 && (
        <section className="border-t border-white/10 bg-neutral-950">
          <div className="section">
            <Reveal><h2 className="text-3xl text-white serif">More stories</h2></Reveal>
            <div className="grid gap-6 mt-10 md:grid-cols-3">
              {more.map((m, i) => <Reveal key={m.slug} delay={i * 120}><ArticleCard a={m} /></Reveal>)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}