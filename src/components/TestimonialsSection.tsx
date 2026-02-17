import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  { name: "Priya Sharma", location: "Chennai", text: "The Mysore Pak from Sekar Sweets is the best I've ever tasted. Authentic taste that reminds me of my grandmother's kitchen!", rating: 5 },
  { name: "Rajesh Kumar", location: "Bangalore", text: "Ordered baklava for Diwali and my entire family was blown away. The quality and freshness are unmatched.", rating: 5 },
  { name: "Anitha Devi", location: "Mumbai", text: "I've been ordering their Nellai savouries for years. Consistent quality and always arrives fresh.", rating: 5 },
  { name: "Vikram Patel", location: "Delhi", text: "The dry fruit sweets are perfect for gifting. Premium packaging and the taste is divine. Highly recommended!", rating: 5 },
  { name: "Meena Sundaram", location: "Coimbatore", text: "Their Tirunelveli Halwa is out of this world. Just like what you get in Nellai. Amazing quality!", rating: 5 },
  { name: "Suresh Babu", location: "Hyderabad", text: "Ordered for a family function and everyone couldn't stop praising. Will definitely order again and again!", rating: 5 },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">What Our Customers Say</h2>
          <p className="text-muted-foreground max-w-md mx-auto">Real stories from our happy sweet lovers</p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card rounded-2xl p-8 md:p-12 border border-border text-center relative"
          >
            <Quote size={40} className="text-primary/20 mx-auto mb-4" />
            <div className="flex gap-1 justify-center mb-4">
              {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                <Star key={i} size={18} className="fill-primary text-primary" />
              ))}
            </div>
            <p className="text-foreground text-lg md:text-xl leading-relaxed mb-6 italic">
              "{testimonials[current].text}"
            </p>
            <p className="font-heading font-semibold text-foreground text-lg">{testimonials[current].name}</p>
            <p className="text-muted-foreground text-sm">{testimonials[current].location}</p>
          </motion.div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)}
              className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-primary w-6" : "bg-border"}`}
                />
              ))}
            </div>
            <button
              onClick={() => setCurrent((p) => (p + 1) % testimonials.length)}
              className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
