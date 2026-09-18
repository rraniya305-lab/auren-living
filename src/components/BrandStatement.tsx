import React from 'react';

export const BrandStatement: React.FC = () => {
  return (
    <section
      id="brand-statement-section"
      className="relative w-full bg-[#303A25] text-[#F4F0E8] py-20 sm:py-28 overflow-hidden"
    >
      {/* Subtle Background Accent */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#F4F0E8_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <span
          id="statement-label"
          className="inline-block text-[11px] uppercase tracking-[0.3em] text-[#E7DED1]/75 mb-6 font-medium"
        >
          Our Philosophy & Provenance
        </span>

        <h2
          id="statement-heading"
          className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-normal leading-[1.2] text-[#F4F0E8] mb-8"
        >
          “We believe the objects we live with should bring stillness to our days. Every joint is shaped to endure; every contour is carved for unhurried comfort.”
        </h2>

        <div className="w-16 h-[1px] bg-[#E7DED1]/40 mx-auto mb-8"></div>

        <p
          id="statement-subtext"
          className="text-[#E7DED1]/85 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto"
        >
          At Auren Living, we reject the disposable cycle of trend-driven furniture. We partner directly with multigenerational sawmills in Normandy and stone masons in Tuscany to produce tactile pieces of timeless permanence.
        </p>

        {/* 3 Core Highlights */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-10 border-t border-[#4A5139]">
          <div className="text-center">
            <span className="block font-serif-editorial text-2xl text-[#F4F0E8] mb-1">
              FSC® Certified
            </span>
            <span className="text-xs uppercase tracking-wider text-[#E7DED1]/70">
              Sustainably Managed Oak & Ash
            </span>
          </div>
          <div className="text-center">
            <span className="block font-serif-editorial text-2xl text-[#F4F0E8] mb-1">
              Pure Natural Wool
            </span>
            <span className="text-xs uppercase tracking-wider text-[#E7DED1]/70">
              Chemical-Free Bouclé & Linen
            </span>
          </div>
          <div className="text-center">
            <span className="block font-serif-editorial text-2xl text-[#F4F0E8] mb-1">
              Direct Workshop
            </span>
            <span className="text-xs uppercase tracking-wider text-[#E7DED1]/70">
              Zero Intermediary Markups
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
