
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
  private static readonly API_KEY = 'AIzaSyBY4s2e-WOnVz5lC-vW1qcnpXJTMPxXsnw';
  private static readonly API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

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
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = await response.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      
      return this.parseDietPlanResponse(generatedText);
    } catch (error) {
      console.error('Error generating diet plan:', error);
      throw error;
    }
  }

  private static createDietPlanPrompt(request: GeminiDietRequest): string {
    const { userProfile, targetMacros, physicalCondition } = request;
    
    return `
Create a comprehensive 7-day personalized diet plan in JSON format for the following user:

USER PROFILE:
- Name: ${userProfile.name}
- Age: ${userProfile.age} years
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
- Current Supplements: ${physicalCondition.supplements || 'None'}

TARGET MACROS (Daily):
- Calories: ${targetMacros.calories}
- Protein: ${targetMacros.protein}g
- Carbohydrates: ${targetMacros.carbs}g
- Fats: ${targetMacros.fats}g
- Fiber: ${targetMacros.fiber}g

REQUIREMENTS:
1. Generate a 7-day diet plan (Monday to Sunday)
2. Each day should have 4 meals: Breakfast, Lunch, Snack, Dinner
3. Include specific Indian food items with exact quantities
4. Calculate precise macros for each food item
5. Consider the user's diet preference (vegetarian/non-vegetarian)
6. Account for physical condition, allergies, and medical conditions
7. Ensure daily totals meet target macros (±5% tolerance)
8. Include cooking instructions where necessary
9. Suggest meal timing based on fitness goals

Return ONLY valid JSON in this exact format:
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
            "cookingInstructions": "Brief instructions"
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
      "lunch": { /* same structure */ },
      "snack": { /* same structure */ },
      "dinner": { /* same structure */ },
      "dailyTotals": {
        "calories": number,
        "protein": number,
        "carbs": number,
        "fats": number,
        "fiber": number
      }
    }
    // ... repeat for all 7 days
  ],
  "weeklyTotals": {
    "calories": number,
    "protein": number,
    "carbs": number,
    "fats": number,
    "fiber": number
  },
  "nutritionTips": [
    "Personalized tip 1",
    "Personalized tip 2"
  ],
  "mealTiming": {
    "breakfast": "Suggested time",
    "lunch": "Suggested time", 
    "snack": "Suggested time",
    "dinner": "Suggested time"
  }
}

Make the diet plan specific to Indian cuisine and the user's personal profile. Be precise with measurements and macro calculations.
`;
  }

  private static parseDietPlanResponse(response: string) {
    try {
      // Clean the response to extract JSON
      const jsonStart = response.indexOf('{');
      const jsonEnd = response.lastIndexOf('}') + 1;
      const jsonString = response.substring(jsonStart, jsonEnd);
      
      const parsedData = JSON.parse(jsonString);
      
      // Convert to the format expected by WeeklyDietPlan interface
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
