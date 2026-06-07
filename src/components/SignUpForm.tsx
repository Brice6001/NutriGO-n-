import React, { useState } from 'react';
import { supabase } from '../supabase';
import { LogIn, UserPlus } from 'lucide-react';

interface SignUpFormProps {
  onSuccess?: () => void;
}

export default function SignUpForm({ onSuccess }: SignUpFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) throw signUpError;
      // Optionally create a placeholder user profile record
      const user = supabase.auth.user();
      if (user) {
        await supabase.from('users').upsert({
          id: user.id,
          name: email.split('@')[0],
          avatar: '',
          wellness_streak: 0,
          weight_trend: [],
          current_weight: 0,
          target_weight: 0,
          hydration_current_ml: 1300,
          hydration_goal_ml: 2000,
          meal_alerts_enabled: true,
          breakfast_time: '08:00',
          lunch_time: '12:30',
          dinner_time: '18:30',
          is_subscribed: false,
          weekly_plan: {},
          updated_at: new Date().toISOString(),
        });
      }
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-display font-extrabold text-lg text-brand-teal text-center">
        <UserPlus className="inline w-5 h-5 mr-2" />
        Create NutriGo Account
      </h3>
      {error && (
        <p className="text-xs text-red-600 text-center" role="alert">
          {error}
        </p>
      )}
      <input
        type="email"
        placeholder="Email"
        required
        className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green-primary"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        required
        minLength={6}
        className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green-primary"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-brand-green-primary text-white py-2 rounded-xl hover:bg-brand-green-primary/90 transition-colors disabled:opacity-50"
      >
        <LogIn className="w-4 h-4" />
        {loading ? 'Creating…' : 'Sign Up'}
      </button>
    </form>
  );
}
