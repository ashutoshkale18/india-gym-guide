
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MacroNutrients } from '@/types/UserProfile';
import { Progress } from '@/components/ui/progress';

interface MacroDisplayProps {
  macros: MacroNutrients;
}

export const MacroDisplay = ({ macros }: MacroDisplayProps) => {
  const proteinCals = macros.protein * 4;
  const carbsCals = macros.carbs * 4;
  const fatsCals = macros.fats * 9;

  const proteinPercent = (proteinCals / macros.calories) * 100;
  const carbsPercent = (carbsCals / macros.calories) * 100;
  const fatsPercent = (fatsCals / macros.calories) * 100;

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Daily Macro Targets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-5 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{Math.round(macros.calories)}</div>
            <div className="text-sm text-gray-600">Calories</div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Protein</span>
              <span>{Math.round(macros.protein)}g ({Math.round(proteinPercent)}%)</span>
            </div>
            <Progress value={proteinPercent} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Carbs</span>
              <span>{Math.round(macros.carbs)}g ({Math.round(carbsPercent)}%)</span>
            </div>
            <Progress value={carbsPercent} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Fats</span>
              <span>{Math.round(macros.fats)}g ({Math.round(fatsPercent)}%)</span>
            </div>
            <Progress value={fatsPercent} className="h-2" />
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{Math.round(macros.fiber)}g</div>
            <div className="text-sm text-gray-600">Fiber</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
