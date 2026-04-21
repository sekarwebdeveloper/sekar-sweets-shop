import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Youtube, Send } from "lucide-react";
import { categories } from "@/data/products";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="chocolate-gradient text-cream">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Logo */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-heading text-2xl font-bold gold-text-gradient mb-4">Sekar Sweets</h3>
            <p className="text-cream/60 text-sm leading-relaxed">
              Handcrafted sweets & savouries from the heart of Tamil Nadu. Pure taste, naturally fresh.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {["Home", "Shop", "About", "Contact"].map((link) => (
                <li key={link}>
                  <Link to={`/${link === "Home" ? "" : link.toLowerCase()}`} className="text-sm text-cream/60 hover:text-primary transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-heading font-semibold text-primary mb-4">Categories</h4>
            <ul className="space-y-2">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat}>
                  <Link to={`/shop?category=${encodeURIComponent(cat)}`} className="text-sm text-cream/60 hover:text-primary transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-heading font-semibold text-primary mb-4">Support</h4>
            <ul className="space-y-2">
              {["Shipping Policy", "Returns & Refunds", "FAQ", "Privacy Policy"].map((link) => (
                <li key={link}>
                  <span className="text-sm text-cream/60 hover:text-primary transition-colors cursor-pointer">{link}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-heading font-semibold text-primary mb-4">Follow Us</h4>
            <p className="text-sm text-cream/60 mb-3">Connect with us on social media</p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-cream/10 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-cream/10 text-center">
          <p className="text-sm text-cream/40">© 2026 Sekar Sweets. All rights reserved. Made with love in Tamil Nadu.</p>
        </div>
      </div>
    </footer>
  );
}
