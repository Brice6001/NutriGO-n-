import { supabase } from '../supabase';
import type { WeeklyPlanData } from '../types';

/**
 * Inserts a new weekly plan into Supabase.
 * @param data The weekly plan data to store.
 * @returns The inserted record (including generated id) or throws an error.
 */
export async function createWeeklyPlan(data: WeeklyPlanData) {
  // Ensure the user is authenticated
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  // Insert the plan; associate with user id for ownership
  const { data: inserted, error } = await supabase
    .from('weekly_plans')
    .insert({
      user_id: user.id,
      plan: data,
    })
    .select();

  if (error) {
    console.error('Supabase insert error:', error);
    throw error;
  }

  // Supabase returns an array; return the first element
  return inserted[0];
}
