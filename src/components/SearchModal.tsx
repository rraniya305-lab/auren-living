import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { Search, X, ArrowUpRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // parent opens
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filtered = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.materials.toLowerCase().includes(query.toLowerCase()) ||
          p.tagline.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const quickKeywords = ['Bouclé', 'Solid Oak', 'Travertine', 'Modular', 'Dining Table', 'Console'];

  return (
    <div
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#24231F]/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24"
      onClick={onClose}
    >
      <div
        id="search-modal-panel"
        className="bg-[#F4F0E8] max-w-2xl w-full rounded-xl shadow-2xl border border-[#D5CDC0] p-6 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center space-x-3 pb-4 border-b border-[#D5CDC0]">
          <Search className="w-5 h-5 text-[#4A5139]" />
          <input
            ref={inputRef}
            id="search-query-input"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search furniture, materials (oak, bouclé, travertine)..."
            className="flex-1 bg-transparent text-base text-[#24231F] placeholder:text-[#777269] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#777269] hover:text-[#24231F]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block text-[10px] uppercase bg-[#E7DED1] text-[#777269] px-2 py-0.5 rounded">
            ESC
          </kbd>
        </div>

        {/* Quick keywords */}
        {!query && (
          <div className="pt-5 pb-2">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#777269] block mb-2.5">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {quickKeywords.map((kw) => (
                <button
                  key={kw}
                  onClick={() => setQuery(kw)}
                  className="px-3 py-1 bg-[#E7DED1]/70 hover:bg-[#D5CDC0] text-[#24231F] rounded-full text-xs font-medium transition-colors"
                >
                  {kw}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query && (
          <div className="mt-4 max-h-[50vh] overflow-y-auto divide-y divide-[#D5CDC0]/50 pr-1">
            {filtered.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#777269]">
                No architectural pieces found matching "{query}". Try searching for "Oak", "Sofa", or "Table".
              </div>
            ) : (
              filtered.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="py-3 px-2 flex items-center justify-between hover:bg-[#E7DED1]/50 rounded cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded bg-[#E7DED1] border border-[#D5CDC0]/60"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-serif-editorial text-base font-semibold text-[#24231F]">
                        {product.name}
                      </h4>
                      <p className="text-[11px] text-[#777269]">
                        {product.category} · {product.materials.split(',')[0]}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="font-serif-editorial font-semibold text-sm text-[#24231F]">
                      ${product.price.toLocaleString()}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-[#777269]" />
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};
