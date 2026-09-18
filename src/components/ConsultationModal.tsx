import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Sparkles } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: 'consultation' | 'swatches';
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'consultation',
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [mode, setMode] = useState<'consultation' | 'swatches'>(defaultType);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roomType: 'Living Room',
    timeline: 'Within 1–2 months',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 3500);
  };

  return (
    <div
      id="consultation-modal-backdrop"
      className="fixed inset-0 z-50 bg-[#24231F]/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="consultation-modal-card"
        className="bg-[#F4F0E8] max-w-lg w-full rounded-xl shadow-2xl border border-[#D5CDC0] p-6 sm:p-8 my-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#E7DED1] text-[#777269] hover:text-[#24231F]"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle2 className="w-12 h-12 text-[#303A25] mx-auto mb-4 animate-bounce" />
            <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#24231F] mb-2">
              {mode === 'consultation' ? 'Consultation Reserved' : 'Swatch Kit Dispatched'}
            </h3>
            <p className="text-xs sm:text-sm text-[#777269] leading-relaxed mb-4">
              Thank you, {formData.name || 'valued client'}. A design specialist will reach out within 24 business hours with your personalized calendar invitation and confirmation.
            </p>
            <span className="text-[11px] text-[#4A5139] font-medium block">
              Reference #{Math.floor(200000 + Math.random() * 800000)} · Client Demo
            </span>
          </div>
        ) : (
          <div>
            <div className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#4A5139] font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#765238]" />
              <span>Auren Atelier Concierge</span>
            </div>

            <h3 className="font-serif-editorial text-2xl sm:text-3xl text-[#24231F] font-normal mb-2">
              {mode === 'consultation' ? 'Schedule a Design Consultation' : 'Request Material Swatches Kit'}
            </h3>

            <p className="text-xs text-[#777269] mb-6">
              Connect directly with our interior architects for tailored layout advice and timber selection.
            </p>

            {/* Mode toggle */}
            <div className="flex rounded-lg bg-[#E7DED1]/70 p-1 mb-6 border border-[#D5CDC0]">
              <button
                type="button"
                onClick={() => setMode('consultation')}
                className={`flex-1 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-all ${
                  mode === 'consultation'
                    ? 'bg-[#303A25] text-[#F4F0E8] shadow-sm'
                    : 'text-[#777269] hover:text-[#24231F]'
                }`}
              >
                Design Consultation
              </button>
              <button
                type="button"
                onClick={() => setMode('swatches')}
                className={`flex-1 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-all ${
                  mode === 'swatches'
                    ? 'bg-[#303A25] text-[#F4F0E8] shadow-sm'
                    : 'text-[#777269] hover:text-[#24231F]'
                }`}
              >
                Swatches Box
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider font-semibold text-[#24231F] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Julian Montgomery"
                  className="w-full bg-[#E7DED1]/40 border border-[#D5CDC0] rounded px-3 py-2 text-[#24231F] focus:outline-none focus:border-[#303A25]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[#24231F] mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="julian@example.com"
                    className="w-full bg-[#E7DED1]/40 border border-[#D5CDC0] rounded px-3 py-2 text-[#24231F] focus:outline-none focus:border-[#303A25]"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[#24231F] mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 019-2834"
                    className="w-full bg-[#E7DED1]/40 border border-[#D5CDC0] rounded px-3 py-2 text-[#24231F] focus:outline-none focus:border-[#303A25]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[#24231F] mb-1">
                    Room of Interest
                  </label>
                  <select
                    value={formData.roomType}
                    onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
                    className="w-full bg-[#E7DED1]/40 border border-[#D5CDC0] rounded px-3 py-2 text-[#24231F] focus:outline-none focus:border-[#303A25]"
                  >
                    <option>Living Room & Lounge</option>
                    <option>Dining Environment</option>
                    <option>Study & Workspace</option>
                    <option>Complete Residence</option>
                  </select>
                </div>
                <div>
                  <label className="block uppercase tracking-wider font-semibold text-[#24231F] mb-1">
                    Project Timeline
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full bg-[#E7DED1]/40 border border-[#D5CDC0] rounded px-3 py-2 text-[#24231F] focus:outline-none focus:border-[#303A25]"
                  >
                    <option>Immediate (Ready to order)</option>
                    <option>Within 1–2 months</option>
                    <option>Planning 3–6 months ahead</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold text-[#24231F] mb-1">
                  Architectural Notes / Specific Pieces of Interest
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tell us about your room dimensions, lighting conditions, or existing palette..."
                  className="w-full bg-[#E7DED1]/40 border border-[#D5CDC0] rounded px-3 py-2 text-[#24231F] focus:outline-none focus:border-[#303A25]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#303A25] hover:bg-[#4A5139] text-[#F4F0E8] rounded text-xs font-semibold uppercase tracking-[0.18em] transition-colors mt-2"
              >
                {mode === 'consultation'
                  ? 'Request Complimentary Session'
                  : 'Dispatch Material Swatch Kit'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
