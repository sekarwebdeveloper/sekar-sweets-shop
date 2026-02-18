import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CreditCard, Building2, Smartphone, ArrowLeft, CheckCircle2, ShoppingBag } from "lucide-react";

const paymentMethods = [
  { id: "gpay", name: "Google Pay", icon: Smartphone, description: "Pay with Google Pay UPI" },
  { id: "card", name: "Credit / Debit Card", icon: CreditCard, description: "Visa, Mastercard, RuPay" },
  { id: "netbanking", name: "Net Banking", icon: Building2, description: "All major banks supported" },
  { id: "paypal", name: "PayPal", icon: CreditCard, description: "Pay with your PayPal account" },
  { id: "upi", name: "UPI", icon: Smartphone, description: "PhonePe, Paytm, BHIM" },
];

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const [selectedPayment, setSelectedPayment] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const deliveryCharge = totalPrice > 500 ? 0 : 50;
  const grandTotal = totalPrice + deliveryCharge;

  // Get customer details saved from previous step
  const customerDetails = (() => {
    try {
      const raw = sessionStorage.getItem("customerDetails");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  if (items.length === 0 && !orderPlaced) {
    return (
      <main className="pt-20 min-h-screen flex items-center justify-center">
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
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center max-w-md px-4">
          <CheckCircle2 size={72} className="mx-auto text-primary mb-6" />
          <h2 className="font-heading text-3xl font-bold text-foreground mb-3">Order Placed!</h2>
          {customerDetails && (
            <p className="text-muted-foreground mb-2">
              Hi {customerDetails.firstName}, your order will be delivered to{" "}
              <strong>{customerDetails.city}, {customerDetails.state}</strong>.
            </p>
          )}
          <p className="text-muted-foreground mb-8">Thank you for your order. A confirmation will be sent to your email shortly.</p>
          <Link to="/" className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity">
            Back to Home
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen bg-background">
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
          {/* Payment methods (3/5) */}
          <div className="md:col-span-3 space-y-4">
            <h2 className="font-heading text-xl font-semibold text-foreground mb-4">Select Payment Method</h2>
            {paymentMethods.map((method) => (
              <motion.button
                key={method.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedPayment(method.id)}
                className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                  selectedPayment === method.id
                    ? "border-primary bg-primary/5"
                    : "border-border bg-card hover:border-primary/40"
                }`}
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                  selectedPayment === method.id ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}>
                  <method.icon size={22} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{method.name}</p>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                </div>
                <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedPayment === method.id ? "border-primary" : "border-border"
                }`}>
                  {selectedPayment === method.id && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Order summary (2/5) */}
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
              <button
                disabled={!selectedPayment}
                onClick={() => {
                  setOrderPlaced(true);
                  clearCart();
                  sessionStorage.removeItem("customerDetails");
                }}
                className="w-full mt-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Pay ₹{grandTotal.toLocaleString()}
              </button>
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
