import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, User, Phone, Mail, ChevronRight } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { ShoppingBag } from "lucide-react";
import SEO from "@/components/SEO";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  landmark: string;
}

function InputField({
  label, field, type = "text", placeholder, maxLength, inputMode, value, error, onChange,
}: {
  label: string; field: string; type?: string; placeholder: string; maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  value: string; error?: string; onChange: (field: string, value: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">{label}</label>
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(e) => {
          let val = e.target.value;
          if (field === "phone" || field === "pincode") {
            val = val.replace(/\D/g, "");
          }
          onChange(field, val);
        }}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full px-4 py-3 bg-card border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-colors ${
          error ? "border-red-400" : "border-border"
        }`}
      />
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

export default function CustomerDetails() {
  const { items, totalPrice } = useCart();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const [form, setForm] = useState<FormData>({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", state: "", pincode: "", landmark: "",
  });

  if (items.length === 0) {
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

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Valid email is required";
    if (!form.phone.trim() || !/^[6-9]\d{9}$/.test(form.phone))
      newErrors.phone = "Valid 10-digit mobile number is required";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.state) newErrors.state = "State is required";
    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode))
      newErrors.pincode = "Valid 6-digit pincode is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Store details in sessionStorage for the payment page
      sessionStorage.setItem("customerDetails", JSON.stringify(form));
      navigate("/checkout/payment");
    }
  };

  const update = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  const deliveryCharge = totalPrice > 500 ? 0 : 50;
  const grandTotal = totalPrice + deliveryCharge;

  return (
    <main className="pt-20 min-h-screen bg-background">
      <SEO
        title="Delivery Details - Checkout | Sekar Sweets"
        description="Enter your delivery details to complete your order at Sekar Sweets."
        url="/checkout/details"
      />
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Progress bar */}
        <div className="flex items-center gap-2 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
            <span className="text-sm font-semibold text-foreground hidden sm:block">Delivery Details</span>
          </div>
          <div className="flex-1 h-0.5 bg-border mx-2" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold border border-border">2</div>
            <span className="text-sm text-muted-foreground hidden sm:block">Payment</span>
          </div>
        </div>

        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-6">
          <ArrowLeft size={18} /> Back
        </button>

        <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Delivery Details</h1>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Form - 3/5 */}
          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5">
            {/* Personal Info */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <User size={18} className="text-primary" />
                <h2 className="font-semibold text-foreground">Personal Information</h2>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <InputField label="First Name" field="firstName" placeholder="First name" maxLength={50} value={form.firstName} error={errors.firstName} onChange={update} />
                <InputField label="Last Name" field="lastName" placeholder="Last name" maxLength={50} value={form.lastName} error={errors.lastName} onChange={update} />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <InputField label="Email Address" field="email" type="email" placeholder="your@email.com" maxLength={255} value={form.email} error={errors.email} onChange={update} />
                <InputField label="Mobile Number" field="phone" type="text" inputMode="numeric" placeholder="10-digit mobile" maxLength={10} value={form.phone} error={errors.phone} onChange={update} />
              </div>
            </div>

            {/* Address */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={18} className="text-primary" />
                <h2 className="font-semibold text-foreground">Delivery Address</h2>
              </div>
              <div className="space-y-4">
                <InputField label="Full Address" field="address" placeholder="House no., street, area" maxLength={200} value={form.address} error={errors.address} onChange={update} />
                <InputField label="Landmark (optional)" field="landmark" placeholder="Near school, mall, etc." maxLength={100} value={form.landmark} error={errors.landmark} onChange={update} />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="City" field="city" placeholder="City" maxLength={50} value={form.city} error={errors.city} onChange={update} />
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1">State</label>
                    <select
                      value={form.state}
                      onChange={(e) => update("state", e.target.value)}
                      className={`w-full px-4 py-3 bg-card border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                        errors.state ? "border-red-400" : "border-border"
                      }`}
                    >
                      <option value="">Select state</option>
                      {INDIAN_STATES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    {errors.state && <p className="text-xs text-red-500 mt-1">{errors.state}</p>}
                  </div>
                </div>
                <InputField label="Pincode" field="pincode" type="text" inputMode="numeric" placeholder="6-digit pincode" maxLength={6} value={form.pincode} error={errors.pincode} onChange={update} />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 text-base"
            >
              Proceed to Payment <ChevronRight size={18} />
            </button>
          </form>

          {/* Order Summary - 2/5 */}
          <div className="md:col-span-2">
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Order Summary</h3>
              <div className="space-y-3 max-h-52 overflow-y-auto mb-4 pr-1">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center gap-3 text-sm">
                    <div className="w-10 h-10 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                      <img src={item.product.image} alt={item.product.name} loading="lazy" width={40} height={40} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground truncate">{item.product.name}</p>
                      <p className="text-muted-foreground text-xs">× {item.quantity}</p>
                    </div>
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
                  <span className={deliveryCharge === 0 ? "text-green-600 font-medium" : "text-foreground"}>
                    {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-border">
                  <span className="text-foreground">Total</span>
                  <span className="text-primary">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>
              {deliveryCharge === 0 && (
                <p className="text-xs text-primary text-center mt-3 bg-primary/10 rounded-lg py-2">
                  🎉 You saved ₹50 on delivery!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
