import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ShoppingBag } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import SEO from "@/components/SEO";

interface CustomerDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark?: string;
}

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const deliveryCharge = totalPrice > 500 ? 0 : 50;
  const grandTotal = totalPrice + deliveryCharge;

  const customerDetails: CustomerDetails | null = (() => {
    try {
      const raw = sessionStorage.getItem("customerDetails");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  /**
   * Save the order to Supabase.
   * ─────────────────────────────────────────────────────────────
   * Tables used:
   *   • public.orders        — header info (customer + totals)
   *   • public.order_items   — one row per cart line
   *
   * RLS: Anonymous INSERTs are allowed (guest checkout).
   * SELECTs are blocked from public — admin views orders via
   * Lovable Cloud → Database, or via service-role queries.
   *
   * EDIT THIS FUNCTION later to:
   *   • Trigger a confirmation email (edge function)
   *   • Send Telegram/WhatsApp notification
   *   • Connect a payment gateway (Razorpay/Stripe) before insert
   */
  const handlePlaceOrder = async () => {
    if (!customerDetails) {
      toast.error("Customer details missing. Please go back.");
      return;
    }
    setLoading(true);
    try {
      // Generate order number + id client-side so we don't need SELECT permission after insert
      const newOrderId = (crypto as any).randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`;
      const today = new Date();
      const yy = String(today.getFullYear()).slice(-2);
      const mm = String(today.getMonth() + 1).padStart(2, "0");
      const dd = String(today.getDate()).padStart(2, "0");
      const rand = String(Math.floor(Math.random() * 100000)).padStart(5, "0");
      const newOrderNumber = `SS-${yy}${mm}${dd}-${rand}`;

      // 1) Insert order header
      const { error: orderError } = await supabase
        .from("orders")
        .insert({
          id: newOrderId,
          order_number: newOrderNumber,
          first_name: customerDetails.firstName,
          last_name: customerDetails.lastName,
          email: customerDetails.email,
          phone: customerDetails.phone,
          address: customerDetails.address,
          landmark: customerDetails.landmark || null,
          city: customerDetails.city,
          state: customerDetails.state,
          pincode: customerDetails.pincode,
          subtotal: totalPrice,
          delivery_charge: deliveryCharge,
          total: grandTotal,
          payment_method: "COD",
          status: "pending",
        });

      if (orderError) throw orderError;

      // 2) Insert order items
      const itemsPayload = items.map((it) => ({
        order_id: newOrderId,
        product_id: it.product.id,
        product_name: it.product.name,
        product_category: it.product.category,
        product_weight: it.product.weight,
        unit_price: it.product.price,
        quantity: it.quantity,
        line_total: it.product.price * it.quantity,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(itemsPayload);

      if (itemsError) throw itemsError;

      setOrderNumber(newOrderNumber);
      setOrderPlaced(true);
      clearCart();
      sessionStorage.removeItem("customerDetails");
      toast.success(`Order ${newOrderNumber} booked successfully!`);
    } catch (err: any) {
      console.error("Order placement failed:", err);
      toast.error(err?.message || "Could not place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !orderPlaced) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <SEO title="Checkout - Sekar Sweets" description="Complete your sweet order securely." url="/checkout/payment" />
        <div className="text-center">
          <ShoppingBag size={64} className="mx-auto text-muted-foreground/40 mb-4" />
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some delicious sweets before checkout</p>
          <Link to="/shop" className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
            Browse Shop
          </Link>
        </div>
      </main>
    );
  }

  if (orderPlaced) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
        <SEO title="Order Placed - Sekar Sweets" description="Your order has been placed successfully." url="/checkout/payment" />
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md px-4">
          <CheckCircle2 size={72} className="mx-auto text-primary mb-6" />
          <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Order Confirmed!</h2>
          {orderNumber && (
            <p className="text-sm text-muted-foreground mb-3">
              Order ID: <strong className="text-foreground">{orderNumber}</strong>
            </p>
          )}
          {customerDetails && (
            <p className="text-muted-foreground mb-2">
              Hi {customerDetails.firstName}, your order has been booked and will be delivered to{" "}
              <strong>{customerDetails.city}, {customerDetails.state}</strong>.
            </p>
          )}
          <p className="text-muted-foreground mb-8">Thank you for your order. We'll contact you shortly to confirm delivery.</p>
          <Link to="/" className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
            Back to Home
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen bg-background">
      <SEO title="Payment - Sekar Sweets" description="Confirm and place your order. Cash on Delivery available." url="/checkout/payment" />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/30 text-primary flex items-center justify-center text-sm font-bold border border-primary">✓</div>
            <span className="text-sm text-muted-foreground hidden sm:block">Delivery Details</span>
          </div>
          <div className="flex-1 h-0.5 bg-primary mx-2" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
            <span className="text-sm font-semibold text-foreground hidden sm:block">Payment</span>
          </div>
        </div>

        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft size={18} /> Back
        </button>

        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Payment</h1>
        {customerDetails && (
          <p className="text-sm text-muted-foreground mb-8">
            Delivering to: <strong className="text-foreground">{customerDetails.firstName} {customerDetails.lastName}</strong>{" "}
            — {customerDetails.address}, {customerDetails.city}, {customerDetails.state} {customerDetails.pincode}
          </p>
        )}

        <div className="grid md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Order Confirmation</h2>
              <p className="text-muted-foreground mb-6">
                Review your order details and click the button below to place your order. Cash on Delivery is available.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {["Cash on Delivery", "Free Delivery above ₹500"].map((m) => (
                  <span key={m} className="px-3 py-1.5 bg-secondary text-muted-foreground text-xs rounded-full border border-border">
                    {m}
                  </span>
                ))}
              </div>
              <button
                onClick={handlePlaceOrder}
                disabled={loading}
                className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all disabled:opacity-60 text-lg"
              >
                {loading ? "Placing order..." : `Place Order - ₹${grandTotal.toLocaleString()}`}
              </button>
              <p className="text-xs text-muted-foreground text-center mt-3">Cash on Delivery available</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-foreground truncate mr-2">{item.product.name} × {item.quantity}</span>
                    <span className="text-muted-foreground flex-shrink-0">₹{(item.product.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-3 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-foreground">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="text-foreground">{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>
              {deliveryCharge === 0 && (
                <p className="text-xs text-primary text-center mt-2">🎉 Free delivery on orders above ₹500</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
