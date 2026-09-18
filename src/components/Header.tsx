import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenSearch,
  onOpenWishlist,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Collection', href: '#collection' },
    { label: 'Spaces', href: '#spaces' },
    { label: 'Philosophy', href: '#philosophy' },
    { label: 'Journal', href: '#journal' },
    { label: 'Consultation', href: '#consultation' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F4F0E8]/95 backdrop-blur-md shadow-[0_4px_20px_-10px_rgba(36,35,31,0.08)] border-b border-[#D5CDC0]/70 py-3.5'
            : 'bg-[#F4F0E8] border-b border-[#D5CDC0]/40 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Logo Treatment */}
            <a
              id="header-brand-logo"
              href="#"
              className="group flex flex-col items-start focus:outline-none focus-visible:ring-2 focus-visible:ring-[#303A25] rounded p-1"
            >
              <span className="font-serif-editorial text-2xl sm:text-3xl font-medium tracking-[0.18em] text-[#24231F] group-hover:text-[#303A25] transition-colors uppercase">
                Auren
              </span>
              <span className="text-[9px] tracking-[0.35em] text-[#777269] -mt-1 uppercase font-medium">
                Living · Interiors
              </span>
            </a>

            {/* Center: Desktop Navigation */}
            <nav id="desktop-nav" aria-label="Main Navigation" className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  id={`nav-link-${link.label.toLowerCase()}`}
                  onClick={() => handleNavClick(link.href)}
                  className="text-xs uppercase tracking-[0.16em] font-medium text-[#24231F]/80 hover:text-[#303A25] transition-colors py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#303A25] hover:after:w-full after:transition-all after:duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#303A25]"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Right: Utility Controls */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Search trigger */}
              <button
                id="header-search-button"
                onClick={onOpenSearch}
                aria-label="Search catalog and journal"
                className="flex items-center space-x-1.5 p-2 text-[#24231F] hover:text-[#303A25] hover:bg-[#E7DED1]/60 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#303A25]"
              >
                <Search className="w-4 h-4" />
                <span className="hidden lg:inline-block text-xs uppercase tracking-wider font-medium text-[#777269]">
                  Search
                </span>
                <span className="hidden xl:inline-block text-[10px] bg-[#E7DED1] text-[#777269] px-1.5 py-0.5 rounded text-xs">
                  ⌘K
                </span>
              </button>

              {/* Wishlist trigger */}
              <button
                id="header-wishlist-button"
                onClick={onOpenWishlist}
                aria-label={`Wishlist with ${wishlistCount} items`}
                className="relative p-2 text-[#24231F] hover:text-[#303A25] hover:bg-[#E7DED1]/60 rounded-full transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#303A25]"
              >
                <Heart className="w-4 h-4" />
                {wishlistCount > 0 && (
                  <span
                    id="header-wishlist-badge"
                    className="absolute top-1 right-1 w-4 h-4 bg-[#765238] text-white text-[9px] font-bold flex items-center justify-center rounded-full"
                  >
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping bag trigger */}
              <button
                id="header-cart-button"
                onClick={onOpenCart}
                aria-label={`Shopping bag with ${cartCount} items`}
                className="relative flex items-center space-x-2 py-2 px-3 bg-[#303A25] hover:bg-[#4A5139] text-[#F4F0E8] rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24231F]"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-[#F4F0E8]" />
                <span className="text-xs uppercase tracking-wider font-medium">Bag</span>
                <span
                  id="header-cart-count"
                  className="w-4 h-4 bg-[#F4F0E8] text-[#303A25] text-[10px] font-bold flex items-center justify-center rounded-full"
                >
                  {cartCount}
                </span>
              </button>

              {/* Mobile menu toggle */}
              <button
                id="header-mobile-menu-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle mobile menu"
                className="md:hidden p-2 text-[#24231F] hover:text-[#303A25] rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#303A25]"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="fixed inset-0 z-50 md:hidden bg-[#24231F]/50 backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#F4F0E8] shadow-2xl p-6 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#D5CDC0]">
                <div>
                  <span className="font-serif-editorial text-2xl font-medium tracking-widest uppercase text-[#24231F]">
                    Auren
                  </span>
                  <p className="text-[9px] tracking-widest text-[#777269] uppercase">Living · Interiors</p>
                </div>
                <button
                  id="mobile-nav-close"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-[#777269] hover:text-[#24231F] rounded-full"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-8 space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href)}
                    className="w-full flex items-center justify-between text-left py-2.5 text-lg font-serif-editorial text-[#24231F] hover:text-[#303A25] border-b border-[#D5CDC0]/30"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-[#777269]" />
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#D5CDC0] space-y-3 text-xs text-[#777269]">
              <p className="font-medium text-[#24231F]">Auren Design Studio</p>
              <p>42 Galerie des Ateliers, Paris · Copenhagen</p>
              <p>concierge@aurenliving.com</p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenCart();
                  }}
                  className="w-full py-3 bg-[#303A25] text-[#F4F0E8] rounded text-center font-medium tracking-wider uppercase text-xs"
                >
                  View Shopping Bag ({cartCount})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
