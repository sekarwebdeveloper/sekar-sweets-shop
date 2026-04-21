import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

// Pick a curated set of trending products across categories
const TRENDING_IDS = [
  "traditional-sweets-kaju-katli",
  "baklava-pistachio-baklava",
  "dry-fruit-sweets-dry-fruit-laddu",
  "ghee-sweets-ghee-mysore-pak",
  "halwa-carrot-halwa",
  "milk-sweets-rasmalai",
  "savouries-mixture",
  "traditional-sweets-motichoor-laddu",
];

export default function TrendingProducts() {
  // Fallback: if ids don't match (slugs differ), just take first 8 products
  const byId = products.filter((p) => TRENDING_IDS.includes(p.id));
  const trending = byId.length >= 4 ? byId.slice(0, 8) : products.slice(0, 8);

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <TrendingUp size={14} className="text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Hot Right Now
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Trending Products
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Our most loved sweets and savouries this season — handpicked by our
            customers.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {trending.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/shop"
            className="inline-block px-6 py-3 border border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
