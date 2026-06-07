import React from 'react';
import { Sun, Moon, Monitor, Sparkles, Bell, Shield, Trash2, LogOut, ChevronRight, Contrast, BrainCircuit } from 'lucide-react';
import { UserSettings, ThemeType, AiToneType } from '../types';

// ─── Props ───────────────────────────────────────────────────────────────────
interface SettingsProps {
  settings: UserSettings;
  isSubscribed: boolean;
  isLoggedIn: boolean;
  mealAlertsEnabled: boolean;
  breakfastTime: string;
  lunchTime: string;
  dinnerTime: string;
  // Callbacks: each one persists the change AND updates the UI immediately
  onSaveSetting: (key: keyof UserSettings, value: UserSettings[keyof UserSettings]) => void;
  onSaveMealAlert: (key: 'meal_alerts_enabled' | 'breakfast_time' | 'lunch_time' | 'dinner_time', value: boolean | string) => void;
  onDeleteHistory: () => void;
  onSignOut: () => void;
}

// ─── Reusable Toggle Switch ───────────────────────────────────────────────────
function Toggle({ id, checked, onChange }: { id: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer" htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        className="sr-only peer"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className="w-10 h-6 bg-[#c2c9bc] rounded-full peer peer-checked:bg-brand-green-primary transition-colors after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-4" />
    </label>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl border border-[#c2c9bc]/25 shadow-xs overflow-hidden">
      <div className="flex items-center gap-2.5 px-6 py-4 border-b border-[#c2c9bc]/20 bg-[#f3f4ed]">
        <span className="text-brand-green-primary">{icon}</span>
        <h2 className="font-display font-extrabold text-sm text-brand-teal tracking-tight">{title}</h2>
      </div>
      <div className="divide-y divide-[#c2c9bc]/15">{children}</div>
    </div>
  );
}

// ─── Row ─────────────────────────────────────────────────────────────────────
function Row({ label, sublabel, right }: { label: string; sublabel?: string; right: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between px-6 py-4 gap-4">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-brand-teal">{label}</p>
        {sublabel && <p className="text-[11px] text-brand-teal/60 mt-0.5 leading-relaxed">{sublabel}</p>}
      </div>
      <div className="shrink-0">{right}</div>
    </div>
  );
}

// ─── Theme Button Group ───────────────────────────────────────────────────────
const THEMES: { value: ThemeType; label: string; icon: React.ReactNode }[] = [
  { value: 'light', label: 'Light', icon: <Sun className="w-3.5 h-3.5" /> },
  { value: 'dark', label: 'Dark', icon: <Moon className="w-3.5 h-3.5" /> },
  { value: 'system', label: 'System', icon: <Monitor className="w-3.5 h-3.5" /> },
];

function ThemePicker({ value, onChange }: { value: ThemeType; onChange: (v: ThemeType) => void }) {
  return (
    <div className="flex rounded-xl overflow-hidden border border-[#c2c9bc]/40">
      {THEMES.map((t) => (
        <button
          key={t.value}
          onClick={() => onChange(t.value)}
          className={`flex items-center gap-1 px-3 py-1.5 text-[11px] font-bold transition-all cursor-pointer ${value === t.value
              ? 'bg-brand-green-primary text-white'
              : 'bg-[#f3f4ed] text-brand-teal/70 hover:bg-[#e7e9e2]'
            }`}
        >
          {t.icon}
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ─── AI Tone Picker ───────────────────────────────────────────────────────────
const AI_TONES: { value: AiToneType; label: string; desc: string }[] = [
  { value: 'strict', label: '💪 Strict', desc: 'Precise, data-led coaching' },
  { value: 'flexible', label: '⚖️ Flexible', desc: 'Balanced and adaptive guidance' },
  { value: 'encouraging', label: '🌟 Encouraging', desc: 'Positive, motivational tone' },
];

// ─── Main Settings Component ──────────────────────────────────────────────────
export default function Settings({
  settings,
  isSubscribed,
  isLoggedIn,
  mealAlertsEnabled,
  breakfastTime,
  lunchTime,
  dinnerTime,
  onSaveSetting,
  onSaveMealAlert,
  onDeleteHistory,
  onSignOut,
}: SettingsProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in py-4">

      {/* Page header */}
      <div className="space-y-1">
        <h1 className="font-coolvetica font-black text-3xl text-brand-teal">Settings</h1>
        <p className="text-sm text-brand-teal/70 font-sans">Manage your preferences. Changes sync instantly across your devices.</p>
      </div>

      {/* ── Appearance ─────────────────────────────────────────── */}
      <Section title="Appearance" icon={<Sun className="w-4 h-4" />}>
        <Row
          label="Color Theme"
          sublabel="Updates your display mode immediately."
          right={
            <ThemePicker
              value={settings.theme}
              onChange={(v) => onSaveSetting('theme', v)}
            />
          }
        />
        <Row
          label="High Contrast Mode"
          sublabel="Increases text and border contrast for readability."
          right={
            <Toggle
              id="toggle-high-contrast"
              checked={settings.highContrast}
              onChange={(v) => onSaveSetting('highContrast', v)}
            />
          }
        />
      </Section>

      {/* ── Notifications ──────────────────────────────────────── */}
      <Section title="Meal Reminders" icon={<Bell className="w-4 h-4" />}>
        <Row
          label="Enable Meal Alerts"
          sublabel="Get notified at your scheduled breakfast, lunch, and dinner times."
          right={
            <Toggle
              id="toggle-meal-alerts-settings"
              checked={mealAlertsEnabled}
              onChange={(v) => onSaveMealAlert('meal_alerts_enabled', v)}
            />
          }
        />
        {mealAlertsEnabled && (
          <div className="px-6 py-4 grid grid-cols-3 gap-3">
            {[
              { id: 'time-breakfast-settings', label: 'Breakfast', value: breakfastTime, key: 'breakfast_time' as const },
              { id: 'time-lunch-settings', label: 'Lunch', value: lunchTime, key: 'lunch_time' as const },
              { id: 'time-dinner-settings', label: 'Dinner', value: dinnerTime, key: 'dinner_time' as const },
            ].map(({ id, label, value, key }) => (
              <div key={key}>
                <label htmlFor={id} className="text-[10px] font-bold text-brand-teal/60 block mb-1 uppercase tracking-wider">{label}</label>
                <input
                  id={id}
                  type="time"
                  value={value}
                  onChange={(e) => onSaveMealAlert(key, e.target.value)}
                  className="w-full text-xs font-bold bg-[#f3f4ed] border border-[#c2c9bc]/40 rounded-xl px-3 py-2 text-brand-teal focus:ring-2 focus:ring-brand-green-primary outline-none"
                />
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* ── AI Behavior ────────────────────────────────────────── */}
      <Section title="AI Coach Behavior" icon={<BrainCircuit className="w-4 h-4" />}>
        <div className="px-6 py-4 space-y-2">
          <p className="text-[11px] text-brand-teal/60 mb-3">
            Choose the communication style for Chef Celeste and Pro Coach. This affects future AI responses — not previous conversations.
          </p>
          <div className="grid gap-2">
            {AI_TONES.map((tone) => (
              <button
                key={tone.value}
                onClick={() => onSaveSetting('aiBehavior', tone.value)}
                className={`flex items-center justify-between w-full px-4 py-3 rounded-2xl border text-left transition-all cursor-pointer ${settings.aiBehavior === tone.value
                    ? 'bg-brand-green-primary/10 border-brand-green-primary text-brand-green-primary'
                    : 'bg-[#f3f4ed] border-[#c2c9bc]/30 text-brand-teal hover:border-brand-green-primary/50'
                  }`}
              >
                <div>
                  <p className="text-sm font-bold">{tone.label}</p>
                  <p className="text-[11px] opacity-70 mt-0.5">{tone.desc}</p>
                </div>
                {settings.aiBehavior === tone.value && (
                  <Sparkles className="w-4 h-4 shrink-0 text-brand-green-primary fill-brand-green-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Privacy ────────────────────────────────────────────── */}
      <Section title="Privacy" icon={<Shield className="w-4 h-4" />}>
        <Row
          label="Share Anonymous Analytics"
          sublabel="Help us improve NutriGo with anonymized usage data. No personal data is ever shared."
          right={
            <Toggle
              id="toggle-privacy-analytics"
              checked={settings.privacyAnalytics}
              onChange={(v) => onSaveSetting('privacyAnalytics', v)}
            />
          }
        />
        <Row
          label="Delete Meal History"
          sublabel="Permanently removes your saved weekly plans and meal history from this account. Cannot be undone."
          right={
            <button
              id="btn-delete-history"
              onClick={onDeleteHistory}
              disabled={!isLoggedIn}
              className="flex items-center gap-1.5 px-4 py-2 bg-brand-wine/10 hover:bg-brand-wine/20 text-brand-wine text-xs font-bold rounded-xl border border-brand-wine/20 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Delete
            </button>
          }
        />
      </Section>

      {/* ── Account ────────────────────────────────────────────── */}
      <Section title="Account" icon={<LogOut className="w-4 h-4" />}>
        <Row
          label="Subscription"
          sublabel={isSubscribed ? 'NutriGo Pro · All features unlocked' : 'NutriGo Basic · Upgrade to unlock AI coaching'}
          right={
            <span className={`text-[11px] font-black px-3 py-1 rounded-full ${isSubscribed ? 'bg-brand-lime text-brand-teal' : 'bg-[#e7e9e2] text-brand-teal/60'}`}>
              {isSubscribed ? 'PRO' : 'FREE'}
            </span>
          }
        />
        {isLoggedIn ? (
          <Row
            label="Sign Out"
            sublabel="You will be redirected to the discover screen."
            right={
              <button
                id="btn-signout-settings"
                onClick={onSignOut}
                className="flex items-center gap-1.5 px-4 py-2 bg-brand-teal/5 hover:bg-brand-teal/10 text-brand-teal text-xs font-bold rounded-xl border border-brand-teal/15 transition-all cursor-pointer active:scale-95"
              >
                <LogOut className="w-3.5 h-3.5" />
                Sign Out
              </button>
            }
          />
        ) : (
          <Row
            label="Not signed in"
            sublabel="Sign in to sync your settings across all devices."
            right={<ChevronRight className="w-4 h-4 text-brand-teal/40" />}
          />
        )}
      </Section>

      {/* Version footer */}
      <p className="text-center text-[10px] text-brand-teal/30 font-sans pb-4">NutriGo v1.0 · All data secured by Supabase</p>
    </div>
  );
}
