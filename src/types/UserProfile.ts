
export interface UserProfile {
  name: string;
  age: number;
  gender: 'male' | 'female';
  weight: number; // kg
  height: number; // cm
  fitnessGoal: 'fat-loss' | 'bulking' | 'recomposition';
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  dietPreference: 'vegetarian' | 'non-vegetarian';
}

export interface MacroNutrients {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
}

export interface Meal {
  name: string;
  items: Array<{
    food: string;
    quantity: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
  }>;
  totalMacros: MacroNutrients;
}

export interface DayMealPlan {
  day: string;
  breakfast: Meal;
  lunch: Meal;
  snack: Meal;
  dinner: Meal;
  dailyTotals: MacroNutrients;
}

export interface WeeklyDietPlan {
  weeklyPlan: DayMealPlan[];
  weeklyTotals: MacroNutrients;
}

export interface DietPlan {
  breakfast: Meal;
  lunch: Meal;
  snack: Meal;
  dinner: Meal;
  dailyTotals: MacroNutrients;
}

export interface WorkoutDay {
  day: string;
  muscleGroups: string[];
  exercises: Array<{
    name: string;
    sets: number;
    reps: string;
    notes?: string;
  }>;
}

export interface WorkoutPlan {
  weeklyPlan: WorkoutDay[];
  totalDays: number;
}
