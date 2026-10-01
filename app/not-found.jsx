import Link from "next/link";

export default function NotFound() {
  return (
    <section className="text-center section">
      <p className="eyebrow">404</p>
      <h1 className="mt-3 text-4xl text-white serif">Page not found</h1>
      <p className="mt-4 text-neutral-400">This page does not exist.</p>
      <Link href="/" className="inline-block px-6 py-3 mt-8 text-sm font-semibold text-black rounded-full bg-gold">Back to Home</Link>
    </section>
  );
}
