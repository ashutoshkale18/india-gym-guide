
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProfile } from '@/types/UserProfile';

interface UserProfileFormProps {
  onSubmit: (profile: UserProfile) => void;
}

export const UserProfileForm = ({ onSubmit }: UserProfileFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    fitnessGoal: '',
    experienceLevel: '',
    dietPreference: '',
    activityLevel: '',
    medicalConditions: '',
    foodAllergies: '',
    supplements: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const profile: UserProfile = {
      name: formData.name,
      age: parseInt(formData.age),
      gender: formData.gender as 'male' | 'female',
      weight: parseFloat(formData.weight),
      height: parseFloat(formData.height),
      fitnessGoal: formData.fitnessGoal as 'fat-loss' | 'bulking' | 'recomposition',
      experienceLevel: formData.experienceLevel as 'beginner' | 'intermediate' | 'advanced',
      dietPreference: formData.dietPreference as 'vegetarian' | 'non-vegetarian',
      physicalCondition: {
        activityLevel: formData.activityLevel as 'sedentary' | 'lightly-active' | 'moderately-active' | 'very-active' | 'extremely-active',
        medicalConditions: formData.medicalConditions,
        foodAllergies: formData.foodAllergies,
        supplements: formData.supplements
      }
    };

    onSubmit(profile);
  };

  const isFormValid = formData.name && formData.age && formData.gender && formData.weight && 
                     formData.height && formData.fitnessGoal && formData.experienceLevel && 
                     formData.dietPreference && formData.activityLevel;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                placeholder="Enter your age"
                min="13"
                max="80"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                placeholder="Enter weight in kg"
                min="30"
                max="200"
                step="0.1"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                placeholder="Enter height in cm"
                min="120"
                max="220"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fitnessGoal">Fitness Goal</Label>
              <Select value={formData.fitnessGoal} onValueChange={(value) => setFormData(prev => ({ ...prev, fitnessGoal: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your goal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fat-loss">Fat Loss</SelectItem>
                  <SelectItem value="bulking">Bulking</SelectItem>
                  <SelectItem value="recomposition">Muscle Recomposition</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experienceLevel">Experience Level</Label>
              <Select value={formData.experienceLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, experienceLevel: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner (0-6 months)</SelectItem>
                  <SelectItem value="intermediate">Intermediate (6 months - 2 years)</SelectItem>
                  <SelectItem value="advanced">Advanced (2+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dietPreference">Diet Preference</Label>
              <Select value={formData.dietPreference} onValueChange={(value) => setFormData(prev => ({ ...prev, dietPreference: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your diet preference" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="non-vegetarian">Non-Vegetarian</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Physical Condition */}
      <Card>
        <CardHeader>
          <CardTitle>Physical Condition & Health</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="activityLevel">Activity Level</Label>
            <Select value={formData.activityLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, activityLevel: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select your activity level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary (Little/no exercise)</SelectItem>
                <SelectItem value="lightly-active">Lightly Active (Light exercise 1-3 days/week)</SelectItem>
                <SelectItem value="moderately-active">Moderately Active (Moderate exercise 3-5 days/week)</SelectItem>
                <SelectItem value="very-active">Very Active (Hard exercise 6-7 days/week)</SelectItem>
                <SelectItem value="extremely-active">Extremely Active (Very hard exercise, physical job)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="medicalConditions">Medical Conditions</Label>
            <Textarea
              id="medicalConditions"
              value={formData.medicalConditions}
              onChange={(e) => setFormData(prev => ({ ...prev, medicalConditions: e.target.value }))}
              placeholder="List any medical conditions (diabetes, hypertension, etc.) or write 'None'"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="foodAllergies">Food Allergies</Label>
            <Textarea
              id="foodAllergies"
              value={formData.foodAllergies}
              onChange={(e) => setFormData(prev => ({ ...prev, foodAllergies: e.target.value }))}
              placeholder="List any food allergies or intolerances or write 'None'"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="supplements">Current Supplements</Label>
            <Textarea
              id="supplements"
              value={formData.supplements}
              onChange={(e) => setFormData(prev => ({ ...prev, supplements: e.target.value }))}
              placeholder="List current supplements (protein powder, vitamins, etc.) or write 'None'"
              rows={2}
            />
          </div>
        </CardContent>
      </Card>

      <Button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700"
        disabled={!isFormValid}
      >
        Generate My AI-Powered Fitness Plan
      </Button>
    </form>
  );
};
