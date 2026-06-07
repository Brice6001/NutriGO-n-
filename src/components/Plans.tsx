import React from 'react';
import { CheckCircle, CreditCard, Calendar, ArrowRight } from 'lucide-react';
import { Meal } from '../types';
import { MEALS_CATALOG } from '../data';

// Filter example meals for each category
const breakfastMeals = MEALS_CATALOG.filter(m => m.category === 'Breakfast').slice(0, 3);
const lunchMeals = MEALS_CATALOG.filter(m => m.category === 'Lunch').slice(0, 3);
const dinnerMeals = MEALS_CATALOG.filter(m => m.category === 'Dinner').slice(0, 3);

export default function Plans() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="font-display font-extrabold text-3xl text-brand-teal mb-4">
        NutriGo Premium Plans
      </h1>

      <section>
        <h2 className="font-sans font-bold text-xl text-brand-green-primary mb-2">
          <CreditCard className="inline w-5 h-5 mr-2" />
          Choose Your Plan
        </h2>
        <p className="text-sm text-brand-teal/80 mb-4">
          All plans include weekly personalized meals, AI nutrition assistance, and unlimited deliveries.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="border border-brand-green-primary rounded-xl p-4 hover:bg-brand-green-primary/10 transition">
            <h3 className="font-bold text-brand-green-primary">Basic</h3>
            <p className="text-sm text-brand-teal/70">3 meals / day</p>
            <p className="text-lg font-extrabold mt-2">$29 / mo</p>
            <ArrowRight className="mt-2 w-5 h-5 text-brand-green-primary" />
          </button>
          <button className="border border-brand-green-primary rounded-xl p-4 hover:bg-brand-green-primary/10 transition">
            <h3 className="font-bold text-brand-green-primary">Pro</h3>
            <p className="text-sm text-brand-teal/70">5 meals / day + AI coach</p>
            <p className="text-lg font-extrabold mt-2">$49 / mo</p>
            <ArrowRight className="mt-2 w-5 h-5 text-brand-green-primary" />
          </button>
          <button className="border border-brand-green-primary rounded-xl p-4 hover:bg-brand-green-primary/10 transition">
            <h3 className="font-bold text-brand-green-primary">Elite</h3>
            <p className="text-sm text-brand-teal/70">Full daily menu + premium support</p>
            <p className="text-lg font-extrabold mt-2">$79 / mo</p>
            <ArrowRight className="mt-2 w-5 h-5 text-brand-green-primary" />
          </button>
        </div>
      </section>

      <section>
        <h2 className="font-sans font-bold text-xl text-brand-green-primary mb-2">
          <Calendar className="inline w-5 h-5 mr-2" />
          Sample Meals
        </h2>
        <div className="space-y-6">
          <div>
            <h3 className="font-bold text-brand-teal">Breakfast</h3>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              {breakfastMeals.map((meal: Meal) => (
                <li key={meal.id} className="border rounded-xl p-2">
                  <img src={meal.image} alt={meal.name} className="w-full h-32 object-cover rounded" />
                  <p className="mt-1 text-sm font-medium text-brand-teal">{meal.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-brand-teal">Lunch</h3>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              {lunchMeals.map((meal: Meal) => (
                <li key={meal.id} className="border rounded-xl p-2">
                  <img src={meal.image} alt={meal.name} className="w-full h-32 object-cover rounded" />
                  <p className="mt-1 text-sm font-medium text-brand-teal">{meal.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-brand-teal">Dinner</h3>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
              {dinnerMeals.map((meal: Meal) => (
                <li key={meal.id} className="border rounded-xl p-2">
                  <img src={meal.image} alt={meal.name} className="w-full h-32 object-cover rounded" />
                  <p className="mt-1 text-sm font-medium text-brand-teal">{meal.name}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
