import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp, Clock, Lightbulb } from 'lucide-react';
import { useState } from 'react';

interface MealItem {
  food: string;
  quantity: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
  cookingInstructions?: string;
}

interface Meal {
  items: MealItem[];
  totalMacros: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
  };
}

interface DayPlan {
  day: string;
  breakfast: Meal;
  lunch: Meal;
  snack: Meal;
  dinner: Meal;
  dailyTotals: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
  };
}

interface WeeklyDietPlan {
  weeklyPlan: DayPlan[];
  weeklyTotals: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
  };
  nutritionTips?: string[];
  mealTiming?: {
    breakfast: string;
    lunch: string;
    snack: string;
    dinner: string;
  };
}

interface WeeklyDietPlanDisplayProps {
  weeklyDietPlan: WeeklyDietPlan;
}

const MealCard = ({ meal, mealName }: { meal: Meal; mealName: string }) => (
  <div className="border rounded-lg p-3 bg-gray-50">
    <div className="font-medium text-sm capitalize mb-2">{mealName}</div>
    <div className="flex gap-2 text-xs mb-2">
      <Badge variant="secondary">{Math.round(meal.totalMacros.calories)} cal</Badge>
      <Badge variant="outline">{Math.round(meal.totalMacros.protein)}p</Badge>
    </div>
    <div className="space-y-2">
      {meal.items?.map((item, index) => (
        <div key={index} className="text-xs">
          <div className="font-medium">{item.food}</div>
          <div className="text-gray-600">{item.quantity}</div>
          {item.cookingInstructions && (
            <div className="text-blue-600 italic mt-1">{item.cookingInstructions}</div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export const WeeklyDietPlanDisplay = ({ weeklyDietPlan }: WeeklyDietPlanDisplayProps) => {
  const [openDays, setOpenDays] = useState<{ [key: string]: boolean }>({});

  const toggleDay = (day: string) => {
    setOpenDays(prev => ({ ...prev, [day]: !prev[day] }));
  };

  return (
    <div className="space-y-6">
      {/* Weekly Totals */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Totals - AI Generated Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4 text-center">
            {(['calories', 'protein', 'carbs', 'fats', 'fiber'] as const).map((key, idx) => (
              <div key={key}>
                <div className={`text-2xl font-bold ${['text-blue-600', 'text-green-600', 'text-yellow-600', 'text-purple-600', 'text-orange-600'][idx]}`}>
                  {Math.round(weeklyDietPlan.weeklyTotals[key])}
                  {key !== 'calories' ? 'g' : ''}
                </div>
                <div className="text-sm text-gray-600 capitalize">{key}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Meal Timing */}
      {weeklyDietPlan.mealTiming && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Recommended Meal Timing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              {Object.entries(weeklyDietPlan.mealTiming).map(([meal, time]) => (
                <div key={meal}>
                  <span className="font-medium text-gray-600 capitalize">{meal}:</span>
                  <p>{time}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      {weeklyDietPlan.nutritionTips?.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Personalized Nutrition Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              {weeklyDietPlan.nutritionTips.map((tip, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-blue-600 font-bold">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Daily Plan */}
      <div className="space-y-4">
        {weeklyDietPlan.weeklyPlan.map((dayPlan) => (
          <Card key={dayPlan.day}>
            <Collapsible open={openDays[dayPlan.day]} onOpenChange={() => toggleDay(dayPlan.day)}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50">
                  <div className="flex justify-between items-center">
                    <CardTitle>{dayPlan.day}</CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{Math.round(dayPlan.dailyTotals.calories)} cal</Badge>
                      {openDays[dayPlan.day] ? <ChevronUp /> : <ChevronDown />}
                    </div>
                  </div>
                </CardHeader>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <MealCard meal={dayPlan.breakfast} mealName="breakfast" />
                    <MealCard meal={dayPlan.lunch} mealName="lunch" />
                    <MealCard meal={dayPlan.snack} mealName="snack" />
                    <MealCard meal={dayPlan.dinner} mealName="dinner" />
                  </div>
                </CardContent>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </div>
  );
};
