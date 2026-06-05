export interface Macros {
  protein: number; // in grams
  carbs: number;   // in grams
  fat: number;     // in grams
}

export interface Meal {
  id: string;
  name: string;
  category: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  dietTags: string[]; // e.g. ['Vegan', 'Keto', 'Paleo', 'High Protein', 'Low Carb']
  price: number;
  rating: number;
  reviewsCount: number;
  image: string;
  prepTime: number; // in minutes
  calories: number;
  macros: Macros;
  description: string;
  highlightTags: string[]; // e.g. ['GLUTEN FREE', 'HIGH PROTEIN', 'OMEGA-3 RICH']
}

export type ScreenType = 'discover' | 'dashboard' | 'meals' | 'plan' | 'tracking' | 'pro';

export interface Testimonial {
  rating: number;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface DailyPlanner {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
  caloriesPlanned: number;
}

export interface WeeklyPlanData {
  [day: string]: DailyPlanner; // "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN"
}

export interface HydrationLog {
  currentMl: number;
  goalMl: number;
}

export interface UserProfile {
  name: string;
  avatar: string;
  wellnessStreak: number;
  weightTrend: number[]; // weights for past 9 days
  currentWeight: number;
  targetWeight: number;
}
