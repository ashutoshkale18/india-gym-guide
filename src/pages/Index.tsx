
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProfileForm } from '@/components/UserProfileForm';
import { FitnessDashboard } from '@/components/FitnessDashboard';
import { UserProfile } from '@/types/UserProfile';
import { Dumbbell, Target, TrendingUp } from 'lucide-react';

const Index = () => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleProfileSubmit = (profile: UserProfile) => {
    setUserProfile(profile);
    setShowForm(false);
  };

  const resetProfile = () => {
    setUserProfile(null);
    setShowForm(false);
  };

  if (userProfile) {
    return <FitnessDashboard profile={userProfile} onReset={resetProfile} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Macro<span className="text-blue-600">Tracker</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your personalized fitness companion for achieving your goals with customized diet plans and workout routines
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Smart Nutrition</CardTitle>
              <CardDescription>
                Personalized Indian meal plans with precise macro tracking
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Dumbbell className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Custom Workouts</CardTitle>
              <CardDescription>
                Experience-based gym routines tailored to your fitness goals
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <TrendingUp className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Progress Tracking</CardTitle>
              <CardDescription>
                Download comprehensive PDF reports of your fitness plan
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          {!showForm ? (
            <Button 
              onClick={() => setShowForm(true)}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg"
            >
              Get Started - Create Your Profile
            </Button>
          ) : (
            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Create Your Fitness Profile</CardTitle>
                <CardDescription>
                  Let's gather some information to create your personalized plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <UserProfileForm onSubmit={handleProfileSubmit} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
