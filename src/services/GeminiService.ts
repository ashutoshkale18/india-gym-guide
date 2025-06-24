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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        const errorBody = await response.json();
        console.error('Gemini API error response:', errorBody);
        throw new Error(`Gemini API error: ${errorBody.error?.message || response.statusText}`);
      }

      const data = await response.json();
      const generatedText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!generatedText) {
        throw new Error("Gemini API response format is unexpected or empty.");
      }

      console.log("Gemini raw response:\n", generatedText);

      return this.parseDietPlanResponse(generatedText);
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
      "breakfast": {
        "name": "breakfast",
        "items": [
          {
            "food": "Food Name",
            "quantity": "Amount with unit",
            "calories": number,
            "protein": number,
            "carbs": number,
            "fats": number,
            "fiber": number,
            "cookingInstructions": "Instructions"
          }
        ],
        "totalMacros": {
          "calories": number,
          "protein": number,
          "carbs": number,
          "fats": number,
          "fiber": number
        }
      },
      "lunch": { ... same structure as breakfast ... },
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
Make the meals Indian and tailored to the user. Ensure exact macros. No extra text outside JSON.
    `.trim();
  }

  private static parseDietPlanResponse(response: string) {
    try {
      const jsonStart = response.indexOf('{');
      const jsonEnd = response.lastIndexOf('}') + 1;
      const jsonString = response.substring(jsonStart, jsonEnd);

      // Clean response: remove any possible trailing commas and comments
      const safeJson = jsonString
        .replace(/\/\*[\s\S]*?\*\//g, '')  // Remove block comments
        .replace(/,\s*}/g, '}')           // Remove trailing commas from objects
        .replace(/,\s*]/g, ']');          // Remove trailing commas from arrays

      const parsedData = JSON.parse(safeJson);

      return {
        weeklyPlan: parsedData.weeklyPlan.map((day: any) => ({
          day: day.day,
          breakfast: day.breakfast,
          lunch: day.lunch,
          snack: day.snack,
          dinner: day.dinner,
          dailyTotals: day.dailyTotals
        })),
        weeklyTotals: parsedData.weeklyTotals,
        nutritionTips: parsedData.nutritionTips || [],
        mealTiming: parsedData.mealTiming || {}
      };
    } catch (error) {
      console.error('Error parsing diet plan response:', error);
      throw new Error('Failed to parse AI-generated diet plan');
    }
  }
}
