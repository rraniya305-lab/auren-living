import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [currency, setCurrency] = useState('USD ($)');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer id="main-footer" className="bg-[#303A25] text-[#F4F0E8] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#4A5139]">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <div className="mb-4">
              <span className="font-serif-editorial text-3xl font-medium tracking-[0.18em] uppercase text-[#F4F0E8] block">
                Auren
              </span>
              <span className="text-[10px] tracking-[0.35em] text-[#E7DED1]/70 uppercase block font-medium">
                Living · Interiors
              </span>
            </div>

            <p className="text-sm text-[#E7DED1]/80 leading-relaxed max-w-sm mb-6">
              Thoughtfully designed furniture and spatial elements crafted for modern everyday living. Built by master joiners using FSC-certified solid oak and honest tactile materials.
            </p>

            <div className="flex items-center space-x-2 text-xs text-[#E7DED1]/70">
              <Globe className="w-3.5 h-3.5 text-[#E7DED1]" />
              <span>International White-Glove Logistics & In-Room Placement</span>
            </div>
          </div>

          {/* Shop Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E7DED1] mb-5">
              Collection
            </h4>
            <ul className="space-y-3 text-xs text-[#E7DED1]/75">
              <li>
                <a href="#collection" className="hover:text-[#F4F0E8] transition-colors">
                  All Pieces
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#F4F0E8] transition-colors">
                  Sculptural Seating
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#F4F0E8] transition-colors">
                  Solid Oak Tables
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#F4F0E8] transition-colors">
                  Tambour Credenzas
                </a>
              </li>
              <li>
                <a href="#collection" className="hover:text-[#F4F0E8] transition-colors">
                  Architectural Lighting
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-2">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E7DED1] mb-5">
              Company
            </h4>
            <ul className="space-y-3 text-xs text-[#E7DED1]/75">
              <li>
                <a href="#philosophy" className="hover:text-[#F4F0E8] transition-colors">
                  Our Philosophy
                </a>
              </li>
              <li>
                <a href="#spaces" className="hover:text-[#F4F0E8] transition-colors">
                  Spaces in Situ
                </a>
              </li>
              <li>
                <a href="#journal" className="hover:text-[#F4F0E8] transition-colors">
                  The Journal
                </a>
              </li>
              <li>
                <a href="#consultation" className="hover:text-[#F4F0E8] transition-colors">
                  Design Consultation
                </a>
              </li>
              <li>
                <a href="#philosophy" className="hover:text-[#F4F0E8] transition-colors">
                  Timber Provenance
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.2em] font-semibold text-[#E7DED1] mb-3">
              Atelier Correspondence
            </h4>
            <p className="text-xs text-[#E7DED1]/80 leading-relaxed mb-4">
              Receive quarterly gazettes on interior architecture, private releases, and studio previews.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex rounded overflow-hidden border border-[#4A5139] bg-[#24231F]/30 focus-within:border-[#E7DED1] transition-colors">
                <input
                  id="newsletter-email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="bg-transparent px-3.5 py-3 text-xs text-[#F4F0E8] placeholder:text-[#E7DED1]/40 focus:outline-none flex-1"
                />
                <button
                  id="newsletter-submit-btn"
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="px-4 bg-[#4A5139] hover:bg-[#765238] text-[#F4F0E8] transition-colors flex items-center justify-center"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center space-x-1.5 text-xs text-[#E7DED1] bg-[#4A5139]/60 p-2 rounded animate-in fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5 text-green-300" />
                  <span>Thank you for joining our correspondence. (Demo)</span>
                </div>
              )}

              <p className="text-[10px] text-[#E7DED1]/60">
                We respect your tranquility. Unsubscribe at any moment. Zero spam.
              </p>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E7DED1]/60 gap-4">
          <p>© {new Date().getFullYear()} Auren Living Ltd. All rights reserved.</p>

          <div className="flex items-center space-x-6">
            <span className="text-[11px]">Ready for Hostinger Deployment</span>
            <span>·</span>
            <button
              onClick={() => alert('Demo terms: Auren Living is a showcase interior design and furniture website.')}
              className="hover:text-[#F4F0E8] transition-colors"
            >
              Terms & Privacy
            </button>
            <span>·</span>
            <div className="flex items-center space-x-1">
              <label htmlFor="currency-select" className="text-[11px]">Region:</label>
              <select
                id="currency-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent text-[#E7DED1] text-xs cursor-pointer focus:outline-none"
              >
                <option value="USD ($)" className="text-[#24231F]">USD ($)</option>
                <option value="EUR (€)" className="text-[#24231F]">EUR (€)</option>
                <option value="GBP (£)" className="text-[#24231F]">GBP (£)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
