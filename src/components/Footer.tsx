import { ScreenType } from '../types';

interface FooterProps {
  onNavigate: (screen: ScreenType) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#e7e9e2] border-t border-[#c2c9bc]/50 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
        <div className="flex flex-col gap-2">
          <span
            onClick={() => onNavigate('discover')}
            className="font-display font-black text-2xl text-[#3c6839] cursor-pointer"
          >
            NutriGo
          </span>
          <p className="text-sm text-[#42493f] max-w-sm">
            Elevating your healthy living journey through smart nutrition, customized macros, and chef-made meal delivery services.
          </p>
        </div>

        {/* Dynamic Nav shortcuts */}
        <div className="flex flex-wrap gap-x-8 gap-y-2 justify-center">
          <button
            onClick={() => onNavigate('discover')} 
            className="text-xs text-[#42493f] hover:text-[#3c6839] transition-colors"
          >
            Discover
          </button>
          <button
            onClick={() => onNavigate('dashboard')} 
            className="text-xs text-[#42493f] hover:text-[#3c6839] transition-colors"
          >
            Daily Portal
          </button>
          <button
            onClick={() => onNavigate('meals')} 
            className="text-xs text-[#42493f] hover:text-[#3c6839] transition-colors"
          >
            Fresh Menu
          </button>
          <button
            onClick={() => onNavigate('plan')} 
            className="text-xs text-[#42493f] hover:text-[#3c6839] transition-colors"
          >
            Smart Planner
          </button>
        </div>

        {/* Secondary credits */}
        <div className="flex flex-col items-center md:items-end gap-2 text-xs text-[#42493f]">
          <div className="flex gap-4">
            <span className="hover:underline cursor-pointer">Privacy Policy</span>
            <span>&middot;</span>
            <span className="hover:underline cursor-pointer">Terms of Service</span>
            <span>&middot;</span>
            <span className="hover:underline cursor-pointer">Support</span>
          </div>
          <p>&copy; {new Date().getFullYear()} NutriGo Wellness Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
