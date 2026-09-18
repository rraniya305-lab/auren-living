import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Plus, Minus, Trash2, ShoppingBag, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const discount = promoApplied ? subtotal * 0.1 : 0;
  const freeShippingThreshold = 2500;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shipping = isFreeShipping || subtotal === 0 ? 0 : 150;
  const total = subtotal - discount + shipping;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'AUREN10') {
      setPromoApplied(true);
    } else {
      alert('Try promo code: AUREN10 for 10% demo discount');
    }
  };

  const handleSimulateCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
    setTimeout(() => {
      onClearCart();
      setOrderComplete(false);
      setIsCheckingOut(false);
      onClose();
    }, 4000);
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 bg-[#24231F]/50 backdrop-blur-sm flex justify-end animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="cart-drawer-panel"
        className="w-full max-w-md bg-[#F4F0E8] h-full shadow-2xl flex flex-col justify-between border-l border-[#D5CDC0] p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#D5CDC0]">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-4 h-4 text-[#303A25]" />
              <h3 className="font-serif-editorial text-xl font-medium text-[#24231F]">
                Your Shopping Bag ({cartItems.reduce((s, i) => s + i.quantity, 0)})
              </h3>
            </div>
            <button
              id="close-cart-btn"
              onClick={onClose}
              className="p-1 text-[#777269] hover:text-[#24231F] rounded-full"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Shipping Progress Bar */}
          <div className="py-3 px-3.5 bg-[#E7DED1]/60 rounded-lg mt-4 border border-[#D5CDC0]/80">
            <div className="flex items-center justify-between text-xs text-[#24231F] mb-1.5 font-medium">
              <span className="flex items-center">
                <Truck className="w-3.5 h-3.5 mr-1.5 text-[#303A25]" />
                {isFreeShipping
                  ? 'Complimentary White-Glove Delivery unlocked!'
                  : `Add $${(freeShippingThreshold - subtotal).toLocaleString()} for Free White-Glove Delivery`}
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#D5CDC0] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#303A25] transition-all duration-300"
                style={{
                  width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%`,
                }}
              ></div>
            </div>
          </div>

          {/* Item list */}
          <div className="mt-6 divide-y divide-[#D5CDC0]/50 max-h-[48vh] overflow-y-auto pr-1">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-10 h-10 mx-auto text-[#D5CDC0] mb-3" />
                <p className="font-serif-editorial text-lg text-[#24231F]">
                  Your bag is currently empty
                </p>
                <p className="text-xs text-[#777269] mt-1">
                  Discover thoughtfully crafted furniture for your space.
                </p>
                <button
                  onClick={onClose}
                  className="mt-6 px-5 py-2.5 bg-[#303A25] text-[#F4F0E8] rounded text-xs uppercase tracking-wider font-semibold"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.product.id} className="py-4 flex gap-4">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded bg-[#E7DED1] border border-[#D5CDC0]/80 flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif-editorial text-base font-medium text-[#24231F] leading-tight">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          aria-label={`Remove ${item.product.name}`}
                          className="text-[#777269] hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-[#777269] block mt-0.5">
                        Finish: {item.selectedFinish}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#D5CDC0] rounded bg-[#F4F0E8]">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity - 1)
                          }
                          aria-label="Decrease quantity"
                          className="p-1 hover:bg-[#E7DED1] text-[#24231F]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-semibold text-[#24231F]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, item.quantity + 1)
                          }
                          aria-label="Increase quantity"
                          className="p-1 hover:bg-[#E7DED1] text-[#24231F]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif-editorial text-base font-semibold text-[#24231F]">
                        ${(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer Summary & Checkout */}
        {cartItems.length > 0 && (
          <div className="pt-4 border-t border-[#D5CDC0] space-y-3">
            {/* Promo code form */}
            {!promoApplied ? (
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo (try AUREN10)"
                  className="flex-1 bg-[#E7DED1]/50 border border-[#D5CDC0] rounded px-2.5 py-1.5 text-xs text-[#24231F] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#E7DED1] text-[#24231F] hover:bg-[#D5CDC0] rounded text-xs font-semibold uppercase tracking-wider"
                >
                  Apply
                </button>
              </form>
            ) : (
              <div className="text-xs text-[#4A5139] flex items-center justify-between bg-green-100/50 p-2 rounded">
                <span>Code AUREN10 applied (-10%)</span>
                <button
                  onClick={() => setPromoApplied(false)}
                  className="text-[#777269] underline text-[10px]"
                >
                  Remove
                </button>
              </div>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#777269]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#24231F]">${subtotal.toLocaleString()}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-[#4A5139]">
                  <span>Discount</span>
                  <span>-${discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>White-Glove In-Room Delivery</span>
                <span className="text-[#24231F]">
                  {shipping === 0 ? 'Complimentary' : `$${shipping}`}
                </span>
              </div>
              <div className="flex justify-between text-base font-semibold text-[#24231F] pt-2 border-t border-[#D5CDC0]/60 font-serif-editorial">
                <span>Estimated Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              id="proceed-checkout-btn"
              onClick={() => setIsCheckingOut(true)}
              className="w-full py-3.5 bg-[#303A25] hover:bg-[#4A5139] text-[#F4F0E8] rounded text-xs font-semibold uppercase tracking-[0.18em] transition-colors shadow-sm flex items-center justify-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4 text-[#F4F0E8]" />
              <span>Proceed to Demonstration Checkout</span>
            </button>

            <p className="text-[10px] text-center text-[#777269]">
              Client demonstration e-commerce flow. No real transaction will occur.
            </p>
          </div>
        )}

        {/* Demo Checkout Modal */}
        {isCheckingOut && (
          <div
            className="fixed inset-0 z-50 bg-[#24231F]/70 flex items-center justify-center p-4"
            onClick={() => setIsCheckingOut(false)}
          >
            <div
              className="bg-[#F4F0E8] max-w-md w-full p-6 sm:p-8 rounded-xl shadow-2xl border border-[#D5CDC0] max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {orderComplete ? (
                <div className="text-center py-6">
                  <CheckCircle2 className="w-12 h-12 text-[#303A25] mx-auto mb-4 animate-bounce" />
                  <h3 className="font-serif-editorial text-2xl text-[#24231F] mb-2">
                    Order Reserved Successfully
                  </h3>
                  <p className="text-xs text-[#777269] leading-relaxed mb-4">
                    Reference #{Math.floor(100000 + Math.random() * 900000)}. Our studio concierge will contact you to schedule white-glove arrival and custom room placement.
                  </p>
                  <p className="text-[11px] text-[#4A5139] font-medium">
                    (Demonstration state — cart has been cleared)
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSimulateCheckout} className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-[#D5CDC0]">
                    <h3 className="font-serif-editorial text-xl font-medium text-[#24231F]">
                      White-Glove Order Checkout
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="p-1 text-[#777269]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-xs text-[#777269] bg-[#E7DED1]/60 p-3 rounded">
                    Demonstration order for {cartItems.length} items (${total.toLocaleString()}).
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#24231F] font-semibold mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      defaultValue="Alexandra Wright"
                      className="w-full bg-[#E7DED1]/40 border border-[#D5CDC0] rounded px-3 py-2 text-xs text-[#24231F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#24231F] font-semibold mb-1">
                      Delivery Address
                    </label>
                    <input
                      type="text"
                      required
                      defaultValue="742 Evergreen Terrace, Portland, OR"
                      className="w-full bg-[#E7DED1]/40 border border-[#D5CDC0] rounded px-3 py-2 text-xs text-[#24231F]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#24231F] font-semibold mb-1">
                      Delivery Notes / Floor Access
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Elevator access available, 3rd floor"
                      className="w-full bg-[#E7DED1]/40 border border-[#D5CDC0] rounded px-3 py-2 text-xs text-[#24231F]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#303A25] hover:bg-[#4A5139] text-[#F4F0E8] rounded text-xs font-semibold uppercase tracking-wider mt-4"
                  >
                    Confirm Demonstration Order (${total.toLocaleString()})
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
