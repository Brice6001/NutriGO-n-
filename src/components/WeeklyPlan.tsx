import { useState } from 'react';
import { ArrowLeftRight, Check, AlertCircle, Sparkles, Calendar as CalendarIcon, HelpCircle, Shuffle, ChevronRight, Printer, Copy, X } from 'lucide-react';
import { WeeklyPlanData, Meal } from '../types';
import { MEALS_CATALOG } from '../data';

interface WeeklyPlanProps {
  plan: WeeklyPlanData;
  onSwapFridayMeal: (newMeal: Meal) => void;
  onFillWeekend: () => void;
  onNavigateToMeals: () => void;
  onSelectMeal: (meal: Meal) => void;
}

export default function WeeklyPlan({
  plan,
  onSwapFridayMeal,
  onFillWeekend,
  onNavigateToMeals,
  onSelectMeal
}: WeeklyPlanProps) {
  const [activeDay, setActiveDay] = useState<string>('MON');
  const [isSwapAccepted, setIsSwapAccepted] = useState<boolean>(false);
  const [showSwapCard, setShowSwapCard] = useState<boolean>(true);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const generateMarkdown = () => {
    const DAYS_ORDER = [
      { key: 'MON', label: 'Monday', dateNum: 14 },
      { key: 'TUE', label: 'Tuesday', dateNum: 15 },
      { key: 'WED', label: 'Wednesday', dateNum: 16 },
      { key: 'THU', label: 'Thursday', dateNum: 17 },
      { key: 'FRI', label: 'Friday', dateNum: 18 },
      { key: 'SAT', label: 'Saturday', dateNum: 19 },
      { key: 'SUN', label: 'Sunday', dateNum: 20 },
    ];
    let md = `# NutriGo Premium Weekly Meal Schedule\n`;
    md += `Week of October 14 - October 20, 2024\n\n`;
    md += `| Day | Breakfast | Lunch | Dinner | Daily Total |\n`;
    md += `| :--- | :--- | :--- | :--- | :--- |\n`;
    
    DAYS_ORDER.forEach(({ key, label }) => {
      const dayData = plan[key];
      if (dayData) {
        const b = dayData.breakfast ? dayData.breakfast.name : 'Open Slot';
        const l = dayData.lunch ? dayData.lunch.name : 'Open Slot';
        const d = dayData.dinner ? dayData.dinner.name : 'Open Slot';
        const total = (dayData.breakfast?.calories || 0) + (dayData.lunch?.calories || 0) + (dayData.dinner?.calories || 0);
        md += `| **${label}** | ${b} | ${l} | ${d} | ~${total} kcal |\n`;
      } else {
        md += `| **${label}** | Open Weekend Slot | Open Weekend Slot | Open Weekend Slot | - |\n`;
      }
    });
    
    md += `\n\nGenerated with NutriGo Pro. Start building your peak wellness today!`;
    return md;
  };

  const handleCopy = () => {
    const text = generateMarkdown();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Check if weekend is already planned (or filled)
  const isWeekendFilled = plan['SAT'] !== undefined && plan['SUN'] !== undefined;

  // Swap target meal
  const handleSwapFriday = () => {
    const lemonChicken = MEALS_CATALOG.find(m => m.id === 'lemon_herb_chicken');
    if (lemonChicken) {
      onSwapFridayMeal(lemonChicken);
      setIsSwapAccepted(true);
      setTimeout(() => {
        setShowSwapCard(false);
      }, 2000);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      
      {/* Plan Header and Weekly Stats */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
        <div className="lg:col-span-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="text-left">
            <h1 className="font-display font-extrabold text-3xl text-[#1a1c18] tracking-tight">
              Your Weekly Plan
            </h1>
            <p className="text-sm text-[#42493f] mt-1">
              Week of October 14 - October 20, 2024
            </p>
          </div>
          <button
            id="btn-open-export"
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#3c6839] hover:bg-[#32572f] text-white rounded-xl text-xs font-black shadow-xs transition-all cursor-pointer active:scale-95"
          >
            <Printer className="w-4 h-4" />
            Print / Export Layout
          </button>
        </div>

        {/* Micro trackers sliders matching design mockups */}
        <div className="lg:col-span-5 grid grid-cols-3 gap-4">
          <div className="bg-[#f3f4ed] p-3.5 rounded-2xl border border-[#c2c9bc]/20 shadow-xs">
            <p className="text-[10px] font-bold text-[#72796e] uppercase tracking-wider">Calories</p>
            <p className="text-lg font-black text-[#3c6839] mt-0.5 font-mono">1,840 <span className="text-[10px] text-[#72796e]/85 font-sans">/ 2100</span></p>
            <div className="w-full bg-[#e7e9e2] h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#3c6839] h-full rounded-full" style={{ width: '85%' }} />
            </div>
          </div>

          <div className="bg-[#f3f4ed] p-3.5 rounded-2xl border border-[#c2c9bc]/20 shadow-xs">
            <p className="text-[10px] font-bold text-[#72796e] uppercase tracking-wider">Protein</p>
            <p className="text-lg font-black text-[#8a4a63] mt-0.5 font-mono">142g <span className="text-[10px] text-[#72796e]/85 font-sans">/ 160g</span></p>
            <div className="w-full bg-[#e7e9e2] h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#8a4a63] h-full rounded-full" style={{ width: '70%' }} />
            </div>
          </div>

          <div className="bg-[#f3f4ed] p-3.5 rounded-2xl border border-[#c2c9bc]/20 shadow-xs">
            <p className="text-[10px] font-bold text-[#72796e] uppercase tracking-wider">Water</p>
            <p className="text-lg font-black text-[#466365] mt-0.5 font-mono">2.4L <span className="text-[10px] text-[#72796e]/85 font-sans">/ 3.0L</span></p>
            <div className="w-full bg-[#e7e9e2] h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#466365] h-full rounded-full" style={{ width: '80%' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive horizontal Calendar grid matching figma layout */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
        
        {/* MON CARD - Active state default */}
        <div className="bg-white ring-2 ring-[#3c6839] p-4 rounded-2xl shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-extrabold text-[#3c6839] tracking-wider">MON</p>
                <p className="text-2xl font-black text-[#1a1c18] font-mono leading-none mt-1">14</p>
              </div>
              <span className="bg-[#bdf0b3] text-[#245023] p-1.5 rounded-full text-xs">
                <Check className="w-4 h-4" />
              </span>
            </div>

            <div className="space-y-3 mt-4">
              <div className="group cursor-pointer">
                <p className="text-[9px] font-bold text-[#72796e] uppercase font-mono tracking-widest">Breakfast</p>
                <p onClick={() => onSelectMeal(plan['MON'].breakfast)} className="text-xs font-semibold text-[#1a1c18] group-hover:text-[#3c6839] line-clamp-1 mt-0.5">
                  {plan['MON'].breakfast.name}
                </p>
              </div>
              <div className="group cursor-pointer">
                <p className="text-[9px] font-bold text-[#72796e] uppercase font-mono tracking-widest">Lunch</p>
                <p onClick={() => onSelectMeal(plan['MON'].lunch)} className="text-xs font-semibold text-[#1a1c18] group-hover:text-[#3c6839] line-clamp-1 mt-0.5">
                  {plan['MON'].lunch.name}
                </p>
              </div>
              <div className="group cursor-pointer">
                <p className="text-[9px] font-bold text-[#72796e] uppercase font-mono tracking-widest">Dinner</p>
                <p onClick={() => onSelectMeal(plan['MON'].dinner)} className="text-xs font-semibold text-[#1a1c18] group-hover:text-[#3c6839] line-clamp-1 mt-0.5">
                  {plan['MON'].dinner.name}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#c2c9bc]/20 flex justify-between items-center text-xs text-[#72796e] font-sans">
            <span className="font-semibold">1,950 kcal</span>
            <button
              onClick={onNavigateToMeals}
              className="text-[#3c6839] hover:bg-[#e7e9e2] p-1 rounded transition-colors cursor-pointer"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* TUE CARD */}
        <div className="bg-[#f3f4ed] hover:shadow-xs p-4 rounded-2xl space-y-4 flex flex-col justify-between border border-[#c2c9bc]/20 group transition-all">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-extrabold text-[#72796e] tracking-wider">TUE</p>
                <p className="text-2xl font-black text-[#1a1c18] font-mono leading-none mt-1">15</p>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              <div>
                <p className="text-[9px] font-bold text-[#72796e] uppercase tracking-widest font-mono">Breakfast</p>
                <p className="text-xs font-semibold text-[#1a1c18] line-clamp-1 mt-0.5">{plan['TUE'].breakfast.name}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-[#72796e] uppercase tracking-widest font-mono">Lunch</p>
                <p className="text-xs font-semibold text-[#1a1c18] line-clamp-1 mt-0.5">{plan['TUE'].lunch.name}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-[#72796e] uppercase tracking-widest font-mono">Dinner</p>
                <p className="text-xs font-semibold text-[#1a1c18] line-clamp-1 mt-0.5">{plan['TUE'].dinner.name}</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#c2c9bc]/20 flex justify-between items-center text-xs text-[#72796e]">
            <span className="font-semibold">1,820 kcal</span>
            <button
              onClick={onNavigateToMeals}
              className="text-[#42493f] hover:text-[#3c6839] hover:bg-[#e7e9e2] p-1 rounded transition-all cursor-pointer"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* WEDNESDAY CARD HIGHLIGHT - Spans 2 Columns in desktop for maximum screen compliance */}
        <div className="md:col-span-2 lg:col-span-2 bg-[#cdeb7e] rounded-2xl overflow-hidden border border-[#c2c9bc]/20 flex flex-col shadow-xs group">
          <div className="h-32 w-full relative overflow-hidden bg-[#93c48b]">
            <img
              src={plan['WED'].dinner.image}
              alt={plan['WED'].dinner.name}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
            />
            <span className="absolute top-3 right-3 bg-[#3c6839] text-[#ffffff] px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xs">
              Wednesday Highlight
            </span>
          </div>

          <div className="p-4 flex-1 flex flex-col justify-between">
            <div className="space-y-1">
              <h3 className="font-display font-extrabold text-sm text-[#1a1c18] line-clamp-1">
                {plan['WED'].dinner.name}
              </h3>
              <p className="text-[11px] text-[#42493f] leading-relaxed line-clamp-2">
                Our recommended organic high-protein dinner for your midweek peak wellness. Loaded with high dietary fiber.
              </p>
            </div>

            <div className="flex items-center gap-4 text-[10px] text-[#536b06] font-bold mt-3">
              <span className="bg-white/40 px-2 py-0.5 rounded">25 Min prep</span>
              <span className="bg-white/40 px-2 py-0.5 rounded">{plan['WED'].dinner.calories} kcal</span>
            </div>
          </div>
        </div>

        {/* THU CARD */}
        <div className="bg-[#f3f4ed] hover:shadow-xs p-4 rounded-2xl space-y-4 flex flex-col justify-between border border-[#c2c9bc]/20 transition-all">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-extrabold text-[#72796e] tracking-wider">THU</p>
                <p className="text-2xl font-black text-[#1a1c18] font-mono leading-none mt-1">17</p>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              <div>
                <p className="text-[9px] font-bold text-[#72796e] uppercase tracking-widest font-mono">Breakfast</p>
                <p className="text-xs font-semibold text-[#1a1c18] line-clamp-1 mt-0.5">{plan['THU'].breakfast.name}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-[#72796e] uppercase tracking-widest font-mono">Lunch</p>
                <p className="text-xs font-semibold text-[#1a1c18] line-clamp-1 mt-0.5">{plan['THU'].lunch.name}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-[#72796e] uppercase tracking-widest font-mono">Dinner</p>
                <p className="text-xs font-semibold text-[#1a1c18] line-clamp-1 mt-0.5">{plan['THU'].dinner.name}</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#c2c9bc]/20 flex justify-between items-center text-xs text-[#72796e]">
            <span className="font-semibold">2,010 kcal</span>
            <button
              onClick={onNavigateToMeals}
              className="text-[#42493f] hover:text-[#3c6839] hover:bg-[#e7e9e2] p-1 rounded transition-all cursor-pointer"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* FRI CARD */}
        <div className="bg-[#f3f4ed] hover:shadow-xs p-4 rounded-2xl space-y-4 flex flex-col justify-between border border-[#c2c9bc]/20 transition-all">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-extrabold text-[#72796e] tracking-wider">FRI</p>
                <p className="text-2xl font-black text-[#1a1c18] font-mono leading-none mt-1">18</p>
              </div>
            </div>

            <div className="space-y-3 mt-4">
              <div>
                <p className="text-[9px] font-bold text-[#72796e] uppercase tracking-widest font-mono">Breakfast</p>
                <p className="text-xs font-semibold text-[#1a1c18] line-clamp-1 mt-0.5">{plan['FRI'].breakfast.name}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-[#72796e] uppercase tracking-widest font-mono">Lunch</p>
                <p className="text-xs font-semibold text-[#1a1c18] line-clamp-1 mt-0.5">{plan['FRI'].lunch.name}</p>
              </div>
              <div>
                <p className="text-[9px] font-bold text-[#72796e] uppercase tracking-widest font-mono">Dinner</p>
                <p className="text-xs font-semibold text-[#1a1c18] line-clamp-1 mt-0.5">{plan['FRI'].dinner.name}</p>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-[#c2c9bc]/20 flex justify-between items-center text-xs text-[#72796e]">
            <span className="font-semibold">1,880 kcal</span>
            <button
              onClick={onNavigateToMeals}
              className="text-[#42493f] hover:text-[#3c6839] hover:bg-[#e7e9e2] p-1 rounded transition-all cursor-pointer"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* WEEKEND SUMMARY slot card */}
        <div className="lg:col-span-1 bg-[#ffffff] border-2 border-dashed border-[#c2c9bc]/60 rounded-2xl p-4 flex flex-col justify-between text-center items-center">
          <div className="py-4 space-y-2">
            <CalendarIcon className="w-10 h-10 text-[#72796e] mx-auto opacity-75" />
            <h3 className="font-display font-black text-base text-[#1a1c18]">Weekend</h3>
            <p className="text-[10px] text-[#42493f] leading-snug">
              {isWeekendFilled ? "Planner filled successfully with premium meals!" : "Planning is now open for Saturday & Sunday"}
            </p>
          </div>

          <button
            onClick={onFillWeekend}
            disabled={isWeekendFilled}
            className={`w-full py-2 rounded-lg font-semibold text-xs transition-all cursor-pointer active:scale-95 ${
              isWeekendFilled
                ? 'bg-[#bdf0b3] text-[#245023] cursor-not-allowed'
                : 'bg-[#466365] hover:opacity-90 text-white'
            }`}
          >
            {isWeekendFilled ? "Filled ✓" : "Fill Weekend"}
          </button>
        </div>

      </section>

      {/* Daily Nutrition Outlook bars and smart swap section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Graph box */}
        <div className="lg:col-span-2 bg-[#ffffff] rounded-3xl p-6 sm:p-8 shadow-xs border border-[#c2c9bc]/25">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-display text-lg font-bold text-[#1a1c18]">Daily Nutrition Outlook</h2>
            <div className="flex gap-4 text-xs font-semibold text-[#72796e]">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#3c6839] rounded-full inline-block" /> Planned</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-[#D0E562] rounded-full inline-block" /> Actual</span>
            </div>
          </div>

          {/* Bar graph layout */}
          <div className="h-44 flex items-end justify-between px-4 border-b border-[#c2c9bc]/20 pb-2">
            {[
              { day: 'M', plannedVal: 80, actualVal: 70, isAct: true },
              { day: 'T', plannedVal: 60, actualVal: 50, isAct: true },
              { day: 'W', plannedVal: 90, actualVal: 30, isAct: true },
              { day: 'T', plannedVal: 75, actualVal: 0, isAct: false },
              { day: 'F', plannedVal: 85, actualVal: 0, isAct: false },
              { day: 'S', plannedVal: 50, actualVal: 0, isAct: false },
              { day: 'S', plannedVal: 45, actualVal: 0, isAct: false },
            ].map((d, index) => (
              <div key={index} className="flex flex-col items-center gap-2 w-8">
                <div className="h-28 w-full flex items-end justify-center gap-1 relative group">
                  <div className="w-2.5 bg-[#3c6839]/25 group-hover:bg-[#3c6839]/40 h-full rounded-t" style={{ height: `${d.plannedVal}%` }} />
                  {d.isAct && <div className="w-2.5 bg-[#D0E562] h-full rounded-t" style={{ height: `${d.actualVal}%` }} />}
                </div>
                <span className="text-[10px] uppercase font-bold text-[#72796e]">{d.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Smart Swap recommendation badge */}
        {showSwapCard && (
          <div className="bg-[#ffd9e4] text-[#39071f] rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between border border-[#f0a1bd]/30 relative overflow-hidden transition-all duration-300">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#8a4a63] animate-spin-slow" />
                <span className="text-[10px] font-black uppercase tracking-widest text-[#6f334b]">
                  Smart Swap Recommendation
                </span>
              </div>
              
              <h3 className="font-display text-xl font-bold text-[#39071f] leading-tight">
                Optimize Friday
              </h3>
              
              <p className="text-xs text-[#39071f]/85 leading-relaxed">
                Friday's dinner <strong>Beef Stir-fry</strong> is slightly high in dietary sodium for your personal health goal parameters. Swap it for the clean <strong>Lemon Herb Roast Chicken</strong>?
              </p>
            </div>

            <div className="mt-8 space-y-2">
              <button
                id="btn-accept-swap"
                onClick={handleSwapFriday}
                disabled={isSwapAccepted}
                className="w-full bg-[#1c000f] hover:bg-[#39071f] text-[#ffffff] font-bold text-xs py-3.5 rounded-xl shadow-md transition-all cursor-pointer active:scale-95 flex items-center justify-center gap-1"
              >
                {isSwapAccepted ? (
                  <>
                    <Check className="w-4 h-4 text-[#ffd9e4]" /> Swap Accepted! Optimized Friday
                  </>
                ) : (
                  'Accept Swap Recommended'
                )}
              </button>
              <button
                onClick={() => setShowSwapCard(false)}
                className="w-full bg-transparent text-[#39071f] hover:bg-[#39071f]/10 font-bold text-xs py-3.5 rounded-xl transition-all cursor-pointer border border-[#39071f]/20"
              >
                Dismiss Recommendation
              </button>
            </div>
          </div>
        )}

      </section>

      {/* Structured printable/export agenda modal overlay */}
      {showExportModal && (
        <div id="export-schedule-modal" className="fixed inset-0 bg-[#000000]/60 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in no-print backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-4xl w-full border border-[#c2c9bc]/35 shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-[#f9faf3] border-b border-[#c2c9bc]/30 px-6 py-4 flex items-center justify-between text-left">
              <div>
                <h3 className="font-display font-black text-lg text-[#1a1c18]">Export Weekly Schedule</h3>
                <p className="text-xs text-[#72796e]">Print your daily culinary routine or copy standard markdown logs.</p>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="text-[#72796e] hover:text-[#1a1c18] hover:bg-[#edefe7] p-2 rounded-full transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Preview Wrapper */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              
              {/* Interactive Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-[#edefe7]/40 p-4 rounded-2xl border border-[#c2c9bc]/20">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#3c6839] rounded-full animate-ping" />
                  <span className="text-xs font-bold text-[#1a1c18]">Ready to Print</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3.5 py-2 hover:bg-[#3c6839]/10 text-[#3c6839] rounded-xl text-xs font-bold border border-[#3c6839]/30 transition-all cursor-pointer active:scale-95"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 font-bold" />
                        Copied Markdown!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy Markdown
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-1.5 px-4 py-2 bg-[#3c6839] hover:bg-[#32572f] text-white rounded-xl text-xs font-black transition-all cursor-pointer active:scale-95 shadow-xs"
                  >
                    <Printer className="w-3.5 h-3.5 font-bold" />
                    Print Schedule
                  </button>
                </div>
              </div>

              {/* High-fidelity formatted print container */}
              <div
                id="print-modal-content"
                className="bg-white border border-[#c2c9bc]/35 rounded-2xl p-6 sm:p-8 space-y-6 text-left"
              >
                {/* Clean inline print styles mapping */}
                <style>{`
                  @media print {
                    body * {
                      visibility: hidden;
                      background: none !important;
                      color: #000000 !important;
                    }
                    #print-modal-content, #print-modal-content * {
                      visibility: visible;
                      font-family: system-ui, -apple-system, sans-serif !important;
                    }
                    #print-modal-content {
                      position: absolute;
                      left: 0;
                      top: 0;
                      width: 100%;
                      margin: 0 !important;
                      padding: 20px !important;
                      border: none !important;
                      box-shadow: none !important;
                    }
                    .no-print {
                      display: none !important;
                    }
                  }
                `}</style>

                {/* Print Title Header info */}
                <div className="flex justify-between items-start border-b border-[#c2c9bc]/40 pb-4">
                  <div className="text-left">
                    <span className="text-[9px] font-black tracking-widest text-[#3c6839] uppercase">NutriGo Elite Companion Plan</span>
                    <h2 className="font-display font-black text-2xl text-[#1a1c18] mt-1">My Weekly Culinary Agenda</h2>
                    <p className="text-xs text-[#72796e] mt-0.5">Week of October 14 - October 20, 2024</p>
                  </div>
                  <div className="text-right">
                    <span className="bg-[#f0f4ec] border border-[#c2c9bc]/40 text-[#3c6839] text-[10px] font-black px-3 py-1.5 rounded-lg inline-block uppercase">
                      NutriGo Pro Active
                    </span>
                  </div>
                </div>

                {/* Clean organized tabular schedule list */}
                <div className="space-y-4">
                  {[
                    { key: 'MON', label: 'Monday', dateNum: 14 },
                    { key: 'TUE', label: 'Tuesday', dateNum: 15 },
                    { key: 'WED', label: 'Wednesday', dateNum: 16 },
                    { key: 'THU', label: 'Thursday', dateNum: 17 },
                    { key: 'FRI', label: 'Friday', dateNum: 18 },
                    { key: 'SAT', label: 'Saturday', dateNum: 19 },
                    { key: 'SUN', label: 'Sunday', dateNum: 20 },
                  ].map(({ key, label, dateNum }) => {
                    const dayData = plan[key];
                    return (
                      <div key={key} className="border border-[#c2c9bc]/30 rounded-xl p-4 hover:bg-[#f9faf3]/20 transition-all flex flex-col md:grid md:grid-cols-12 gap-3 items-stretch">
                        
                        {/* Day indicator column */}
                        <div className="md:col-span-2 flex md:flex-col justify-between md:justify-center border-b md:border-b-0 md:border-r border-[#c2c9bc]/20 pb-2 md:pb-0 md:pr-4">
                          <span className="text-xs font-black uppercase tracking-wider text-[#3c6839] text-left">{label}</span>
                          <span className="text-xl font-mono font-black text-[#1a1c18] text-left">Oct {dateNum}</span>
                        </div>

                        {/* Meal Slots columns */}
                        <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                          {dayData ? (
                            <>
                              <div>
                                <span className="text-[9px] font-bold text-[#72796e] uppercase tracking-wider">Breakfast</span>
                                <h4 className="text-xs font-extrabold text-[#1a1c18] mt-0.5 line-clamp-1">{dayData.breakfast?.name || 'Not Filled'}</h4>
                                <p className="text-[10px] text-[#72796e] font-mono mt-0.5">{dayData.breakfast?.calories || 0} kcal | {dayData.breakfast?.prepTime || 15} mins</p>
                              </div>
                              <div>
                                <span className="text-[9px] font-bold text-[#72796e] uppercase tracking-wider">Lunch</span>
                                <h4 className="text-xs font-extrabold text-[#1a1c18] mt-0.5 line-clamp-1">{dayData.lunch?.name || 'Not Filled'}</h4>
                                <p className="text-[10px] text-[#72796e] font-mono mt-0.5">{dayData.lunch?.calories || 0} kcal | {dayData.lunch?.prepTime || 20} mins</p>
                              </div>
                              <div>
                                <span className="text-[9px] font-bold text-[#72796e] uppercase tracking-wider">Dinner</span>
                                <h4 className="text-xs font-extrabold text-[#1a1c18] mt-0.5 line-clamp-1">{dayData.dinner?.name || 'Not Filled'}</h4>
                                <p className="text-[10px] text-[#72796e] font-mono mt-0.5">{dayData.dinner?.calories || 0} kcal | {dayData.dinner?.prepTime || 25} mins</p>
                              </div>
                            </>
                          ) : (
                            <div className="col-span-3 flex items-center py-2 text-[#72796e] italic text-xs">
                              Open Weekend Slot — Go back and click "Fill Weekend" to complete.
                            </div>
                          )}
                        </div>

                        {/* Energy values sub-card */}
                        <div className="md:col-span-2 flex flex-row md:flex-col items-center justify-between md:justify-center bg-[#f9faf3] rounded-lg p-2.5 border border-[#c2c9bc]/15 md:text-center shrink-0">
                          <span className="text-[9px] font-black uppercase text-[#72796e] tracking-widest text-left md:text-center">Energy Total</span>
                          <span className="text-xs font-black text-[#1a1c18] font-mono mt-0.5">
                            {dayData ? (
                              `${(dayData.breakfast?.calories || 0) + (dayData.lunch?.calories || 0) + (dayData.dinner?.calories || 0)} kcal`
                            ) : (
                              '0 kcal'
                            )}
                          </span>
                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* Botanical guidelines & micro goals checklist */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-[#c2c9bc]/30 text-left">
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-[#3c6839]">Hydration Focus Limits</h4>
                    <p className="text-[11px] leading-relaxed text-[#42493f]">Drink 3.0 Liters total (approx. 100oz) of organic, mineralized water daily. Hydrate heavily before and during peak cardiovascular sessions to optimize thermogenesis metrics.</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-black uppercase tracking-wider text-[#3c6839]">Metabolic Target Metrics</h4>
                    <ul className="text-[11px] space-y-1 text-[#42493f] list-disc list-inside">
                      <li>Uphold the custom daily target budget of 2,100 kcal.</li>
                      <li>Protein intake target of 142g - 160g to protect lean tissue.</li>
                      <li>Incorporate mineral-dense, organic fibers during lunches.</li>
                    </ul>
                  </div>
                </div>

                {/* Micro branding stamp */}
                <div className="text-center pt-4 border-t border-[#c2c9bc]/10">
                  <p className="text-[9px] text-[#72796e] font-mono">NutriGo Pro Edition • Formulated with Gemini Smart Intelligence Services • Generated on {new Date().toLocaleDateString()}</p>
                </div>

              </div>

            </div>

            {/* Modal Controls Footer */}
            <div className="bg-[#f9faf3] border-t border-[#c2c9bc]/30 px-6 py-4 flex justify-end gap-3 no-print">
              <button
                id="btn-close-export"
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 bg-transparent hover:bg-[#edefe7] border border-[#c2c9bc]/40 text-[#42493f] font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                Close Preview
              </button>
              <button
                onClick={() => window.print()}
                className="px-5 py-2 bg-[#3c6839] hover:opacity-90 text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                Proceed to Print
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
