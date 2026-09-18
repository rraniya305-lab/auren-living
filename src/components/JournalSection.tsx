import React, { useState } from 'react';
import { JOURNAL_ARTICLES } from '../data/journal';
import { JournalArticle } from '../types';
import { ArrowUpRight, Clock, User, X } from 'lucide-react';

export const JournalSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<JournalArticle | null>(null);

  return (
    <section id="journal" className="py-20 sm:py-28 bg-[#F4F0E8] border-b border-[#D5CDC0]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <span
              id="journal-eyebrow"
              className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#4A5139] block mb-2"
            >
              The Auren Journal
            </span>
            <h2
              id="journal-heading"
              className="font-serif-editorial text-3xl sm:text-4xl md:text-5xl font-normal text-[#24231F]"
            >
              Conversations on Space & Texture
            </h2>
          </div>
          <p className="text-[#777269] text-sm max-w-md mt-4 md:mt-0">
            Essays on architectural proportion, natural light choreography, and the quiet ritual of making furniture.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.map((article) => (
            <article
              key={article.id}
              id={`journal-card-${article.id}`}
              onClick={() => setSelectedArticle(article)}
              className="group cursor-pointer flex flex-col bg-[#F4F0E8] border border-[#D5CDC0]/70 rounded-lg overflow-hidden hover:border-[#303A25]/50 transition-all duration-300 hover:shadow-[0_12px_30px_-10px_rgba(36,35,31,0.08)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#E7DED1]">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <span className="absolute top-3 left-3 bg-[#F4F0E8]/90 backdrop-blur-sm text-[#303A25] text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded">
                  {article.category}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-3 text-[11px] text-[#777269] mb-2 font-medium">
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {article.readTime}
                    </span>
                    <span>·</span>
                    <span>{article.date}</span>
                  </div>

                  <h3 className="font-serif-editorial text-xl font-medium text-[#24231F] group-hover:text-[#303A25] transition-colors leading-snug mb-3">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#777269] line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#D5CDC0]/60 flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1.5 text-[#777269]">
                    <User className="w-3.5 h-3.5 text-[#4A5139]" />
                    <span>{article.author}</span>
                  </div>
                  <span className="inline-flex items-center font-medium text-[#303A25] group-hover:translate-x-0.5 transition-transform uppercase tracking-wider text-[11px]">
                    Read Story <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Article Reading Modal */}
      {selectedArticle && (
        <div
          id="journal-reading-modal"
          className="fixed inset-0 z-50 bg-[#24231F]/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="bg-[#F4F0E8] max-w-2xl w-full rounded-xl shadow-2xl border border-[#D5CDC0] p-6 sm:p-10 my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-[#D5CDC0]">
              <span className="text-xs uppercase tracking-widest text-[#4A5139] font-medium">
                {selectedArticle.category} · {selectedArticle.date}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                aria-label="Close article"
                className="p-1.5 rounded-full hover:bg-[#E7DED1] text-[#777269] hover:text-[#24231F]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h2 className="font-serif-editorial text-3xl sm:text-4xl text-[#24231F] font-normal mt-6 mb-4">
              {selectedArticle.title}
            </h2>

            <div className="flex items-center space-x-4 text-xs text-[#777269] mb-6">
              <span>By {selectedArticle.author}</span>
              <span>·</span>
              <span>{selectedArticle.readTime}</span>
            </div>

            <div className="rounded-lg overflow-hidden mb-6 aspect-[16/9] bg-[#E7DED1]">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="prose prose-stone text-sm sm:text-base text-[#24231F]/90 leading-relaxed space-y-4">
              <p className="font-serif-editorial text-lg text-[#303A25] italic leading-relaxed">
                “When an interior space is stripped of visual clutter, the tactile honesty of materials steps forward. Grain, weave, stone, and morning daylight become the primary artwork.”
              </p>
              <p>
                In an era dominated by rapid synthetic production, living with organic hardwood and unbleached fiber offers grounding. An oak dining table carries the subtle memories of meals shared over decades, gradually deepening in patina rather than deteriorating.
              </p>
              <p>
                Our architectural approach considers not only the immediate silhouette, but how light strikes surfaces at 8 AM versus 6 PM. Low winter sun angles catch the gentle brushed contours of our joinery, turning everyday routines into tactile pauses.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#D5CDC0] flex justify-between items-center">
              <span className="text-xs text-[#777269]">Published by Auren Studio Atelier</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2.5 bg-[#303A25] text-[#F4F0E8] rounded text-xs uppercase tracking-wider font-semibold"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
