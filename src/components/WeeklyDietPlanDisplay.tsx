
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { WeeklyDietPlan, Meal } from '@/types/UserProfile';
import { ChevronDown, ChevronUp, Clock, Lightbulb } from 'lucide-react';
import { useState } from 'react';

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
      {meal.items.map((item, index) => (
        <div key={index} className="text-xs">
          <div className="font-medium">{item.food}</div>
          <div className="text-gray-600">{item.quantity}</div>
          {(item as any).cookingInstructions && (
            <div className="text-blue-600 italic mt-1">{(item as any).cookingInstructions}</div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export const WeeklyDietPlanDisplay = ({ weeklyDietPlan }: WeeklyDietPlanDisplayProps) => {
  const [openDays, setOpenDays] = useState<{ [key: string]: boolean }>({});

  const toggleDay = (day: string) => {
    setOpenDays(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  return (
    <div className="space-y-6">
      {/* Weekly Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Weekly Totals - AI Generated Plan</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{Math.round(weeklyDietPlan.weeklyTotals.calories)}</div>
              <div className="text-sm text-gray-600">Calories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{Math.round(weeklyDietPlan.weeklyTotals.protein)}g</div>
              <div className="text-sm text-gray-600">Protein</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">{Math.round(weeklyDietPlan.weeklyTotals.carbs)}g</div>
              <div className="text-sm text-gray-600">Carbs</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{Math.round(weeklyDietPlan.weeklyTotals.fats)}g</div>
              <div className="text-sm text-gray-600">Fats</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{Math.round(weeklyDietPlan.weeklyTotals.fiber)}g</div>
              <div className="text-sm text-gray-600">Fiber</div>
            </div>
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
              <div>
                <span className="font-medium text-gray-600">Breakfast:</span>
                <p>{weeklyDietPlan.mealTiming.breakfast}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Lunch:</span>
                <p>{weeklyDietPlan.mealTiming.lunch}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Snack:</span>
                <p>{weeklyDietPlan.mealTiming.snack}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Dinner:</span>
                <p>{weeklyDietPlan.mealTiming.dinner}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Nutrition Tips */}
      {weeklyDietPlan.nutritionTips && weeklyDietPlan.nutritionTips.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5" />
              Personalized Nutrition Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {weeklyDietPlan.nutritionTips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <span className="text-blue-600 font-bold">•</span>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Daily Plans */}
      <div className="space-y-4">
        {weeklyDietPlan.weeklyPlan.map((dayPlan) => (
          <Card key={dayPlan.day}>
            <Collapsible open={openDays[dayPlan.day]} onOpenChange={() => toggleDay(dayPlan.day)}>
              <CollapsibleTrigger asChild>
                <CardHeader className="cursor-pointer hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{dayPlan.day}</CardTitle>
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary">
                        {Math.round(dayPlan.dailyTotals.calories)} cal
                      </Badge>
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
