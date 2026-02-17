import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { categories, getProductsByCategory, searchProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || categories[0];
  const searchQuery = searchParams.get("search") || "";
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const activeCategory = categories.includes(categoryParam as any) ? categoryParam : categories[0];

  const filteredProducts = useMemo(() => {
    if (searchQuery) return searchProducts(searchQuery);
    return getProductsByCategory(activeCategory);
  }, [activeCategory, searchQuery]);

  const handleSearch = () => {
    if (localSearch.trim()) {
      setSearchParams({ search: localSearch.trim() });
    } else {
      setSearchParams({ category: activeCategory });
    }
  };

  return (
    <main className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">Our Collection</h1>
          <p className="text-muted-foreground">Handcrafted with love, delivered with care</p>
        </motion.div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search by name, category..."
              className="w-full px-4 py-3 pl-10 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            {searchQuery && (
              <button
                onClick={() => {
                  setLocalSearch("");
                  setSearchParams({ category: activeCategory });
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-primary hover:underline"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Tabs */}
        {!searchQuery && (
          <div className="mb-8 overflow-x-auto scrollbar-hide">
            <div className="flex gap-2 min-w-max pb-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSearchParams({ category: cat })}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-muted-foreground border border-border hover:border-primary hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search results label */}
        {searchQuery && (
          <p className="text-sm text-muted-foreground mb-4">
            {filteredProducts.length} results for "{searchQuery}"
          </p>
        )}

        {/* Products grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No products found</p>
          </div>
        )}
      </div>
    </main>
  );
}
