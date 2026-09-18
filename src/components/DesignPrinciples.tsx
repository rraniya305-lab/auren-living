import React from 'react';
import { Layers, Feather, Hammer, Compass } from 'lucide-react';

export const DesignPrinciples: React.FC = () => {
  const principles = [
    {
      icon: Layers,
      title: 'Thoughtful Materials',
      subtitle: 'Solid Hardwoods & Earthy Stone',
      description:
        'We work solely with FSC-certified European white oak, American walnut, and unbleached Belgian flax linen. No artificial veneers or hollow composite cores.',
    },
    {
      icon: Feather,
      title: 'Everyday Comfort',
      subtitle: 'Ergonomic Weight & Deep Relaxation',
      description:
        'Sculptural beauty is meaningless without daily ease. Cushion densities are formulated with down-feather chambers and natural latex for supportive calm.',
    },
    {
      icon: Hammer,
      title: 'Lasting Craft',
      subtitle: 'Mortise, Tenon & Hand-Rubbed Oils',
      description:
        'Assembled by master cabinetmakers in small atelier batches. Each joint is engineered to withstand seasonal climate shifts across generations of use.',
    },
    {
      icon: Compass,
      title: 'Responsible Design',
      subtitle: 'Timeless Forms over Trend Cycles',
      description:
        'We design for longevity rather than fleeting seasons. Every piece can be sanded, re-oiled, reupholstered, and handed down through family homes.',
    },
  ];

  return (
    <section id="philosophy" className="py-20 sm:py-28 bg-[#F4F0E8] border-b border-[#D5CDC0]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center mb-16 sm:mb-20">
          <span
            id="principles-eyebrow"
            className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#4A5139] block mb-2"
          >
            Pillars of Practice
          </span>
          <h2
            id="principles-heading"
            className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#24231F]"
          >
            Principles of Intentional Making
          </h2>
          <p className="text-[#777269] text-sm sm:text-base mt-3 leading-relaxed">
            Four commitments guiding every joint, contour, and material choice across our atelier.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {principles.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={p.title}
                id={`principle-card-${idx}`}
                className="p-6 sm:p-7 rounded-lg bg-[#E7DED1]/30 border border-[#D5CDC0]/80 hover:bg-[#E7DED1]/60 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-full bg-[#303A25] text-[#F4F0E8] flex items-center justify-center mb-6">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#765238] block mb-1">
                    {p.subtitle}
                  </span>

                  <h3 className="font-serif-editorial text-xl font-medium text-[#24231F] mb-3">
                    {p.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#777269] leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#D5CDC0]/60 flex items-center justify-between text-[11px] text-[#4A5139] font-medium">
                  <span>Standard 0{idx + 1}</span>
                  <span className="text-[#777269]">Auren Standard</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
