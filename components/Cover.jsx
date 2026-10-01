import Image from "next/image";

// Article/hero image with a styled placeholder when no image file exists.
export default function Cover({ src, alt = "", label = "", sizes = "100vw", priority = false, className = "" }) {
  return (
    <div className={`relative overflow-hidden bg-neutral-900 ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority}
          className="object-cover transition duration-700 group-hover:scale-105" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(201,162,75,0.28),transparent_60%),linear-gradient(135deg,#1a1a1a,#000)]">
          <span className="serif text-7xl text-gold/40 transition duration-700 group-hover:scale-110">{label.slice(0, 1)}</span>
        </div>
      )}
    </div>
  );
}
