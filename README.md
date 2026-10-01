# Julio Herrera Velutini: Profile and News

Next.js 14 (App Router, JavaScript/JSX) + Tailwind CSS. Black and gold theme. No backend, database or API key.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Images (all in `public/images/`)
- Client photo: `public/images/julio.jpg` (also .jpeg / .png / .webp). Shown in the homepage hero. A "JHV" placeholder shows until you add it.
- Article images: any file name, then reference it in the JSON, e.g. `"image": "/images/britannia.jpg"`. If the file is missing, a styled placeholder is shown.

## News articles: `public/data/article.json`
All news content comes from this file. Each article becomes a card on `/news` and a full page at `/news/<slug>`.

```json
{
  "slug": "my-article",
  "title": "Headline",
  "category": "Press Release",
  "date": "2026-10-01",
  "author": "Editorial Team",
  "image": "/images/my-article.jpg",
  "summary": "One or two sentences shown on the list and at the top of the article.",
  "tags": ["Tag one", "Tag two"],
  "content": [
    { "type": "paragraph", "text": "..." },
    { "type": "heading", "text": "..." },
    { "type": "list", "items": ["...", "..."] },
    { "type": "callout", "title": "At a glance", "text": "..." },
    { "type": "quote", "text": "...", "cite": "Name, Title" },
    { "type": "image", "src": "/images/inline.jpg", "caption": "..." }
  ]
}
```
The five articles included are sample pieces based on public information. Replace them with the client's real articles.

## Other files
- `lib/profile.js`: client details on the homepage (bio, milestones, ventures).
- `app/page.jsx`: homepage. `app/news/page.jsx`: news list with category filter. `app/news/[slug]/page.jsx`: article page.
- `app/globals.css`: animations (scroll reveal, hero entrance, sliding ribbon). They switch off automatically for visitors who prefer reduced motion.

## Notes
- Verify all biographical facts with the client before going live, and label paid or client content clearly (for example "Sponsored" in `category`).
- Deploy free on Vercel.
