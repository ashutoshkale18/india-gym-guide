
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
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
    dietPreference: ''
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
      dietPreference: formData.dietPreference as 'vegetarian' | 'non-vegetarian'
    };

    onSubmit(profile);
  };

  const isFormValid = Object.values(formData).every(value => value !== '');

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

      <Button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700"
        disabled={!isFormValid}
      >
        Create My Fitness Plan
      </Button>
    </form>
  );
};
