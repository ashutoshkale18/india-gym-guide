
import { UserProfile, MacroNutrients } from '@/types/UserProfile';

export class CalorieCalculator {
  static calculateMacros(profile: UserProfile): MacroNutrients {
    // Calculate maintenance calories using the formula: bodyWeight(kg) × 2.2 × 15
    const maintenanceCalories = profile.weight * 2.2 * 15;
    
    // Adjust calories based on fitness goal
    let targetCalories: number;
    switch (profile.fitnessGoal) {
      case 'fat-loss':
        targetCalories = maintenanceCalories * 0.90;
        break;
      case 'bulking':
        targetCalories = maintenanceCalories * 1.10;
        break;
      case 'recomposition':
      default:
        targetCalories = maintenanceCalories;
        break;
    }

    // Calculate macros
    const protein = profile.weight * 2; // 2g per kg
    const fats = profile.weight * 0.8; // 0.8g per kg
    
    // Calculate remaining calories for carbs
    const proteinCalories = protein * 4;
    const fatCalories = fats * 9;
    const remainingCalories = targetCalories - proteinCalories - fatCalories;
    const carbs = Math.max(0, remainingCalories / 4);
    
    // Fiber recommendation
    const fiber = Math.max(25, Math.min(35, profile.weight * 0.4));

    return {
      calories: targetCalories,
      protein: protein,
      carbs: carbs,
      fats: fats,
      fiber: fiber
    };
  }
}
