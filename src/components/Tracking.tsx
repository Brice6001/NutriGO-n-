import { useState } from 'react';
import { Activity, Apple, Check, Percent, Smartphone, Heart, TrendingDown, ArrowRight } from 'lucide-react';
import { UserProfile } from '../types';

interface TrackingProps {
  userProfile: UserProfile;
}

export default function Tracking({ userProfile }: TrackingProps) {
  const [syncedWearable, setSyncedWearable] = useState<string | null>(null);
  const [syncing, setSyncing] = useState<boolean>(false);

  const handleSync = (wearableName: string) => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setSyncedWearable(wearableName);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Intro descriptor */}
      <div>
        <h1 className="font-display font-extrabold text-3xl text-[#1a1c18] tracking-tight">
          Wearable Synchronization
        </h1>
        <p className="text-sm text-[#42493f] mt-1 max-w-xl">
          Instantly connect your fitness trackers &amp; smartwatches to NutriGo. Our technology automatically balances your physical burn with real-time dietary recommendations.
        </p>
      </div>

      {/* Grid trackers row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Apple Health integration */}
        <div className="bg-white rounded-2xl p-6 border border-[#c2c9bc]/30 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <span className="w-12 h-12 bg-[#ba1a1a]/15 rounded-xl flex items-center justify-center text-[#ba1a1a]">
                <Apple className="w-6 h-6 fill-current" />
              </span>
              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                syncedWearable === 'Apple Watch' ? 'bg-[#bdf0b3] text-[#245023]' : 'bg-[#e7e9e2] text-[#72796e]'
              }`}>
                {syncedWearable === 'Apple Watch' ? 'Synced ✓' : 'Disconnected'}
              </span>
            </div>
            
            <h3 className="font-display text-lg font-bold text-[#1a1c18] mt-4">
              Apple Health / Watch
            </h3>
            <p className="text-xs text-[#42493f] mt-1.5 leading-relaxed">
              Auto-pull active calorie burn, resting metabolism, sleep logs, and hydration inputs on the go.
            </p>
          </div>

          <button
            onClick={() => handleSync('Apple Watch')}
            disabled={syncing}
            className={`w-full mt-6 py-2.5 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer ${
              syncedWearable === 'Apple Watch'
                ? 'bg-[#bdf0b3] text-[#245023] cursor-not-allowed'
                : 'bg-[#3c6839] text-white hover:opacity-95'
            }`}
          >
            {syncing ? "Syncing..." : syncedWearable === 'Apple Watch' ? "Device Connected" : "Connect Device Now"}
          </button>
        </div>

        {/* Fitbit integration */}
        <div className="bg-white rounded-2xl p-6 border border-[#c2c9bc]/30 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <span className="w-12 h-12 bg-[#466365]/15 rounded-xl flex items-center justify-center text-[#466365]">
                <Activity className="w-6 h-6" />
              </span>
              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded ${
                syncedWearable === 'Fitbit' ? 'bg-[#bdf0b3] text-[#245023]' : 'bg-[#e7e9e2] text-[#72796e]'
              }`}>
                {syncedWearable === 'Fitbit' ? 'Synced ✓' : 'Disconnected'}
              </span>
            </div>

            <h3 className="font-display text-lg font-bold text-[#1a1c18] mt-4">
              Fitbit Tracker Integration
            </h3>
            <p className="text-xs text-[#42493f] mt-1.5 leading-relaxed">
              Measure heart rates, track sleep architecture, and automatically recalibrate hydration levels.
            </p>
          </div>

          <button
            onClick={() => handleSync('Fitbit')}
            disabled={syncing}
            className={`w-full mt-6 py-2.5 rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer ${
              syncedWearable === 'Fitbit'
                ? 'bg-[#bdf0b3] text-[#245023] cursor-not-allowed'
                : 'bg-[#3c6839] text-white hover:opacity-95'
            }`}
          >
            {syncing ? "Syncing..." : syncedWearable === 'Fitbit' ? "Device Connected" : "Connect Device Now"}
          </button>
        </div>

        {/* Smart phone sync */}
        <div className="bg-white rounded-2xl p-6 border border-[#c2c9bc]/30 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start">
              <span className="w-12 h-12 bg-[#cdeb7e]/40 rounded-xl flex items-center justify-center text-[#536b06]">
                <Smartphone className="w-6 h-6" />
              </span>
              <span className="text-[10px] bg-[#bdf0b3] text-[#245023] font-black uppercase tracking-wider px-2 py-0.5 rounded">
                Always Active
              </span>
            </div>

            <h3 className="font-display text-lg font-bold text-[#1a1c18] mt-4">
              Native GPS Tracking
            </h3>
            <p className="text-xs text-[#42493f] mt-1.5 leading-relaxed">
              Track delivery coordinates as meals are prepared in real-time and scheduled directly to your door.
            </p>
          </div>

          <button
            onClick={() => alert("GPS coordinates synched securely to cloud delivery API!")}
            className="w-full mt-6 py-2.5 bg-[#e7e9e2] text-[#1a1c18] hover:bg-[#e2e3dc] rounded-lg text-xs font-bold transition-all active:scale-95 cursor-pointer"
          >
            Calibrate Delivery Trackers
          </button>
        </div>

      </section>

      {/* Real-time statistics telemetry values */}
      <section className="bg-[#f3f4ed] rounded-3xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex items-center gap-4">
          <Heart className="w-10 h-10 text-[#ba1a1a]" />
          <div>
            <p className="text-[11px] font-black uppercase text-[#72796e] tracking-wider">Average Heart Rate</p>
            <p className="text-2xl font-black text-[#1a1c18] mt-0.5">72 BPM</p>
            <p className="text-[10px] text-[#42493f] mt-0.5">Synchronized 2 min ago</p>
          </div>
        </div>

        <div className="flex items-center gap-4 border-y md:border-y-0 md:border-x border-[#c2c9bc]/35 py-4 md:py-0 md:px-6">
          <Activity className="w-10 h-10 text-[#3c6839]" />
          <div>
            <p className="text-[11px] font-black uppercase text-[#72796e] tracking-wider">Active Sport Minutes</p>
            <p className="text-2xl font-black text-[#1a1c18] mt-0.5">45 Min today</p>
            <p className="text-[10px] text-[#42493f] mt-0.5">Goal is 60 Min today</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <TrendingDown className="w-10 h-10 text-[#8a4a63]" />
          <div>
            <p className="text-[11px] font-black uppercase text-[#72796e] tracking-wider">Active Burn Rate</p>
            <p className="text-2xl font-black text-[#1a1c18] mt-0.5">620 Kcal</p>
            <p className="text-[10px] text-[#42493f] mt-0.5">Target achieved easily</p>
          </div>
        </div>
      </section>

      {/* wearable integration value proposition banner */}
      <section className="bg-gradient-to-r from-[#466365] to-[#3c6839] text-[#f9faf3] rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="font-display text-xl font-bold text-[#cdeb7e]">
            Interested in real-time dietary adaptation?
          </h3>
          <p className="text-xs text-white/90 max-w-xl leading-relaxed">
            NutriGo automatically adapts recipes inside your weekly catalog once our sync records heavy calorie logs. Enable auto-adaptation for premium personalization.
          </p>
        </div>
        <button
          onClick={() => alert("Premium Auto-Adaptation enabled safely for October!")}
          className="bg-white hover:bg-[#e7e9e2] text-[#466365] font-bold text-xs px-6 py-3 rounded-xl transition-all active:scale-95 whitespace-nowrap cursor-pointer"
        >
          Enable Adaptive Nutrition
        </button>
      </section>
    </div>
  );
}
