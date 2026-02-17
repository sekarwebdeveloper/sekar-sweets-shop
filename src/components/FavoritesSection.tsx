import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Cookie, Candy, CakeSlice, Popcorn, Citrus } from "lucide-react";

const favorites = [
  { name: "Dry Fruits", icon: Popcorn, category: "Dry Fruit Sweets" },
  { name: "Sweets", icon: Candy, category: "Traditional Sweets" },
  { name: "Baklava", icon: CakeSlice, category: "Baklava" },
  { name: "Savouries", icon: Cookie, category: "Savouries" },
  { name: "Pickles", icon: Citrus, category: "Pickles and Rice Mix" },
];

export default function FavoritesSection() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">People's Favorites</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Discover our most loved categories, handpicked by our customers</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {favorites.map((fav, i) => (
            <motion.div
              key={fav.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/shop?category=${encodeURIComponent(fav.category)}`}
                className="block group bg-card rounded-xl p-6 border border-border card-hover text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <fav.icon size={28} className="text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">{fav.name}</h3>
                <span className="text-xs text-primary font-medium uppercase tracking-wider">Shop Now →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
