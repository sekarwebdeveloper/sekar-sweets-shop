import { Link, useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, Home, ShoppingBag } from "lucide-react";
import SEO from "@/components/SEO";

interface LocationState {
  orderNumber?: string;
  firstName?: string;
  city?: string;
  state?: string;
  total?: number;
}

export default function ThankYou() {
  const location = useLocation();
  const state = (location.state || {}) as LocationState;

  // If user lands here directly without any order, send them home
  if (!state.orderNumber) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="pt-20 min-h-screen bg-background flex items-center justify-center">
      <SEO
        title="Thank You for Your Order | Sekar Sweets"
        description="Your order has been booked successfully. We'll contact you shortly to confirm delivery."
        url="/thank-you"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-lg px-4 py-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6"
        >
          <CheckCircle2 size={56} className="text-primary" />
        </motion.div>

        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
          Thank You for Your Order!
        </h1>
        <p className="text-muted-foreground mb-6">
          {state.firstName ? `Hi ${state.firstName}, your` : "Your"} order has been booked successfully.
          We'll contact you shortly to confirm delivery details.
        </p>

        <div className="bg-card border border-border rounded-xl p-5 mb-6 text-left space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Order ID</span>
            <span className="font-semibold text-foreground">{state.orderNumber}</span>
          </div>
          {state.city && state.state && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery to</span>
              <span className="font-semibold text-foreground">{state.city}, {state.state}</span>
            </div>
          )}
          {state.total && (
            <div className="flex justify-between text-sm pt-2 border-t border-border">
              <span className="text-muted-foreground">Total Paid</span>
              <span className="font-bold text-primary">₹{state.total.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Payment Method</span>
            <span className="font-semibold text-foreground">Cash on Delivery</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            <Home size={18} /> Back to Home
          </Link>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-muted transition-colors"
          >
            <ShoppingBag size={18} /> Continue Shopping
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
