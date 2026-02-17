import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";

const slides = [
  { image: hero1, title: "Pure Taste, Naturally Fresh", subtitle: "Handcrafted Sweets & Savouries" },
  { image: hero2, title: "Exquisite Baklava Collection", subtitle: "Layered Perfection in Every Bite" },
  { image: hero3, title: "Traditional Milk Sweets", subtitle: "Recipes Passed Down Generations" },
  { image: hero4, title: "Authentic South Indian Savouries", subtitle: "Crunchy, Spicy, Irresistible" },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-accent via-accent/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-4 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-cream mb-4 leading-tight text-balance drop-shadow-lg">
                {slides[current].title}
              </h1>
              <p className="text-cream/80 text-lg md:text-xl mb-8 font-body">
                {slides[current].subtitle}
              </p>
              <Link
                to="/shop"
                className="inline-block px-8 py-4 gold-gradient text-accent font-semibold rounded-lg text-lg hover:shadow-[0_0_30px_hsl(43_78%_46%/0.4)] transition-all duration-300 active:scale-95"
              >
                Shop Now
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-accent/40 backdrop-blur-sm text-cream hover:bg-accent/70 transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-accent/40 backdrop-blur-sm text-cream hover:bg-accent/70 transition-all"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-primary w-8" : "bg-cream/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
