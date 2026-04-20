import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { categories, getProductsByCategory, searchProducts } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Search, ChevronDown } from "lucide-react";
import SEO from "@/components/SEO";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || categories[0];
  const searchQuery = searchParams.get("search") || "";
  const [localSearch, setLocalSearch] = useState(searchQuery);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
      <SEO
        title={searchQuery ? `Search "${searchQuery}" - Sekar Sweets` : `${activeCategory} - Sekar Sweets`}
        description={searchQuery
          ? `Search results for "${searchQuery}" at Sekar Sweets. Browse premium Indian sweets and savouries.`
          : `Shop ${activeCategory.toLowerCase()} online at Sekar Sweets. Authentic Tirunelveli flavours, made with pure ghee. Cash on Delivery across India.`}
        keywords={[
          activeCategory.toLowerCase(),
          `buy ${activeCategory.toLowerCase()} online`,
          "indian sweets shop",
          "sekar sweets",
          "tirunelveli sweets",
          "online sweet shop india",
        ]}
        url={`/shop?category=${encodeURIComponent(activeCategory)}`}
      />
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

        {/* Search results label */}
        {searchQuery && (
          <p className="text-sm text-muted-foreground mb-4">
            {filteredProducts.length} results for "{searchQuery}"
          </p>
        )}

        {/* Main layout: sidebar (30%) + content (70%) on desktop, dropdown on mobile */}
        {!searchQuery && (
          <div className="flex flex-col md:flex-row gap-6">
            {/* Mobile dropdown */}
            <div className="md:hidden relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 bg-card border border-border rounded-lg text-sm font-medium text-foreground"
              >
                {activeCategory}
                <ChevronDown size={16} className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-xl z-30 overflow-hidden">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setSearchParams({ category: cat });
                        setDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors ${
                        activeCategory === cat
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop sidebar (30%) */}
            <aside className="hidden md:block w-[30%] flex-shrink-0">
              <div className="sticky top-24 bg-card rounded-xl border border-border p-4 space-y-1">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3 px-2">Categories</h3>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSearchParams({ category: cat })}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                      activeCategory === cat
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </aside>

            {/* Products grid (70%) */}
            <div className="md:w-[70%]">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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
          </div>
        )}

        {/* Search results (no sidebar) */}
        {searchQuery && (
          <>
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
          </>
        )}
      </div>
    </main>
  );
}
