import { Droplet, Award, ArrowRight, Timer, Flame, Heart, ChevronRight } from 'lucide-react';
import { Meal, HydrationLog, UserProfile, ScreenType } from '../types';

interface DashboardProps {
  userProfile: UserProfile;
  recommendedMeals: Meal[];
  hydration: HydrationLog;
  onAddWater: () => void;
  onSelectMeal: (meal: Meal) => void;
  onNavigate: (screen: ScreenType) => void;
  isSubscribed: boolean;
  onSubscribe: () => void;
}

export default function Dashboard({
  userProfile,
  recommendedMeals,
  hydration,
  onAddWater,
  onSelectMeal,
  onNavigate,
  isSubscribed,
  onSubscribe,
}: DashboardProps) {
  // Compute hydration percentage
  const hydrationPercent = Math.min(100, Math.round((hydration.currentMl / hydration.goalMl) * 100));
  const activeWaterBlocks = Math.min(7, Math.ceil((hydration.currentMl / hydration.goalMl) * 7));

  // Circular progress math
  const radius = 56;
  const circumference = 2 * Math.PI * radius; // Approx 351.8
  const caloriePercent = 1420 / 2100;
  const strokeDashoffset = circumference - caloriePercent * circumference;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Heading */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-display font-extrabold text-3xl md:text-4xl text-[#1a1c18] tracking-tight">
            Good morning, {userProfile.name}
          </h1>
          <p className="text-[#42493f] text-base md:text-lg mt-1">
            Your wellness journey is on track. Here's your summary for today.
          </p>
        </div>
        <div className="bg-[#cdeb7e] text-[#536b06] px-4 py-2 rounded-xl flex items-center gap-2 shadow-xs border border-[#c2c9bc]/30">
          <Award className="w-5 h-5" />
          <div className="text-left">
            <p className="text-[10px] uppercase font-bold tracking-widest leading-none">Streak</p>
            <p className="text-sm font-black">{userProfile.wellnessStreak} Days Active</p>
          </div>
        </div>
      </section>

      {/* Bento Grid Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Nutrition Summary Card (Large 8cols) */}
        <div className="md:col-span-8 bg-[#ffffff] rounded-2xl p-6 shadow-xs border border-[#c2c9bc]/30 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-xl font-bold text-[#1a1c18]">Daily Nutrition</h2>
            <span className="bg-[#cdeb7e] text-[#536b06] text-xs font-bold px-3 py-1 rounded-full">
              Day 12 of 30
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 items-center">
            {/* Calories circular chart */}
            <div className="sm:col-span-4 flex flex-col items-center justify-center">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    className="text-[#e7e9e2]"
                    cx="72"
                    cy="72"
                    fill="transparent"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                  />
                  <circle
                    className="text-[#3c6839] transition-all duration-500 ease-out"
                    cx="72"
                    cy="72"
                    fill="transparent"
                    r={radius}
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-2xl font-black text-[#1a1c18]">1,420</span>
                  <span className="text-[11px] text-[#42493f]">/ 2,100 kcal</span>
                </div>
              </div>
              <p className="mt-3 font-semibold text-sm text-[#1a1c18] tracking-tight">Total Calories</p>
            </div>

            {/* Micro Slider Indicators */}
            <div className="sm:col-span-8 space-y-5">
              {/* Protein slider info */}
              <div className="space-y-1">
                <div className="flex justify-between items-end">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#1a1c18]">Protein</span>
                    <span className="bg-[#bdf0b3] text-[#245023] text-[9px] font-black uppercase px-1.5 py-0.5 rounded">
                      Optimal
                    </span>
                  </div>
                  <span className="text-xs text-[#42493f] font-mono">92g / 120g</span>
                </div>
                <div className="h-3 w-full bg-[#e7e9e2] rounded-full overflow-hidden">
                  <div className="h-full bg-[#93c48b] rounded-full" style={{ width: '76%' }} />
                </div>
              </div>

              {/* Carbs slider info */}
              <div className="space-y-1">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-sm text-[#1a1c18]">Carbs</span>
                  <span className="text-xs text-[#42493f] font-mono">145g / 210g</span>
                </div>
                <div className="h-3 w-full bg-[#e7e9e2] rounded-full overflow-hidden">
                  <div className="h-full bg-[#d0ee81] rounded-full" style={{ width: '69%' }} />
                </div>
              </div>

              {/* Fats slider info */}
              <div className="space-y-1">
                <div className="flex justify-between items-end">
                  <span className="font-bold text-sm text-[#1a1c18]">Fats</span>
                  <span className="text-xs text-[#42493f] font-mono">42g / 70g</span>
                </div>
                <div className="h-3 w-full bg-[#e7e9e2] rounded-full overflow-hidden">
                  <div className="h-full bg-[#f0a1bd] rounded-full" style={{ width: '60%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hydration tracker Card (Small 4cols) */}
        <div className="md:col-span-4 bg-[#ffffff] rounded-2xl p-6 shadow-xs border border-[#c2c9bc]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Droplet className="w-5 h-5 text-[#3c6839]" />
              <h2 className="font-display text-xl font-bold text-[#1a1c18]">Hydration</h2>
            </div>
            <p className="text-[#42493f] text-sm leading-relaxed mb-6">
              You've reached <strong className="text-[#3c6839]">{hydrationPercent}%</strong> of your daily water intake goal.
            </p>
          </div>

          {/* Saturated dynamic water blocks */}
          <div className="flex items-end gap-2 px-1 mb-6 h-14">
            {[...Array(7)].map((_, index) => {
              const isActive = index < activeWaterBlocks;
              return (
                <div
                  key={index}
                  className={`flex-1 rounded-t-lg transition-all duration-300 ${
                    isActive ? 'bg-[#93c48b] h-full shadow-xs' : 'bg-[#e7e9e2] h-4'
                  }`}
                />
              );
            })}
          </div>

          <button
            id="add-water-button"
            onClick={onAddWater}
            className="w-full py-3 bg-[#e7e9e2] text-[#1a1c18] font-semibold text-xs rounded-xl hover:bg-[#e2e3dc] active:scale-95 transition-all text-center"
          >
            Add 250ml (+1 Cup)
          </button>
        </div>

        {/* Subscription Status Card (Small 4cols) */}
        <div className={`md:col-span-4 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-xs border ${
          isSubscribed
            ? 'bg-linear-to-b from-[#3c6839] to-[#425a3f] text-white border-transparent'
            : 'bg-[#ffffff] text-[#1a1c18] border-[#c2c9bc]/30'
        }`}>
          <div className="relative z-10 text-left">
            <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1.5 rounded-full inline-block mb-3 ${
              isSubscribed ? 'bg-[#cdeb7e] text-[#1a1c18]' : 'bg-[#ffd9e4] text-[#39071f]'
            }`}>
              {isSubscribed ? '● Active Pro Tier' : 'Upgrade Required'}
            </span>
            <h3 className="font-display text-xl font-extrabold leading-tight">
              {isSubscribed ? 'NutriGo Pro Suite' : 'Activate Pro Lounge'}
            </h3>
            <p className={`text-xs mt-2 leading-relaxed ${isSubscribed ? 'text-white/90' : 'text-[#42493f]'}`}>
              {isSubscribed
                ? 'Get 24/7 AI culinary guidance and bio-synchronized meal scheduling live with Chef Celeste.'
                : 'Unlock Chef Celeste advisory, automatic goal planner, and multi-nutrient audits.'}
            </p>
          </div>

          <div className="mt-6 z-10 text-left space-y-2">
            {isSubscribed ? (
              <>
                <button
                  id="dash-launch-coach"
                  onClick={() => onNavigate('pro')} 
                  className="text-xs font-bold text-[#cdeb7e] hover:underline flex items-center gap-1 active:scale-95 cursor-pointer bg-white/10 px-3 py-2 rounded-xl"
                >
                  Consult AI Chef Celeste <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </>
            ) : (
              <button
                id="dash-upgrade-now"
                onClick={onSubscribe} 
                className="w-full text-center text-xs font-bold bg-[#3c6839] text-[#ffffff] hover:opacity-90 py-3 rounded-xl shadow-xs"
              >
                Subscribe to Pro ($9.99/mo)
              </button>
            )}
          </div>

          {/* watermark verified badge */}
          <div className={`absolute -right-8 -bottom-8 opacity-10 pointer-events-none ${isSubscribed ? 'text-white' : 'text-[#3c6839]'}`}>
            <Award className="w-40 h-40" />
          </div>
        </div>

        {/* Weight Loss Progress Chart Card (Large 8cols) */}
        <div className="md:col-span-8 bg-[#ffffff] rounded-2xl p-6 shadow-xs border border-[#c2c9bc]/30">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-xl font-bold text-[#1a1c18]">Weight Trends</h2>
            <div className="flex items-center gap-3 text-xs text-[#42493f]">
              <span className="font-medium bg-[#e7e9e2] px-2.5 py-1 rounded-md">Last 30 Days</span>
              <span className="font-extrabold text-[#3c6839]">-2.4 kg achieved</span>
            </div>
          </div>

          {/* Faux bar charts conforming to weights */}
          <div className="h-44 flex items-end justify-between gap-2.5 px-2 pt-4 border-b border-[#c2c9bc]/20">
            {userProfile.weightTrend.map((weight, idx) => {
              // Convert weight to relative height bar
              const maxW = 76;
              const minW = 68;
              const heightPercent = 100 - ((weight - minW) / (maxW - minW)) * 100;
              const safeHeight = Math.max(35, Math.min(95, heightPercent));

              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full relative h-32 flex items-end">
                    <div
                      className={`w-full rounded-t-lg transition-all duration-700 ease-out cursor-pointer ${
                        idx === userProfile.weightTrend.length - 1
                          ? 'bg-[#3c6839] shadow-xs'
                          : 'bg-[#93c48b]/40 group-hover:bg-[#93c48b]/70'
                      }`}
                      style={{ height: `${safeHeight}%` }}
                    />
                    {/* Tooltip on hover */}
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 bg-[#1a1c18] text-white text-[10px] font-mono px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                      {weight} kg
                    </span>
                  </div>
                  <span className="font-mono text-[9px] text-[#72796e] mt-1">
                    Day {idx * 3 + 1}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Recommended Meals Grid block */}
      <section className="space-y-5 pt-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="font-display text-2xl font-black text-[#1a1c18] tracking-tight">
              Today's Recommended Meals
            </h2>
            <p className="text-sm text-[#42493f] mt-1">
              Freshly prepped &amp; nutritionally balanced for your personal macros targets.
            </p>
          </div>
          <button
            onClick={() => onNavigate('meals')}
            className="text-sm font-bold text-[#3c6839] flex items-center gap-1 hover:underline cursor-pointer group whitespace-nowrap"
          >
            View Full Menu <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* recommended items layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedMeals.map((meal) => (
            <div
              key={meal.id}
              onClick={() => onSelectMeal(meal)}
              className="bg-[#ffffff] rounded-2xl overflow-hidden border border-[#c2c9bc]/30 hover:border-[#3c6839]/60 hover:shadow-md transition-all duration-300 group cursor-pointer flex flex-col h-full"
            >
              {/* Media layout */}
              <div className="h-48 overflow-hidden relative bg-[#e7e9e2]">
                <img
                  src={meal.image}
                  alt={meal.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#e7e9e2]/90 backdrop-blur-md text-[#265225] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                  {meal.category}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  className="absolute top-3 right-3 p-2 bg-white/80 hover:bg-white backdrop-blur-md rounded-full shadow-xs text-[#72796e] hover:text-[#ba1a1a] transition-colors"
                >
                  <Heart className="w-4 h-4 fill-transparent" />
                </button>
              </div>

              {/* Data layout */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display font-bold text-[#1a1c18] text-lg leading-tight group-hover:text-[#3c6839] transition-colors">
                    {meal.name}
                  </h3>
                  <p className="text-xs text-[#42493f] mt-2 line-clamp-2">
                    {meal.description}
                  </p>
                </div>

                <div className="flex justify-between items-center mt-5 pt-3 border-t border-[#c2c9bc]/20">
                  <div className="flex gap-4 text-xs text-[#72796e] font-medium">
                    <span className="flex items-center gap-1">
                      <Timer className="w-3.5 h-3.5" />
                      {meal.prepTime}m
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="w-3.5 h-3.5 text-[#3c6839]" />
                      {meal.calories} kcal
                    </span>
                  </div>
                  <span className="text-sm font-black text-[#3c6839] font-mono">
                     ${meal.price.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
