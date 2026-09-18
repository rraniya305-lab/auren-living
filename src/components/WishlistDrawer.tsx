import React from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistIds: string[];
  products: Product[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onToggleWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div
      id="wishlist-drawer-backdrop"
      className="fixed inset-0 z-50 bg-[#24231F]/50 backdrop-blur-sm flex justify-end animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="wishlist-drawer-panel"
        className="w-full max-w-md bg-[#F4F0E8] h-full shadow-2xl flex flex-col justify-between border-l border-[#D5CDC0] p-6 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-[#D5CDC0]">
            <div className="flex items-center space-x-2">
              <Heart className="w-4 h-4 text-[#765238] fill-current" />
              <h3 className="font-serif-editorial text-xl font-medium text-[#24231F]">
                Curated Wishlist ({wishlistedProducts.length})
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-[#777269] hover:text-[#24231F] rounded-full"
              aria-label="Close wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 divide-y divide-[#D5CDC0]/50 max-h-[70vh] overflow-y-auto pr-1">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="w-10 h-10 mx-auto text-[#D5CDC0] mb-3" />
                <p className="font-serif-editorial text-lg text-[#24231F]">
                  Your wishlist is empty
                </p>
                <p className="text-xs text-[#777269] mt-1">
                  Save your favorite architectural pieces as you explore the catalog.
                </p>
              </div>
            ) : (
              wishlistedProducts.map((product) => (
                <div key={product.id} className="py-4 flex gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded bg-[#E7DED1] border border-[#D5CDC0]/80 flex-shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-serif-editorial text-base font-medium text-[#24231F] leading-tight">
                          {product.name}
                        </h4>
                        <button
                          onClick={() => onToggleWishlist(product.id)}
                          aria-label={`Remove ${product.name}`}
                          className="text-[#777269] hover:text-red-700 p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-[#777269] block mt-0.5">
                        {product.category} · ${product.price.toLocaleString()}
                      </span>
                    </div>

                    <div className="mt-3">
                      <button
                        type="button"
                        onClick={() => {
                          onAddToCart(product);
                          onToggleWishlist(product.id);
                        }}
                        className="w-full py-1.5 px-3 bg-[#303A25] hover:bg-[#4A5139] text-[#F4F0E8] rounded text-xs uppercase tracking-wider font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {wishlistedProducts.length > 0 && (
          <div className="pt-4 border-t border-[#D5CDC0]">
            <button
              onClick={() => {
                wishlistedProducts.forEach((p) => onAddToCart(p));
                onClose();
              }}
              className="w-full py-3 bg-[#303A25] hover:bg-[#4A5139] text-[#F4F0E8] rounded text-xs font-semibold uppercase tracking-wider"
            >
              Add All to Shopping Bag
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
