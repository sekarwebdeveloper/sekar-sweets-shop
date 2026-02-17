import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Born in the heart of Tirunelveli, Sekar Sweets carries forward a legacy of authentic South Indian sweets and savouries.
              Our artisans use time-honored recipes passed down through generations, combining the finest ingredients with pure ghee and love.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every sweet that leaves our kitchen is a testament to our commitment to purity, freshness, and the rich culinary traditions
              of Tamil Nadu. From the iconic Tirunelveli Halwa to our signature Baklava collection, we bring you tastes that create memories.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
