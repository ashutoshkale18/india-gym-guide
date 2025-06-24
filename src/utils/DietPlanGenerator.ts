
import { UserProfile, DietPlan, Meal, MacroNutrients } from '@/types/UserProfile';

export class DietPlanGenerator {
  private static indianFoods = {
    breakfast: [
      { food: 'Oats with Milk', baseCal: 150, protein: 6, carbs: 25, fats: 3, fiber: 4 },
      { food: 'Poha with Peanuts', baseCal: 180, protein: 4, carbs: 30, fats: 5, fiber: 3 },
      { food: 'Upma with Vegetables', baseCal: 160, protein: 4, carbs: 28, fats: 4, fiber: 3 },
      { food: 'Idli with Sambar', baseCal: 140, protein: 5, carbs: 26, fats: 2, fiber: 4 },
      { food: 'Paratha with Curd', baseCal: 200, protein: 6, carbs: 25, fats: 8, fiber: 2 }
    ],
    lunch: [
      { food: 'Brown Rice', baseCal: 110, protein: 2.5, carbs: 22, fats: 1, fiber: 2 },
      { food: 'Dal (Lentils)', baseCal: 120, protein: 9, carbs: 15, fats: 1, fiber: 8 },
      { food: 'Chicken Curry', baseCal: 180, protein: 25, carbs: 5, fats: 8, fiber: 1 },
      { food: 'Paneer Sabzi', baseCal: 160, protein: 12, carbs: 8, fats: 10, fiber: 2 },
      { food: 'Mixed Vegetables', baseCal: 80, protein: 3, carbs: 12, fats: 2, fiber: 5 },
      { food: 'Roti (Wheat)', baseCal: 80, protein: 3, carbs: 15, fats: 1, fiber: 2 }
    ],
    snack: [
      { food: 'Almonds', baseCal: 160, protein: 6, carbs: 3, fats: 14, fiber: 3 },
      { food: 'Greek Yogurt', baseCal: 100, protein: 15, carbs: 6, fats: 0, fiber: 0 },
      { food: 'Banana', baseCal: 90, protein: 1, carbs: 22, fats: 0, fiber: 3 },
      { food: 'Sprouts Chaat', baseCal: 120, protein: 8, carbs: 18, fats: 2, fiber: 6 },
      { food: 'Buttermilk', baseCal: 60, protein: 3, carbs: 8, fats: 1, fiber: 0 }
    ],
    dinner: [
      { food: 'Quinoa', baseCal: 120, protein: 4, carbs: 20, fats: 2, fiber: 3 },
      { food: 'Fish Curry', baseCal: 150, protein: 22, carbs: 4, fats: 6, fiber: 1 },
      { food: 'Palak Paneer', baseCal: 140, protein: 10, carbs: 8, fats: 8, fiber: 4 },
      { food: 'Rajma (Kidney Beans)', baseCal: 130, protein: 8, carbs: 20, fats: 1, fiber: 7 },
      { food: 'Vegetable Salad', baseCal: 50, protein: 2, carbs: 8, fats: 1, fiber: 4 }
    ]
  };

  static generateWeeklyPlan(profile: UserProfile, targetMacros: MacroNutrients): DietPlan {
    const mealCalorieDistribution = {
      breakfast: 0.25,
      lunch: 0.35,
      snack: 0.15,
      dinner: 0.25
    };

    const generateMeal = (mealType: keyof typeof this.indianFoods, targetCal: number): Meal => {
      const availableFoods = this.indianFoods[mealType];
      const selectedItems = [];
      let currentCal = 0;
      let currentProtein = 0;
      let currentCarbs = 0;
      let currentFats = 0;
      let currentFiber = 0;

      // Select 2-3 food items for the meal
      const numItems = mealType === 'snack' ? 2 : 3;
      const shuffledFoods = [...availableFoods].sort(() => Math.random() - 0.5);
      
      for (let i = 0; i < numItems && i < shuffledFoods.length; i++) {
        const food = shuffledFoods[i];
        const multiplier = (targetCal / numItems) / food.baseCal;
        const quantity = this.getQuantityString(food.food, multiplier);
        
        const itemCal = food.baseCal * multiplier;
        const itemProtein = food.protein * multiplier;
        const itemCarbs = food.carbs * multiplier;
        const itemFats = food.fats * multiplier;
        const itemFiber = food.fiber * multiplier;

        selectedItems.push({
          food: food.food,
          quantity: quantity,
          calories: itemCal,
          protein: itemProtein,
          carbs: itemCarbs,
          fats: itemFats,
          fiber: itemFiber
        });

        currentCal += itemCal;
        currentProtein += itemProtein;
        currentCarbs += itemCarbs;
        currentFats += itemFats;
        currentFiber += itemFiber;
      }

      return {
        name: mealType,
        items: selectedItems,
        totalMacros: {
          calories: currentCal,
          protein: currentProtein,
          carbs: currentCarbs,
          fats: currentFats,
          fiber: currentFiber
        }
      };
    };

    const breakfast = generateMeal('breakfast', targetMacros.calories * mealCalorieDistribution.breakfast);
    const lunch = generateMeal('lunch', targetMacros.calories * mealCalorieDistribution.lunch);
    const snack = generateMeal('snack', targetMacros.calories * mealCalorieDistribution.snack);
    const dinner = generateMeal('dinner', targetMacros.calories * mealCalorieDistribution.dinner);

    const dailyTotals: MacroNutrients = {
      calories: breakfast.totalMacros.calories + lunch.totalMacros.calories + snack.totalMacros.calories + dinner.totalMacros.calories,
      protein: breakfast.totalMacros.protein + lunch.totalMacros.protein + snack.totalMacros.protein + dinner.totalMacros.protein,
      carbs: breakfast.totalMacros.carbs + lunch.totalMacros.carbs + snack.totalMacros.carbs + dinner.totalMacros.carbs,
      fats: breakfast.totalMacros.fats + lunch.totalMacros.fats + snack.totalMacros.fats + dinner.totalMacros.fats,
      fiber: breakfast.totalMacros.fiber + lunch.totalMacros.fiber + snack.totalMacros.fiber + dinner.totalMacros.fiber
    };

    return {
      breakfast,
      lunch,
      snack,
      dinner,
      dailyTotals
    };
  }

  private static getQuantityString(foodName: string, multiplier: number): string {
    const quantities: { [key: string]: string } = {
      'Oats with Milk': `${Math.round(40 * multiplier)}g oats + ${Math.round(150 * multiplier)}ml milk`,
      'Poha with Peanuts': `${Math.round(50 * multiplier)}g poha + ${Math.round(10 * multiplier)}g peanuts`,
      'Brown Rice': `${Math.round(40 * multiplier)}g (raw)`,
      'Dal (Lentils)': `${Math.round(30 * multiplier)}g (raw)`,
      'Chicken Curry': `${Math.round(80 * multiplier)}g chicken`,
      'Almonds': `${Math.round(20 * multiplier)}g (12-15 pieces)`,
      'Greek Yogurt': `${Math.round(100 * multiplier)}g`,
      'Banana': `${Math.round(multiplier)} medium banana`,
      'Roti (Wheat)': `${Math.round(multiplier)} piece`
    };

    return quantities[foodName] || `${Math.round(50 * multiplier)}g`;
  }
}
