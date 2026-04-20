import { motion } from "framer-motion";
import { Heart, Award, Users, Leaf } from "lucide-react";
import SEO from "@/components/SEO";
import { organizationSchema } from "@/lib/seo-schemas";

const values = [
  { icon: Heart, title: "Made with Love", desc: "Every sweet is handcrafted with passion and care by our skilled artisans." },
  { icon: Award, title: "Premium Quality", desc: "We use only the finest ingredients — pure ghee, fresh milk, premium dry fruits." },
  { icon: Users, title: "Family Legacy", desc: "Our recipes have been passed down through generations, preserving authentic flavors." },
  { icon: Leaf, title: "Naturally Fresh", desc: "No artificial preservatives or colors. Just pure, natural goodness in every bite." },
];

export default function About() {
  return (
    <main className="pt-20 min-h-screen">
      <SEO
        title="About Us - Sekar Sweets | Authentic Tirunelveli Sweets"
        description="Discover the story of Sekar Sweets — handcrafted Indian sweets and savouries from Tirunelveli, made with traditional family recipes and the finest ingredients."
        keywords={[
          "about sekar sweets",
          "tirunelveli sweet shop",
          "authentic indian sweets",
          "family sweet shop",
          "traditional sweet makers",
          "nellai sweets brand",
        ]}
        url="/about"
        schema={organizationSchema}
      />
      <div className="container mx-auto px-4 py-12">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-6">Our Story</h1>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Nithyaamirtham was born from a simple vision — to bring the authentic taste of South Indian sweets 
            and savouries to doorsteps across the nation. Rooted in the culinary traditions of Tirunelveli, 
            our journey began in a small kitchen and has now grown into a beloved brand trusted by over a million customers.
          </p>
        </motion.div>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {values.map((val, i) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-xl p-6 border border-border text-center"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
                <val.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">{val.title}</h3>
              <p className="text-sm text-muted-foreground">{val.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-accent rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto"
        >
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-accent-foreground mb-4">Our Mission</h2>
          <p className="text-accent-foreground/70 leading-relaxed">
            To preserve and share the rich culinary heritage of Tamil Nadu with the world, 
            one sweet at a time. We believe that every festival, every celebration, and every 
            moment of joy deserves the purest, most authentic sweets — made just the way 
            our grandmothers made them.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
