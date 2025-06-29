"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { MacroNutrients } from "@/types/UserProfile"
import { Target, Zap, Activity, Flame } from 'lucide-react'

interface MacroDisplayProps {
  macros: MacroNutrients
}

export const MacroDisplay = ({ macros }: MacroDisplayProps) => {
  const proteinCals = macros.protein * 4
  const carbsCals = macros.carbs * 4
  const fatsCals = macros.fats * 9

  const proteinPercent = (proteinCals / macros.calories) * 100
  const carbsPercent = (carbsCals / macros.calories) * 100
  const fatsPercent = (fatsCals / macros.calories) * 100

  const macroData = [
    {
      name: "Protein",
      value: Math.round(macros.protein),
      percent: Math.round(proteinPercent),
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/20",
      icon: Activity,
    },
    {
      name: "Carbs",
      value: Math.round(macros.carbs),
      percent: Math.round(carbsPercent),
      color: "from-yellow-500 to-orange-500",
      bgColor: "bg-yellow-500/20",
      icon: Zap,
    },
    {
      name: "Fats",
      value: Math.round(macros.fats),
      percent: Math.round(fatsPercent),
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/20",
      icon: Target,
    },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-white">
            <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500">
              <Flame className="w-5 h-5 text-white" />
            </div>
            Daily Macro Targets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-5 gap-6">
            {/* Total Calories */}
            <motion.div
              className="text-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {Math.round(macros.calories)}
              </motion.div>
              <div className="text-sm text-gray-400">Calories</div>
            </motion.div>

            {/* Macro Breakdown */}
            {macroData.map((macro, index) => (
              <motion.div
                key={macro.name}
                className="space-y-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-1 rounded ${macro.bgColor}`}>
                      <macro.icon className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-300 text-sm font-medium">{macro.name}</span>
                  </div>
                  <span className="text-white text-sm font-semibold">
                    {macro.value}g ({macro.percent}%)
                  </span>
                </div>
                <div className="relative">
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${macro.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${macro.percent}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Fiber */}
            <motion.div
              className="text-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {Math.round(macros.fiber || 0)}g
              </motion.div>
              <div className="text-sm text-gray-400">Fiber</div>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
