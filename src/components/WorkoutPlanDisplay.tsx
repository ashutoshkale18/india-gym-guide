
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { WorkoutPlan } from '@/types/UserProfile';
import { Calendar, Dumbbell } from 'lucide-react';

interface WorkoutPlanDisplayProps {
  workoutPlan: WorkoutPlan;
}

export const WorkoutPlanDisplay = ({ workoutPlan }: WorkoutPlanDisplayProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Weekly Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-base px-3 py-1">
              {workoutPlan.totalDays} Days/Week
            </Badge>
            <div className="text-sm text-gray-600">
              {workoutPlan.weeklyPlan.map(day => day.day).join(', ')}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {workoutPlan.weeklyPlan.map((day, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Dumbbell className="w-5 h-5" />
                {day.day}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {day.exercises.map((exercise, exerciseIndex) => (
                  <div key={exerciseIndex} className="border rounded-lg p-3">
                    <div className="font-medium text-sm mb-1">{exercise.name}</div>
                    <div className="text-sm text-blue-600 font-medium">
                      {exercise.sets} sets × {exercise.reps}
                    </div>
                    {exercise.notes && (
                      <div className="text-xs text-gray-500 mt-1">{exercise.notes}</div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
