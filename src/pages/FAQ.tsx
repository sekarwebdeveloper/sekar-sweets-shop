import SEO from "@/components/SEO";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "Are your sweets freshly made?", a: "Yes, every order is freshly prepared in our FSSAI-certified kitchen and dispatched within 1–2 business days." },
  { q: "Do you use preservatives?", a: "No. We use only natural ingredients with no artificial preservatives, colors, or flavors." },
  { q: "What is the shelf life of your products?", a: "Most of our sweets stay fresh for 15–21 days when stored in a cool, dry place. Specific shelf life is mentioned on each product." },
  { q: "Do you ship across India?", a: "Yes! We ship pan-India. Standard delivery takes 3–7 business days based on your location." },
  { q: "Is Cash on Delivery (COD) available?", a: "Yes, COD is available for most pin codes across India. You can choose COD at checkout if your area is serviceable." },
  { q: "Can I order in bulk for weddings or corporate gifting?", a: "Absolutely! For bulk and custom orders, please email us at sekar.basilmedia@gmail.com." },
  { q: "How can I track my order?", a: "Once dispatched, you will receive an SMS and email with your tracking link and courier details." },
  { q: "What if I receive a damaged product?", a: "Please notify us within 24 hours of delivery with photos. We'll arrange a replacement or refund." },
];

export default function FAQ() {
  return (
    <main className="pt-20 min-h-screen bg-background">
      <SEO
        title="Frequently Asked Questions | Sekar Sweets"
        description="Find answers to common questions about Sekar Sweets — orders, shipping, ingredients, returns and more."
        url="/faq"
      />
      <div className="container mx-auto px-4 py-10 md:py-16 max-w-3xl">
        <h1 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-3">Frequently Asked Questions</h1>
        <p className="text-muted-foreground mb-8 md:mb-10">Everything you need to know about our sweets, orders and delivery.</p>

        <Accordion type="single" collapsible className="w-full space-y-3">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`} className="bg-card border border-border rounded-xl px-5">
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-4">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-10 p-6 bg-secondary/40 border border-border rounded-xl text-center">
          <h3 className="font-heading font-bold text-foreground mb-2">Still have questions?</h3>
          <p className="text-sm text-muted-foreground mb-3">We're happy to help. Drop us an email anytime.</p>
          <a href="mailto:sekar.basilmedia@gmail.com" className="inline-block px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Contact Support
          </a>
        </div>
      </div>
    </main>
  );
}
