import Link from "next/link";
import Cover from "./Cover";
import { formatDate } from "@/lib/format";

export default function ArticleCard({ a, large = false }) {
  return (
    <Link href={`/news/${a.slug}`}
      className={`group overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 transition duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-[0_18px_50px_-18px_rgba(201,162,75,0.45)] ${large ? "grid md:grid-cols-2" : "flex flex-col"}`}>
      <Cover src={a.image} alt={a.title} label={a.category} priority={large}
        sizes={large ? "(min-width:768px) 50vw, 100vw" : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"}
        className={large ? "min-h-64 md:min-h-[22rem]" : "aspect-[16/10]"} />
      <div className={`flex flex-1 flex-col ${large ? "justify-center p-8 md:p-10" : "p-5"}`}>
        <div className="flex items-center gap-3 text-xs">
          <span className="px-3 py-1 font-semibold tracking-wider uppercase border rounded-full border-gold/50 text-gold">{a.category}</span>
          <span className="text-neutral-500">{formatDate(a.date)} &middot; {a.readTime} min read</span>
        </div>
        <h3 className={`serif mt-4 leading-snug text-white transition group-hover:text-gold-soft ${large ? "text-3xl md:text-4xl" : "text-xl"}`}>{a.title}</h3>
        <p className={`mt-3 text-neutral-400 ${large ? "text-base" : "line-clamp-3 text-sm"}`}>{a.summary}</p>
        <span className="inline-flex items-center gap-2 mt-5 text-sm text-gold">
          Read article <span className="transition-transform duration-300 group-hover:translate-x-2">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}