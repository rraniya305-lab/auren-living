import React from 'react';
import { ArrowUpRight, Compass, Sparkles } from 'lucide-react';

interface HeroProps {
  onExploreCollection: () => void;
  onExploreSpaces: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreCollection, onExploreSpaces }) => {
  return (
    <section
      id="hero-section"
      className="relative pt-28 sm:pt-36 pb-16 sm:pb-24 overflow-hidden bg-[#F4F0E8]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left: Text Content */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
            {/* Eyebrow Label */}
            <div className="inline-flex items-center space-x-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#303A25]"></span>
              <span
                id="hero-eyebrow-label"
                className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#4A5139]"
              >
                Vol. IV · Architectural Essentials
              </span>
            </div>

            {/* Original Compelling Headline */}
            <h1
              id="hero-headline"
              className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-normal leading-[1.08] text-[#24231F] mb-6"
            >
              Designed for the way you live.
            </h1>

            {/* Supporting Paragraph */}
            <p
              id="hero-description"
              className="text-[#777269] text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
            >
              Sculptural forms crafted from certified solid oak, tactile bouclé, and honed travertine. Furniture shaped with architectural restraint—bringing warmth, tactile richness, and enduring composure into modern interiors.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mb-10">
              <button
                id="hero-primary-cta"
                onClick={onExploreCollection}
                className="group inline-flex items-center justify-center px-7 py-4 bg-[#303A25] hover:bg-[#4A5139] text-[#F4F0E8] text-xs uppercase tracking-[0.18em] font-semibold rounded transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#303A25]"
              >
                <span>Explore Collection</span>
                <ArrowUpRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#F4F0E8]" />
              </button>

              <button
                id="hero-secondary-cta"
                onClick={onExploreSpaces}
                className="group inline-flex items-center justify-center px-6 py-4 bg-transparent hover:bg-[#E7DED1]/70 border border-[#D5CDC0] text-[#24231F] text-xs uppercase tracking-[0.18em] font-medium rounded transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#303A25]"
              >
                <Compass className="mr-2 w-4 h-4 text-[#777269] group-hover:text-[#24231F]" />
                <span>Discover Spaces</span>
              </button>
            </div>

            {/* Trust Indicators / Subtle Editorial Badges */}
            <div className="pt-6 border-t border-[#D5CDC0]/80 grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="block font-serif-editorial text-xl font-medium text-[#24231F]">
                  100%
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#777269]">
                  Solid Hardwood
                </span>
              </div>
              <div>
                <span className="block font-serif-editorial text-xl font-medium text-[#24231F]">
                  12-Year
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#777269]">
                  Frame Guarantee
                </span>
              </div>
              <div>
                <span className="block font-serif-editorial text-xl font-medium text-[#24231F]">
                  Normandy
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#777269]">
                  Artisan Joinery
                </span>
              </div>
            </div>
          </div>

          {/* Right: High-Resolution Architectural Photography */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative">
              {/* Decorative Subtle Framing Accent */}
              <div className="absolute -inset-2 sm:-inset-3 border border-[#D5CDC0]/60 rounded-xl pointer-events-none hidden sm:block"></div>

              {/* Main Image Container */}
              <div className="relative overflow-hidden rounded-lg shadow-[0_20px_50px_-20px_rgba(36,35,31,0.15)] bg-[#E7DED1] aspect-[16/10] sm:aspect-[16/10]">
                <img
                  id="hero-featured-image"
                  src="/assets/images/auren_hero_living_1789745490367.jpg"
                  alt="Auren Living contemporary sunlit interior featuring Solenne lounge chair, natural travertine table and oak credenza"
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />

                {/* Floating Architectural Badge */}
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#F4F0E8]/90 backdrop-blur-md border border-[#D5CDC0] py-2 px-3.5 rounded shadow-sm text-left">
                  <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#4A5139] flex items-center">
                    <Sparkles className="w-3 h-3 mr-1.5 text-[#765238]" />
                    Featured Composition
                  </p>
                  <p className="font-serif-editorial text-sm font-medium text-[#24231F]">
                    The Pavillon Residence, Provence
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
