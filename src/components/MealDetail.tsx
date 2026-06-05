import { useState } from 'react';
import { Timer, Star, CheckCircle, Leaf, Sparkles, ChevronRight, Check } from 'lucide-react';
import { Meal } from '../types';

interface MealDetailProps {
  meal: Meal;
  onAddMealToPlan: (meal: Meal, day: string, slot: 'breakfast' | 'lunch' | 'dinner') => void;
  onBack: () => void;
}

export default function MealDetail({ meal, onAddMealToPlan, onBack }: MealDetailProps) {
  const [selectedDay, setSelectedDay] = useState<string>('MON');
  const [selectedSlot, setSelectedSlot] = useState<'breakfast' | 'lunch' | 'dinner'>('lunch');
  const [isAdded, setIsAdded] = useState(false);
  const [pairedMatchaAdded, setPairedMatchaAdded] = useState(false);

  const handleAdd = () => {
    onAddMealToPlan(meal, selectedDay, selectedSlot);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="space-y-10 animate-fade-in pb-16">
      {/* Header Back button */}
      <div>
        <button
          onClick={onBack}
          className="text-xs font-bold text-[#3c6839] flex items-center gap-1 hover:underline cursor-pointer bg-[#edefe7] px-4 py-2 rounded-full active:scale-95 transition-all"
        >
          &larr; Back to Meals Grid
        </button>
      </div>

      {/* Hero Visual Banner */}
      <section className="relative h-[300px] md:h-[420px] w-full overflow-hidden rounded-3xl shadow-xs border border-[#c2c9bc]/30">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c18]/50 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
          <span className="bg-[#D0E562] text-[#161f00] text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
            Chef's Choice Recipe
          </span>
        </div>
      </section>

      {/* Contents Double Columns Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: specs descriptors */}
        <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-[#c2c9bc]/30 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#c2c9bc]/15 pb-6">
            <div>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-[#1a1c18] tracking-tight leading-tight">
                {meal.name}
              </h1>
              <div className="flex items-center gap-4 text-[#72796e] text-xs font-semibold mt-2">
                <span className="flex items-center gap-1 text-[#3c6839]">
                  <Timer className="w-4 h-4" /> {meal.prepTime} min cook time
                </span>
                <span>&middot;</span>
                <span className="flex items-center gap-1 text-[#3c6839]">
                  <Star className="w-4 h-4 fill-current text-[#D0E562]" /> {meal.rating} ({meal.reviewsCount}+ reviews)
                </span>
              </div>
            </div>
            
            <div className="text-3xl font-black text-[#3c6839] font-mono leading-none">
              ${meal.price.toFixed(2)}
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-display text-lg font-extrabold text-[#1a1c18]">
              About this recipe
            </h3>
            <p className="text-sm text-[#42493f] leading-relaxed">
              {meal.description} {meal.description.length < 150 && "Made strictly with farm-fresh organic certified vegetables, non-GMO grains, and cooked using specialized low-temperature techniques to maximize nutrient density extraction."}
            </p>
          </div>

          {/* Saturated Caps tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {meal.highlightTags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-[#f3f4ed] border border-[#c2c9bc]/40 text-[#42493f] text-[10px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1 uppercase tracking-wider"
              >
                <CheckCircle className="w-3.5 h-3.5 text-[#3c6839]" />
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right column: facts & planner placement sliders */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-[#c2c9bc]/30 space-y-6">
          <div className="bg-[#f3f4ed] rounded-2xl p-5 border border-[#c2c9bc]/25 shadow-xs space-y-6">
            <h3 className="font-display text-base font-extrabold text-[#1a1c18] text-center uppercase tracking-wider">
              Nutritional Facts
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-3.5 rounded-xl text-center shadow-xs border border-[#c2c9bc]/15">
                <p className="text-[#3c6839] font-display text-xl font-black">{meal.calories}</p>
                <p className="text-[10px] uppercase font-bold text-[#72796e] mt-1">KCAL</p>
              </div>
              <div className="bg-white p-3.5 rounded-xl text-center shadow-xs border border-[#c2c9bc]/15">
                <p className="text-[#4f6601] font-display text-xl font-black">{meal.macros.protein}g</p>
                <p className="text-[10px] uppercase font-bold text-[#72796e] mt-1">Protein</p>
              </div>
              <div className="bg-white p-3.5 rounded-xl text-center shadow-xs border border-[#c2c9bc]/15">
                <p className="text-[#8a4a63] font-display text-xl font-black">{meal.macros.carbs}g</p>
                <p className="text-[10px] uppercase font-bold text-[#72796e] mt-1">Carbs</p>
              </div>
              <div className="bg-white p-3.5 rounded-xl text-center shadow-xs border border-[#c2c9bc]/15">
                <p className="text-[#1a1c18] font-display text-xl font-black">{meal.macros.fat}g</p>
                <p className="text-[10px] uppercase font-bold text-[#72796e] mt-1">Fat</p>
              </div>
            </div>

            {/* progress indicator */}
            <div className="space-y-2 pt-2 border-t border-[#c2c9bc]/15">
              <div className="flex justify-between text-[11px] font-bold text-[#72796e]">
                <span>DAILY VALUE BUDGETED</span>
                <span>24%</span>
              </div>
              <div className="h-2 w-full bg-[#e7e9e2] rounded-full overflow-hidden">
                <div className="h-full bg-[#93c48b] rounded-full" style={{ width: '24%' }} />
              </div>
            </div>
          </div>

          {/* Day & Slot selector configuration */}
          <div className="space-y-3 bg-[#f3f4ed]/50 p-4 rounded-xl border border-[#c2c9bc]/15">
            <p className="text-xs font-black text-[#1a1c18] uppercase tracking-wider text-center">
              Target Selection for Weekly Plan:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
                className="bg-white border border-[#c2c9bc]/60 rounded-lg p-2 text-xs font-bold text-[#42493f] focus:outline-hidden focus:ring-1 focus:ring-[#3c6839]"
              >
                {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => (
                  <option key={d} value={d}>
                    {d} Schedule
                  </option>
                ))}
              </select>

              <select
                value={selectedSlot}
                onChange={(e) => setSelectedSlot(e.target.value as any)}
                className="bg-white border border-[#c2c9bc]/60 rounded-lg p-2 text-xs font-bold text-[#42493f] focus:outline-hidden focus:ring-1 focus:ring-[#3c6839]"
              >
                <option value="breakfast">Breakfast Slot</option>
                <option value="lunch">Lunch Slot</option>
                <option value="dinner">Dinner Slot</option>
              </select>
            </div>
          </div>

          {/* Checkout CTAs widgets */}
          <div className="space-y-3">
            <button
              onClick={handleAdd}
              disabled={isAdded}
              className="w-full bg-[#3c6839] hover:opacity-95 text-[#ffffff] font-bold text-sm py-4 rounded-xl shadow-xs transition-transform active:scale-98 cursor-pointer flex items-center justify-center gap-1"
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" /> Added to Weekly Planner!
                </>
              ) : (
                'Add to Active Plan'
              )}
            </button>
            <button
              onClick={() => {
                alert('Saved successfully to your offline Favorites list!');
              }}
              className="w-full bg-white border-2 border-[#3c6839] text-[#3c6839] hover:bg-[#f3f4ed] font-bold text-sm py-4 rounded-xl transition-all cursor-pointer"
            >
              Save for Later Offline
            </button>
          </div>
        </div>

      </div>

      {/* Recommended dynamic Pairings section */}
      <section className="space-y-4 pt-4">
        <h3 className="font-display text-xl font-extrabold text-[#1a1c18] tracking-tight">
          Sustainably pairs well with
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card: Matcha Latte */}
          <div className="md:col-span-2 bg-[#e7e9e2] rounded-3xl p-6 relative min-h-[220px] flex items-center overflow-hidden border border-[#c2c9bc]/30 group">
            <div className="z-10 max-w-[55%] space-y-3">
              <span className="bg-[#ffffff]/80 backdrop-blur-md px-2.5 py-1 text-[9px] font-black uppercase text-[#3c6839] rounded">
                Wellness pairing
              </span>
              <h4 className="font-display text-xl font-bold text-[#1a1c18]">
                Matcha Green Tea Latte
              </h4>
              <p className="text-xs text-[#42493f] leading-relaxed">
                Antioxidant high-energy catechins boosts metabolic burn to perfectly complement your salmon bowl.
              </p>
              
              <button
                onClick={() => setPairedMatchaAdded(!pairedMatchaAdded)}
                className="text-xs font-bold text-[#3c6839] flex items-center gap-0.5 hover:underline cursor-pointer bg-white px-3 py-1.5 rounded-lg active:scale-95 transition-all text-left"
              >
                {pairedMatchaAdded ? (
                  <span className="text-[#3c6839] flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Added (+$4.00)
                  </span>
                ) : (
                  <>
                    Add +$4.00 <ChevronRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
            {/* Latte image absolute positioned */}
            <div className="absolute right-0 top-0 h-full w-[45%] overflow-hidden bg-[#edefe7]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAskWAPsaVRk0nR7Mv6Mh1WdMtX8-X5uNG9bv_P9Cx-RGPg8zPbsHgbpgv2wy5hJzI1sA2_PVnO53ffupnzsTs0WL0MfMHUmavvZbwpxNDNajkkkkEi8nRLZ_asbiU0GomzwUB7LrkI9wW4JyhJKVzngMUnkLYz5gMwq8P3JojLxWgfvXlODJ51jAuU_vHnHyecIFTNIcFYv7ChW8wVk5hSd4FOJvpoRBSuNljF3pm8Y_mL1GgtD-4RN_TNi2xSzLbOE2Fb8LcLaw"
                alt="Creamy Matcha Green Tea Latte Visual"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
              />
            </div>
          </div>

          {/* Card: Side Salad with secondary decoration */}
          <div className="bg-[#cdeb7e] text-[#161f00] rounded-3xl p-6 sm:p-8 flex flex-col justify-between border border-[#c2c9bc]/30 relative overflow-hidden">
            <span className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-[#161f00] shadow-xs">
              <Leaf className="w-6 h-6" />
            </span>
            <div className="mt-8">
              <h4 className="font-display font-extrabold text-lg text-[#161f00]">
                NutriGo Side Salad
              </h4>
              <p className="text-xs text-[#161f00]/80 mt-1">
                Extra leafy cruciferous greens dressed with house-made flax vinaigrette for complete nutrient density support.
              </p>
            </div>
            <span className="absolute -right-4 -bottom-4 opacity-5">
              <Sparkles className="w-24 h-24 text-white" />
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
