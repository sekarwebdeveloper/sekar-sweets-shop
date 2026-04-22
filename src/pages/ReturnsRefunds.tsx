import SEO from "@/components/SEO";
import { RefreshCw, ShieldCheck, AlertCircle, IndianRupee } from "lucide-react";

export default function ReturnsRefunds() {
  return (
    <main className="pt-20 min-h-screen bg-background">
      <SEO
        title="Returns & Refunds | Sekar Sweets"
        description="Read about our returns, replacement and refund policy for Sekar Sweets orders."
        url="/returns-refunds"
      />
      <div className="container mx-auto px-4 py-10 md:py-16 max-w-4xl">
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-3">Returns & Refunds</h1>
        <p className="text-muted-foreground mb-8 md:mb-10">Your satisfaction is our priority. Here's how we handle returns and refunds for our perishable products.</p>

        <div className="grid sm:grid-cols-2 gap-4 mb-10">
          {[
            { icon: ShieldCheck, title: "Quality Guarantee", desc: "Every box is hand-checked before dispatch." },
            { icon: RefreshCw, title: "Easy Replacement", desc: "Damaged or wrong item? We'll replace it." },
            { icon: AlertCircle, title: "Report in 24 Hours", desc: "Notify us within 24 hours of delivery." },
            { icon: IndianRupee, title: "Quick Refunds", desc: "Refunds processed within 5–7 business days." },
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
            <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">Eligibility for Returns</h2>
            <p>As we deal in perishable food items, returns are accepted only if the product is received damaged, spoiled, or incorrect. Please share clear photos of the product and packaging while raising the request.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">Non-Returnable Items</h2>
            <p>Products that have been opened, partially consumed, or damaged due to mishandling after delivery are not eligible for return.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">Refund Process</h2>
            <p>Once your return is approved, the refund will be initiated to your original payment method within 5–7 business days. For COD orders, refunds will be issued via bank transfer.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">How to Request a Return</h2>
            <p>Email us at <a href="mailto:sekar.basilmedia@gmail.com" className="text-primary hover:underline">sekar.basilmedia@gmail.com</a> with your order number and photos of the issue. Our team will respond within 24 hours.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
