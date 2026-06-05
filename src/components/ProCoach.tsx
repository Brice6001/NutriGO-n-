import { useState } from 'react';
import { Sparkles, Send, Flame, Bot, ListFilter, ClipboardList, TrendingUp, Info, ChevronDown, ChevronUp, Lock } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface MealPlanDetail {
  name: string;
  description: string;
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  directions: string;
}

interface DayPlan {
  dayName: string;
  focusName: string;
  breakfast: MealPlanDetail;
  lunch: MealPlanDetail;
  dinner: MealPlanDetail;
}

interface DietPlanData {
  successSummary: string;
  dailyKcalTarget: number;
  macrosTarget: {
    protein: string;
    carbs: string;
    fat: string;
  };
  days: DayPlan[];
}

interface ProCoachProps {
  isSubscribed: boolean;
  onSubscribe: () => void;
  userProfile: {
    name: string;
    currentWeight: number;
    targetWeight: number;
  };
}

export default function ProCoach({ isSubscribed, onSubscribe, userProfile }: ProCoachProps) {
  const [activeTab, setActiveTab] = useState<'coach' | 'planner'>('coach');
  
  // Chat state
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Hello ${userProfile.name}! I am Chef Celeste, your NutriGo Pro Nutrition Advisor. As a Pro Member, you have unlimited access to my culinary & dietary advisory. Ask me anything about botanical balance, macros optimization, recipe swaps, or micro-nutrient health!`,
    },
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Planner state
  const [fitnessGoal, setFitnessGoal] = useState('Build lean muscle and cellular activation');
  const [dietaryPreference, setDietaryPreference] = useState('Ketogenic');
  const [userWeight, setUserWeight] = useState(userProfile.currentWeight.toString());
  const [targetWeight, setTargetWeight] = useState(userProfile.targetWeight.toString());
  const [plannerResult, setPlannerResult] = useState<DietPlanData | null>(null);
  const [isPlannerLoading, setIsPlannerLoading] = useState(false);
  const [openCardId, setOpenCardId] = useState<string | null>(null);

  // Quick suggestions for chat
  const quickSuggs = [
    { text: "Late protein snack recipe", q: "Show me a delicious, late-night high-protein snack recipe under 250 kcal." },
    { text: "Dairy-free substitute", q: "What is an artisan, clean dairy-free substitute for heavy cream in gourmet bowls?" },
    { text: "Audit metabolic rate", q: "Explain the biochemical connection between hydration volume and cellular metabolism." }
  ];

  const handleSendChat = async (overridePrompt?: string) => {
    const promptToSend = overridePrompt || chatInput;
    if (!promptToSend.trim() || isChatLoading) return;

    const userMsg: ChatMessage = { role: 'user', content: promptToSend };
    setChatInput('');
    setChatHistory((prev) => [...prev, userMsg]);
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/gemini/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: promptToSend,
          history: chatHistory,
        }),
      });

      if (!response.ok) {
        throw new Error('Our AI engines are calibrating. Please verify your internet or secrets.');
      }

      const data = await response.json();
      setChatHistory((prev) => [...prev, { role: 'assistant', content: data.text }]);
    } catch (err: any) {
      setChatHistory((prev) => [
        ...prev,
        { role: 'assistant', content: `⚠️ Service issue: ${err.message || 'Cannot access Celeste. Please configure a valid GEMINI_API_KEY inside the Settings Secrets pane.'}` },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleGeneratePlan = async () => {
    setIsPlannerLoading(true);
    setPlannerResult(null);

    try {
      const response = await fetch('/api/gemini/prep-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          goal: fitnessGoal,
          currentWeight: parseFloat(userWeight) || userProfile.currentWeight,
          targetWeight: parseFloat(targetWeight) || userProfile.targetWeight,
          restriction: dietaryPreference,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate plan. Please verify secrets and configurations.');
      }

      const data = await response.json();
      setPlannerResult(data);
    } catch (err: any) {
      alert(`Optimization Issue: ${err.message || 'Error formulating planner schema.'}`);
    } finally {
      setIsPlannerLoading(false);
    }
  };

  const toggleCard = (id: string) => {
    setOpenCardId(openCardId === id ? null : id);
  };

  // If NOT subscribed, show an exceptionally high-fidelity Premium paywall screen
  if (!isSubscribed) {
    return (
      <div id="pro-upgrade-view" className="max-w-4xl mx-auto space-y-8 animate-fade-in py-6">
        <div className="bg-linear-to-r from-[#3c6839] to-[#466365] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden border border-[#ffffff]/10 shadow-xl">
          <div className="absolute -right-16 -top-16 opacity-10 pointer-events-none">
            <Sparkles className="w-80 h-80 text-white" />
          </div>

          <div className="max-w-xl space-y-6 relative z-10 text-left">
            <span className="bg-[#cdeb7e] text-[#1a1c18] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 fill-[#1a1c18]" /> NutriGo Pro Lounge
            </span>
            <h1 className="font-display font-black text-3xl sm:text-5xl tracking-tight leading-none text-[#d0ee81]">
              Unlock Elite Wellness Bio-Synchronization
            </h1>
            <p className="text-white/90 text-sm sm:text-base leading-relaxed">
              Ascend to our premium NutriGo Platinum cluster. Get medical-grade culinary counseling, smart meal modifiers, and high-fidelity personalized nutrition schedules built live by Gemini.
            </p>

            <div className="pt-2 space-y-3.5">
              {[
                { title: "24/7 AI Chef Celeste Advisor", desc: "Unlimited smart recipe advice, gourmet botanicals, swaps, and kitchen hacks." },
                { title: "Bio-Sync Personalized 3-Day Menus", desc: "Formulate elite diets aligned directly with allergies, goal timelines, and macros bounds." },
                { title: "Smart Micro-budget Tracking", desc: "Visual calorie and nutritional label scanning for raw dish structures." }
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="mt-1 bg-[#cdeb7e] text-[#3c6839] p-1 h-fit rounded-full">
                    <Sparkles className="w-3 h-3 fill-[#3c6839]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#ffffff]">{item.title}</h4>
                    <p className="text-xs text-white/80 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                id="btn-on-demand-upgrade"
                onClick={onSubscribe}
                className="bg-[#cdeb7e] text-[#1a1c18] font-black text-sm px-8 py-4 rounded-2xl hover:opacity-95 cursor-pointer active:scale-95 transition-all shadow-md text-center"
              >
                Activate Free Pro Trial
              </button>
              <div className="flex items-center gap-2 text-xs text-white/70 justify-center">
                <Lock className="w-4 h-4 text-[#cdeb7e]" /> Cancel anytime instantly • Safe Encryption
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Dynamic Header */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#c2c9bc]/30 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-[#3c6839]/10 text-[#3c6839] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 fill-[#3c6839]" /> Pro Member Active
            </span>
          </div>
          <h1 className="font-display font-black text-3xl md:text-4xl text-[#1a1c18] tracking-tight mt-2">
            Premium Pro Lounge
          </h1>
          <p className="text-[#42493f] text-sm mt-1">
            Access unlimited bio-adaptive diagnostics, automated meal schedulers, and live culinary consultancy.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-[#edefe7] p-1.5 rounded-2xl border border-[#c2c9bc]/30 self-start md:self-center">
          <button
            onClick={() => setActiveTab('coach')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'coach'
                ? 'bg-[#ffffff] text-[#1a1c18] shadow-xs'
                : 'text-[#42493f] hover:text-[#1a1c18]'
            }`}
          >
            <Bot className="w-4 h-4" />
            Chef Celeste Chat
          </button>
          <button
            onClick={() => setActiveTab('planner')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer ${
              activeTab === 'planner'
                ? 'bg-[#ffffff] text-[#1a1c18] shadow-xs'
                : 'text-[#42493f] hover:text-[#1a1c18]'
            }`}
          >
            <ClipboardList className="w-4 h-4" />
            Bio-Sync Goal Planner
          </button>
        </div>
      </section>

      {/* RENDER ACTIVE TAB */}
      {activeTab === 'coach' ? (
        <div id="ai-chat-interface" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Quick Suggestions Panel / Side info */}
          <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="bg-[#ffffff] rounded-2xl p-5 border border-[#c2c9bc]/30 shadow-xs">
                <h3 className="font-bold text-[#1a1c18] text-sm flex items-center gap-2">
                  <Info className="w-4.5 h-4.5 text-[#3c6839]" /> Quick Wellness Prompts
                </h3>
                <p className="text-[#42493f] text-xs mt-2 leading-relaxed">
                  Select a tailored professional question to run live micro-nutrient audits or kitchen swaps:
                </p>

                <div className="mt-4 space-y-2.5">
                  {quickSuggs.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendChat(s.q)}
                      disabled={isChatLoading}
                      className="w-full text-left bg-[#f9faf3] hover:bg-[#cdeb7e]/45 p-3 rounded-xl border border-[#c2c9bc]/30 hover:border-[#3c6839]/30 transition-all text-xs font-semibold text-[#1a1c18] block cursor-pointer active:scale-98"
                    >
                      {s.text}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-[#466365] text-white rounded-2xl p-5 border border-transparent">
                <h4 className="font-black text-xs uppercase tracking-wider text-[#d0ee81]">
                  Clinical Botany Insight
                </h4>
                <p className="text-white/85 text-[11px] leading-relaxed mt-2">
                  NutriGo Pro systems prioritize phytonutrients &amp; mineral-dense recipes mapped recursively to target physical goals. Need customized culinary hacks? Just ask Celeste.
                </p>
              </div>
            </div>
          </div>

          {/* Core Chat Box */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#c2c9bc]/30 shadow-sm flex flex-col h-[520px] overflow-hidden">
            {/* Header */}
            <div className="bg-[#f9faf3] border-b border-[#c2c9bc]/30 px-6 py-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#3c6839]/10 text-[#3c6839] flex items-center justify-center font-bold">
                C
              </div>
              <div>
                <h3 className="font-display font-black text-sm text-[#1a1c18]">Chef Celeste AI</h3>
                <p className="text-[10px] text-[#72796e] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-[#3c6839] rounded-full inline-block animate-pulse" /> Active Diets Advisor
                </p>
              </div>
            </div>

            {/* Messages body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-linear-to-b from-[#f9faf3]/30 to-white">
              {chatHistory.map((m, index) => (
                <div
                  key={index}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-[#3c6839] text-[#ffffff] rounded-tr-none'
                        : 'bg-[#edefe7] text-[#1a1c18] rounded-tl-none border border-[#c2c9bc]/20'
                    }`}
                  >
                    <p className="whitespace-pre-line font-medium">{m.content}</p>
                  </div>
                </div>
              ))}
              
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-[#edefe7] text-[#42493f] rounded-2xl rounded-tl-none px-4 py-3 text-xs border border-[#c2c9bc]/20 flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 bg-[#3c6839] rounded-full animate-bounce" />
                    <span className="inline-block w-1.5 h-1.5 bg-[#3c6839] rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="inline-block w-1.5 h-1.5 bg-[#3c6839] rounded-full animate-bounce [animation-delay:0.4s]" />
                    Celeste is calibrating nutrition budgets...
                  </div>
                </div>
              )}
            </div>

            {/* Footer Form */}
            <div className="border-t border-[#c2c9bc]/30 p-4 bg-[#f9faf3]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendChat();
                }}
                className="flex items-center gap-2"
              >
                <input
                  id="chat-input-field"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about protein swaps, gourmet botanical salads, dynamic macros..."
                  className="flex-1 bg-[#ffffff] rounded-xl px-4 py-3 text-xs border border-[#c2c9bc]/50 focus:outline-hidden focus:border-[#3c6839] focus:ring-1 focus:ring-[#3c6839]"
                  disabled={isChatLoading}
                />
                <button
                  type="submit"
                  disabled={isChatLoading || !chatInput.trim()}
                  className="bg-[#3c6839] hover:opacity-90 disabled:opacity-40 text-white p-3 rounded-xl cursor-pointer active:scale-95 transition-all flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

        </div>
      ) : (
        <div id="ai-planner-interface" className="space-y-6">
          
          {/* Controls form */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-white p-6 rounded-3xl border border-[#c2c9bc]/30 shadow-xs">
            <div className="space-y-1 text-left">
              <label className="text-[10px] font-black uppercase text-[#72796e] tracking-wider">Active Fitness Goal</label>
              <select
                id="select-goal"
                value={fitnessGoal}
                onChange={(e) => setFitnessGoal(e.target.value)}
                className="w-full text-xs font-bold bg-[#f9faf3] border border-[#c2c9bc]/40 rounded-xl p-3"
              >
                <option value="Shred weight and increase metabolic rate">Fat Loss / Body Re-comp</option>
                <option value="Build dry lean athletic muscle volume">Hypertrophy / Lean Bulk</option>
                <option value="Enhance aerobic threshold and botanical recovery">Endurance Athlete</option>
                <option value="Cellular energy activation and organic longevity">Peak Brain &amp; Longevity</option>
              </select>
            </div>

            <div className="space-y-1 text-left">
              <label className="text-[10px] font-black uppercase text-[#72796e] tracking-wider">Dietary Preferences</label>
              <select
                id="select-preference"
                value={dietaryPreference}
                onChange={(e) => setDietaryPreference(e.target.value)}
                className="w-full text-xs font-bold bg-[#f9faf3] border border-[#c2c9bc]/40 rounded-xl p-3"
              >
                <option value="Ketogenic Low-carb">Ketogenic / Low-Carb</option>
                <option value="Plant-based vegan high-protein">Plant-Based High-Protein</option>
                <option value="Organic Paleo seafood and poultry">Paleo / Whole Foods</option>
                <option value="No restrictions organic mediterranean">Mediterranean Whole Diet</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2 text-left">
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-[#72796e] tracking-wider">Current (kg)</label>
                <input
                  id="input-weight"
                  type="number"
                  value={userWeight}
                  onChange={(e) => setUserWeight(e.target.value)}
                  className="w-full text-xs font-bold bg-[#f9faf3] border border-[#c2c9bc]/40 rounded-xl p-3"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-[#72796e] tracking-wider">Target (kg)</label>
                <input
                  id="input-target"
                  type="number"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value)}
                  className="w-full text-xs font-bold bg-[#f9faf3] border border-[#c2c9bc]/40 rounded-xl p-3"
                />
              </div>
            </div>

            <div className="flex items-end">
              <button
                id="btn-trigger-plan"
                onClick={handleGeneratePlan}
                disabled={isPlannerLoading}
                className="w-full bg-[#3c6839] hover:bg-[#345a31] text-white font-black text-xs py-3 rounded-xl transition-all cursor-pointer active:scale-95 shadow-sm inline-flex items-center justify-center gap-1.5"
              >
                {isPlannerLoading ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Bio-Syncing...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 fill-white" />
                    Automate Menu Planning
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Result visualizer layout */}
          <div className="space-y-6">
            {isPlannerLoading && (
              <div id="ai-loading-panel" className="bg-[#ffffff] rounded-3xl p-12 border border-[#c2c9bc]/20 text-center space-y-4 shadow-xs">
                <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                  <div className="absolute inset-0 border-4 border-[#3c6839]/10 rounded-full" />
                  <div className="absolute inset-0 border-4 border-t-[#3c6839] rounded-full animate-spin" />
                  <Sparkles className="w-6 h-6 text-[#3c6839] animate-pulse" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-black text-base text-[#1a1c18]">Activating Gemini Clinical Intelligence</h3>
                  <p className="text-xs text-[#72796e] max-w-sm mx-auto">
                    Celeste is auditing macronutrient ratios, calculating water retention limits, and designing gourmet, garden-fresh dishes tailored to your {fitnessGoal} goals. Keep tight!
                  </p>
                </div>
              </div>
            )}

            {!plannerResult && !isPlannerLoading && (
              <div className="bg-[#f9faf3] p-12 text-center rounded-3xl border border-dashed border-[#c2c9bc]/60">
                <Info className="w-10 h-10 text-[#72796e] mx-auto opacity-70" />
                <h3 className="font-display font-bold text-[#1a1c18] mt-3">Ready for Custom Planning</h3>
                <p className="text-xs text-[#72796e] mt-1 max-w-sm mx-auto">
                  Click 'Automate Menu Planning' to let Gemini build a customized 3-day health diet schedule mapped precisely to your raw wellness metrics.
                </p>
              </div>
            )}

            {plannerResult && (
              <div id="result-plan-dashboard" className="space-y-6 animate-fade-in text-left">
                
                {/* Intro summary block */}
                <div className="bg-linear-to-r from-[#466365] to-[#3a5355] text-white rounded-3xl p-6 relative overflow-hidden">
                  <div className="max-w-2xl relative z-10 space-y-2">
                    <h2 className="font-display font-extrabold text-xl text-[#d0ee81]">Your Bio-Sync Overview</h2>
                    <p className="text-xs text-white/95 leading-relaxed">{plannerResult.successSummary}</p>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <p className="text-[10px] text-white/60 font-bold uppercase uppercase font-mono">Calorie Target</p>
                      <p className="text-base font-black text-[#d0ee81] mt-0.5">{plannerResult.dailyKcalTarget} kcal</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/60 font-bold uppercase uppercase font-mono">Protein Budget</p>
                      <p className="text-base font-black text-white mt-0.5">{plannerResult.macrosTarget.protein}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/60 font-bold uppercase uppercase font-mono">Carb Limits</p>
                      <p className="text-base font-black text-white mt-0.5">{plannerResult.macrosTarget.carbs}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-white/60 font-bold uppercase uppercase font-mono">Fats Budget</p>
                      <p className="text-base font-black text-white mt-0.5">{plannerResult.macrosTarget.fat}</p>
                    </div>
                  </div>
                </div>

                {/* Days Schedule listing */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {plannerResult.days.map((day, dIdx) => (
                    <div key={dIdx} className="bg-white rounded-2xl p-5 border border-[#c2c9bc]/30 shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-center pb-3 border-b border-[#c2c9bc]/20">
                          <div>
                            <span className="text-[10px] font-black uppercase text-[#3c6839] tracking-widest">{day.dayName}</span>
                            <h3 className="font-display font-extrabold text-base text-[#1a1c18] mt-0.5 line-clamp-1">{day.focusName}</h3>
                          </div>
                        </div>

                        {/* Breakfast, Lunch, Dinner details */}
                        <div className="mt-4 space-y-4">
                          
                          {/* Breakfast drawer */}
                          <div className="border border-[#c2c9bc]/20 rounded-xl overflow-hidden">
                            <button
                              onClick={() => toggleCard(`${dIdx}-breakfast`)}
                              className="w-full bg-[#f9faf3] p-3 text-left flex justify-between items-center text-xs font-bold text-[#1a1c18] hover:bg-[#edefe7]"
                            >
                              <div className="flex items-center gap-1.5">
                                <span className="bg-[#3c6839]/10 text-[#3c6839] text-[9px] font-black px-1.5 py-0.5 rounded">B</span>
                                <span className="line-clamp-1">{day.breakfast.name}</span>
                              </div>
                              {openCardId === `${dIdx}-breakfast` ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>

                            {openCardId === `${dIdx}-breakfast` && (
                              <div className="p-3 bg-[#ffffff] border-t border-[#c2c9bc]/10 text-xs text-[#42493f] space-y-2">
                                <p className="font-semibold text-[#1a1c18]">{day.breakfast.description}</p>
                                <div className="flex justify-between font-bold text-[10px] text-[#3c6839] bg-[#f9faf3] p-1.5 rounded">
                                  <span>{day.breakfast.kcal} k</span>
                                  <span>P: {day.breakfast.protein}g</span>
                                  <span>C: {day.breakfast.carbs}g</span>
                                  <span>F: {day.breakfast.fat}g</span>
                                </div>
                                <div className="space-y-1">
                                  <p className="font-bold uppercase text-[9px] text-[#72796e]">Ingredients:</p>
                                  <ul className="list-disc list-inside text-[11px] pl-1 text-[#42493f]">
                                    {day.breakfast.ingredients.map((ing, iIdx) => <li key={iIdx}>{ing}</li>)}
                                  </ul>
                                </div>
                                <div className="space-y-1 pt-1 border-t border-[#c2c9bc]/10">
                                  <p className="font-bold uppercase text-[9px] text-[#72796e]">Directions Summary:</p>
                                  <p className="text-[11px] leading-relaxed italic">{day.breakfast.directions}</p>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Lunch drawer */}
                          <div className="border border-[#c2c9bc]/20 rounded-xl overflow-hidden">
                            <button
                              onClick={() => toggleCard(`${dIdx}-lunch`)}
                              className="w-full bg-[#f9faf3] p-3 text-left flex justify-between items-center text-xs font-bold text-[#1a1c18] hover:bg-[#edefe7]"
                            >
                              <div className="flex items-center gap-1.5">
                                <span className="bg-[#d0ee81] text-[#42493f] text-[9px] font-black px-1.5 py-0.5 rounded">L</span>
                                <span className="line-clamp-1">{day.lunch.name}</span>
                              </div>
                              {openCardId === `${dIdx}-lunch` ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>

                            {openCardId === `${dIdx}-lunch` && (
                              <div className="p-3 bg-[#ffffff] border-t border-[#c2c9bc]/10 text-xs text-[#42493f] space-y-2">
                                <p className="font-semibold text-[#1a1c18]">{day.lunch.description}</p>
                                <div className="flex justify-between font-bold text-[10px] text-[#3c6839] bg-[#f9faf3] p-1.5 rounded">
                                  <span>{day.lunch.kcal} k</span>
                                  <span>P: {day.lunch.protein}g</span>
                                  <span>C: {day.lunch.carbs}g</span>
                                  <span>F: {day.lunch.fat}g</span>
                                </div>
                                <div className="space-y-1">
                                  <p className="font-bold uppercase text-[9px] text-[#72796e]">Ingredients:</p>
                                  <ul className="list-disc list-inside text-[11px] pl-1 text-[#42493f]">
                                    {day.lunch.ingredients.map((ing, iIdx) => <li key={iIdx}>{ing}</li>)}
                                  </ul>
                                </div>
                                <div className="space-y-1 pt-1 border-t border-[#c2c9bc]/10">
                                  <p className="font-bold uppercase text-[9px] text-[#72796e]">Directions Summary:</p>
                                  <p className="text-[11px] leading-relaxed italic">{day.lunch.directions}</p>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Dinner drawer */}
                          <div className="border border-[#c2c9bc]/20 rounded-xl overflow-hidden">
                            <button
                              onClick={() => toggleCard(`${dIdx}-dinner`)}
                              className="w-full bg-[#f9faf3] p-3 text-left flex justify-between items-center text-xs font-bold text-[#1a1c18] hover:bg-[#edefe7]"
                            >
                              <div className="flex items-center gap-1.5">
                                <span className="bg-[#466365] text-white text-[9px] font-black px-1.5 py-0.5 rounded">D</span>
                                <span className="line-clamp-1">{day.dinner.name}</span>
                              </div>
                              {openCardId === `${dIdx}-dinner` ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>

                            {openCardId === `${dIdx}-dinner` && (
                              <div className="p-3 bg-[#ffffff] border-t border-[#c2c9bc]/10 text-xs text-[#42493f] space-y-2">
                                <p className="font-semibold text-[#1a1c18]">{day.dinner.description}</p>
                                <div className="flex justify-between font-bold text-[10px] text-[#3c6839] bg-[#f9faf3] p-1.5 rounded">
                                  <span>{day.dinner.kcal} k</span>
                                  <span>P: {day.dinner.protein}g</span>
                                  <span>C: {day.dinner.carbs}g</span>
                                  <span>F: {day.dinner.fat}g</span>
                                </div>
                                <div className="space-y-1">
                                  <p className="font-bold uppercase text-[9px] text-[#72796e]">Ingredients:</p>
                                  <ul className="list-disc list-inside text-[11px] pl-1 text-[#42493f]">
                                    {day.dinner.ingredients.map((ing, iIdx) => <li key={iIdx}>{ing}</li>)}
                                  </ul>
                                </div>
                                <div className="space-y-1 pt-1 border-t border-[#c2c9bc]/10">
                                  <p className="font-bold uppercase text-[9px] text-[#72796e]">Directions Summary:</p>
                                  <p className="text-[11px] leading-relaxed italic">{day.dinner.directions}</p>
                                </div>
                              </div>
                            )}
                          </div>

                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-[#c2c9bc]/20 text-[10px] uppercase font-bold text-[#72796e] text-center">
                        ✓ Calibrated for Pro Bio-Sync goal parameter bounds
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
