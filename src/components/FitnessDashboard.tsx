
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserProfile, WeeklyDietPlan, WorkoutPlan, MacroNutrients } from '@/types/UserProfile';
import { CalorieCalculator } from '@/utils/CalorieCalculator';
import { DietPlanGenerator } from '@/utils/DietPlanGenerator';
import { WorkoutPlanGenerator } from '@/utils/WorkoutPlanGenerator';
import { PDFGenerator } from '@/utils/PDFGenerator';
import { WeeklyDietPlanDisplay } from '@/components/WeeklyDietPlanDisplay';
import { WorkoutPlanDisplay } from '@/components/WorkoutPlanDisplay';
import { MacroDisplay } from '@/components/MacroDisplay';
import { ArrowLeft, Download, User } from 'lucide-react';

interface FitnessDashboardProps {
  profile: UserProfile;
  onReset: () => void;
}

export const FitnessDashboard = ({ profile, onReset }: FitnessDashboardProps) => {
  const [weeklyDietPlan, setWeeklyDietPlan] = useState<WeeklyDietPlan | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [macros, setMacros] = useState<MacroNutrients | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    // Calculate macros
    const calculatedMacros = CalorieCalculator.calculateMacros(profile);
    setMacros(calculatedMacros);

    // Generate weekly diet plan
    const generatedWeeklyDietPlan = DietPlanGenerator.generateWeeklyPlan(profile, calculatedMacros);
    setWeeklyDietPlan(generatedWeeklyDietPlan);

    // Generate workout plan
    const generatedWorkoutPlan = WorkoutPlanGenerator.generatePlan(profile);
    setWorkoutPlan(generatedWorkoutPlan);
  }, [profile]);

  const handleDownloadPDF = async () => {
    if (!weeklyDietPlan || !workoutPlan || !macros) return;

    setIsGeneratingPDF(true);
    try {
      // Convert weekly plan to daily for PDF compatibility
      const dailyPlan = weeklyDietPlan.weeklyPlan[0]; // Use first day as template
      await PDFGenerator.generateCompletePlan(profile, dailyPlan, workoutPlan, macros);
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onReset} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Your Fitness Plan</h1>
              <p className="text-gray-600">Welcome back, {profile.name}!</p>
            </div>
          </div>
          <Button 
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
          </Button>
        </div>

        {/* Profile Summary Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-5 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-600">Goal:</span>
                <p className="capitalize">{profile.fitnessGoal.replace('-', ' ')}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Experience:</span>
                <p className="capitalize">{profile.experienceLevel}</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Weight:</span>
                <p>{profile.weight} kg</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Height:</span>
                <p>{profile.height} cm</p>
              </div>
              <div>
                <span className="font-medium text-gray-600">Diet:</span>
                <p className="capitalize">{profile.dietPreference}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Macro Overview */}
        {macros && <MacroDisplay macros={macros} />}

        {/* Main Content Tabs */}
        <Tabs defaultValue="diet" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="diet">7-Day Diet Plan</TabsTrigger>
            <TabsTrigger value="workout">6-Day Workout Plan</TabsTrigger>
          </TabsList>

          <TabsContent value="diet">
            {weeklyDietPlan && <WeeklyDietPlanDisplay weeklyDietPlan={weeklyDietPlan} />}
          </TabsContent>

          <TabsContent value="workout">
            {workoutPlan && <WorkoutPlanDisplay workoutPlan={workoutPlan} />}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
