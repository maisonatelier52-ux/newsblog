import fs from "node:fs";
import path from "node:path";

// Looks for public/images/<base>.(jpg|jpeg|png|webp|avif) and returns its URL path, or null.
export function findImage(base = "julio") {
  for (const ext of ["jpg", "jpeg", "png", "webp", "avif"]) {
    const rel = `/images/${base}.${ext}`;
    if (fs.existsSync(path.join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}
