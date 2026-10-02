import fs from "node:fs";
import path from "node:path";

const pub = (p) => path.join(process.cwd(), "public", p);

function readTime(a) {
  const text = [a.summary, ...(a.content ?? []).map((b) => (typeof b === "string" ? b : b.text ?? (b.items ?? []).join(" ")))].join(" ");
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}

// Reads public/data/article.json. Articles are sorted newest first.
// An article image is used only if the file exists in /public; otherwise a styled placeholder is shown.
export function getArticles() {
  const raw = JSON.parse(fs.readFileSync(pub("data/article.json"), "utf8"));
  const list = Array.isArray(raw) ? raw : raw.articles ?? [];
  return list
    .map((a) => ({
      ...a,
      tags: a.tags ?? [],
      author: a.author ?? "Editorial Team",
      content: (a.content ?? []).map((b) => (typeof b === "string" ? { type: "paragraph", text: b } : b)),
      image: a.image && fs.existsSync(pub(a.image)) ? a.image : null,
      readTime: readTime(a),
    }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

export const getArticle = (slug) => getArticles().find((a) => a.slug === slug) ?? null;