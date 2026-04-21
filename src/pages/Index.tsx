import HeroSlider from "@/components/HeroSlider";
import FavoritesSection from "@/components/FavoritesSection";
import TrendingProducts from "@/components/TrendingProducts";
import TrustSection from "@/components/TrustSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import SEO from "@/components/SEO";
import { organizationSchema, websiteSchema } from "@/lib/seo-schemas";

const Index = () => {
  return (
    <main>
      <SEO
        title="Sekar Sweets - Premium Indian Sweets & Savouries Online"
        description="Buy authentic Tirunelveli sweets, baklava, halwa, milk sweets and savouries online. Made with pure ghee and the finest ingredients. Cash on Delivery across India."
        keywords={[
          "indian sweets online",
          "tirunelveli sweets",
          "nellai sweets",
          "buy sweets online india",
          "sekar sweets",
          "premium indian sweets",
          "traditional sweets",
          "ghee sweets",
          "halwa online",
          "baklava online",
        ]}
        url="/"
        schema={{ "@context": "https://schema.org", "@graph": [organizationSchema, websiteSchema] }}
      />
      <HeroSlider />
      <FavoritesSection />
      <TrendingProducts />
      <TrustSection />
      <TestimonialsSection />
      <AboutSection />
    </main>
  );
};

export default Index;
