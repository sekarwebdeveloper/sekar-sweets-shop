import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";
import SEO from "@/components/SEO";

// ── EmailJS config ──────────────────────────────────────────────
// 1. Go to https://www.emailjs.com and sign up for free
// 2. Create a Service (Gmail) → copy the Service ID
// 3. Create an Email Template with variables: {{from_name}}, {{from_email}}, {{message}}
//    Set "To Email" to: sekar.basilmedia@gmail.com
// 4. Copy your Public Key from Account → API Keys
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";
// ────────────────────────────────────────────────────────────────

interface FormData {
  name: string;
  email: string;
  message: string;
}

const contactInfo = [
  { icon: MapPin, title: "Visit Us", text: "123 Sweet Street, T. Nagar, Chennai, Tamil Nadu 600017" },
  { icon: Phone, title: "Call / WhatsApp", text: "+91 98765 43210" },
  { icon: Mail, title: "Email", text: "sekar.basilmedia@gmail.com" },
  { icon: Clock, title: "Working Hours", text: "Mon - Sat: 9:00 AM - 8:00 PM" },
];

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormData>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [sending, setSending] = useState(false);

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Valid email is required";
    if (!form.message.trim() || form.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name.trim(),
          from_email: form.email.trim(),
          message: form.message.trim(),
          to_email: "sekar.basilmedia@gmail.com",
        },
        EMAILJS_PUBLIC_KEY
      );
      toast.success("Message sent! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      toast.error("Failed to send message. Please try again or call us directly.");
    } finally {
      setSending(false);
    }
  };

  const update = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  return (
    <main className="pt-20 min-h-screen">
      <SEO
        title="Contact Us - Sekar Sweets | Order Inquiries & Bulk Orders"
        description="Get in touch with Sekar Sweets for orders, bulk inquiries, festival hampers and more. Email sekar.basilmedia@gmail.com or call us. Tirunelveli, Tamil Nadu."
        keywords={[
          "contact sekar sweets",
          "bulk order indian sweets",
          "wedding sweets order",
          "festival sweets bulk",
          "tirunelveli sweet shop contact",
          "sweet shop email",
        ]}
        url="/contact"
      />
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
            ref={formRef}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="space-y-5"
            noValidate
          >
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className={`w-full px-4 py-3 bg-card border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                  errors.name ? "border-red-400" : "border-border"
                }`}
                placeholder="Your full name"
                maxLength={100}
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={`w-full px-4 py-3 bg-card border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
                  errors.email ? "border-red-400" : "border-border"
                }`}
                placeholder="your@email.com"
                maxLength={255}
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                className={`w-full px-4 py-3 bg-card border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none h-36 transition-colors ${
                  errors.message ? "border-red-400" : "border-border"
                }`}
                placeholder="Tell us how we can help you..."
                maxLength={1000}
              />
              <div className="flex justify-between items-start mt-1">
                {errors.message
                  ? <p className="text-xs text-red-500">{errors.message}</p>
                  : <span />
                }
                <span className="text-xs text-muted-foreground">{form.message.length}/1000</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {sending ? (
                <><Loader2 size={18} className="animate-spin" /> Sending…</>
              ) : (
                <><Send size={18} /> Send Message</>
              )}
            </button>
          </motion.form>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {contactInfo.map((info) => (
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
                title="Sekar Sweets Location"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
