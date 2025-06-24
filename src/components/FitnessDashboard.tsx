import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserProfile, WeeklyDietPlan, WorkoutPlan, MacroNutrients } from '@/types/UserProfile';
import { CalorieCalculator } from '@/utils/CalorieCalculator';
import { WorkoutPlanGenerator } from '@/utils/WorkoutPlanGenerator';
import { PDFGenerator } from '@/utils/PDFGenerator';
import { GeminiService } from '@/services/GeminiService';
import { WeeklyDietPlanDisplay } from '@/components/WeeklyDietPlanDisplay';
import { WorkoutPlanDisplay } from '@/components/WorkoutPlanDisplay';
import { MacroDisplay } from '@/components/MacroDisplay';
import { ArrowLeft, Download, User, Loader2 } from 'lucide-react';

interface FitnessDashboardProps {
  profile: UserProfile;
  onReset: () => void;
}

export const FitnessDashboard = ({ profile, onReset }: FitnessDashboardProps) => {
  const [weeklyDietPlan, setWeeklyDietPlan] = useState<WeeklyDietPlan | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [macros, setMacros] = useState<MacroNutrients | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isGeneratingDiet, setIsGeneratingDiet] = useState(false);
  const [dietError, setDietError] = useState<string | null>(null);

  useEffect(() => {
    const calculatedMacros = CalorieCalculator.calculateMacros(profile);
    setMacros(calculatedMacros);
    generateAIDietPlan(calculatedMacros);
    const generatedWorkoutPlan = WorkoutPlanGenerator.generatePlan(profile);
    setWorkoutPlan(generatedWorkoutPlan);
  }, [profile]);

  const generateAIDietPlan = async (calculatedMacros: MacroNutrients) => {
    setIsGeneratingDiet(true);
    setDietError(null);

    try {
      const geminiRequest = {
        userProfile: profile,
        targetMacros: calculatedMacros,
        physicalCondition: profile.physicalCondition
      };

      const aiDietPlan = await GeminiService.generateDietPlan(geminiRequest);

      if (!aiDietPlan.weeklyPlan || aiDietPlan.weeklyPlan.length !== 7) {
        throw new Error('Incomplete weekly plan. AI did not return all 7 days.');
      }

      setWeeklyDietPlan(aiDietPlan);
    } catch (error) {
      console.error('Failed to generate AI diet plan:', error);
      setDietError('Failed to generate personalized diet plan. Please try again.');
    } finally {
      setIsGeneratingDiet(false);
    }
  };

  const handleDownloadPDF = async () => {
    if (!weeklyDietPlan || !workoutPlan || !macros) return;

    setIsGeneratingPDF(true);
    try {
      await PDFGenerator.generateCompletePlan(profile, weeklyDietPlan.weeklyPlan[0], workoutPlan, macros);
    } catch (error) {
      console.error('PDF generation failed:', error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const retryDietGeneration = () => {
    if (macros) {
      generateAIDietPlan(macros);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={onReset} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Your AI-Powered Fitness Plan</h1>
              <p className="text-gray-600">Welcome back, {profile.name}!</p>
            </div>
          </div>
          <Button 
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF || !weeklyDietPlan}
            className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
          </Button>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-6 gap-4 text-sm">
              <div><span className="font-medium text-gray-600">Goal:</span><p className="capitalize">{profile.fitnessGoal.replace('-', ' ')}</p></div>
              <div><span className="font-medium text-gray-600">Experience:</span><p className="capitalize">{profile.experienceLevel}</p></div>
              <div><span className="font-medium text-gray-600">Weight:</span><p>{profile.weight} kg</p></div>
              <div><span className="font-medium text-gray-600">Height:</span><p>{profile.height} cm</p></div>
              <div><span className="font-medium text-gray-600">Diet:</span><p className="capitalize">{profile.dietPreference}</p></div>
              <div><span className="font-medium text-gray-600">Activity:</span><p className="capitalize">{profile.physicalCondition.activityLevel.replace('-', ' ')}</p></div>
            </div>
          </CardContent>
        </Card>

        {macros && <MacroDisplay macros={macros} />}

        <Tabs defaultValue="diet" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="diet">AI-Generated 7-Day Diet Plan</TabsTrigger>
            <TabsTrigger value="workout">6-Day Workout Plan</TabsTrigger>
          </TabsList>

          <TabsContent value="diet">
            {isGeneratingDiet ? (
              <Card><CardContent className="py-12">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                  <p className="text-lg font-medium">Generating your personalized diet plan...</p>
                  <p className="text-sm text-gray-600">This may take a few moments as we create a plan specific to your needs</p>
                </div>
              </CardContent></Card>
            ) : dietError ? (
              <Card><CardContent className="py-12">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <p className="text-red-600 font-medium">{dietError}</p>
                  <Button onClick={retryDietGeneration} className="mt-4">Try Again</Button>
                </div>
              </CardContent></Card>
            ) : weeklyDietPlan ? (
              <WeeklyDietPlanDisplay weeklyDietPlan={weeklyDietPlan} />
            ) : null}
          </TabsContent>

          <TabsContent value="workout">
            {workoutPlan && <WorkoutPlanDisplay workoutPlan={workoutPlan} />}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
