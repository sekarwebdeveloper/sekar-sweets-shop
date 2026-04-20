import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Heart, ShoppingCart, Star, Shield, Truck, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import { productSchema, breadcrumbSchema } from "@/lib/seo-schemas";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();

  const product = products.find((p) => p.id === id);
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4">Product not found</h2>
          <Link to="/shop" className="text-primary hover:underline">← Back to Shop</Link>
        </div>
      </main>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const rating = 4.2 + (product.id.charCodeAt(0) % 8) / 10;
  const reviewCount = 40 + (product.id.charCodeAt(product.id.length - 1) % 200);

  // Related products in same category
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    toast.success(`${quantity} × ${product.name} added to cart!`);
  };

  const handleBuyNow = () => {
    for (let i = 0; i < quantity; i++) addItem(product);
    navigate("/checkout/details");
  };

  return (
    <main className="pt-20 min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1 hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Back
          </button>
          <span>/</span>
          <Link to="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-foreground transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-foreground truncate max-w-[150px]">{product.name}</span>
        </div>

        {/* SEO + JSON-LD schema for this product */}
        <SEO
          title={product.seoTitle}
          description={product.seoDescription}
          keywords={product.seoKeywords}
          image={product.images[0]?.src}
          url={`/product/${product.id}`}
          type="product"
          schema={productSchema(product)}
        />

        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* ─── LEFT: Image Gallery ─── */}
          <div className="flex gap-3">
            {/* Thumbnails column */}
            <div className="flex flex-col gap-2 w-16 flex-shrink-0">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-16 h-16 rounded-lg border-2 overflow-hidden flex-shrink-0 transition-all ${
                    activeImage === i ? "border-primary shadow-md" : "border-border opacity-70 hover:opacity-100"
                  }`}
                  aria-label={`View image ${i + 1} of ${product.name}`}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 relative rounded-2xl overflow-hidden border border-border aspect-square bg-muted">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={product.images[activeImage].src}
                  alt={product.images[activeImage].alt}
                  width={1024}
                  height={1024}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Prev / Next arrows */}
              <button
                onClick={() => setActiveImage((p) => (p - 1 + 5) % 5)}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setActiveImage((p) => (p + 1) % 5)}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors"
              >
                <ChevronRight size={16} />
              </button>

              {/* Image counter */}
              <div className="absolute bottom-3 right-3 bg-card/80 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full">
                {activeImage + 1} / 5
              </div>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className="absolute top-3 right-3 p-2.5 rounded-full bg-card/80 backdrop-blur-sm hover:bg-card transition-colors"
              >
                <Heart size={20} className={wishlisted ? "fill-primary text-primary" : "text-muted-foreground"} />
              </button>
            </div>
          </div>

          {/* ─── RIGHT: Details ─── */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col"
          >
            {/* Category tag */}
            <span className="inline-block text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3 w-fit">
              {product.category}
            </span>

            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={star <= Math.round(rating) ? "fill-primary text-primary" : "text-muted-foreground/40"}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">{rating.toFixed(1)}</span>
              <span className="text-sm text-muted-foreground">({reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-primary">₹{product.price}</span>
              <span className="text-sm text-muted-foreground">/ {product.weight}</span>
              <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">In Stock</span>
            </div>

            {/* Short description */}
            <p className="text-muted-foreground text-base leading-relaxed mb-6">{product.description}</p>

            {/* Quantity selector */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-foreground">Quantity:</span>
              <div className="flex items-center border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors text-foreground font-bold"
                >
                  −
                </button>
                <span className="w-12 text-center font-semibold text-foreground">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors text-foreground font-bold"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-muted-foreground">Total: <strong className="text-foreground">₹{(product.price * quantity).toLocaleString()}</strong></span>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleBuyNow}
                className="flex-1 py-3.5 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all text-base"
              >
                Buy Now
              </button>
              <button
                onClick={handleAddToCart}
                className="flex-1 py-3.5 border-2 border-primary text-primary font-bold rounded-xl hover:bg-primary/5 active:scale-95 transition-all flex items-center justify-center gap-2 text-base"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className="w-12 h-12 border border-border rounded-xl flex items-center justify-center hover:bg-muted transition-colors flex-shrink-0"
              >
                <Heart size={20} className={wishlisted ? "fill-primary text-primary" : "text-muted-foreground"} />
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 p-4 bg-secondary/50 rounded-xl">
              {[
                { icon: Shield, label: "Quality Guarantee" },
                { icon: Truck, label: "Ships in 1-2 Days" },
                { icon: RefreshCw, label: "Easy Returns" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 text-center">
                  <Icon size={18} className="text-primary" />
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ─── Product Description Section ─── */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">Product Details</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-foreground mb-3">About this Product</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {product.description}. Our {product.name} is crafted using age-old recipes passed down through generations,
                ensuring every bite delivers authentic flavors that remind you of home. Made with the finest ingredients
                sourced locally, free from artificial preservatives.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Each batch is prepared fresh in our FSSAI-certified kitchen with strict quality checks.
                Perfect for gifting, festivals, or personal indulgence.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">Product Specifications</h3>
              <table className="w-full text-sm">
                <tbody className="divide-y divide-border">
                  {[
                    ["Category", product.category],
                    ["Net Weight", product.weight],
                    ["Price", `₹${product.price}`],
                    ["Shelf Life", "15–21 days"],
                    ["Storage", "Cool & dry place"],
                    ["Packaging", "Sealed food-grade pack"],
                    ["Origin", "Tirunelveli, Tamil Nadu"],
                    ["Allergens", "Contains nuts, dairy"],
                  ].map(([key, value]) => (
                    <tr key={key} className="hover:bg-secondary/30 transition-colors">
                      <td className="py-2.5 pr-4 text-muted-foreground font-medium w-1/2">{key}</td>
                      <td className="py-2.5 text-foreground">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ─── Customer Reviews ─── */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">Customer Reviews</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: "Priya S.", rating: 5, text: "Absolutely divine! The texture is perfect and the taste reminds me of my grandma's kitchen.", date: "Jan 2026" },
              { name: "Raj K.", rating: 4, text: "Really fresh and well-packed. Will definitely order again for the next festival.", date: "Dec 2025" },
              { name: "Meena R.", rating: 5, text: "Best quality sweets I've had in a long time. Delivered on time too!", date: "Jan 2026" },
            ].map((review) => (
              <div key={review.name} className="bg-card border border-border rounded-xl p-5">
                <div className="flex items-center gap-1 mb-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={13} className={s <= review.rating ? "fill-primary text-primary" : "text-muted-foreground/30"} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-3 leading-relaxed">"{review.text}"</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-foreground">{review.name}</span>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── Related Products ─── */}
        {related.length > 0 && (
          <section>
            <h2 className="font-heading text-2xl font-bold text-foreground mb-6 pb-3 border-b border-border">
              More from {product.category}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
                >
                  <div className="aspect-square bg-muted overflow-hidden">
                    <img src={p.image} alt={p.images[0]?.alt || p.name} loading="lazy" width={400} height={400} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-semibold text-foreground truncate mb-1">{p.name}</p>
                    <p className="text-primary font-bold text-sm">₹{p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
