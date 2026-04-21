import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Heart, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";

const sweetCategories = [
  "Traditional Sweets",
  "Baklava",
  "Dry Fruit Sweets",
  "Ghee Sweets",
  "Halwa",
  "Milk Sweets",
  "Home Made Sweets",
];

const foodCategories = [
  "Pickles and Rice Mix",
  "Savouries",
  "Nellai Special Savouries",
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);
  const { totalItems, setIsOpen } = useCart();
  const { wishlist } = useWishlist();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setMegaOpen(false);
  }, [location]);

  return (
    <>
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "glass-effect shadow-lg" : "bg-accent/95 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile menu */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-accent-foreground"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-heading text-xl md:text-2xl font-bold gold-text-gradient">
              Sekar Sweets
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-accent-foreground/90 hover:text-primary transition-colors text-sm font-medium tracking-wide uppercase">
              Home
            </Link>
            <div
              className="relative"
              ref={megaRef}
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <Link
                to="/shop"
                className="flex items-center gap-1 text-accent-foreground/90 hover:text-primary transition-colors text-sm font-medium tracking-wide uppercase"
              >
                Shop Now <ChevronDown size={14} className={`transition-transform ${megaOpen ? "rotate-180" : ""}`} />
              </Link>
              <AnimatePresence>
                {megaOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[500px] bg-accent rounded-lg shadow-2xl border border-border p-6"
                  >
                    <div className="grid grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-heading text-primary text-lg mb-3">Sweets</h3>
                        <ul className="space-y-2">
                          {sweetCategories.map((cat) => (
                            <li key={cat}>
                              <Link
                                to={`/shop?category=${encodeURIComponent(cat)}`}
                                className="text-accent-foreground/80 hover:text-primary transition-colors text-sm"
                              >
                                {cat}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-heading text-primary text-lg mb-3">Food</h3>
                        <ul className="space-y-2">
                          {foodCategories.map((cat) => (
                            <li key={cat}>
                              <Link
                                to={`/shop?category=${encodeURIComponent(cat)}`}
                                className="text-accent-foreground/80 hover:text-primary transition-colors text-sm"
                              >
                                {cat}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link to="/about" className="text-accent-foreground/90 hover:text-primary transition-colors text-sm font-medium tracking-wide uppercase">
              About
            </Link>
            <Link to="/contact" className="text-accent-foreground/90 hover:text-primary transition-colors text-sm font-medium tracking-wide uppercase">
              Contact
            </Link>
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <button onClick={() => setSearchOpen(!searchOpen)} className="text-accent-foreground/80 hover:text-primary transition-colors p-2" aria-label="Search">
                <Search size={20} />
              </button>
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 240 }}
                    exit={{ opacity: 0, width: 0 }}
                    className="absolute right-0 top-full mt-2 overflow-hidden"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && searchQuery.trim()) {
                          window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
                        }
                      }}
                      placeholder="Search sweets..."
                      className="w-full px-4 py-2 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                      autoFocus
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Wishlist */}
            <Link to="/shop" className="relative text-accent-foreground/80 hover:text-primary transition-colors p-2" aria-label="Wishlist">
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative text-accent-foreground/80 hover:text-primary transition-colors p-2"
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

    </header>

    {/* Mobile drawer — rendered OUTSIDE the header to escape its stacking context */}
    <AnimatePresence>
      {mobileOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 z-[60] md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <motion.nav
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 left-0 bottom-0 w-72 bg-accent z-[70] p-6 overflow-y-auto md:hidden"
          >
            <div className="flex items-center justify-between mb-8">
              <span className="font-heading text-xl font-bold gold-text-gradient">Sekar Sweets</span>
              <button onClick={() => setMobileOpen(false)} className="text-accent-foreground">
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <Link to="/" className="block text-accent-foreground hover:text-primary transition-colors font-medium">Home</Link>
              <Link to="/shop" className="block text-accent-foreground hover:text-primary transition-colors font-medium">Shop Now</Link>
              <div className="pl-4 space-y-2">
                <p className="text-primary text-sm font-heading font-semibold">Sweets</p>
                {sweetCategories.map((cat) => (
                  <Link key={cat} to={`/shop?category=${encodeURIComponent(cat)}`} className="block text-sm text-accent-foreground/70 hover:text-primary transition-colors">
                    {cat}
                  </Link>
                ))}
                <p className="text-primary text-sm font-heading font-semibold mt-3">Food</p>
                {foodCategories.map((cat) => (
                  <Link key={cat} to={`/shop?category=${encodeURIComponent(cat)}`} className="block text-sm text-accent-foreground/70 hover:text-primary transition-colors">
                    {cat}
                  </Link>
                ))}
              </div>
              <Link to="/about" className="block text-accent-foreground hover:text-primary transition-colors font-medium">About</Link>
              <Link to="/contact" className="block text-accent-foreground hover:text-primary transition-colors font-medium">Contact</Link>
            </div>
          </motion.nav>
        </>
      )}
    </AnimatePresence>
    </>
  );
}
