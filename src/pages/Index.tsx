"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UserProfileForm } from '@/components/UserProfileForm';
import { FitnessDashboard } from '@/components/FitnessDashboard';
import { UserProfile } from '@/types/UserProfile';
import { Dumbbell, Target, TrendingUp, Brain, Zap, Activity, Sparkles, Bot, ChevronRight } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
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
            x: [0, -80, 0],
            y: [0, 60, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/5 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <AnimatePresence mode="wait">
          {!showForm ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Hero Section */}
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  className="flex items-center justify-center mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50"
                      animate={{ 
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <Bot className="w-16 h-16 text-cyan-400 relative z-10" />
                  </div>
                </motion.div>

                <motion.h1 
                  className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  AI<span className="text-white">Fitness</span>
                  <motion.span
                    className="inline-block ml-2"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  >
                    <Sparkles className="w-12 h-12 text-yellow-400" />
                  </motion.span>
                </motion.h1>

                <motion.p 
                  className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  Experience the future of fitness with AI-powered personalized training, 
                  smart nutrition tracking, and real-time performance optimization
                </motion.p>

                <motion.div
                  className="flex items-center justify-center gap-4 text-sm text-gray-400"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>AI Powered</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    <span>Real-time Analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                    <span>Personalized Plans</span>
                  </div>
                </motion.div>
              </motion.div>

              {/* Features Grid */}
              <motion.div 
                className="grid md:grid-cols-3 gap-8 mb-16"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                {[
                  {
                    icon: Brain,
                    title: "AI Nutrition Coach",
                    description: "Advanced machine learning algorithms create personalized Indian meal plans with precise macro tracking",
                    color: "from-blue-500 to-cyan-500",
                    delay: 0
                  },
                  {
                    icon: Zap,
                    title: "Smart Workouts",
                    description: "Adaptive training programs that evolve with your progress using real-time performance data",
                    color: "from-green-500 to-emerald-500",
                    delay: 0.2
                  },
                  {
                    icon: Activity,
                    title: "Biometric Insights",
                    description: "Comprehensive analytics with predictive modeling for optimal fitness outcomes",
                    color: "from-purple-500 to-pink-500",
                    delay: 0.4
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 + feature.delay }}
                    whileHover={{ 
                      y: -10,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <Card className="relative bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300 group overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                      
                      <CardHeader className="text-center relative z-10">
                        <motion.div
                          className="mx-auto mb-4 relative"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className={`absolute inset-0 bg-gradient-to-r ${feature.color} rounded-full blur-lg opacity-50`} />
                          <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-4">
                            <feature.icon className="w-8 h-8 text-white" />
                          </div>
                        </motion.div>
                        
                        <CardTitle className="text-white text-xl mb-3">{feature.title}</CardTitle>
                        <CardDescription className="text-gray-300 leading-relaxed">
                          {feature.description}
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>

              {/* Stats Section */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.8 }}
              >
                {[
                  { number: "10K+", label: "Active Users" },
                  { number: "95%", label: "Success Rate" },
                  { number: "24/7", label: "AI Support" },
                  { number: "500+", label: "Meal Plans" }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 2 + index * 0.1 }}
                  >
                    <motion.div
                      className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2"
                      whileHover={{ scale: 1.1 }}
                    >
                      {stat.number}
                    </motion.div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Section */}
              <motion.div 
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 2.2 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    onClick={() => setShowForm(true)}
                    size="lg"
                    className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white px-12 py-6 text-lg font-semibold rounded-full shadow-2xl shadow-blue-500/25 border-0 overflow-hidden group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.6 }}
                    />
                    <span className="relative z-10 flex items-center gap-3">
                      Initialize AI Profile
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ChevronRight className="w-5 h-5" />
                      </motion.div>
                    </span>
                  </Button>
                </motion.div>
                
                <motion.p
                  className="text-gray-400 text-sm mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5 }}
                >
                  Join the future of fitness • No credit card required
                </motion.p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl border-white/10 shadow-2xl">
                <CardHeader className="text-center">
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <CardTitle className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-3">
                      <Brain className="w-8 h-8 text-cyan-400" />
                      AI Profile Initialization
                    </CardTitle>
                    <CardDescription className="text-gray-300 text-lg">
                      Our AI needs to understand you better to create the perfect fitness experience
                    </CardDescription>
                  </motion.div>
                </CardHeader>
                <CardContent>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <UserProfileForm onSubmit={handleProfileSubmit} />
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
