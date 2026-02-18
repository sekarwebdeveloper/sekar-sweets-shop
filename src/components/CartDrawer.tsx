import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, totalPrice, isOpen, setIsOpen, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-card z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="font-heading text-xl font-bold text-foreground">Your Cart</h2>
              <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <X size={24} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
                <ShoppingBag size={48} className="text-muted-foreground/40" />
                <p className="text-muted-foreground">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 p-3 bg-background rounded-lg">
                      <div className="w-16 h-16 bg-muted rounded-md flex items-center justify-center flex-shrink-0">
                        <ShoppingBag size={20} className="text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-foreground truncate">{item.product.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.product.weight}</p>
                        <p className="text-primary font-semibold text-sm mt-1">₹{item.product.price}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                          <X size={14} />
                        </button>
                        <div className="flex items-center gap-2 bg-muted rounded-md">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="p-1 hover:text-primary transition-colors">
                            <Minus size={12} />
                          </button>
                          <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="p-1 hover:text-primary transition-colors">
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 border-t border-border space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-heading text-xl font-bold text-foreground">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      navigate("/checkout/details");
                    }}
                    className="w-full py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Checkout
                  </button>
                  <button onClick={clearCart} className="w-full py-2 text-sm text-muted-foreground hover:text-destructive transition-colors">
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
