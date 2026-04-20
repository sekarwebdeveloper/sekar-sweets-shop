// Run with: node scripts/generate-sitemap.mjs
// Generates public/sitemap.xml from product data.
// Re-run whenever products change, then redeploy.

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE = "https://sekar-sweets-shop.lovable.app";

// Static routes
const staticRoutes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/shop", priority: "0.9", changefreq: "daily" },
  { path: "/about", priority: "0.6", changefreq: "monthly" },
  { path: "/contact", priority: "0.6", changefreq: "monthly" },
];

// Inline minimal product list (mirrors src/data/products.ts ids).
// If you add/remove products there, update the same list here OR
// rewrite this script to import via tsx/esbuild.
async function loadProductIds() {
  // Basic approach: load and regex-parse src/data/products.ts to find IDs
  const fs = await import("node:fs/promises");
  const file = await fs.readFile(resolve(__dirname, "../src/data/products.ts"), "utf8");
  const ids = [];
  const categoryBlocks = [...file.matchAll(/"([A-Za-z &]+)":\s*\[([\s\S]*?)\],?\s*\}/g)];
  // Fallback: simple per-name + per-category extraction
  const itemBlock = file.match(/const items[^=]*=\s*\{([\s\S]+?)\};/);
  if (!itemBlock) return [];
  const block = itemBlock[1];
  const catRegex = /"([^"]+)":\s*\[([\s\S]*?)\],/g;
  let m;
  while ((m = catRegex.exec(block))) {
    const cat = m[1];
    const inner = m[2];
    const names = [...inner.matchAll(/name:\s*"([^"]+)"/g)];
    names.forEach((_n, i) => {
      const slug = `${cat.toLowerCase().replace(/\s+/g, "-")}-${i + 1}`;
      ids.push(slug);
    });
  }
  return ids;
}

const today = new Date().toISOString().split("T")[0];
const productIds = await loadProductIds();

const urls = [
  ...staticRoutes.map(
    (r) => `  <url>
    <loc>${SITE}${r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`
  ),
  ...productIds.map(
    (id) => `  <url>
    <loc>${SITE}/product/${id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  ),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

writeFileSync(resolve(__dirname, "../public/sitemap.xml"), xml);
console.log(`✓ Generated sitemap with ${staticRoutes.length + productIds.length} URLs`);
