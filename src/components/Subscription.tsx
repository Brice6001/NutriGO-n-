import React from 'react';
import { ArrowLeft, CreditCard, CheckCircle } from 'lucide-react';

interface SubscriptionProps {
  onBack: () => void;
  isSubscribed: boolean;
  onSubscribeToggle: () => void;
}

export default function Subscription({ onBack, isSubscribed, onSubscribeToggle }: SubscriptionProps) {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-brand-teal hover:text-brand-green-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <h2 className="font-display font-extrabold text-2xl text-brand-teal">
        Premium NutriGo Pro
      </h2>

      <div className="flex items-center gap-3 bg-brand-green-primary/10 p-4 rounded-xl">
        <CreditCard className="w-6 h-6 text-brand-green-primary" />
        <p className="text-sm text-brand-teal">
          Unlock personalized AI nutrition coaching, exclusive recipes, and advanced tracking.
        </p>
      </div>

      <button
        onClick={onSubscribeToggle}
        className="w-full flex items-center justify-center gap-2 bg-brand-green-primary text-white py-2 rounded-xl hover:bg-brand-green-primary/90 transition-colors"
      >
        {isSubscribed ? (
          <>
            <CheckCircle className="w-4 h-4" />
            Active Subscription
          </>
        ) : (
          'Subscribe Now'
        )}
      </button>
    </div>
  );
}
