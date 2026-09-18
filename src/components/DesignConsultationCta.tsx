import React from 'react';
import { ArrowRight, Calendar, Sparkles } from 'lucide-react';

interface DesignConsultationCtaProps {
  onOpenConsultationModal: () => void;
  onRequestSwatches: () => void;
}

export const DesignConsultationCta: React.FC<DesignConsultationCtaProps> = ({
  onOpenConsultationModal,
  onRequestSwatches,
}) => {
  return (
    <section id="consultation" className="py-20 sm:py-28 bg-[#F4F0E8] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E7DED1] rounded-2xl p-8 sm:p-12 lg:p-16 border border-[#D5CDC0] relative overflow-hidden">
          {/* Subtle decorative motif */}
          <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-[#303A25]/5 blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl">
            <span
              id="consultation-eyebrow"
              className="inline-flex items-center text-[11px] uppercase tracking-[0.25em] font-semibold text-[#4A5139] mb-3"
            >
              <Sparkles className="w-3.5 h-3.5 mr-2 text-[#765238]" />
              Complimentary Architectural Service
            </span>

            <h2
              id="consultation-heading"
              className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#24231F] leading-[1.15] mb-4"
            >
              Bring considered architectural warmth into your home.
            </h2>

            <p className="text-[#777269] text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
              Whether furnishing an entire residence or curating a focal lounge piece, our interior design advisors offer tailored spatial layout guidance, custom timber finishes, and certified bouclé & linen swatches delivered to your door.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                id="book-consultation-btn"
                onClick={onOpenConsultationModal}
                className="inline-flex items-center justify-center px-7 py-4 bg-[#303A25] hover:bg-[#4A5139] text-[#F4F0E8] text-xs uppercase tracking-[0.18em] font-semibold rounded transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-[#303A25]"
              >
                <Calendar className="w-4 h-4 mr-2" />
                <span>Book Design Consultation</span>
              </button>

              <button
                id="request-swatches-btn"
                onClick={onRequestSwatches}
                className="inline-flex items-center justify-center px-6 py-4 bg-transparent hover:bg-[#F4F0E8] border border-[#24231F]/30 text-[#24231F] text-xs uppercase tracking-[0.18em] font-medium rounded transition-all duration-200"
              >
                <span>Request Material Swatches Box</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-[#777269]">
              <span className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4A5139] mr-2"></span>
                Complimentary 45-min Zoom or in-studio session
              </span>
              <span className="flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4A5139] mr-2"></span>
                Includes 2D spatial layouts & moodboards
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
