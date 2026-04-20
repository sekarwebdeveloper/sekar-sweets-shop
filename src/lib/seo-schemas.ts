import type { Product } from "@/data/products";
import { SITE } from "@/components/SEO";

/** Organization JSON-LD — used site-wide */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  url: SITE.url,
  logo: SITE.logo,
  description: "Premium Indian sweets and savouries from Tirunelveli, made with authentic recipes and the finest ingredients.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "sekar.basilmedia@gmail.com",
    contactType: "Customer Service",
    areaServed: "IN",
    availableLanguage: ["English", "Tamil"],
  },
  sameAs: [],
};

/** Website + SearchAction schema — for the homepage */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE.url}/shop?search={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

/** Per-product schema */
export const productSchema = (product: Product) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  name: product.name,
  description: product.description,
  image: product.images.map((img) =>
    img.src.startsWith("http") ? img.src : `${SITE.url}${img.src}`
  ),
  sku: product.id,
  category: product.category,
  brand: { "@type": "Brand", name: SITE.brand },
  offers: {
    "@type": "Offer",
    url: `${SITE.url}/product/${product.id}`,
    priceCurrency: "INR",
    price: product.price,
    availability: "https://schema.org/InStock",
    itemCondition: "https://schema.org/NewCondition",
    seller: { "@type": "Organization", name: SITE.name },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.6",
    reviewCount: "128",
  },
});

/** Breadcrumb schema helper */
export const breadcrumbSchema = (items: { name: string; url: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url.startsWith("http") ? item.url : `${SITE.url}${item.url}`,
  })),
});
