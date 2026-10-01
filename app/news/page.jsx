import { getArticles } from "@/lib/articles";
import NewsBrowser from "@/components/NewsBrowser";

export const metadata = { title: "News", description: "News, profiles and insights." };

export default function NewsPage() {
  const articles = getArticles();
  return (
    <section className="section">
      <p className="eyebrow">News</p>
      <h1 className="serif mt-3 text-4xl text-white sm:text-5xl">Latest News</h1>
      <p className="mt-4 max-w-2xl text-neutral-400">Stories, profiles and insights. Select any article to read it in full.</p>
      {articles.length ? <NewsBrowser articles={articles} /> : <p className="mt-10 text-neutral-400">No articles yet.</p>}
    </section>
  );
}
