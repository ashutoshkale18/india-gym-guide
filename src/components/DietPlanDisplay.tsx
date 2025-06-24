
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { DietPlan, Meal } from '@/types/UserProfile';

interface DietPlanDisplayProps {
  dietPlan: DietPlan;
}

const MealCard = ({ meal, mealName }: { meal: Meal; mealName: string }) => (
  <Card className="h-full">
    <CardHeader className="pb-3">
      <CardTitle className="text-lg capitalize">{mealName}</CardTitle>
      <div className="flex gap-2 text-xs">
        <Badge variant="secondary">{Math.round(meal.totalMacros.calories)} cal</Badge>
        <Badge variant="outline">{Math.round(meal.totalMacros.protein)}g protein</Badge>
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
      {meal.items.map((item, index) => (
        <div key={index} className="border-l-2 border-blue-200 pl-3">
          <div className="font-medium text-sm">{item.food}</div>
          <div className="text-xs text-gray-600">{item.quantity}</div>
          <div className="text-xs text-gray-500 mt-1">
            {item.calories}cal • {Math.round(item.protein)}p • {Math.round(item.carbs)}c • {Math.round(item.fats)}f
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);

export const DietPlanDisplay = ({ dietPlan }: DietPlanDisplayProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Daily Totals</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">{Math.round(dietPlan.dailyTotals.calories)}</div>
              <div className="text-sm text-gray-600">Calories</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{Math.round(dietPlan.dailyTotals.protein)}g</div>
              <div className="text-sm text-gray-600">Protein</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">{Math.round(dietPlan.dailyTotals.carbs)}g</div>
              <div className="text-sm text-gray-600">Carbs</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{Math.round(dietPlan.dailyTotals.fats)}g</div>
              <div className="text-sm text-gray-600">Fats</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-orange-600">{Math.round(dietPlan.dailyTotals.fiber)}g</div>
              <div className="text-sm text-gray-600">Fiber</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MealCard meal={dietPlan.breakfast} mealName="breakfast" />
        <MealCard meal={dietPlan.lunch} mealName="lunch" />
        <MealCard meal={dietPlan.snack} mealName="snack" />
        <MealCard meal={dietPlan.dinner} mealName="dinner" />
      </div>
    </div>
  );
};
