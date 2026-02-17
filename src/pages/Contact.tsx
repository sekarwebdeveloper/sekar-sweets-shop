import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { toast } from "sonner";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="pt-20 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-2">Get in Touch</h1>
          <p className="text-muted-foreground">We'd love to hear from you</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Your name"
                maxLength={100}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="your@email.com"
                maxLength={255}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 bg-card border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none h-32"
                placeholder="Your message..."
                maxLength={1000}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {[
              { icon: MapPin, title: "Visit Us", text: "123 Sweet Street, T. Nagar, Chennai, Tamil Nadu 600017" },
              { icon: Phone, title: "Call / WhatsApp", text: "+91 98765 43210" },
              { icon: Mail, title: "Email", text: "hello@nithyaamirtham.com" },
              { icon: Clock, title: "Working Hours", text: "Mon - Sat: 9:00 AM - 8:00 PM" },
            ].map((info) => (
              <div key={info.title} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                  <info.icon size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground text-sm">{info.title}</h3>
                  <p className="text-muted-foreground text-sm">{info.text}</p>
                </div>
              </div>
            ))}

            {/* Map embed */}
            <div className="rounded-xl overflow-hidden border border-border h-48">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.9938955!2d80.2337!3d13.0408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTPCsDAyJzI3LjAiTiA4MMKwMTQnMDEuMyJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Nithyaamirtham Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
