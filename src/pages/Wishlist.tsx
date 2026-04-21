import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useWishlist } from "@/contexts/WishlistContext";
import { products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import SEO from "@/components/SEO";

export default function Wishlist() {
  const { wishlist } = useWishlist();
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <main className="pt-20 min-h-screen bg-background">
      <SEO
        title="Your Wishlist - Sekar Sweets"
        description="Your saved favourite sweets and savouries at Sekar Sweets."
        url="/wishlist"
      />
      <div className="container mx-auto px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">
            Your Wishlist
          </h1>
          <p className="text-muted-foreground">
            {wishlistedProducts.length > 0
              ? `${wishlistedProducts.length} saved item${wishlistedProducts.length > 1 ? "s" : ""}`
              : "Items you love, saved for later"}
          </p>
        </motion.div>

        {wishlistedProducts.length === 0 ? (
          <div className="text-center py-16">
            <Heart size={64} className="mx-auto text-muted-foreground/40 mb-4" />
            <h2 className="font-heading text-xl font-semibold text-foreground mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground mb-6">
              Tap the heart on any product to save it here.
            </p>
            <Link
              to="/shop"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Browse Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {wishlistedProducts.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
