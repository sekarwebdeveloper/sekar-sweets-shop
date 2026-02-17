import { motion } from "framer-motion";
import { Heart, HandHeart, Truck, Leaf, Sparkles } from "lucide-react";

const trustItems = [
  { icon: Heart, title: "Loved by 1M+", subtitle: "Happy Customers" },
  { icon: HandHeart, title: "Handmade with Love", subtitle: "Every Single Piece" },
  { icon: Truck, title: "Ships in 1-2 Days", subtitle: "Write to expedite" },
  { icon: Leaf, title: "Pure Taste", subtitle: "No Preservatives" },
  { icon: Sparkles, title: "Naturally Fresh", subtitle: "Made to Order" },
];

export default function TrustSection() {
  return (
    <section className="py-16 chocolate-gradient">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {trustItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center">
                <item.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-cream text-sm md:text-base">{item.title}</h3>
              <p className="text-cream/60 text-xs mt-1">{item.subtitle}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
