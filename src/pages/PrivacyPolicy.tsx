import SEO from "@/components/SEO";

export default function PrivacyPolicy() {
  return (
    <main className="pt-20 min-h-screen bg-background">
      <SEO
        title="Privacy Policy | Sekar Sweets"
        description="Read about how Sekar Sweets collects, uses and protects your personal information."
        url="/privacy-policy"
      />
      <div className="container mx-auto px-4 py-10 md:py-16 max-w-4xl">
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-3">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8 md:mb-10">Last updated: April 2026</p>

        <section className="space-y-6 text-muted-foreground leading-relaxed">
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">1. Information We Collect</h2>
            <p>We collect information you provide while placing an order — name, email, phone number, shipping address, and payment details. We also collect non-personal information like browser type and pages visited to improve our service.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To process and deliver your orders</li>
              <li>To send order updates and customer support communications</li>
              <li>To improve our website, products and overall experience</li>
              <li>To send promotional offers (only if you opt in)</li>
            </ul>
          </div>
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">3. Information Sharing</h2>
            <p>We do not sell or rent your personal information. We share data only with trusted partners (courier companies, payment gateways) strictly to fulfil your order.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">4. Data Security</h2>
            <p>Your data is stored on secure servers with industry-standard encryption. Payment transactions are processed through PCI-DSS compliant gateways.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">5. Cookies</h2>
            <p>We use cookies to remember your cart, preferences and improve your browsing experience. You can disable cookies in your browser settings, but some features may not work properly.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">6. Your Rights</h2>
            <p>You may request access, correction, or deletion of your personal data at any time by emailing us.</p>
          </div>
          <div>
            <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">7. Contact Us</h2>
            <p>For any privacy-related questions, please contact us at <a href="mailto:sekar.basilmedia@gmail.com" className="text-primary hover:underline">sekar.basilmedia@gmail.com</a>.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
