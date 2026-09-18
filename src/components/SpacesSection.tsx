import React, { useState } from 'react';
import { SpaceInspiration, Product } from '../types';
import { ArrowRight, Plus, Eye, Check } from 'lucide-react';

interface SpacesSectionProps {
  spaces: SpaceInspiration[];
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const SpacesSection: React.FC<SpacesSectionProps> = ({
  spaces,
  products,
  onSelectProduct,
  onAddToCart,
}) => {
  const [activeSpaceIndex, setActiveSpaceIndex] = useState(0);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [addedHotspotId, setAddedHotspotId] = useState<string | null>(null);

  const currentSpace = spaces[activeSpaceIndex];

  const handleHotspotClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveHotspotId(activeHotspotId === id ? null : id);
  };

  const getProductForHotspot = (productId: string) => {
    return products.find((p) => p.id === productId);
  };

  return (
    <section id="spaces" className="py-20 sm:py-28 bg-[#E7DED1]/50 border-b border-[#D5CDC0]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 sm:mb-16">
          <div>
            <span
              id="spaces-eyebrow"
              className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#4A5139] block mb-2"
            >
              Living In Situ · Editorial Gallery
            </span>
            <h2
              id="spaces-heading"
              className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#24231F] leading-[1.15]"
            >
              Spaces made for everyday moments.
            </h2>
          </div>

          {/* Space switcher tabs */}
          <div className="mt-6 lg:mt-0 flex items-center space-x-1 sm:space-x-2 bg-[#F4F0E8] p-1.5 rounded-lg border border-[#D5CDC0]">
            {spaces.map((space, idx) => (
              <button
                key={space.id}
                id={`space-tab-${space.id}`}
                onClick={() => {
                  setActiveSpaceIndex(idx);
                  setActiveHotspotId(null);
                }}
                className={`px-3 sm:px-4 py-2 text-xs font-medium uppercase tracking-wider rounded transition-all ${
                  activeSpaceIndex === idx
                    ? 'bg-[#303A25] text-[#F4F0E8] shadow-sm'
                    : 'text-[#777269] hover:text-[#24231F] hover:bg-[#E7DED1]/40'
                }`}
              >
                {space.title}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left: Interactive Room Visualizer with Hotspots */}
          <div
            className="lg:col-span-7 relative"
            onClick={() => setActiveHotspotId(null)}
          >
            <div className="relative rounded-lg overflow-hidden border border-[#D5CDC0] shadow-[0_16px_40px_-16px_rgba(36,35,31,0.12)] aspect-[4/3] bg-[#E7DED1]">
              <img
                src={currentSpace.image}
                alt={currentSpace.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* Hotspot Markers */}
              {currentSpace.hotspots.map((hs) => {
                const isSelected = activeHotspotId === hs.id;
                const matchedProduct = getProductForHotspot(hs.productId);

                return (
                  <div
                    key={hs.id}
                    style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  >
                    {/* Pulsing Pin Button */}
                    <button
                      id={`hotspot-btn-${hs.id}`}
                      type="button"
                      aria-label={`View ${hs.title}`}
                      onClick={(e) => handleHotspotClick(hs.id, e)}
                      className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-200 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                        isSelected
                          ? 'bg-[#303A25] text-[#F4F0E8] ring-4 ring-white/80'
                          : 'bg-[#F4F0E8]/90 text-[#24231F] shadow-lg hover:bg-white'
                      }`}
                    >
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-40"></span>
                      <Plus className={`w-4 h-4 transition-transform duration-200 ${isSelected ? 'rotate-45' : ''}`} />
                    </button>

                    {/* Popover Card */}
                    {isSelected && (
                      <div
                        id={`hotspot-popover-${hs.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 bg-[#F4F0E8] p-3.5 rounded-lg shadow-2xl border border-[#D5CDC0] z-30 animate-in fade-in zoom-in-95 duration-200"
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="text-[9px] uppercase tracking-wider text-[#4A5139] font-medium">
                              {hs.category}
                            </span>
                            <h4 className="font-serif-editorial text-base font-semibold text-[#24231F]">
                              {hs.title}
                            </h4>
                          </div>
                          <span className="font-serif-editorial text-sm font-semibold text-[#24231F]">
                            ${hs.price.toLocaleString()}
                          </span>
                        </div>

                        <div className="mt-3 flex gap-2">
                          {matchedProduct && (
                            <>
                              <button
                                type="button"
                                onClick={() => onSelectProduct(matchedProduct)}
                                className="flex-1 py-1.5 px-2 bg-[#E7DED1] hover:bg-[#D5CDC0] text-[#24231F] rounded text-[11px] font-medium tracking-wider uppercase flex items-center justify-center space-x-1 transition-colors"
                              >
                                <Eye className="w-3 h-3" />
                                <span>Details</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  onAddToCart(matchedProduct);
                                  setAddedHotspotId(hs.id);
                                  setTimeout(() => setAddedHotspotId(null), 1800);
                                }}
                                className="flex-1 py-1.5 px-2 bg-[#303A25] hover:bg-[#4A5139] text-[#F4F0E8] rounded text-[11px] font-medium tracking-wider uppercase flex items-center justify-center space-x-1 transition-colors"
                              >
                                {addedHotspotId === hs.id ? (
                                  <>
                                    <Check className="w-3 h-3" />
                                    <span>Added</span>
                                  </>
                                ) : (
                                  <span>Add to Bag</span>
                                )}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Subtle instruction caption */}
              <div className="absolute bottom-3 right-3 bg-[#24231F]/65 backdrop-blur-sm text-[#F4F0E8] text-[10px] uppercase tracking-wider py-1 px-2.5 rounded">
                Click pins to inspect pieces
              </div>
            </div>
          </div>

          {/* Right: Architectural Narrative */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full">
            <div>
              <div className="inline-block text-[11px] uppercase tracking-[0.2em] font-semibold text-[#765238] mb-2">
                {currentSpace.roomType}
              </div>

              <h3 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl text-[#24231F] font-normal mb-4">
                {currentSpace.title}
              </h3>

              <p className="text-[#777269] text-sm sm:text-base leading-relaxed mb-6">
                {currentSpace.description}
              </p>

              {/* Editorial Quote Card */}
              <div className="p-5 sm:p-6 bg-[#F4F0E8] rounded border-l-2 border-[#303A25] mb-8 shadow-sm">
                <p className="font-serif-editorial italic text-base sm:text-lg text-[#24231F] leading-relaxed">
                  “{currentSpace.quote}”
                </p>
                <p className="text-[11px] uppercase tracking-wider text-[#777269] mt-3 font-medium">
                  — {currentSpace.designer}
                </p>
              </div>

              {/* Room Inventory List */}
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-wider font-semibold text-[#24231F] block mb-2">
                  Featured in this room:
                </span>
                {currentSpace.hotspots.map((hs) => (
                  <div
                    key={hs.id}
                    onClick={() => setActiveHotspotId(hs.id)}
                    className="flex items-center justify-between py-2 px-3 bg-[#F4F0E8] hover:bg-[#E7DED1] rounded border border-[#D5CDC0]/60 cursor-pointer transition-colors text-xs"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4A5139]"></span>
                      <span className="font-medium text-[#24231F]">{hs.title}</span>
                      <span className="text-[#777269]">({hs.category})</span>
                    </div>
                    <span className="font-serif-editorial font-semibold text-[#24231F]">
                      ${hs.price.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#D5CDC0]/80">
              <a
                href="#collection"
                className="inline-flex items-center text-xs uppercase tracking-[0.2em] font-semibold text-[#303A25] hover:text-[#4A5139] group"
              >
                <span>Browse All Architectural Pieces</span>
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
