import { Bell, User, Search, Sparkles } from 'lucide-react';
import { ScreenType } from '../types';

interface HeaderProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onSearchChange?: (query: string) => void;
  searchQuery?: string;
  onOpenNotifications: () => void;
  onOpenProfile: () => void;
  isSubscribed: boolean;
  onSubscribe: () => void;
}

export default function Header({
  currentScreen,
  onNavigate,
  onSearchChange,
  searchQuery = '',
  onOpenNotifications,
  onOpenProfile,
  isSubscribed,
  onSubscribe,
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#f9faf3]/95 backdrop-blur-md border-b border-[#c2c9bc]/30 shadow-xs h-16">
      <div className="flex justify-between items-center h-full px-6 max-w-7xl mx-auto">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <span
            id="brand-logo"
            onClick={() => onNavigate('discover')}
            className="font-display text-2xl font-extrabold text-[#3c6839] cursor-pointer tracking-tight active:scale-95 transition-transform"
          >
            NutriGo
          </span>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex gap-6 items-center">
            <button
              id="nav-discover"
              onClick={() => onNavigate('discover')}
              className={`font-medium py-1 text-sm border-b-2 transition-all ${
                currentScreen === 'discover'
                  ? 'text-[#3c6839] border-[#3c6839] font-semibold'
                  : 'text-[#42493f] border-transparent hover:text-[#3c6839]'
              }`}
            >
              Discover
            </button>
            <button
              id="nav-dashboard"
              onClick={() => onNavigate('dashboard')}
              className={`font-medium py-1 text-sm border-b-2 transition-all ${
                currentScreen === 'dashboard'
                  ? 'text-[#3c6839] border-[#3c6839] font-semibold'
                  : 'text-[#42493f] border-transparent hover:text-[#3c6839]'
              }`}
            >
              Dashboard
            </button>
            <button
              id="nav-meals"
              onClick={() => onNavigate('meals')}
              className={`font-medium py-1 text-sm border-b-2 transition-all ${
                currentScreen === 'meals'
                  ? 'text-[#3c6839] border-[#3c6839] font-semibold'
                  : 'text-[#42493f] border-transparent hover:text-[#3c6839]'
              }`}
            >
              Meals Menu
            </button>
            <button
              id="nav-plan"
              onClick={() => onNavigate('plan')}
              className={`font-medium py-1 text-sm border-b-2 transition-all ${
                currentScreen === 'plan'
                  ? 'text-[#3c6839] border-[#3c6839] font-semibold'
                  : 'text-[#42493f] border-transparent hover:text-[#3c6839]'
              }`}
            >
              Weekly Planner
            </button>
            <button
              id="nav-pro"
              onClick={() => onNavigate('pro')}
              className={`font-medium py-1 text-sm border-b-2 transition-all flex items-center gap-1 ${
                currentScreen === 'pro'
                  ? 'text-[#3c6839] border-[#3c6839] font-semibold'
                  : 'text-[#42493f] border-transparent hover:text-[#3c6839]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
              Pro Coach
            </button>
          </nav>
        </div>

        {/* Action Elements */}
        <div className="flex items-center gap-4">
          {/* Header Search Bar (Visible on Menu Screens or fallback) */}
          <div className="hidden lg:flex items-center bg-[#edefe7] rounded-full px-3 py-1.5 border border-[#c2c9bc]/40 focus-within:ring-2 focus-within:ring-[#3c6839]">
            <Search className="w-4 h-4 text-[#72796e]" />
            <input
              id="header-search-input"
              value={searchQuery}
              onChange={(e) => {
                if (onSearchChange) {
                  onSearchChange(e.target.value);
                } else {
                  onNavigate('meals');
                }
              }}
              placeholder="Search meals, macros..."
              className="bg-transparent border-none focus:outline-hidden text-xs ml-2 w-40 text-[#1a1c18]"
            />
          </div>

          {/* Core Notification and Profile controls */}
          <div className="flex items-center gap-2">
            <button
              id="btn-notifications"
              onClick={onOpenNotifications}
              className="relative p-2 text-[#42493f] hover:text-[#3c6839] hover:bg-[#edefe7] rounded-full transition-all active:scale-95"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full ring-2 ring-[#f9faf3]" />
            </button>
            <button
              id="btn-profile"
              onClick={onOpenProfile}
              className="p-2 text-[#42493f] hover:text-[#3c6839] hover:bg-[#edefe7] rounded-full transition-all active:scale-95"
            >
              <User className="w-5 h-5" />
            </button>
          </div>

          {/* Premium Subscription CTA badge */}
          <button
            id="btn-subscribe"
            onClick={onSubscribe}
            className={`font-semibold text-xs px-4 py-2 rounded-full transition-all active:scale-95 border cursor-pointer ${
              isSubscribed
                ? 'bg-[#cdeb7e] text-[#1a1c18] border-transparent flex items-center gap-1 shadow-xs'
                : 'bg-[#3c6839] text-[#ffffff] hover:opacity-90 border-transparent shadow-xs'
            }`}
          >
            {isSubscribed ? (
              <>
                <Sparkles className="w-3.5 h-3.5 inline text-[#1a1c18]" />
                Pro Member
              </>
            ) : (
              'Subscribe'
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
