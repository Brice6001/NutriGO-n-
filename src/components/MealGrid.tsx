import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Timer, Flame, Check } from 'lucide-react';
import { MEALS_CATALOG } from '../data';
import { Meal } from '../types';

interface MealGridProps {
  onSelectMeal: (meal: Meal) => void;
  onAddMealToPlan: (meal: Meal, day: string, slot: 'breakfast' | 'lunch' | 'dinner') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export default function MealGrid({
  onSelectMeal,
  onAddMealToPlan,
  searchQuery,
  onSearchChange,
}: MealGridProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Vegan' | 'Keto' | 'Paleo' | 'High Protein'>('All');
  const [addingMeal, setAddingMeal] = useState<{ id: string; day: string; slot: 'breakfast' | 'lunch' | 'dinner' } | null>(null);
  
  // Dialog state for adding a meal directly from grid
  const [quickAddMenu, setQuickAddMenu] = useState<string | null>(null); // holds mealId to show simple day/slot picker

  // Filter logic
  const filteredMeals = useMemo(() => {
    return MEALS_CATALOG.filter((meal) => {
      // Search matching
      const matchesSearch =
        meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.dietTags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      if (!matchesSearch) return false;

      // Tag filter matching
      if (activeFilter === 'All') return true;
      if (activeFilter === 'Vegan') return meal.dietTags.includes('Vegan');
      if (activeFilter === 'Keto') return meal.dietTags.includes('Keto Friendly');
      if (activeFilter === 'Paleo') return meal.dietTags.includes('Paleo');
      if (activeFilter === 'High Protein') return meal.dietTags.includes('High Protein');

      return true;
    });
  }, [activeFilter, searchQuery]);

  const handleQuickAdd = (meal: Meal, day: string, slot: 'breakfast' | 'lunch' | 'dinner') => {
    // Show visual check mark feedback
    setAddingMeal({ id: meal.id, day, slot });
    onAddMealToPlan(meal, day, slot);
    
    setTimeout(() => {
      setAddingMeal(null);
      setQuickAddMenu(null);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Search and Filters Segment */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <h1 className="font-display font-extrabold text-3xl text-[#1a1c18] tracking-tight">
            Fuel your goals
          </h1>
          <p className="text-sm text-[#42493f] mt-1 max-w-xl">
            Curated gourmet nutrition designed strictly for your lifestyle. Discover delicious meals that match your target macros seamlessly.
          </p>
        </div>

        {/* Input plus filter chips wrapper */}
        <div className="space-y-4 w-full lg:w-auto">
          {/* Mobile search bar */}
          <div className="flex lg:hidden items-center bg-[#edefe7] rounded-full px-4 py-2 border border-[#c2c9bc]/50 focus-within:ring-2 focus-within:ring-[#3c6839]">
            <Search className="w-4 h-4 text-[#72796e]" />
            <input
              id="mobile-search-input"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search meals, ingredients..."
              className="bg-transparent border-none focus:outline-hidden text-sm ml-2 w-full text-[#1a1c18]"
            />
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            {(['All', 'Vegan', 'Keto', 'Paleo', 'High Protein'] as const).map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setActiveFilter(tag);
                  setQuickAddMenu(null);
                }}
                className={`text-xs font-semibold px-4 py-2 rounded-full cursor-pointer transition-all active:scale-95 ${
                  activeFilter === tag
                    ? 'bg-[#cdeb7e] text-[#536b06] shadow-xs'
                    : 'bg-[#edefe7] text-[#42493f] hover:bg-[#e2e3dc]'
                }`}
              >
                {tag === 'All' ? 'All Meals' : tag}
              </button>
            ))}
            <button className="bg-[#edefe7] hover:bg-[#e2e3dc] text-[#42493f] text-xs font-semibold px-4 py-2 rounded-full flex items-center gap-1 active:scale-95 cursor-pointer">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* Grid listing */}
      {filteredMeals.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-dashed border-[#c2c9bc] p-12">
          <p className="text-lg text-[#72796e] font-medium">No meals found matching your search.</p>
          <button
            onClick={() => {
              onSearchChange('');
              setActiveFilter('All');
            }}
            className="text-sm font-bold text-[#3c6839] hover:underline mt-2 cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMeals.map((meal) => {
            const isMenuOpen = quickAddMenu === meal.id;
            
            return (
              <div
                key={meal.id}
                className="bg-[#ffffff] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 group border border-[#c2c9bc]/35 flex flex-col h-full relative"
              >
                {/* Media banner */}
                <div
                  id={`meal-card-${meal.id}`}
                  onClick={() => onSelectMeal(meal)}
                  className="h-56 w-full relative overflow-hidden bg-[#e7e9e2] cursor-pointer"
                >
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <span className="absolute top-4 right-4 bg-[#cdeb7e]/95 backdrop-blur-md text-[#536b06] px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-xs">
                    {meal.dietTags[0]}
                  </span>
                </div>

                {/* Content body */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3
                        onClick={() => onSelectMeal(meal)}
                        className="font-display font-extrabold text-[#1a1c18] text-lg leading-tight hover:text-[#3c6839] cursor-pointer transition-colors"
                      >
                        {meal.name}
                      </h3>
                      <span className="text-base font-black text-[#3c6839] font-mono whitespace-nowrap">
                        ${meal.price.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[#72796e] text-xs font-semibold mb-4">
                      <Timer className="w-3.5 h-3.5" />
                      <span>{meal.prepTime} min prep &middot; fresh delivery</span>
                    </div>

                    {/* Macros detail card */}
                    <div className="bg-[#f3f4ed] rounded-xl p-4 mb-6 space-y-3 border border-[#c2c9bc]/20">
                      <div className="flex justify-between items-center text-xs font-bold text-[#42493f]">
                        <span className="flex items-center gap-1.5 font-medium">
                          <Flame className="w-3.5 h-3.5 text-[#3c6839]" />
                          {meal.calories} kcal
                        </span>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-[#72796e]">Macros Target</span>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-[#c2c9bc]/15">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-[#72796e] font-bold uppercase">Protein</span>
                          <span className="text-sm font-black text-[#1a1c18] font-mono mt-0.5">{meal.macros.protein}g</span>
                        </div>
                        <div className="flex flex-col border-x border-[#c2c9bc]/25 px-2">
                          <span className="text-[10px] text-[#72796e] font-bold uppercase font-sans">Carbs</span>
                          <span className="text-sm font-black text-[#1a1c18] font-mono mt-0.5">{meal.macros.carbs}g</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-[#72796e] font-bold uppercase">Fat</span>
                          <span className="text-sm font-black text-[#1a1c18] font-mono mt-0.5">{meal.macros.fat}g</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Add to plan interactive layout */}
                  <div className="relative">
                    {!isMenuOpen ? (
                      <button
                        onClick={() => setQuickAddMenu(meal.id)}
                        className="w-full bg-[#3c6839] text-[#ffffff] hover:opacity-95 text-xs font-bold py-3.5 rounded-full shadow-xs transition-all cursor-pointer active:scale-95"
                      >
                        Add to Planner Schedule
                      </button>
                    ) : (
                      <div className="bg-[#edefe7] rounded-xl p-3 border border-[#c2c9bc] text-center animate-fade-in space-y-2">
                        <p className="text-[11px] font-black uppercase text-[#42493f] tracking-wider">
                          Select slot for next week:
                        </p>
                        
                        {/* Quick Add days buttons */}
                        <div className="grid grid-cols-4 gap-1">
                          {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                            <button
                              key={day}
                              onClick={() => handleQuickAdd(meal, day, 'lunch')}
                              className="bg-white hover:bg-[#3c6839] hover:text-white text-[10px] font-bold p-1 border border-[#c2c9bc]/45 rounded transition-all cursor-pointer text-center"
                            >
                              {day}
                            </button>
                          ))}
                          <button
                            onClick={() => setQuickAddMenu(null)}
                            className="bg-[#ba1a1a]/10 hover:bg-[#ba1a1a] text-[#ba1a1a] hover:text-white text-[10px] font-bold p-1 border border-transparent rounded transition-all cursor-pointer text-center"
                          >
                            Cancel
                          </button>
                        </div>

                        {addingMeal?.id === meal.id && (
                          <div className="text-[11px] font-bold text-[#3c6839] flex items-center justify-center gap-1 pt-1.5 select-none animate-pulse">
                            <Check className="w-3.5 h-3.5" /> Checked! Scheduled to {addingMeal.day} Lunch
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
