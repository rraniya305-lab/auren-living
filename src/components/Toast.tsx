import React from 'react';
import { Check, Heart, ShoppingBag, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type?: 'cart' | 'wishlist' | 'info';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose }) => {
  return (
    <div
      id="notification-toast"
      className="fixed bottom-6 right-6 z-50 bg-[#24231F] text-[#F4F0E8] py-3 px-4 rounded-lg shadow-xl border border-[#4A5139] flex items-center space-x-3 text-xs animate-in slide-in-from-bottom-5 fade-in duration-200"
    >
      <div className="w-6 h-6 rounded-full bg-[#303A25] flex items-center justify-center flex-shrink-0">
        {type === 'cart' && <ShoppingBag className="w-3.5 h-3.5 text-[#F4F0E8]" />}
        {type === 'wishlist' && <Heart className="w-3.5 h-3.5 text-[#E7DED1] fill-current" />}
        {type === 'info' && <Check className="w-3.5 h-3.5 text-green-300" />}
      </div>
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="p-1 hover:text-white text-[#E7DED1]/70"
        aria-label="Dismiss notification"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
