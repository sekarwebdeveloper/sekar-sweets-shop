import SEO from "@/components/SEO";
import { Truck, Clock, MapPin, Package } from "lucide-react";

export default function ShippingPolicy() {
  return (
    <main className="pt-20 min-h-screen bg-background">
      <SEO
        title="Shipping Policy | Sekar Sweets"
        description="Learn about Sekar Sweets shipping zones, delivery timelines, packaging and charges across India."
        url="/shipping-policy"
      />
      <div className="container mx-auto px-4 py-10 md:py-16 max-w-4xl">
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-3">Shipping Policy</h1>
        <p className="text-muted-foreground mb-8 md:mb-10">Fast, fresh, and carefully packed — straight from our kitchen in Tamil Nadu to your doorstep.</p>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {[
            { icon: Truck, title: "Pan-India Delivery", desc: "We ship across all Indian states & UTs." },
            { icon: Clock, title: "Dispatch in 1–2 Days", desc: "Orders are freshly prepared and dispatched within 1–2 business days." },
            { icon: MapPin, title: "Delivery Time", desc: "3–7 business days depending on your location." },
            { icon: Package, title: "Safe Packaging", desc: "Food-grade sealed packs with protective outer cartons." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-5 bg-card border border-border rounded-xl">
              <Icon className="text-primary mb-3" size={22} />
              <h3 className="font-semibold text-foreground mb-1">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <section className="space-y-6 text-muted-foreground leading-relaxed">
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">Shipping Charges</h2>
            <p>Standard delivery charge of ₹80 applies on orders below ₹999. Orders above ₹999 are eligible for <strong className="text-foreground">FREE shipping</strong> across India.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">Order Tracking</h2>
            <p>Once your order is dispatched, you will receive an SMS / email with the tracking ID and courier partner details.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">Delays & Exceptions</h2>
            <p>Delivery may be delayed due to weather conditions, regional holidays, or unreachable pin codes. We will keep you informed in such cases.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">Need Help?</h2>
            <p>Email us at <a href="mailto:sekar.basilmedia@gmail.com" className="text-primary hover:underline">sekar.basilmedia@gmail.com</a> for any shipping-related queries.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
