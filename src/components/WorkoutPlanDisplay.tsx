"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { WorkoutPlan } from "@/types/UserProfile"
import { Calendar, Dumbbell, Target, Clock, Zap } from "lucide-react"

interface WorkoutPlanDisplayProps {
  workoutPlan: WorkoutPlan
}

export const WorkoutPlanDisplay = ({ workoutPlan }: WorkoutPlanDisplayProps) => {
  const muscleGroupColors = [
    "bg-gradient-to-r from-red-500 to-pink-500",
    "bg-gradient-to-r from-blue-500 to-cyan-500",
    "bg-gradient-to-r from-green-500 to-emerald-500",
    "bg-gradient-to-r from-purple-500 to-violet-500",
    "bg-gradient-to-r from-yellow-500 to-orange-500",
    "bg-gradient-to-r from-indigo-500 to-purple-500",
  ]

  return (
    <div className="space-y-6">
      {/* Weekly Overview */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-white">
              <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              Weekly Training Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6 flex-wrap">
              <motion.div
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 text-lg px-4 py-2">
                  {workoutPlan.totalDays || workoutPlan.weeklyPlan.length} Days/Week
                </Badge>
              </motion.div>
              <motion.div
                className="text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  6-Day Split Program
                </span>
              </motion.div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Workout Days */}
      <div className="grid gap-6">
        {workoutPlan.weeklyPlan.map((day, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
          >
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-3 text-white">
                    <div className={`p-2 rounded-lg ${muscleGroupColors[index % muscleGroupColors.length]}`}>
                      <Dumbbell className="w-5 h-5 text-white" />
                    </div>
                    {day.day}
                  </CardTitle>
                  <div className="flex gap-2 flex-wrap">
                    {day.muscleGroups?.map((muscle, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 + idx * 0.1 }}
                      >
                        <Badge className="bg-white/10 text-gray-300 border-white/20 hover:bg-white/20 transition-colors">
                          {muscle}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {day.exercises.map((exercise, exerciseIndex) => (
                    <motion.div
                      key={exerciseIndex}
                      className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-all duration-300 group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + exerciseIndex * 0.05 }}
                      whileHover={{ y: -2, scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="font-semibold text-white text-sm group-hover:text-cyan-400 transition-colors">
                          {exercise.name}
                        </div>
                        <Target className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge className="bg-gradient-to-r from-green-600 to-emerald-600 text-white border-0 text-xs">
                            {exercise.sets} sets × {exercise.reps}
                          </Badge>
                        </div>

                        {exercise.restTime && (
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Clock className="w-3 h-3" />
                            Rest: {exercise.restTime}
                          </div>
                        )}

                        {exercise.notes && (
                          <div className="text-xs text-cyan-400 bg-cyan-400/10 rounded p-2 mt-2">
                            💡 {exercise.notes}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Rest Days Info */}
      {workoutPlan.restDays && workoutPlan.restDays.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                Rest Days
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                {workoutPlan.restDays.map((day, index) => (
                  <Badge key={index} className="bg-gradient-to-r from-gray-600 to-gray-700 text-white border-0">
                    {day}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Training Notes */}
      {workoutPlan.notes && workoutPlan.notes.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Card className="bg-white/5 backdrop-blur-xl border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500">
                  <Target className="w-5 h-5 text-white" />
                </div>
                Training Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {workoutPlan.notes.map((note, i) => (
                  <motion.li
                    key={i}
                    className="flex gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  >
                    <span className="text-cyan-400 font-bold text-lg">•</span>
                    <span className="text-gray-300">{note}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}
