import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: "website" | "article" | "product";
  /** Optional pre-built JSON-LD schema object */
  schema?: object;
}

const SITE_URL = "https://sekar-sweets-shop.lovable.app";
const DEFAULT_OG = `${SITE_URL}/og-image.jpg`;

/**
 * Centralized SEO component — drop into every page.
 * Sets <title>, meta description, keywords, Open Graph, Twitter cards, canonical, and JSON-LD.
 */
export default function SEO({
  title,
  description,
  keywords = [],
  image,
  url,
  type = "website",
  schema,
}: SEOProps) {
  const fullUrl = url ? (url.startsWith("http") ? url : `${SITE_URL}${url}`) : SITE_URL;
  const ogImage = image || DEFAULT_OG;
  const trimmedTitle = title.length > 60 ? title.slice(0, 57) + "..." : title;
  const trimmedDesc = description.length > 160 ? description.slice(0, 157) + "..." : description;

  return (
    <Helmet>
      <title>{trimmedTitle}</title>
      <meta name="description" content={trimmedDesc} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(", ")} />}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={trimmedTitle} />
      <meta property="og:description" content={trimmedDesc} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Sekar Sweets" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={trimmedTitle} />
      <meta name="twitter:description" content={trimmedDesc} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD schema */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
}

export const SITE = {
  url: SITE_URL,
  name: "Sekar Sweets",
  brand: "Sekar Sweets",
  logo: `${SITE_URL}/logo.png`,
};
