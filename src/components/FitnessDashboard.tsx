
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserProfile, DietPlan, WorkoutPlan, MacroNutrients } from '@/types/UserProfile';
import { CalorieCalculator } from '@/utils/CalorieCalculator';
import { DietPlanGenerator } from '@/utils/DietPlanGenerator';
import { WorkoutPlanGenerator } from '@/utils/WorkoutPlanGenerator';
import { PDFGenerator } from '@/utils/PDFGenerator';
import { DietPlanDisplay } from '@/components/DietPlanDisplay';
import { WorkoutPlanDisplay } from '@/components/WorkoutPlanDisplay';
import { MacroDisplay } from '@/components/MacroDisplay';
import { ArrowLeft, Download, User } from 'lucide-react';

interface FitnessDashboardProps {
  profile: UserProfile;
  onReset: () => void;
}

export const FitnessDashboard = ({ profile, onReset }: FitnessDashboardProps) => {
  const [dietPlan, setDietPlan] = useState<DietPlan | null>(null);
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null);
  const [macros, setMacros] = useState<MacroNutrients | null>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    // Calculate macros
    const calculatedMacros = CalorieCalculator.calculateMacros(profile);
    setMacros(calculatedMacros);

    // Generate diet plan
    const generatedDietPlan = DietPlanGenerator.generateWeeklyPlan(profile, calculatedMacros);
    setDietPlan(generatedDietPlan);

    // Generate workout plan
    const generatedWorkoutPlan = WorkoutPlanGenerator.generatePlan(profile);
    setWorkoutPlan(generatedWorkoutPlan);
  }, [profile]);

  const handleDownloadPDF = async () => {
    if (!dietPlan || !workoutPlan || !macros) return;

    setIsGeneratingPDF(true);
    try {
      await PDFGenerator.generateCompletePlan(profile, dietPlan, workoutPlan, macros);
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
            <div className="grid md:grid-cols-4 gap-4 text-sm">
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
            </div>
          </CardContent>
        </Card>

        {/* Macro Overview */}
        {macros && <MacroDisplay macros={macros} />}

        {/* Main Content Tabs */}
        <Tabs defaultValue="diet" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="diet">Diet Plan</TabsTrigger>
            <TabsTrigger value="workout">Workout Plan</TabsTrigger>
          </TabsList>

          <TabsContent value="diet">
            {dietPlan && <DietPlanDisplay dietPlan={dietPlan} />}
          </TabsContent>

          <TabsContent value="workout">
            {workoutPlan && <WorkoutPlanDisplay workoutPlan={workoutPlan} />}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
