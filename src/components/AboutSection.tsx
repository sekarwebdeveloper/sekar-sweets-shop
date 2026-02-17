import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  { name: "Priya Sharma", text: "The Mysore Pak from Nithyaamirtham is the best I've ever tasted. Authentic taste that reminds me of my grandmother's kitchen!", rating: 5 },
  { name: "Rajesh Kumar", text: "Ordered baklava for Diwali and my entire family was blown away. The quality and freshness are unmatched.", rating: 5 },
  { name: "Anitha Devi", text: "I've been ordering their Nellai savouries for years. Consistent quality and always arrives fresh.", rating: 5 },
  { name: "Vikram Patel", text: "The dry fruit sweets are perfect for gifting. Premium packaging and the taste is divine. Highly recommended!", rating: 5 },
];

export default function AboutSection() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Born in the heart of Tirunelveli, Nithyaamirtham carries forward a legacy of authentic South Indian sweets and savouries. 
              Our artisans use time-honored recipes passed down through generations, combining the finest ingredients with pure ghee and love.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every sweet that leaves our kitchen is a testament to our commitment to purity, freshness, and the rich culinary traditions 
              of Tamil Nadu. From the iconic Tirunelveli Halwa to our signature Baklava collection, we bring you tastes that create memories.
            </p>
          </motion.div>

          {/* Testimonials */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-background rounded-xl p-8 border border-border"
          >
            <h3 className="font-heading text-xl font-semibold text-foreground mb-6">What Our Customers Say</h3>
            <div className="relative min-h-[180px]">
              <div>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground italic mb-4">"{testimonials[current].text}"</p>
                <p className="font-semibold text-foreground">— {testimonials[current].name}</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-border"}`}
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)} className="p-1 rounded border border-border hover:border-primary transition-colors">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={() => setCurrent((p) => (p + 1) % testimonials.length)} className="p-1 rounded border border-border hover:border-primary transition-colors">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
