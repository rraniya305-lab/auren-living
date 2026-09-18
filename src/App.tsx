import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './data/products';
import { SPACES } from './data/spaces';
import { Product, CartItem } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandStatement } from './components/BrandStatement';
import { FeaturedCollection } from './components/FeaturedCollection';
import { SpacesSection } from './components/SpacesSection';
import { DesignPrinciples } from './components/DesignPrinciples';
import { JournalSection } from './components/JournalSection';
import { DesignConsultationCta } from './components/DesignConsultationCta';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductModal } from './components/ProductModal';
import { SearchModal } from './components/SearchModal';
import { ConsultationModal } from './components/ConsultationModal';
import { Toast } from './components/Toast';

export default function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('auren_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    // Default initial sample item to show realistic active cart
    return [
      {
        product: PRODUCTS[0],
        quantity: 1,
        selectedFinish: PRODUCTS[0].finishes[0]?.name || 'Standard',
      },
    ];
  });

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('auren_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return [PRODUCTS[1].id, PRODUCTS[3].id];
  });

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [consultationType, setConsultationType] = useState<'consultation' | 'swatches'>('consultation');
  const [toast, setToast] = useState<{ message: string; type: 'cart' | 'wishlist' | 'info' } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('auren_cart', JSON.stringify(cartItems));
    } catch (e) {}
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('auren_wishlist', JSON.stringify(wishlistIds));
    } catch (e) {}
  }, [wishlistIds]);

  const showToast = (message: string, type: 'cart' | 'wishlist' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3500);
  };

  const handleAddToCart = (product: Product, finish?: string, quantity: number = 1) => {
    const selectedFinish = finish || product.finishes[0]?.name || 'Standard';
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedFinish === selectedFinish
      );
      if (existing) {
        return prev.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { product, quantity, selectedFinish }];
    });
    showToast(`Added ${quantity > 1 ? `${quantity}x ` : ''}${product.name} to bag`, 'cart');
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Removed piece from bag', 'cart');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const isPresent = prev.includes(productId);
      const product = PRODUCTS.find((p) => p.id === productId);
      if (isPresent) {
        showToast(`Removed from wishlist`, 'wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast(`Saved ${product?.name || 'piece'} to wishlist`, 'wishlist');
        return [...prev, productId];
      }
    });
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F4F0E8] text-[#24231F] font-sans selection:bg-[#303A25] selection:text-[#F4F0E8]">
      {/* Top Banner Notice (Subtle, refined luxury notice) */}
      <div className="bg-[#303A25] text-[#E7DED1] text-[11px] uppercase tracking-[0.22em] py-2 px-4 text-center font-medium border-b border-[#4A5139]">
        <span>Complimentary In-Home White-Glove Placement on Orders Over $2,500</span>
      </div>

      {/* Main Header */}
      <Header
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onExploreCollection={() => scrollToSection('collection')}
          onExploreSpaces={() => scrollToSection('spaces')}
        />

        <BrandStatement />

        <FeaturedCollection
          products={PRODUCTS}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onOpenProductModal={(product) => setSelectedProduct(product)}
        />

        <SpacesSection
          spaces={SPACES}
          products={PRODUCTS}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={handleAddToCart}
        />

        <DesignPrinciples />

        <JournalSection />

        <DesignConsultationCta
          onOpenConsultationModal={() => {
            setConsultationType('consultation');
            setIsConsultationOpen(true);
          }}
          onRequestSwatches={() => {
            setConsultationType('swatches');
            setIsConsultationOpen(true);
          }}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Drawers & Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlistIds}
        products={PRODUCTS}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PRODUCTS}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        defaultType={consultationType}
      />

      {/* Non-intrusive Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
