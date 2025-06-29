
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProfileForm } from '@/components/UserProfileForm';
import { FitnessDashboard } from '@/components/FitnessDashboard';
import { UserProfile } from '@/types/UserProfile';
import { Dumbbell, Zap, Brain, Rocket } from 'lucide-react';

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Hero Section */}
      <motion.div 
        className="container mx-auto px-4 h-full flex flex-col justify-center items-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="text-center max-w-4xl"
        >
          <motion.div
            variants={itemVariants}
            className="mb-6"
          >
            <motion.div
              variants={floatingVariants}
              animate="animate"
              className="inline-block"
            >
              <Dumbbell className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            </motion.div>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mb-6"
          >
            MACRO<span className="text-white">FORGE</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Unleash your potential with AI-powered fitness intelligence. 
            <span className="text-cyan-400 font-semibold"> Forge your body, fuel your mind.</span>
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex justify-center items-center gap-8 mb-12"
          >
            <div className="flex items-center gap-2 text-cyan-400">
              <Zap className="w-5 h-5" />
              <span className="text-sm font-medium">AI-POWERED</span>
            </div>
            <div className="w-px h-6 bg-gray-600" />
            <div className="flex items-center gap-2 text-purple-400">
              <Brain className="w-5 h-5" />
              <span className="text-sm font-medium">SMART NUTRITION</span>
            </div>
            <div className="w-px h-6 bg-gray-600" />
            <div className="flex items-center gap-2 text-pink-400">
              <Rocket className="w-5 h-5" />
              <span className="text-sm font-medium">NEXT-GEN FITNESS</span>
            </div>
          </motion.div>

          {/* CTA Section */}
          {!showForm ? (
            <motion.div variants={itemVariants}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={() => setShowForm(true)}
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-12 py-6 text-lg font-semibold rounded-2xl shadow-2xl shadow-purple-500/25 border-0 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <Rocket className="w-6 h-6" />
                    INITIALIZE TRANSFORMATION
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    layoutId="button-bg"
                  />
                </Button>
              </motion.div>
              
              <motion.p 
                className="text-gray-400 text-sm mt-4"
                variants={itemVariants}
              >
                Join the fitness revolution • No limits • Pure transformation
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <Card className="max-w-2xl mx-auto bg-slate-800/80 border-slate-700 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-white text-2xl">Neural Profile Initialization</CardTitle>
                  <CardDescription className="text-gray-400">
                    Configure your biometrics for personalized AI optimization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <UserProfileForm onSubmit={handleProfileSubmit} />
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        className="fixed bottom-8 right-8 w-4 h-4 bg-cyan-400 rounded-full opacity-60"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="fixed top-1/4 right-1/4 w-2 h-2 bg-purple-400 rounded-full opacity-40"
        animate={{
          scale: [1, 2, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
    </div>
  );
};

export default Index;
