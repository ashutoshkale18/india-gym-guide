"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { UserProfile, WeeklyDietPlan, WorkoutPlan, MacroNutrients } from "@/types/UserProfile"
import { CalorieCalculator } from "@/utils/CalorieCalculator"
import { WorkoutPlanGenerator } from "@/utils/WorkoutPlanGenerator"
import { PDFGenerator } from "@/utils/PDFGenerator"
import { GeminiService } from "@/services/GeminiService"
import { WeeklyDietPlanDisplay } from "@/components/WeeklyDietPlanDisplay"
import { WorkoutPlanDisplay } from "@/components/WorkoutPlanDisplay"
import { MacroDisplay } from "@/components/MacroDisplay"
import { ArrowLeft, Download, User, Loader2, Brain, Utensils, Dumbbell, Target, Activity, Zap } from "lucide-react"

interface FitnessDashboardProps {
  profile: UserProfile
  onReset: () => void
}

export const FitnessDashboard = ({ profile, onReset }: FitnessDashboardProps) => {
  const [weeklyDietPlan, setWeeklyDietPlan] = useState<WeeklyDietPlan | null>(null)
  const [workoutPlan, setWorkoutPlan] = useState<WorkoutPlan | null>(null)
  const [macros, setMacros] = useState<MacroNutrients | null>(null)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const [isGeneratingDiet, setIsGeneratingDiet] = useState(false)
  const [dietError, setDietError] = useState<string | null>(null)

  useEffect(() => {
    const calculatedMacros = CalorieCalculator.calculateMacros(profile)
    setMacros(calculatedMacros)
    generateAIDietPlan(calculatedMacros)
    const generatedWorkoutPlan = WorkoutPlanGenerator.generatePlan(profile)
    setWorkoutPlan(generatedWorkoutPlan)
  }, [profile])

  const generateAIDietPlan = async (calculatedMacros: MacroNutrients) => {
    setIsGeneratingDiet(true)
    setDietError(null)
    try {
      const geminiRequest = {
        userProfile: profile,
        targetMacros: calculatedMacros,
        physicalCondition: profile.physicalCondition,
      }
      const aiDietPlan = await GeminiService.generateDietPlan(geminiRequest)
      console.log("AI Diet Plan:", aiDietPlan)

      if (!aiDietPlan.weeklyPlan || aiDietPlan.weeklyPlan.length !== 7) {
        throw new Error("Incomplete weekly plan. AI did not return all 7 days.")
      }
      setWeeklyDietPlan(aiDietPlan)
    } catch (error) {
      console.error("Failed to generate AI diet plan:", error)
      setDietError("Failed to generate personalized diet plan. Please try again.")
    } finally {
      setIsGeneratingDiet(false)
    }
  }

  const handleDownloadPDF = async () => {
    if (!weeklyDietPlan || !workoutPlan || !macros) return
    setIsGeneratingPDF(true)
    try {
      await PDFGenerator.generateCompletePlan(profile, weeklyDietPlan.weeklyPlan[0], workoutPlan, macros)
    } catch (error) {
      console.error("PDF generation failed:", error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  const retryDietGeneration = () => {
    if (macros) {
      generateAIDietPlan(macros)
    }
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
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
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
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                onClick={onReset}
                className="bg-white/5 border-white/20 text-white hover:bg-white/10 flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </motion.div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                AI Fitness Dashboard
              </h1>
              <p className="text-gray-300 text-lg">
                Welcome back, <span className="text-white font-semibold">{profile.name}</span>!
              </p>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF || !weeklyDietPlan}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white flex items-center gap-2 px-6 py-3 rounded-full shadow-lg shadow-green-500/25"
            >
              {isGeneratingPDF ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {isGeneratingPDF ? "Generating..." : "Download PDF"}
            </Button>
          </motion.div>
        </motion.div>

        {/* Profile Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="mb-8 bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                  <User className="w-5 h-5 text-white" />
                </div>
                AI Profile Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-6 gap-4">
                {[
                  { label: "Goal", value: profile.fitnessGoal.replace("-", " "), icon: Target },
                  { label: "Experience", value: profile.experienceLevel, icon: Activity },
                  { label: "Weight", value: `${profile.weight} kg`, icon: Activity },
                  { label: "Height", value: `${profile.height} cm`, icon: Activity },
                  { label: "Diet", value: profile.dietPreference, icon: Utensils },
                  {
                    label: "Activity",
                    value: profile.physicalCondition.activityLevel.replace("-", " "),
                    icon: Zap,
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className="text-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  >
                    <item.icon className="w-6 h-6 text-cyan-400 mx-auto mb-2" />
                    <span className="font-medium text-gray-400 text-sm block">{item.label}:</span>
                    <p className="text-white font-semibold capitalize">{item.value}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Macros Display */}
        {macros && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MacroDisplay macros={macros} />
          </motion.div>
        )}

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs defaultValue="diet" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-white/5 backdrop-blur-sm border-white/10">
              <TabsTrigger
                value="diet"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors"
              >
                <Brain className="w-4 h-4 mr-2" />
                AI-Generated 7-Day Diet Plan
              </TabsTrigger>
              <TabsTrigger
                value="workout"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-emerald-600 data-[state=active]:text-white text-gray-300 hover:text-white transition-colors"
              >
                <Dumbbell className="w-4 h-4 mr-2" />
                6-Day Workout Plan
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="diet">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {isGeneratingDiet ? (
                    <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                      <CardContent className="py-16">
                        <div className="flex flex-col items-center justify-center space-y-6">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          >
                            <Brain className="w-16 h-16 text-cyan-400" />
                          </motion.div>
                          <div className="text-center">
                            <p className="text-2xl font-bold text-white mb-2">
                              AI is crafting your personalized diet plan...
                            </p>
                            <p className="text-gray-300">
                              Analyzing your profile and generating optimal nutrition recommendations
                            </p>
                          </div>
                          <div className="flex space-x-1">
                            {[0, 1, 2].map((i) => (
                              <motion.div
                                key={i}
                                className="w-2 h-2 bg-cyan-400 rounded-full"
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{
                                  duration: 1.5,
                                  repeat: Number.POSITIVE_INFINITY,
                                  delay: i * 0.2,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : dietError ? (
                    <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                      <CardContent className="py-12">
                        <div className="flex flex-col items-center justify-center space-y-4">
                          <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
                            <Brain className="w-8 h-8 text-red-400" />
                          </div>
                          <p className="text-red-400 font-medium text-lg">{dietError}</p>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                              onClick={retryDietGeneration}
                              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                            >
                              <Zap className="w-4 h-4 mr-2" />
                              Retry AI Generation
                            </Button>
                          </motion.div>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    weeklyDietPlan && <WeeklyDietPlanDisplay weeklyDietPlan={weeklyDietPlan} />
                  )}
                </motion.div>
              </TabsContent>

              <TabsContent value="workout">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {workoutPlan && <WorkoutPlanDisplay workoutPlan={workoutPlan} />}
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
