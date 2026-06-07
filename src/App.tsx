import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import Discover from './components/Discover';
import MealGrid from './components/MealGrid';
import MealDetail from './components/MealDetail';
import WeeklyPlan from './components/WeeklyPlan';
import Tracking from './components/Tracking';
import ProCoach from './components/ProCoach';
import Subscription from './components/Subscription';

import { Session, User } from '@supabase/supabase-js';
import { supabase } from './supabase';

import { MEALS_CATALOG, DEFAULT_WEEK_PLAN } from './data';
import { Meal, ScreenType, HydrationLog, UserProfile, WeeklyPlanData, UserSettings } from './types';
import { Home, Utensils, Calendar, Activity, Sparkles, Bell, Clock, Settings as SettingsIcon } from 'lucide-react';


export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  const [currentScreen, setCurrentScreen] = useState<ScreenType>('discover');
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  // Notification & Alert Settings for meal times
  const [mealAlertsEnabled, setMealAlertsEnabled] = useState<boolean>(true);
  const [breakfastTime, setBreakfastTime] = useState<string>('08:00');
  const [lunchTime, setLunchTime] = useState<string>('12:30');
  const [dinnerTime, setDinnerTime] = useState<string>('18:30');
  const [lastTriggeredTimeKey, setLastTriggeredTimeKey] = useState<string>('');
  const [toastNotification, setToastNotification] = useState<{ title: string; desc: string; slot: string } | null>(null);
  
  // App-level state management
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    avatar: '',
    wellnessStreak: 0,
    weightTrend: [],
    currentWeight: 0,
    targetWeight: 0,
  });

  const [hydration, setHydration] = useState<HydrationLog>({
    currentMl: 1300,
    goalMl: 2000,
  });

  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlanData>(DEFAULT_WEEK_PLAN);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  
  const [showNotificationModal, setShowNotificationModal] = useState<boolean>(false);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);

  // Validate Connection to Supabase on initial boot
  useEffect(() => {
    const testConnection = async () => {
      try {
        const { error } = await supabase.from('users').select('id').limit(1);
        if (error) console.error("Supabase connection issue:", error.message);
      } catch (error) {
        console.error("Please check your Supabase configuration.");
      }
    };
    testConnection();
  }, []);

  // Listen to Authentication State
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user ?? null);
      setAuthLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Real-time Supabase sync of user profile and logs
  useEffect(() => {
    if (!currentUser) return;

    const fetchUserData = async () => {
      const { data, error } = await supabase.from('users').select('*').eq('id', currentUser.id).single();
      
      if (data) {
        if (data.name) {
          setUserProfile({
            name: data.name,
            avatar: data.avatar || currentUser.user_metadata?.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1-fR8ikAgIEmEuBkBiZ6WUIQ0FJOt9V_RjQaoBT765y1XsSaG9hu_JMt-O0tuAxER2b8Omh71yW52ejzy8FWCPAMrKK_S_EDaFJwSc7sb0Os7sHx9LKqimd8_bqDRGIwjLx5_DcUXZQuS3aMi_y8MR77ax7SfaF2Om5RoT46yiE3NogTKy-Moku47QWZQGUYbHMN2zL2n1eZfYbbh3sDWUbzismmYPmqaSd0Ma-aYO11wxtXWFuT3SHkgMpND2yfn9O07KzVuzQ',
            wellnessStreak: data.wellness_streak ?? 12,
            weightTrend: data.weight_trend || [75.4, 75.1, 74.8, 74.5, 74.6, 74.1, 73.8, 73.5, 73.0],
            currentWeight: data.current_weight ?? 73.0,
            targetWeight: data.target_weight ?? 70.0,
          });
        }
        if (typeof data.meal_alerts_enabled === 'boolean') setMealAlertsEnabled(data.meal_alerts_enabled);
        if (typeof data.is_subscribed === 'boolean') setIsSubscribed(data.is_subscribed);
        if (data.breakfast_time) setBreakfastTime(data.breakfast_time);
        if (data.lunch_time) setLunchTime(data.lunch_time);
        if (data.dinner_time) setDinnerTime(data.dinner_time);
        if (data.hydration_current_ml !== undefined && data.hydration_goal_ml !== undefined) {
          setHydration({ currentMl: data.hydration_current_ml, goalMl: data.hydration_goal_ml });
        }
        if (data.weekly_plan) setWeeklyPlan(data.weekly_plan as WeeklyPlanData);
      } else {
        const initialDoc = {
          id: currentUser.id,
          name: currentUser.user_metadata?.full_name || 'Alex',
          avatar: currentUser.user_metadata?.avatar_url || 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1-fR8ikAgIEmEuBkBiZ6WUIQ0FJOt9V_RjQaoBT765y1XsSaG9hu_JMt-O0tuAxER2b8Omh71yW52ejzy8FWCPAMrKK_S_EDaFJwSc7sb0Os7sHx9LKqimd8_bqDRGIwjLx5_DcUXZQuS3aMi_y8MR77ax7SfaF2Om5RoT46yiE3NogTKy-Moku47QWZQGUYbHMN2zL2n1eZfYbbh3sDWUbzismmYPmqaSd0Ma-aYO11wxtXWFuT3SHkgMpND2yfn9O07KzVuzQ',
          wellness_streak: 12,
          weight_trend: [75.4, 75.1, 74.8, 74.5, 74.6, 74.1, 73.8, 73.5, 73.0],
          current_weight: 73.0,
          target_weight: 70.0,
          hydration_current_ml: 1300,
          hydration_goal_ml: 2000,
          meal_alerts_enabled: true,
          breakfast_time: '08:00',
          lunch_time: '12:30',
          dinner_time: '18:30',
          is_subscribed: false,
          weekly_plan: DEFAULT_WEEK_PLAN,
          updated_at: new Date().toISOString()
        };
        await supabase.from('users').insert([initialDoc]);
      }
    };
    fetchUserData();

    const channel = supabase.channel('public:users')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'users', filter: `id=eq.${currentUser.id}` },
        (payload) => {
          const data = payload.new as any;
          if (!data) return;
          if (data.name) {
            setUserProfile(prev => ({ ...prev, name: data.name, avatar: data.avatar || prev.avatar, wellnessStreak: data.wellness_streak, weightTrend: data.weight_trend, currentWeight: data.current_weight, targetWeight: data.target_weight }));
          }
          if (typeof data.meal_alerts_enabled === 'boolean') setMealAlertsEnabled(data.meal_alerts_enabled);
          if (typeof data.is_subscribed === 'boolean') setIsSubscribed(data.is_subscribed);
          if (data.breakfast_time) setBreakfastTime(data.breakfast_time);
          if (data.lunch_time) setLunchTime(data.lunch_time);
          if (data.dinner_time) setDinnerTime(data.dinner_time);
          if (data.hydration_current_ml !== undefined) setHydration(prev => ({ ...prev, currentMl: data.hydration_current_ml, goalMl: data.hydration_goal_ml }));
          if (data.weekly_plan) setWeeklyPlan(data.weekly_plan);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [currentUser]);

  // Auth operations
  const handleGoogleSignIn = async () => {
    try {
      await supabase.auth.signInWithOAuth({ provider: 'google' });
    } catch (err: any) {
      console.error("Sign in failed:", err);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      // Reset plan and values to default on logout
      setWeeklyPlan(DEFAULT_WEEK_PLAN);
      setHydration({ currentMl: 1300, goalMl: 2000 });
      setUserProfile({
      name: '',
      avatar: '',
      wellnessStreak: 0,
      weightTrend: [],
      currentWeight: 0,
      targetWeight: 0,
    });
      setIsSubscribed(false);
    } catch (err) {
      console.error("Sign out failed:", err);
    }
  };


  // Hydration interaction callback
  const handleAddWater = () => {
    setHydration((prev) => {
      const next = {
        ...prev,
        currentMl: Math.min(prev.goalMl + 500, prev.currentMl + 250),
      };
      if (currentUser) {
        supabase.from('users').upsert({
          id: currentUser.id,
          hydration_current_ml: next.currentMl,
          hydration_goal_ml: next.goalMl,
          updated_at: new Date().toISOString()
        }).then(({ error }) => { if (error) console.error(error) });
      }
      return next;
    });
  };

  // Select meal interaction callback
  const handleSelectMeal = (meal: Meal) => {
    setSelectedMeal(meal);
    // Don't modify basic currentScreen, just let template show detail context
  };

  // Add meal to weekly schedule logic
  const handleAddMealToPlan = (meal: Meal, day: string, slot: 'breakfast' | 'lunch' | 'dinner') => {
    setWeeklyPlan((prev) => {
      const dayPlan = prev[day] || { breakfast: meal, lunch: meal, dinner: meal, caloriesPlanned: 1800 };
      const updatedDayPlan = {
        ...dayPlan,
        [slot]: meal,
        // Recalculately dynamic calories planned
        caloriesPlanned:
          (slot === 'breakfast' ? meal.calories : dayPlan.breakfast?.calories || 0) +
          (slot === 'lunch' ? meal.calories : dayPlan.lunch?.calories || 0) +
          (slot === 'dinner' ? meal.calories : dayPlan.dinner?.calories || 0),
      };

      const next = {
        ...prev,
        [day]: updatedDayPlan,
      };

      if (currentUser) {
        supabase.from('users').upsert({
          id: currentUser.id,
          weekly_plan: next,
          updated_at: new Date().toISOString()
        }).then(({ error }) => { if (error) console.error(error) });
      }

      return next;
    });
  };

  // Swap target Friday meal dynamically
  const handleSwapFridayMeal = (newMeal: Meal) => {
    handleAddMealToPlan(newMeal, 'FRI', 'dinner');
  };

  // Fill Weekend programmatically
  const handleFillWeekend = () => {
    const defaultSatMeals = {
      breakfast: MEALS_CATALOG.find(m => m.id === 'berry_smoothie') || MEALS_CATALOG[9],
      lunch: MEALS_CATALOG.find(m => m.id === 'zesty_kale_chickpea') || MEALS_CATALOG[4],
      dinner: MEALS_CATALOG.find(m => m.id === 'steak_roots') || MEALS_CATALOG[5],
      caloriesPlanned: 1910,
    };
    const defaultSunMeals = {
      breakfast: MEALS_CATALOG.find(m => m.id === 'avocado_egg_bowl') || MEALS_CATALOG[1],
      lunch: MEALS_CATALOG.find(m => m.id === 'steamed_bass') || MEALS_CATALOG[6],
      dinner: MEALS_CATALOG.find(m => m.id === 'taco_harvest') || MEALS_CATALOG[7],
      caloriesPlanned: 1850,
    };

    setWeeklyPlan((prev) => {
      const next = {
        ...prev,
        'SAT': defaultSatMeals,
        'SUN': defaultSunMeals,
      };

      if (currentUser) {
        supabase.from('users').upsert({
          id: currentUser.id,
          weekly_plan: next,
          updated_at: new Date().toISOString()
        }).then(({ error }) => { if (error) console.error(error) });
      }

      return next;
    });
  };

  const handleSubscribeToggle = () => {
    const newState = !isSubscribed;
    setIsSubscribed(newState);
    if (currentUser) {
      supabase.from('users').upsert({
        id: currentUser.id,
        is_subscribed: newState,
        updated_at: new Date().toISOString()
      }).then(({ error }) => { if (error) console.error(error) });
    }
    alert(newState ? "Thank you for subscribing to Premium personalized NutriGo Pro!" : "Subscription paused successfully.");
  };

  // Core Alert Trigger Routine for weekly meal times
  const triggerMealAlert = (dayKey: string, slot: 'breakfast' | 'lunch' | 'dinner', timeStr: string) => {
    const dayPlan = weeklyPlan[dayKey];
    const meal = dayPlan ? dayPlan[slot] : null;

    const slotLabel = slot.charAt(0).toUpperCase() + slot.slice(1);
    const title = `⏰ Time for ${slotLabel}! (${timeStr})`;
    const desc = meal
      ? `Enjoy Friday's plan-scheduled gourmet dish "${meal.name}" (${meal.calories} kcal).`
      : `Time to prepare your healthy ${slot} meal! Stay true to your active targets.`;

    // 1. Trigger visible browser alert
    setTimeout(() => {
      try {
        alert(`🍎 NUTRIGO MEAL ALIGNMENT!\n\n${title}\n${desc}\n\nKeep your wellness streaks shining!`);
      } catch (e) {
        console.warn("Native alert blocked by frame container, using elegant fallback toast.", e);
      }
    }, 50);

    // 2. Set an in-app premium toast notification as fallback
    setToastNotification({ title, desc, slot });

    // Auto-dismiss the toast after 8 seconds to prevent desktop screen clutter
    setTimeout(() => {
      setToastNotification((prev) => {
        if (prev?.title === title) return null;
        return prev;
      });
    }, 8000);
  };

  // Simulation test routine
  const handleTestNotification = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentTimeStr = `${hours}:${minutes}`;

    // Grab Wednesday or Monday dinner
    const sampleDayKey = 'WED';
    triggerMealAlert(sampleDayKey, 'dinner', currentTimeStr);
  };

  // Keep checking scheduled times
  useEffect(() => {
    if (!mealAlertsEnabled) return;

    const checkScheduledMeals = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const currentTimeStr = `${hours}:${minutes}`;

      const daysMap = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      const currentDayKey = daysMap[now.getDay()];

      const uniqueMinuteKey = `${currentDayKey}-${currentTimeStr}`;
      if (lastTriggeredTimeKey === uniqueMinuteKey) return;

      let matchedSlot: 'breakfast' | 'lunch' | 'dinner' | null = null;
      if (currentTimeStr === breakfastTime) matchedSlot = 'breakfast';
      else if (currentTimeStr === lunchTime) matchedSlot = 'lunch';
      else if (currentTimeStr === dinnerTime) matchedSlot = 'dinner';

      if (matchedSlot) {
        setLastTriggeredTimeKey(uniqueMinuteKey);
        triggerMealAlert(currentDayKey, matchedSlot, currentTimeStr);
      }
    };

    const intervalId = setInterval(checkScheduledMeals, 10000); // Check every 10 seconds
    return () => clearInterval(intervalId);
  }, [mealAlertsEnabled, breakfastTime, lunchTime, dinnerTime, lastTriggeredTimeKey, weeklyPlan]);

  
  const activeRecommendedMeals = MEALS_CATALOG.slice(0, 3);

  return (
    <div className="bg-[#f9faf3] text-[#1a1c18] min-h-screen flex flex-col font-sans selection:bg-[#cdeb7e] selection:text-[#536b06]">
      {/* Real-time Toast Alignment alert notifications banner */}
      {toastNotification && (
        <div id="meal-alert-toast" className="fixed top-20 right-4 left-4 sm:left-auto sm:max-w-md bg-white border-2 border-[#3c6839] rounded-2xl p-4 shadow-xl z-50 flex items-start gap-3 animate-fade-in animate-slide-down">
          <div className="bg-[#3c6839]/10 p-2 rounded-xl text-[#3c6839] shrink-0">
            <Bell className="w-5 h-5 animate-bounce" />
          </div>
          <div className="flex-1 text-left">
            <h4 className="text-xs font-black text-[#1a1c18]">{toastNotification.title}</h4>
            <p className="text-[11px] text-[#42493f] mt-0.5 leading-relaxed">{toastNotification.desc}</p>
          </div>
          <button
            onClick={() => setToastNotification(null)}
            className="text-[#72796e] hover:text-[#1a1c18] text-xs font-bold px-2 py-1 rounded-lg hover:bg-[#edefe7]"
          >
            ✕
          </button>
        </div>
      )}

      {/* Absolute modals for Notifications or Profiles */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-[#1a1c18]/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-[#c2c9bc]/50 shadow-lg space-y-4 animate-fade-in animate-scale-up">
            <h3 className="font-display font-extrabold text-lg text-[#1a1c18]">Active Alerts</h3>
            <div className="space-y-3">
              <div className="bg-[#f3f4ed] p-3 rounded-xl border border-[#c2c9bc]/20">
                <p className="text-xs font-bold text-[#3c6839]">Hydration Alert</p>
                <p className="text-[11px] text-[#42493f] mt-0.5">You are 2 cups behind your morning water objective. Sip up!</p>
              </div>
              <div className="bg-[#f3f4ed] p-3 rounded-xl border border-[#c2c9bc]/20">
                <p className="text-xs font-bold text-[#8a4a63]">Smart Swap Alert</p>
                <p className="text-[11px] text-[#42493f] mt-0.5">Improve Friday dinner by swapping Beef with Zesty Chicken.</p>
              </div>
            </div>
            <button
              onClick={() => setShowNotificationModal(false)}
              className="w-full bg-[#3c6839] text-white py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors"
            >
              Acknowledge Alerts
            </button>
          </div>
        </div>
      )}

      {showProfileModal && (
        <div className="fixed inset-0 bg-brand-teal/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-brand-teal/20 shadow-lg space-y-4 animate-fade-in animate-scale-up text-center">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-brand-green-primary mx-auto shadow-xs relative">
              <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-md text-brand-teal">
                {userProfile.name}'s Profile Settings
                {isSubscribed && <Crown className="inline w-4 h-4 text-brand-green-primary" />}
              </h3>
              <p className="text-xs text-brand-teal/70 font-medium">
                {isSubscribed ? 'NutriGo Elite Pro tier active' : 'NutriGo Basic Member'}
              </p>
            </div>

            {/* Google Synchronization Block */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-brand-teal/10 text-left space-y-2">
              <h4 className="text-xs font-black text-brand-teal flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-green-secondary fill-brand-green-secondary" />
                Cloud Smart Sync
              </h4>
              {currentUser ? (
                <div className="space-y-2">
                  <div className="bg-white p-2 rounded-xl border border-brand-teal/10 flex items-center gap-2 shadow-xs">
                    <img
                      src={currentUser.user_metadata?.avatar_url || userProfile.avatar}
                      alt="avatar"
                      className="w-8 h-8 rounded-full border border-brand-green-primary object-cover shrink-0"
                    />
                    <div className="overflow-hidden">
                      <p className="text-[11px] font-bold text-brand-teal truncate">{currentUser.user_metadata?.full_name || 'Authorized User'}</p>
                      <p className="text-[9px] text-brand-teal/70 truncate">{currentUser.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="w-full bg-brand-wine/10 hover:bg-brand-wine/20 text-brand-wine font-bold text-[10px] py-1.5 rounded-lg border border-brand-wine/20 transition-all text-center cursor-pointer"
                  >
                    Disconnect Profile Sync
                  </button>
                </div>
              ) : (
                <div className="space-y-2 text-center md:text-left">
                  <p className="text-[10px] text-brand-teal/80 leading-relaxed">
                    Protect your plan! Sign in with your Google Account to back up hydration logs, weight parameters, and config meal-time alert schedules.
                  </p>
                  <button
                    onClick={handleGoogleSignIn}
                    className="w-full bg-brand-green-primary hover:bg-brand-green-primary/90 text-white font-extrabold text-[11px] py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-98"
                  >
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                      <path d="M12.24 10.285V13.4h6.887C18.2 15.614 15.645 18 12.24 18c-3.86 0-7-3.14-7-7s3.14-7 7-7c1.7 0 3.25.61 4.5 1.62l2.437-2.437C17.31 1.696 14.93 0 12.24 0c-6.075 0-11 4.925-11 11s4.925 11 11 11c5.84 0 11-4.225 11-11 0-.64-.065-1.3-.18-1.715H12.24z" />
                    </svg>
                    Sync with Google
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 text-center bg-gray-50 p-3 rounded-xl border border-brand-teal/10">
              <div>
                <p className="text-[10px] text-brand-teal/70 font-bold uppercase">Weight</p>
                <p className="text-sm font-black text-brand-teal font-mono">{userProfile.currentWeight} kg</p>
              </div>
              <div>
                <p className="text-[10px] text-brand-teal/70 font-bold uppercase font-sans">Objective Target</p>
                <p className="text-sm font-black text-brand-teal font-mono">{userProfile.targetWeight} kg</p>
              </div>
            </div>

            <div className="border-t border-b border-brand-teal/10 py-4 space-y-3 text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-brand-green-primary" />
                  <span className="text-xs font-black text-brand-teal">Active Meal-Time Alerts</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    id="toggle-meal-alerts"
                    type="checkbox"
                    checked={mealAlertsEnabled}
                    onChange={(e) => {
                      const val = e.target.checked;
                      setMealAlertsEnabled(val);
                      if (currentUser) {
                        supabase.from('users').upsert({
                          id: currentUser.id,
                          meal_alerts_enabled: val,
                          updated_at: new Date().toISOString()
                        }).then(({ error }) => { if (error) console.error(error) });
                      }
                    }}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-green-primary"></div>
                </label>
              </div>
              
              <p className="text-[10px] text-brand-teal/70">
                Receive standard browser notifications aligned dynamically to your selected weekly meal schedules.
              </p>

              {mealAlertsEnabled && (
                <div className="bg-[#f9faf3] p-3 rounded-xl border border-[#c2c9bc]/20 space-y-2.5 animate-fade-in">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#3c6839]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Configure Target Eating Times</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[9px] font-bold text-[#72796e] block">Breakfast</label>
                      <input
                        id="time-breakfast"
                        type="time"
                        value={breakfastTime}
                        onChange={(e) => {
                          const val = e.target.value;
                          setBreakfastTime(val);
                          if (currentUser) {
                            supabase.from('users').upsert({
                              id: currentUser.id,
                              breakfast_time: val,
                              updated_at: new Date().toISOString()
                            }).then(({ error }) => { if (error) console.error(error) });
                          }
                        }}
                        className="w-full text-xs font-bold bg-white border border-[#c2c9bc]/40 rounded-lg p-1 mt-0.5"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-[#72796e] block">Lunch</label>
                      <input
                        id="time-lunch"
                        type="time"
                        value={lunchTime}
                        onChange={(e) => {
                          const val = e.target.value;
                          setLunchTime(val);
                          if (currentUser) {
                            supabase.from('users').upsert({
                              id: currentUser.id,
                              lunch_time: val,
                              updated_at: new Date().toISOString()
                            }).then(({ error }) => { if (error) console.error(error) });
                          }
                        }}
                        className="w-full text-xs font-bold bg-white border border-[#c2c9bc]/40 rounded-lg p-1 mt-0.5"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] font-bold text-[#72796e] block">Dinner</label>
                      <input
                        id="time-dinner"
                        type="time"
                        value={dinnerTime}
                        onChange={(e) => {
                          const val = e.target.value;
                          setDinnerTime(val);
                          if (currentUser) {
                            supabase.from('users').upsert({
                              id: currentUser.id,
                              dinner_time: val,
                              updated_at: new Date().toISOString()
                            }).then(({ error }) => { if (error) console.error(error) });
                          }
                        }}
                        className="w-full text-xs font-bold bg-white border border-[#c2c9bc]/40 rounded-lg p-1 mt-0.5"
                      />
                    </div>
                  </div>

                  <button
                    id="btn-simulate-alert"
                    onClick={handleTestNotification}
                    className="w-full bg-[#3c6839]/10 hover:bg-[#3c6839]/15 text-[#3c6839] font-extrabold text-[10px] py-1.5 rounded-lg border border-[#3c6839]/20 transition-all cursor-pointer active:scale-98"
                  >
                    🧪 Test Active Dinner Alert (Interactive simulation)
                  </button>
                </div>
              )}
            </div>

            <div className="pt-2 flex flex-wrap justify-between items-center gap-2">
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    const newName = prompt("Update your name:", userProfile.name);
                    if (newName) {
                      setUserProfile((prev) => {
                        const next = { ...prev, name: newName };
                        if (currentUser) {
                          supabase.from('users').upsert({
                            id: currentUser.id,
                            name: next.name,
                            updated_at: new Date().toISOString()
                          }).then(({ error }) => { if (error) console.error(error) });
                        }
                        return next;
                      });
                    }
                  }}
                  className="text-[#3c6839] hover:underline font-bold text-xs cursor-pointer"
                >
                  Edit Name
                </button>
                <span className="text-[#c2c9bc]">|</span>
                <button
                  onClick={() => {
                    const newWeightStr = prompt("Set your current weight (kg):", String(userProfile.currentWeight));
                    const newWeight = parseFloat(newWeightStr || '');
                    if (!isNaN(newWeight) && newWeight > 0) {
                      setUserProfile((prev) => {
                        const next = {
                          ...prev,
                          currentWeight: newWeight,
                          weightTrend: [...prev.weightTrend.slice(1), newWeight],
                        };
                        if (currentUser) {
                          supabase.from('users').upsert({
                            id: currentUser.id,
                            current_weight: next.currentWeight,
                            weight_trend: next.weightTrend,
                            updated_at: new Date().toISOString()
                          }).then(({ error }) => { if (error) console.error(error) });
                        }
                        return next;
                      });
                    }
                  }}
                  className="text-[#3c6839] hover:underline font-bold text-xs cursor-pointer"
                >
                  Set Weight
                </button>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="bg-brand-teal text-white px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer inline-block shadow-xs"
              >
                Close Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main navigation Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          setSelectedMeal(null);
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenNotifications={() => setShowNotificationModal(true)}
        onOpenProfile={() => setShowProfileModal(true)}
        isSubscribed={isSubscribed}
        onSubscribe={handleSubscribeToggle}
      />

      {/* Outer Body Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-6 pt-24 pb-24 md:pb-12">
        
        {/* Render nested details if selectedMeal is loaded */}
        {selectedMeal ? (
          <MealDetail
            meal={selectedMeal}
            onAddMealToPlan={handleAddMealToPlan}
            onBack={() => setSelectedMeal(null)}
          />
        ) : (
          <>
            {currentScreen === 'discover' && (
              <Discover
                onNavigate={(screen) => {
                  setCurrentScreen(screen);
                  setSelectedMeal(null);
                }}
              />
            )}

            {currentScreen === 'dashboard' && (
              <Dashboard
                userProfile={userProfile}
                recommendedMeals={activeRecommendedMeals}
                hydration={hydration}
                onAddWater={handleAddWater}
                onSelectMeal={handleSelectMeal}
                onNavigate={(screen) => {
                  setCurrentScreen(screen);
                  setSelectedMeal(null);
                }}
                isSubscribed={isSubscribed}
                onSubscribe={handleSubscribeToggle}
              />
            )}

            {currentScreen === 'meals' && (
              <MealGrid
                onSelectMeal={handleSelectMeal}
                onAddMealToPlan={handleAddMealToPlan}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
            )}

            {currentScreen === 'plan' && (
              <WeeklyPlan
                plan={weeklyPlan}
                onSwapFridayMeal={handleSwapFridayMeal}
                onFillWeekend={handleFillWeekend}
                onNavigateToMeals={() => {
                  setCurrentScreen('meals');
                  setSelectedMeal(null);
                }}
                onSelectMeal={handleSelectMeal}
              />
            )}

            {currentScreen === 'tracking' && (
              <Tracking userProfile={userProfile} />
            )}

            {currentScreen === 'pro' && (
              <ProCoach
                isSubscribed={isSubscribed}
                onSubscribe={handleSubscribeToggle}
                userProfile={userProfile}
              />
            )}
          {currentScreen === 'subscription' && (
  <Subscription
    isSubscribed={isSubscribed}
    onSubscribe={handleSubscribeToggle}
    onBack={() => setCurrentScreen('settings')}
  />
)}
</>
        )}
      </main>

      {/* Layout footer credit block */}
      <Footer
        onNavigate={(screen) => {
          setCurrentScreen(screen);
          setSelectedMeal(null);
        }}
      />

      {/* Mobile-only Bottom Navigation Bar */}
      <nav id="mobile-nav" className="md:hidden fixed bottom-1.5 left-3 right-3 z-50 bg-white/95 backdrop-blur-md rounded-2xl flex justify-around items-center px-4 py-2 border border-[#c2c9bc]/35 shadow-lg max-w-md mx-auto">
        <button
          onClick={() => {
            setCurrentScreen('discover');
            setSelectedMeal(null);
          }}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${
            currentScreen === 'discover' ? 'text-[#3c6839] font-black' : 'text-[#72796e]'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wider font-bold mt-0.5">Home</span>
        </button>

        <button
          onClick={() => {
            setCurrentScreen('meals');
            setSelectedMeal(null);
          }}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${
            currentScreen === 'meals' ? 'text-[#3c6839] font-black' : 'text-[#72796e]'
          }`}
        >
          <Utensils className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wider font-bold mt-0.5">Menu</span>
        </button>

        <button
          onClick={() => {
            setCurrentScreen('plan');
            setSelectedMeal(null);
          }}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${
            currentScreen === 'plan' ? 'text-[#3c6839] font-black' : 'text-[#72796e]'
          }`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wider font-bold mt-0.5">Plans</span>
        </button>

        <button
          onClick={() => {
            setCurrentScreen('tracking');
            setSelectedMeal(null);
          }}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${
            currentScreen === 'tracking' ? 'text-[#3c6839] font-black' : 'text-[#72796e]'
          }`}
        >
          <Activity className="w-5 h-5" />
          <span className="text-[9px] uppercase tracking-wider font-bold mt-0.5">Sync</span>
        </button>

        <button
          onClick={() => {
            setCurrentScreen('pro');
            setSelectedMeal(null);
          }}
          className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all cursor-pointer ${
            currentScreen === 'pro' ? 'text-amber-500 font-extrabold' : 'text-[#72796e]'
          }`}
        >
          <Sparkles className={`w-5 h-5 ${currentScreen === 'pro' ? 'fill-amber-400 text-amber-500' : ''}`} />
          <span className="text-[9px] uppercase tracking-wider font-bold mt-0.5">Pro</span>
        </button>
      </nav>
    </div>
  );
}
