import React, { useState } from 'react';
import { Product } from '../types';
import { X, Heart, ShoppingBag, Check, ShieldCheck, Ruler, Sparkles } from 'lucide-react';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, finish: string, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [selectedFinish, setSelectedFinish] = useState(product.finishes[0]?.name || 'Standard');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, selectedFinish, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div
      id="product-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#24231F]/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="product-modal-card"
        className="bg-[#F4F0E8] max-w-4xl w-full rounded-xl shadow-2xl border border-[#D5CDC0] my-8 overflow-hidden relative max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-product-modal"
          onClick={onClose}
          aria-label="Close product view"
          className="absolute top-4 right-4 z-20 p-2 bg-[#F4F0E8]/90 hover:bg-white text-[#24231F] rounded-full shadow-md transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="md:w-1/2 p-6 bg-[#E7DED1]/50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#D5CDC0]">
          <div className="relative aspect-square rounded-lg overflow-hidden bg-[#E7DED1] border border-[#D5CDC0]">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-[#303A25] text-[#F4F0E8] text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded shadow-sm">
                {product.badge}
              </span>
            )}
          </div>

          {/* Alternate Thumbnail Views */}
          {product.secondaryImage && (
            <div className="flex gap-3 mt-4">
              <button
                type="button"
                onClick={() => setActiveImage(product.image)}
                className={`w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                  activeImage === product.image ? 'border-[#303A25]' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={product.image}
                  alt={`${product.name} primary`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
              <button
                type="button"
                onClick={() => setActiveImage(product.secondaryImage!)}
                className={`w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                  activeImage === product.secondaryImage ? 'border-[#303A25]' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={product.secondaryImage}
                  alt={`${product.name} detail view`}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-[#D5CDC0]/80 flex items-center justify-between text-xs text-[#777269]">
            <span className="flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1 text-[#303A25]" />
              12-Year Structural Frame Warranty
            </span>
            <span>Made in Europe</span>
          </div>
        </div>

        {/* Right Column: Details & Customization */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-[#777269] font-medium mb-1">
              <span>{product.category}</span>
              <span className="text-[#4A5139]">{product.leadTime}</span>
            </div>

            <h2 className="font-serif-editorial text-2xl sm:text-3xl font-medium text-[#24231F] mb-2">
              {product.name}
            </h2>

            <div className="flex items-baseline space-x-2 mb-4">
              <span className="font-serif-editorial text-2xl font-semibold text-[#24231F]">
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-[#777269] line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-[10px] text-[#777269] uppercase tracking-wider pl-1">
                USD
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#777269] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Finish Selection */}
            <div className="mb-6">
              <label className="block text-xs uppercase tracking-wider font-semibold text-[#24231F] mb-2">
                Material & Finish: <span className="font-normal text-[#777269]">{selectedFinish}</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {product.finishes.map((finish) => {
                  const isSelected = selectedFinish === finish.name;
                  return (
                    <button
                      key={finish.name}
                      type="button"
                      onClick={() => setSelectedFinish(finish.name)}
                      className={`flex items-center space-x-2 px-3 py-1.5 rounded border text-xs transition-all ${
                        isSelected
                          ? 'border-[#303A25] bg-[#303A25]/5 text-[#24231F] font-medium ring-1 ring-[#303A25]'
                          : 'border-[#D5CDC0] text-[#777269] hover:border-[#24231F]'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black/20"
                        style={{ backgroundColor: finish.colorHex }}
                      />
                      <span>{finish.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Specifications Box */}
            <div className="bg-[#E7DED1]/50 p-4 rounded-lg border border-[#D5CDC0] space-y-2 mb-6 text-xs text-[#24231F]">
              <div className="flex items-start">
                <Ruler className="w-4 h-4 text-[#765238] mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold block">Dimensions:</span>
                  <span className="text-[#777269]">{product.dimensions}</span>
                </div>
              </div>
              <div className="flex items-start pt-1.5 border-t border-[#D5CDC0]/60">
                <Sparkles className="w-4 h-4 text-[#765238] mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold block">Primary Composition:</span>
                  <span className="text-[#777269]">{product.materials}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-[#D5CDC0] space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity */}
              <div className="flex items-center border border-[#D5CDC0] rounded bg-[#F4F0E8] p-1">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2.5 py-1 text-sm text-[#24231F] hover:bg-[#E7DED1] rounded"
                >
                  -
                </button>
                <span className="px-3 text-xs font-semibold text-[#24231F]">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2.5 py-1 text-sm text-[#24231F] hover:bg-[#E7DED1] rounded"
                >
                  +
                </button>
              </div>

              {/* Add to Bag Button */}
              <button
                type="button"
                id="modal-add-to-bag"
                onClick={handleAdd}
                className="flex-1 py-3 px-5 bg-[#303A25] hover:bg-[#4A5139] text-[#F4F0E8] rounded text-xs uppercase tracking-wider font-semibold flex items-center justify-center space-x-2 transition-all shadow-sm"
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag · ${(product.price * quantity).toLocaleString()}</span>
                  </>
                )}
              </button>

              {/* Wishlist */}
              <button
                type="button"
                onClick={() => onToggleWishlist(product.id)}
                aria-label="Wishlist"
                className={`p-3 border rounded transition-colors ${
                  isWishlisted
                    ? 'border-[#765238] bg-[#765238] text-white'
                    : 'border-[#D5CDC0] hover:border-[#303A25] text-[#24231F]'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
