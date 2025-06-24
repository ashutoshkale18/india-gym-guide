// GeminiService.ts
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
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
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
Create a comprehensive 7-day personalized diet plan for the following user.
Respond ONLY with valid JSON. DO NOT include comments, explanations, or trailing commas. Follow this exact format strictly.

USER PROFILE:
- Name: ${userProfile.name}
- Age: ${userProfile.age}
- Gender: ${userProfile.gender}
- Weight: ${userProfile.weight} kg
- Height: ${userProfile.height} cm
- Fitness Goal: ${userProfile.fitnessGoal}
- Experience Level: ${userProfile.experienceLevel}
- Diet Preference: ${userProfile.dietPreference}

PHYSICAL CONDITION:
- Activity Level: ${physicalCondition.activityLevel}
- Medical Conditions: ${physicalCondition.medicalConditions || 'None'}
- Food Allergies: ${physicalCondition.foodAllergies || 'None'}
- Supplements: ${physicalCondition.supplements || 'None'}

TARGET MACROS (Daily):
- Calories: ${targetMacros.calories}
- Protein: ${targetMacros.protein}g
- Carbs: ${targetMacros.carbs}g
- Fats: ${targetMacros.fats}g
- Fiber: ${targetMacros.fiber}g

Return JSON in the format:
{
  "weeklyPlan": [
    {
      "day": "Monday",
      "breakfast": { ... },
      "lunch": { ... },
      "snack": { ... },
      "dinner": { ... },
      "dailyTotals": {
        "calories": number,
        "protein": number,
        "carbs": number,
        "fats": number,
        "fiber": number
      }
    }
  ],
  "weeklyTotals": {
    "calories": number,
    "protein": number,
    "carbs": number,
    "fats": number,
    "fiber": number
  },
  "nutritionTips": [
    "Tip 1",
    "Tip 2"
  ],
  "mealTiming": {
    "breakfast": "Time",
    "lunch": "Time",
    "snack": "Time",
    "dinner": "Time"
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
      throw new Error('Failed to parse Gemini diet response');
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
      food: item.item || item.food || 'Unknown food',
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
