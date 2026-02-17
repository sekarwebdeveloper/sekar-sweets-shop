import { Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import type { Product } from "@/data/products";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group bg-card rounded-xl overflow-hidden border border-border card-hover"
    >
      <div className="relative aspect-square bg-muted flex items-center justify-center overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-secondary to-muted flex items-center justify-center">
          <span className="font-heading text-lg text-muted-foreground/60">{product.name}</span>
        </div>
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-3 right-3 p-2 rounded-full bg-card/80 backdrop-blur-sm transition-all hover:bg-card"
          aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={18}
            className={wishlisted ? "fill-primary text-primary" : "text-muted-foreground"}
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-heading font-semibold text-foreground text-sm mb-1 truncate">{product.name}</h3>
        <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <div>
            <span className="text-primary font-bold text-lg">₹{product.price}</span>
            <span className="text-xs text-muted-foreground ml-1">/ {product.weight}</span>
          </div>
          <button
            onClick={() => addItem(product)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground text-xs font-semibold rounded-md hover:opacity-90 transition-all active:scale-95"
          >
            <ShoppingCart size={14} />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
}
