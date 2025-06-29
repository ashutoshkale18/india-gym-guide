export interface GeminiDietRequest {
  userProfile: {
    name: string;
    age: number;
    gender: 'male' | 'female';
    weight: number;
    height: number;
    fitnessGoal: 'fat-loss' | 'bulking' | 'recomposition';
    experienceLevel: 'beginner' | 'intermediate' | 'advanced';
    dietPreference: 'vegetarian' | 'non-vegetarian';
  };
  targetMacros: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
  };
  physicalCondition: {
    activityLevel: string;
    medicalConditions: string;
    foodAllergies: string;
    supplements: string;
  };
}

export class GeminiService {
  private static readonly API_KEY = 'AIzaSyDN4A5iAUSUrUQwNrX5qPQB-FIGgGOXRDw';
  private static readonly API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';

  static async generateDietPlan(request: GeminiDietRequest) {
    const prompt = this.createDietPlanPrompt(request);

    try {
      const response = await fetch(`${this.API_URL}?key=${this.API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(`Gemini API error: ${errorBody.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!generatedText) throw new Error('Empty or invalid Gemini response');

      const parsed = this.parseDietPlanResponse(generatedText);
      return parsed;
    } catch (error) {
      console.error('Error generating diet plan:', error);
      throw error;
    }
  }

private static createDietPlanPrompt(request: GeminiDietRequest): string {
  const { userProfile, targetMacros, physicalCondition } = request;

  return `
Generate a complete and personalized 7-day diet plan in strict JSON format. Follow these instructions:

======================
📌 STRUCTURE RULES:
======================
- Return ONLY VALID JSON. No comments or explanations.
- The object must contain:
  • "weeklyPlan": 7-day meal plan (Monday to Sunday, in order)
  • "weeklyTotals": summed macros of all 7 days
  • "nutritionTips": helpful tips as an array of 2 strings
  • "mealTiming": standard meal times for all days

======================
📌 MEAL FORMAT:
======================
Each day must contain:
- "day": string (e.g., "Monday")
- "breakfast", "lunch", "snack", "dinner": each with
  • "foodItems": an array of meals with
    - "food": non-generic name (avoid "unknown")
    - "quantity": exact measurement (e.g., "1 cup", "150g")
    - "calories", "protein", "carbs", "fats", "fiber": numeric
    - "cookingInstructions": short sentence
  • "totalMacros": sum of macros for that meal
- "dailyTotals": sum of all macros for the entire day (based on foodItems)

======================
📌 MACRO ENFORCEMENT:
======================
- Each day's dailyTotals **must closely match the following targets**:
  • Calories: ${targetMacros.calories}
  • Protein: ${targetMacros.protein}g ✅ MUST match this value ±2%
  • Carbs: ${targetMacros.carbs}g
  • Fats: ${targetMacros.fats}g
  • Fiber: ${targetMacros.fiber}g

- Allow only ±2% deviation. For example:
  • 150g protein → min: 147g, max: 153g
- All 5 macros must be present in each food item and meal.
- No rounding or vague values. Use real numbers.
- Do NOT overfit or underfit macros.
- Do NOT copy meals between days.

======================
📌 USER INFO:
======================
- Name: ${userProfile.name}
- Age: ${userProfile.age}
- Gender: ${userProfile.gender}
- Weight: ${userProfile.weight} kg
- Height: ${userProfile.height} cm
- Fitness Goal: ${userProfile.fitnessGoal}
- Experience Level: ${userProfile.experienceLevel}
- Diet Preference: ${userProfile.dietPreference}

======================
📌 PHYSICAL CONDITION:
======================
- Activity Level: ${physicalCondition.activityLevel}
- Medical Conditions: ${physicalCondition.medicalConditions || 'None'}
- Food Allergies: ${physicalCondition.foodAllergies || 'None'}
- Supplements: ${physicalCondition.supplements || 'None'}

======================
📌 RETURN JSON TEMPLATE:
======================

{
  "weeklyPlan": [
    {
      "day": "Monday",
      "breakfast": {
        "foodItems": [
          {
            "food": "Oats with milk and almonds",
            "quantity": "1 bowl",
            "calories": 350,
            "protein": 20,
            "carbs": 40,
            "fats": 12,
            "fiber": 6,
            "cookingInstructions": "Boil oats in milk for 5 mins, add chopped almonds."
          }
        ],
        "totalMacros": {
          "calories": 350,
          "protein": 20,
          "carbs": 40,
          "fats": 12,
          "fiber": 6
        }
      },
      "lunch": { ... },
      "snack": { ... },
      "dinner": { ... },
      "dailyTotals": {
        "calories": ${targetMacros.calories},
        "protein": ${targetMacros.protein},
        "carbs": ${targetMacros.carbs},
        "fats": ${targetMacros.fats},
        "fiber": ${targetMacros.fiber}
      }
    },
    { "day": "Tuesday", ... },
    { "day": "Wednesday", ... },
    { "day": "Thursday", ... },
    { "day": "Friday", ... },
    { "day": "Saturday", ... },
    { "day": "Sunday", ... }
  ],
  "weeklyTotals": {
    "calories": ${targetMacros.calories * 7},
    "protein": ${targetMacros.protein * 7},
    "carbs": ${targetMacros.carbs * 7},
    "fats": ${targetMacros.fats * 7},
    "fiber": ${targetMacros.fiber * 7}
  },
  "nutritionTips": [
    "Drink plenty of water throughout the day.",
    "Prioritize whole, unprocessed foods for better digestion and nutrients."
  ],
  "mealTiming": {
    "breakfast": "08:00 AM",
    "lunch": "01:00 PM",
    "snack": "04:30 PM",
    "dinner": "08:00 PM"
  }
}
    `.trim();
}



  private static parseDietPlanResponse(response: string) {
    try {
      const jsonStart = response.indexOf('{');
      const jsonEnd = response.lastIndexOf('}') + 1;
      const jsonString = response.substring(jsonStart, jsonEnd);

      const safeJson = jsonString
        .replace(/,\s*}/g, '}')
        .replace(/,\s*]/g, ']');

      const parsed = JSON.parse(safeJson);

      if (!parsed.weeklyPlan || parsed.weeklyPlan.length !== 7) {
        throw new Error('Incomplete weekly plan. AI did not return all 7 days.');
      }

      return {
        weeklyPlan: parsed.weeklyPlan.map((day: any) => ({
          day: day.day,
          breakfast: this.ensureMealStructure(day.breakfast),
          lunch: this.ensureMealStructure(day.lunch),
          snack: this.ensureMealStructure(day.snack),
          dinner: this.ensureMealStructure(day.dinner),
          dailyTotals: day.dailyTotals || this.computeDailyTotals(day)
        })),
        weeklyTotals: parsed.weeklyTotals,
        nutritionTips: parsed.nutritionTips || [],
        mealTiming: parsed.mealTiming || {}
      };
    } catch (error) {
      throw new Error('Failed to parse Gemini diet response: ' + (error as Error).message);
    }
  }

  private static ensureMealStructure(meal: any) {
    if (!meal || !Array.isArray(meal.foodItems)) {
      return {
        items: [],
        totalMacros: { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 }
      };
    }

    const items = meal.foodItems.map((item: any) => ({
      food: item.food || item.item || 'Unknown food',
      quantity: item.quantity || '',
      calories: item.calories || 0,
      protein: item.protein || 0,
      carbs: item.carbs || 0,
      fats: item.fats || 0,
      fiber: item.fiber || 0,
      cookingInstructions: item.cookingInstructions || ''
    }));

    const totalMacros = items.reduce(
      (acc, item) => ({
        calories: acc.calories + item.calories,
        protein: acc.protein + item.protein,
        carbs: acc.carbs + item.carbs,
        fats: acc.fats + item.fats,
        fiber: acc.fiber + item.fiber
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 }
    );

    return { items, totalMacros };
  }

  private static computeDailyTotals(day: any) {
    const meals = ['breakfast', 'lunch', 'snack', 'dinner'];
    const totals = { calories: 0, protein: 0, carbs: 0, fats: 0, fiber: 0 };

    for (const mealName of meals) {
      const meal = day[mealName];
      if (!meal || !Array.isArray(meal.foodItems)) continue;

      meal.foodItems.forEach((item: any) => {
        totals.calories += item.calories || 0;
        totals.protein += item.protein || 0;
        totals.carbs += item.carbs || 0;
        totals.fats += item.fats || 0;
        totals.fiber += item.fiber || 0;
      });
    }
          return totals;
  }
}
