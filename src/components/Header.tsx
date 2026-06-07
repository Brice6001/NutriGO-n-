import { Bell, User, Search, Sparkles, Star, Crown } from 'lucide-react';
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
            className="font-coolvetica text-2xl font-black text-brand-teal cursor-pointer tracking-tight active:scale-95 transition-transform"
          >
            NutriGo
          </span>
          
          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex gap-6 items-center">
            <button
              id="nav-discover"
              onClick={() => onNavigate('discover')}
              className={`font-sans font-medium py-1 text-sm border-b-2 transition-all ${
                currentScreen === 'discover'
                  ? 'text-brand-green-primary border-brand-green-primary font-semibold'
                  : 'text-brand-teal/80 border-transparent hover:text-brand-green-primary'
              }`}
            >
              Discover
            </button>
            <button
              id="nav-dashboard"
              onClick={() => onNavigate('dashboard')}
              className={`font-sans font-medium py-1 text-sm border-b-2 transition-all ${
                currentScreen === 'dashboard'
                  ? 'text-brand-green-primary border-brand-green-primary font-semibold'
                  : 'text-brand-teal/80 border-transparent hover:text-brand-green-primary'
              }`}
            >
              Dashboard
            </button>
            <button
              id="nav-meals"
              onClick={() => onNavigate('meals')}
              className={`font-sans font-medium py-1 text-sm border-b-2 transition-all ${
                currentScreen === 'meals'
                  ? 'text-brand-green-primary border-brand-green-primary font-semibold'
                  : 'text-brand-teal/80 border-transparent hover:text-brand-green-primary'
              }`}
            >
              Meals Menu
            </button>
            <button
              id="nav-plan"
              onClick={() => onNavigate('plan')}
              className={`font-sans font-medium py-1 text-sm border-b-2 transition-all ${
                currentScreen === 'plan'
                  ? 'text-brand-green-primary border-brand-green-primary font-semibold'
                  : 'text-brand-teal/80 border-transparent hover:text-brand-green-primary'
              }`}
            >
              Weekly Planner
            </button>
            <button
              id="nav-pro"
              onClick={() => onNavigate('pro')}
              className={`font-sans font-medium py-1 text-sm border-b-2 transition-all flex items-center gap-1 ${
                currentScreen === 'pro'
                  ? 'text-brand-green-primary border-brand-green-primary font-semibold'
                  : 'text-brand-teal/80 border-transparent hover:text-brand-green-primary'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-lime fill-brand-lime animate-pulse" />
              Pro Coach
            </button>
          </nav>
        </div>

        {/* Action Elements */}
        <div className="flex items-center gap-4">
          {/* Header Search Bar (Visible on Menu Screens or fallback) */}
          <div className="hidden lg:flex items-center bg-[#f9faf3] rounded-full px-3 py-1.5 border border-brand-teal/20 focus-within:ring-2 focus-within:ring-brand-green-primary">
            <Search className="w-4 h-4 text-brand-teal/60" />
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
              className="bg-transparent border-none focus:outline-hidden text-xs ml-2 w-40 text-brand-teal font-sans"
            />
          </div>

          {/* Core Notification and Profile controls */}
          <div className="flex items-center gap-2">
            <button
              id="btn-notifications"
              onClick={onOpenNotifications}
              className="relative p-2 text-brand-teal/80 hover:text-brand-green-primary hover:bg-brand-teal/5 rounded-full transition-all active:scale-95"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-brand-wine rounded-full ring-2 ring-[#f9faf3]" />
            </button>
            <button
              id="btn-profile"
              onClick={() => isSubscribed ? onNavigate('subscription') : onOpenProfile()}
              className="relative p-2 text-brand-teal/80 hover:text-brand-green-primary hover:bg-brand-teal/5 rounded-full transition-all active:scale-95"
            >
              {isSubscribed ? (
                <Crown className="w-5 h-5" />
              ) : (
                <User className="w-5 h-5" />
              )}
              {isSubscribed && <Star className="absolute top-0 right-0 w-3 h-3 text-brand-green-primary" />}
            </button>
          </div>

          {/* Premium Subscription CTA badge */}
          <button
            id="btn-subscribe"
            onClick={() => onNavigate('subscription')}
            className={`font-sans font-bold text-xs px-4 py-2 rounded-full transition-all active:scale-95 border cursor-pointer ${
              isSubscribed
                ? 'bg-brand-green-secondary text-brand-teal border-transparent flex items-center gap-1 shadow-xs hover:bg-opacity-90'
                : 'bg-brand-green-primary text-white border-transparent shadow-xs hover:bg-opacity-95'
            }`}
          >
            {isSubscribed ? (
              <>
                <Sparkles className="w-3.5 h-3.5 inline text-brand-teal fill-brand-teal" />
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
