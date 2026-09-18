import React, { useState, useMemo } from 'react';
import { Product } from '../types';
import { Heart, ShoppingBag, Eye, Check, SlidersHorizontal } from 'lucide-react';

interface FeaturedCollectionProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onAddToCart: (product: Product, finish?: string) => void;
  onOpenProductModal: (product: Product) => void;
}

export const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onOpenProductModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const categories = ['All', 'Seating', 'Tables', 'Storage', 'Lighting', 'Decor'];

  const filteredProducts = useMemo(() => {
    let list = products;
    if (activeCategory !== 'All') {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (sortBy === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [products, activeCategory, sortBy]);

  const handleAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setRecentlyAddedId(product.id);
    setTimeout(() => setRecentlyAddedId(null), 1800);
  };

  return (
    <section id="collection" className="py-20 sm:py-28 bg-[#F4F0E8] border-b border-[#D5CDC0]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <span
              id="collection-eyebrow"
              className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#4A5139] block mb-3"
            >
              Curated Furniture Edition
            </span>
            <h2
              id="collection-heading"
              className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#24231F] leading-[1.15]"
            >
              Objects of Quiet Distinction
            </h2>
            <p className="text-[#777269] text-sm sm:text-base mt-3 leading-relaxed">
              Constructed in numbered artisan runs. Honoring the authentic tension between soft organic forms and architectural balance.
            </p>
          </div>

          {/* Filtering & Sorting Controls */}
          <div className="mt-8 md:mt-0 flex flex-wrap items-center gap-3">
            <div className="flex items-center space-x-2 bg-[#E7DED1]/70 px-3 py-1.5 rounded text-xs text-[#24231F]">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#777269]" />
              <label htmlFor="collection-sort" className="text-[#777269] text-[11px] uppercase tracking-wider font-medium">
                Sort:
              </label>
              <select
                id="collection-sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent font-medium text-xs text-[#24231F] focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Editions</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Navigation Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-10 scrollbar-none border-b border-[#D5CDC0]/50">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                id={`category-pill-${cat.toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.16em] font-medium whitespace-nowrap rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#303A25] ${
                  isActive
                    ? 'bg-[#303A25] text-[#F4F0E8] shadow-sm'
                    : 'bg-transparent text-[#777269] hover:text-[#24231F] hover:bg-[#E7DED1]/50'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Grid */}
        <div
          id="product-grid"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {filteredProducts.map((product) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const isJustAdded = recentlyAddedId === product.id;

            return (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                onClick={() => onOpenProductModal(product)}
                className="group cursor-pointer flex flex-col bg-[#F4F0E8] rounded-md border border-[#D5CDC0]/70 hover:border-[#303A25]/40 transition-all duration-300 hover:shadow-[0_12px_32px_-12px_rgba(36,35,31,0.12)] overflow-hidden"
              >
                {/* Product Image Stage */}
                <div className="relative aspect-[4/3] bg-[#E7DED1]/60 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />

                  {/* Badge */}
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-[#303A25] text-[#F4F0E8] text-[9px] uppercase tracking-[0.2em] font-semibold px-2 py-0.5 rounded shadow-sm">
                      {product.badge}
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    id={`wishlist-toggle-${product.id}`}
                    type="button"
                    aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#303A25] ${
                      isWishlisted
                        ? 'bg-[#765238] text-white shadow-sm'
                        : 'bg-[#F4F0E8]/85 backdrop-blur-sm text-[#24231F] hover:bg-[#F4F0E8] hover:text-[#765238]'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {/* Quick View Overlay Button */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenProductModal(product);
                      }}
                      className="flex-1 py-2.5 bg-[#F4F0E8]/95 backdrop-blur-sm text-[#24231F] hover:bg-[#F4F0E8] text-[11px] uppercase tracking-wider font-semibold rounded flex items-center justify-center space-x-1.5 shadow-sm transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 text-[#4A5139]" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Product Meta */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.16em] text-[#777269] font-medium mb-1">
                      <span>{product.category}</span>
                      <span className="text-[#4A5139]">{product.inStock ? 'Available' : 'Pre-order'}</span>
                    </div>

                    <h3 className="font-serif-editorial text-lg sm:text-xl font-medium text-[#24231F] group-hover:text-[#303A25] transition-colors leading-snug">
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#777269] mt-1.5 line-clamp-2 leading-relaxed">
                      {product.tagline}
                    </p>

                    {/* Finish Swatches */}
                    <div className="flex items-center space-x-1.5 mt-3">
                      {product.finishes.map((f) => (
                        <span
                          key={f.name}
                          title={f.name}
                          className="w-2.5 h-2.5 rounded-full border border-[#D5CDC0]"
                          style={{ backgroundColor: f.colorHex }}
                        />
                      ))}
                      <span className="text-[10px] text-[#777269] pl-1">
                        {product.finishes.length} finishes
                      </span>
                    </div>
                  </div>

                  {/* Price and Add to Bag */}
                  <div className="pt-4 mt-4 border-t border-[#D5CDC0]/50 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline space-x-1.5">
                        <span className="font-serif-editorial text-xl font-semibold text-[#24231F]">
                          ${product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-[#777269] line-through">
                            ${product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <span className="text-[9px] uppercase tracking-wider text-[#777269]">
                        USD · Demo
                      </span>
                    </div>

                    <button
                      id={`add-to-cart-btn-${product.id}`}
                      type="button"
                      onClick={(e) => handleAdd(product, e)}
                      aria-label={`Add ${product.name} to cart`}
                      className={`p-2.5 rounded-full transition-all duration-200 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#303A25] ${
                        isJustAdded
                          ? 'bg-[#4A5139] text-white ring-2 ring-[#4A5139]'
                          : 'bg-[#303A25] text-[#F4F0E8] hover:bg-[#4A5139]'
                      }`}
                    >
                      {isJustAdded ? (
                        <Check className="w-4 h-4 text-[#F4F0E8]" />
                      ) : (
                        <ShoppingBag className="w-4 h-4 text-[#F4F0E8]" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on Demo Pricing */}
        <div className="mt-8 text-center text-xs text-[#777269]">
          <span>All shown prices are client-demonstration values. Shipping and white-glove assembly calculated at checkout.</span>
        </div>
      </div>
    </section>
  );
};
