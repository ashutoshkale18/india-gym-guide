"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import type { UserProfile } from "@/types/UserProfile"
import { User, Target, Activity, Zap, Heart } from "lucide-react"

interface UserProfileFormProps {
  onSubmit: (profile: UserProfile) => void
}

export const UserProfileForm = ({ onSubmit }: UserProfileFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
    fitnessGoal: "",
    experienceLevel: "",
    dietPreference: "",
    activityLevel: "",
    medicalConditions: "",
    foodAllergies: "",
    supplements: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const profile: UserProfile = {
      name: formData.name,
      age: Number.parseInt(formData.age),
      gender: formData.gender as "male" | "female",
      weight: Number.parseFloat(formData.weight),
      height: Number.parseFloat(formData.height),
      fitnessGoal: formData.fitnessGoal as "fat-loss" | "bulking" | "recomposition",
      experienceLevel: formData.experienceLevel as "beginner" | "intermediate" | "advanced",
      dietPreference: formData.dietPreference as "vegetarian" | "non-vegetarian",
      physicalCondition: {
        activityLevel: formData.activityLevel as
          | "sedentary"
          | "lightly-active"
          | "moderately-active"
          | "very-active"
          | "extremely-active",
        medicalConditions: formData.medicalConditions,
        foodAllergies: formData.foodAllergies,
        supplements: formData.supplements,
      },
    }

    onSubmit(profile)
  }

  const isFormValid =
    formData.name &&
    formData.age &&
    formData.gender &&
    formData.weight &&
    formData.height &&
    formData.fitnessGoal &&
    formData.experienceLevel &&
    formData.dietPreference &&
    formData.activityLevel

  const formSections = [
    {
      title: "Personal Information",
      icon: User,
      color: "from-blue-500 to-cyan-500",
      fields: [
        { name: "name", label: "Full Name", type: "text", placeholder: "Enter your full name", required: true },
        { name: "age", label: "Age", type: "number", placeholder: "Your age", min: "13", max: "80", required: true },
        {
          name: "gender",
          label: "Gender",
          type: "select",
          options: [
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ],
          required: true,
        },
      ],
    },
    {
      title: "Physical Metrics",
      icon: Activity,
      color: "from-green-500 to-emerald-500",
      fields: [
        {
          name: "weight",
          label: "Weight (kg)",
          type: "number",
          placeholder: "Enter weight in kg",
          min: "30",
          max: "200",
          step: "0.1",
          required: true,
        },
        {
          name: "height",
          label: "Height (cm)",
          type: "number",
          placeholder: "Enter height in cm",
          min: "120",
          max: "220",
          required: true,
        },
        {
          name: "activityLevel",
          label: "Activity Level",
          type: "select",
          options: [
            { value: "sedentary", label: "Sedentary (Little/no exercise)" },
            { value: "lightly-active", label: "Lightly Active (Light exercise 1-3 days/week)" },
            { value: "moderately-active", label: "Moderately Active (Moderate exercise 3-5 days/week)" },
            { value: "very-active", label: "Very Active (Hard exercise 6-7 days/week)" },
            { value: "extremely-active", label: "Extremely Active (Very hard exercise, physical job)" },
          ],
          required: true,
        },
      ],
    },
    {
      title: "Fitness Goals",
      icon: Target,
      color: "from-purple-500 to-pink-500",
      fields: [
        {
          name: "fitnessGoal",
          label: "Primary Goal",
          type: "select",
          options: [
            { value: "fat-loss", label: "Fat Loss" },
            { value: "bulking", label: "Bulking" },
            { value: "recomposition", label: "Muscle Recomposition" },
          ],
          required: true,
        },
        {
          name: "experienceLevel",
          label: "Experience Level",
          type: "select",
          options: [
            { value: "beginner", label: "Beginner (0-6 months)" },
            { value: "intermediate", label: "Intermediate (6 months - 2 years)" },
            { value: "advanced", label: "Advanced (2+ years)" },
          ],
          required: true,
        },
        {
          name: "dietPreference",
          label: "Diet Preference",
          type: "select",
          options: [
            { value: "vegetarian", label: "Vegetarian" },
            { value: "non-vegetarian", label: "Non-Vegetarian" },
          ],
          required: true,
        },
      ],
    },
    {
      title: "Health & Wellness",
      icon: Heart,
      color: "from-red-500 to-orange-500",
      fields: [
        {
          name: "medicalConditions",
          label: "Medical Conditions",
          type: "textarea",
          placeholder: "List any medical conditions (diabetes, hypertension, etc.) or write 'None'",
          rows: 3,
        },
        {
          name: "foodAllergies",
          label: "Food Allergies",
          type: "textarea",
          placeholder: "List any food allergies or intolerances or write 'None'",
          rows: 2,
        },
        {
          name: "supplements",
          label: "Current Supplements",
          type: "textarea",
          placeholder: "List current supplements (protein powder, vitamins, etc.) or write 'None'",
          rows: 2,
        },
      ],
    },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {formSections.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: sectionIndex * 0.2 }}
        >
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
            <CardContent className="p-6">
              <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: sectionIndex * 0.2 + 0.1 }}
              >
                <div className={`p-2 rounded-lg bg-gradient-to-r ${section.color}`}>
                  <section.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white">{section.title}</h3>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-6">
                {section.fields.map((field, fieldIndex) => (
                  <motion.div
                    key={field.name}
                    className={`space-y-2 ${field.type === "textarea" ? "md:col-span-2" : ""}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: sectionIndex * 0.2 + fieldIndex * 0.1 }}
                  >
                    <Label htmlFor={field.name} className="text-gray-300 font-medium">
                      {field.label}
                    </Label>
                    {field.type === "select" ? (
                      <Select
                        value={formData[field.name as keyof typeof formData]}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, [field.name]: value }))}
                      >
                        <SelectTrigger className="bg-white/5 border-white/20 text-white hover:bg-white/10 focus:bg-white/10 transition-colors">
                          <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-white/20">
                          {field.options?.map((option) => (
                            <SelectItem
                              key={option.value}
                              value={option.value}
                              className="text-white hover:bg-white/10"
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : field.type === "textarea" ? (
                      <Textarea
                        id={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={(e) => setFormData((prev) => ({ ...prev, [field.name]: e.target.value }))}
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 hover:bg-white/10 focus:bg-white/10 transition-colors resize-none"
                        rows={field.rows}
                      />
                    ) : (
                      <Input
                        id={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={(e) => setFormData((prev) => ({ ...prev, [field.name]: e.target.value }))}
                        className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 hover:bg-white/10 focus:bg-white/10 transition-colors"
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        required={field.required}
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}

      <motion.div
        className="flex justify-center pt-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            type="submit"
            size="lg"
            disabled={!isFormValid}
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 text-white px-12 py-6 text-lg font-semibold rounded-full shadow-2xl shadow-blue-500/25 border-0 relative overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <span className="relative z-10 flex items-center gap-3">
              <Zap className="w-5 h-5" />
              Generate AI Fitness Plan
            </span>
          </Button>
        </motion.div>
      </motion.div>
    </form>
  )
}
