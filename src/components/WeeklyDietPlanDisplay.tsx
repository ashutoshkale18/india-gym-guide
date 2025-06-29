"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Clock, Lightbulb, Calendar, Utensils, Brain } from 'lucide-react'

interface MealItem {
  food: string
  quantity: string
  calories: number
  protein: number
  carbs: number
  fats: number
  fiber: number
  cookingInstructions?: string
}

interface Meal {
  items: MealItem[]
  totalMacros: {
    calories: number
    protein: number
    carbs: number
    fats: number
    fiber: number
  }
}

interface DayPlan {
  day: string
  breakfast: Meal
  lunch: Meal
  snack: Meal
  dinner: Meal
  dailyTotals: {
    calories: number
    protein: number
    carbs: number
    fats: number
    fiber: number
  }
}

interface WeeklyDietPlan {
  weeklyPlan: DayPlan[]
  weeklyTotals: {
    calories: number
    protein: number
    carbs: number
    fats: number
    fiber: number
  }
  nutritionTips?: string[]
  mealTiming?: {
    breakfast: string
    lunch: string
    snack: string
    dinner: string
  }
}

interface WeeklyDietPlanDisplayProps {
  weeklyDietPlan: WeeklyDietPlan
}

const MealCard = ({ meal, mealName }: { meal: Meal; mealName: string }) => {
  const mealIcons = {
    breakfast: "🌅",
    lunch: "☀️",
    snack: "🍎",
    dinner: "🌙",
  }

  return (
    <motion.div
      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300"
      whileHover={{ y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{mealIcons[mealName as keyof typeof mealIcons]}</span>
        <div className="font-semibold text-white capitalize">{mealName}</div>
      </div>
      
      <div className="flex gap-2 text-xs mb-3 flex-wrap">
        <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          {Math.round(meal.totalMacros.calories)} cal
        </Badge>
        <Badge className="bg-white/10 text-gray-300 border-white/20">
          {Math.round(meal.totalMacros.protein)}g protein
        </Badge>
      </div>
      
      <div className="space-y-3">
        {meal.items?.map((item, index) => (
          <motion.div
            key={index}
            className="border-l-2 border-gradient-to-b from-cyan-400 to-blue-500 pl-3 py-1"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="font-medium text-sm text-white">{item.food}</div>
            <div className="text-xs text-gray-400">{item.quantity}</div>
            <div className="text-xs text-gray-500 mt-1">
              {item.calories}cal • {Math.round(item.protein)}p • {Math.round(item.carbs)}c • {Math.round(item.fats)}f
            </div>
            {item.cookingInstructions && (
              <div className="text-xs text-cyan-400 italic mt-1 flex items-center gap-1">
                <Lightbulb className="w-3 h-3" />
                {item.cookingInstructions}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export const WeeklyDietPlanDisplay = ({ weeklyDietPlan }: WeeklyDietPlanDisplayProps) => {
  const [openDays, setOpenDays] = useState<{ [key: string]: boolean }>({})

  const toggleDay = (day: string) => {
    setOpenDays((prev) => ({ ...prev, [day]: !prev[day] }))
  }

  const macroColors = ["text-cyan-400", "text-green-400", "text-yellow-400", "text-purple-400", "text-orange-400"]

  return (
    <div className="space-y-6">
      {/* Weekly Totals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white">
              <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                <Brain className="w-5 h-5 text-white" />
              </div>
              Weekly Totals - AI Generated Plan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-4">
              {(["calories", "protein", "carbs", "fats", "fiber"] as const).map((key, idx) => (
                <motion.div
                  key={key}
                  className="text-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className={`text-2xl font-bold ${macroColors[idx]} mb-2`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 + idx * 0.1 }}
                  >
                    {Math.round(weeklyDietPlan.weeklyTotals[key])}
                    {key !== "calories" ? "g" : ""}
                  </motion.div>
                  <div className="text-sm text-gray-400 capitalize">{key}</div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Meal Timing */}
      {weeklyDietPlan.mealTiming && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                Recommended Meal Timing
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(weeklyDietPlan.mealTiming).map(([meal, time], index) => (
                  <motion.div
                    key={meal}
                    className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                  >
                    <span className="font-medium text-gray-300 capitalize block">{meal}:</span>
                    <p className="text-white font-semibold">{time}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Nutrition Tips */}
      {weeklyDietPlan.nutritionTips?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500">
                  <Lightbulb className="w-5 h-5 text-white" />
                </div>
                Personalized Nutrition Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {weeklyDietPlan.nutritionTips.map((tip, i) => (
                  <motion.li
                    key={i}
                    className="flex gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  >
                    <span className="text-cyan-400 font-bold text-lg">•</span>
                    <span className="text-gray-300">{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Daily Plans */}
      <div className="space-y-4">
        {weeklyDietPlan.weeklyPlan.map((dayPlan, dayIndex) => (
          <motion.div
            key={dayPlan.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + dayIndex * 0.1 }}
          >
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300">
              <Collapsible open={openDays[dayPlan.day]} onOpenChange={() => toggleDay(dayPlan.day)}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer hover:bg-white/5 transition-colors">
                    <div className="flex justify-between items-center">
                      <CardTitle className="flex items-center gap-3 text-white">
                        <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                          <Calendar className="w-5 h-5 text-white" />
                        </div>
                        {dayPlan.day}
                      </CardTitle>
                      <div className="flex items-center gap-3">
                        <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
                          {Math.round(dayPlan.dailyTotals.calories)} cal
                        </Badge>
                        <motion.div
                          animate={{ rotate: openDays[dayPlan.day] ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                        </motion.div>
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <AnimatePresence>
                  {openDays[dayPlan.day] && (
                    <CollapsibleContent>
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <CardContent>
                          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <MealCard meal={dayPlan.breakfast} mealName="breakfast" />
                            <MealCard meal={dayPlan.lunch} mealName="lunch" />
                            <MealCard meal={dayPlan.snack} mealName="snack" />
                            <MealCard meal={dayPlan.dinner} mealName="dinner" />
                          </div>
                        </CardContent>
                      </motion.div>
                    </CollapsibleContent>
                  )}
                </AnimatePresence>
              </Collapsible>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
