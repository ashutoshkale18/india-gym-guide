
import { UserProfile, WorkoutPlan, WorkoutDay } from '@/types/UserProfile';

export class WorkoutPlanGenerator {
  private static exercises = {
    beginner: {
      'fat-loss': [
        {
          day: 'Monday',
          exercises: [
            { name: 'Treadmill Walk', sets: 1, reps: '20 min', notes: 'Moderate pace' },
            { name: 'Bodyweight Squats', sets: 3, reps: '12-15' },
            { name: 'Push-ups (Modified)', sets: 3, reps: '8-12' },
            { name: 'Plank', sets: 3, reps: '20-30 sec' },
            { name: 'Dumbbell Row', sets: 3, reps: '10-12' }
          ]
        },
        {
          day: 'Wednesday',
          exercises: [
            { name: 'Stationary Bike', sets: 1, reps: '20 min', notes: 'Moderate intensity' },
            { name: 'Goblet Squats', sets: 3, reps: '10-12' },
            { name: 'Chest Press Machine', sets: 3, reps: '10-12' },
            { name: 'Lat Pulldown', sets: 3, reps: '10-12' },
            { name: 'Leg Press', sets: 3, reps: '12-15' }
          ]
        },
        {
          day: 'Friday',
          exercises: [
            { name: 'Elliptical', sets: 1, reps: '25 min', notes: 'Steady pace' },
            { name: 'Dumbbell Lunges', sets: 3, reps: '8-10 each leg' },
            { name: 'Shoulder Press Machine', sets: 3, reps: '10-12' },
            { name: 'Seated Cable Row', sets: 3, reps: '10-12' },
            { name: 'Calf Raises', sets: 3, reps: '15-20' }
          ]
        }
      ],
      'bulking': [
        {
          day: 'Monday',
          exercises: [
            { name: 'Squat (Goblet)', sets: 4, reps: '8-10' },
            { name: 'Bench Press (Dumbbell)', sets: 4, reps: '8-10' },
            { name: 'Bent Over Row', sets: 4, reps: '8-10' },
            { name: 'Overhead Press', sets: 3, reps: '8-10' },
            { name: 'Bicep Curls', sets: 3, reps: '10-12' }
          ]
        },
        {
          day: 'Wednesday',
          exercises: [
            { name: 'Romanian Deadlift', sets: 4, reps: '8-10' },
            { name: 'Incline Dumbbell Press', sets: 4, reps: '8-10' },
            { name: 'Lat Pulldown', sets: 4, reps: '8-10' },
            { name: 'Leg Press', sets: 4, reps: '10-12' },
            { name: 'Tricep Dips', sets: 3, reps: '8-12' }
          ]
        },
        {
          day: 'Friday',
          exercises: [
            { name: 'Dumbbell Squats', sets: 4, reps: '10-12' },
            { name: 'Push-ups', sets: 4, reps: '10-15' },
            { name: 'Single Arm Row', sets: 4, reps: '8-10 each' },
            { name: 'Lunges', sets: 3, reps: '10-12 each' },
            { name: 'Plank', sets: 3, reps: '30-45 sec' }
          ]
        }
      ],
      'recomposition': [
        {
          day: 'Monday',
          exercises: [
            { name: 'Squat', sets: 4, reps: '8-12' },
            { name: 'Push-ups', sets: 3, reps: '8-12' },
            { name: 'Dumbbell Row', sets: 4, reps: '8-12' },
            { name: 'Plank', sets: 3, reps: '30 sec' },
            { name: 'Treadmill', sets: 1, reps: '15 min', notes: 'Cool down' }
          ]
        },
        {
          day: 'Wednesday',
          exercises: [
            { name: 'Deadlift (Light)', sets: 4, reps: '8-10' },
            { name: 'Chest Press', sets: 4, reps: '8-12' },
            { name: 'Lat Pulldown', sets: 4, reps: '8-12' },
            { name: 'Leg Curls', sets: 3, reps: '10-12' },
            { name: 'Bike', sets: 1, reps: '15 min', notes: 'Moderate pace' }
          ]
        },
        {
          day: 'Friday',
          exercises: [
            { name: 'Goblet Squats', sets: 4, reps: '10-12' },
            { name: 'Dumbbell Press', sets: 4, reps: '8-12' },
            { name: 'Cable Row', sets: 4, reps: '8-12' },
            { name: 'Mountain Climbers', sets: 3, reps: '20-30' },
            { name: 'Elliptical', sets: 1, reps: '20 min' }
          ]
        }
      ]
    },
    intermediate: {
      'fat-loss': [
        {
          day: 'Monday',
          exercises: [
            { name: 'HIIT Treadmill', sets: 6, reps: '1 min on/1 min off' },
            { name: 'Barbell Squats', sets: 4, reps: '12-15' },
            { name: 'Push-ups', sets: 4, reps: '15-20' },
            { name: 'Burpees', sets: 3, reps: '8-12' },
            { name: 'Plank', sets: 3, reps: '45-60 sec' }
          ]
        },
        {
          day: 'Tuesday',
          exercises: [
            { name: 'Rowing Machine', sets: 1, reps: '20 min', notes: 'Intervals' },
            { name: 'Deadlifts', sets: 4, reps: '10-12' },
            { name: 'Pull-ups/Assisted', sets: 4, reps: '8-12' },
            { name: 'Dumbbell Thrusters', sets: 3, reps: '10-12' },
            { name: 'Russian Twists', sets: 3, reps: '20-30' }
          ]
        },
        {
          day: 'Thursday',
          exercises: [
            { name: 'Battle Ropes', sets: 4, reps: '30 sec' },
            { name: 'Lunges', sets: 4, reps: '12-15 each' },
            { name: 'Bench Press', sets: 4, reps: '12-15' },
            { name: 'Lat Pulldown', sets: 4, reps: '12-15' },
            { name: 'Kettlebell Swings', sets: 3, reps: '15-20' }
          ]
        },
        {
          day: 'Saturday',
          exercises: [
            { name: 'Spin Class/Bike', sets: 1, reps: '45 min' },
            { name: 'Jump Squats', sets: 4, reps: '12-15' },
            { name: 'Medicine Ball Slams', sets: 3, reps: '10-15' },
            { name: 'Box Step-ups', sets: 3, reps: '10-12 each' },
            { name: 'Plank Variations', sets: 3, reps: '30-45 sec each' }
          ]
        }
      ],
      'bulking': [
        {
          day: 'Monday',
          exercises: [
            { name: 'Barbell Squats', sets: 5, reps: '6-8' },
            { name: 'Bench Press', sets: 5, reps: '6-8' },
            { name: 'Barbell Rows', sets: 4, reps: '8-10' },
            { name: 'Overhead Press', sets: 4, reps: '8-10' },
            { name: 'Barbell Curls', sets: 3, reps: '10-12' }
          ]
        },
        {
          day: 'Tuesday',
          exercises: [
            { name: 'Deadlifts', sets: 5, reps: '5-6' },
            { name: 'Incline Dumbbell Press', sets: 4, reps: '8-10' },
            { name: 'T-Bar Rows', sets: 4, reps: '8-10' },
            { name: 'Leg Press', sets: 4, reps: '10-12' },
            { name: 'Close Grip Bench', sets: 3, reps: '8-10' }
          ]
        },
        {
          day: 'Thursday',
          exercises: [
            { name: 'Front Squats', sets: 4, reps: '8-10' },
            { name: 'Dumbbell Press', sets: 4, reps: '8-10' },
            { name: 'Cable Rows', sets: 4, reps: '10-12' },
            { name: 'Romanian Deadlifts', sets: 4, reps: '8-10' },
            { name: 'Hammer Curls', sets: 3, reps: '10-12' }
          ]
        },
        {
          day: 'Friday',
          exercises: [
            { name: 'Leg Curls', sets: 4, reps: '10-12' },
            { name: 'Leg Extensions', sets: 4, reps: '12-15' },
            { name: 'Calf Raises', sets: 4, reps: '15-20' },
            { name: 'Lateral Raises', sets: 4, reps: '12-15' },
            { name: 'Tricep Extensions', sets: 3, reps: '10-12' }
          ]
        }
      ],
      'recomposition': [
        {
          day: 'Monday',
          exercises: [
            { name: 'Squats', sets: 4, reps: '8-10' },
            { name: 'Bench Press', sets: 4, reps: '8-10' },
            { name: 'Barbell Rows', sets: 4, reps: '8-10' },
            { name: 'HIIT Cardio', sets: 6, reps: '30s on/30s off' },
            { name: 'Plank', sets: 3, reps: '45 sec' }
          ]
        },
        {
          day: 'Wednesday',
          exercises: [
            { name: 'Deadlifts', sets: 4, reps: '6-8' },
            { name: 'Incline Press', sets: 4, reps: '8-10' },
            { name: 'Pull-ups', sets: 4, reps: '6-10' },
            { name: 'Leg Press', sets: 4, reps: '10-12' },
            { name: 'Rowing Machine', sets: 1, reps: '15 min' }
          ]
        },
        {
          day: 'Friday',
          exercises: [
            { name: 'Bulgarian Split Squats', sets: 3, reps: '10-12 each' },
            { name: 'Dumbbell Press', sets: 4, reps: '8-12' },
            { name: 'Cable Rows', sets: 4, reps: '10-12' },
            { name: 'Kettlebell Swings', sets: 3, reps: '15-20' },
            { name: 'Bike Intervals', sets: 8, reps: '1 min on/1 min off' }
          ]
        }
      ]
    },
    advanced: {
      'fat-loss': [
        {
          day: 'Monday',
          exercises: [
            { name: 'Barbell Squats', sets: 5, reps: '15-20' },
            { name: 'Deadlifts', sets: 4, reps: '12-15' },
            { name: 'Superset: Push-ups + Burpees', sets: 4, reps: '15+10' },
            { name: 'Battle Ropes', sets: 5, reps: '45 sec' },
            { name: 'HIIT Sprints', sets: 8, reps: '30s on/30s off' }
          ]
        },
        {
          day: 'Tuesday',
          exercises: [
            { name: 'Pull-ups', sets: 5, reps: '8-12' },
            { name: 'Bench Press', sets: 5, reps: '12-15' },
            { name: 'T-Bar Rows', sets: 4, reps: '12-15' },
            { name: 'Thrusters', sets: 4, reps: '12-15' },
            { name: 'Rowing Machine', sets: 1, reps: '30 min intervals' }
          ]
        },
        {
          day: 'Thursday',
          exercises: [
            { name: 'Front Squats', sets: 5, reps: '12-15' },
            { name: 'Incline Bench', sets: 4, reps: '12-15' },
            { name: 'Weighted Pull-ups', sets: 4, reps: '8-10' },
            { name: 'Box Jumps', sets: 4, reps: '10-12' },
            { name: 'Assault Bike', sets: 6, reps: '1 min all-out' }
          ]
        },
        {
          day: 'Friday',
          exercises: [
            { name: 'Romanian Deadlifts', sets: 4, reps: '12-15' },
            { name: 'Overhead Press', sets: 4, reps: '10-12' },
            { name: 'Weighted Dips', sets: 4, reps: '10-12' },
            { name: 'Farmer Walks', sets: 3, reps: '40m' },
            { name: 'Circuit Training', sets: 1, reps: '20 min' }
          ]
        },
        {
          day: 'Saturday',
          exercises: [
            { name: 'Olympic Lifts Practice', sets: 5, reps: '3-5' },
            { name: 'Plyometric Jumps', sets: 4, reps: '8-10' },
            { name: 'Kettlebell Complex', sets: 4, reps: '45 sec' },
            { name: 'Sled Push/Pull', sets: 4, reps: '20m each' },
            { name: 'Long Distance Run', sets: 1, reps: '45-60 min' }
          ]
        }
      ],
      'bulking': [
        {
          day: 'Monday',
          exercises: [
            { name: 'Barbell Squats', sets: 6, reps: '4-6' },
            { name: 'Bench Press', sets: 6, reps: '4-6' },
            { name: 'Barbell Rows', sets: 5, reps: '6-8' },
            { name: 'Overhead Press', sets: 4, reps: '6-8' },
            { name: 'Weighted Dips', sets: 3, reps: '8-10' }
          ]
        },
        {
          day: 'Tuesday',
          exercises: [
            { name: 'Deadlifts', sets: 6, reps: '3-5' },
            { name: 'Incline Barbell Press', sets: 5, reps: '6-8' },
            { name: 'T-Bar Rows', sets: 5, reps: '6-8' },
            { name: 'Leg Press', sets: 4, reps: '8-10' },
            { name: 'Close Grip Bench', sets: 4, reps: '6-8' }
          ]
        },
        {
          day: 'Wednesday',
          exercises: [
            { name: 'Front Squats', sets: 5, reps: '6-8' },
            { name: 'Dumbbell Press', sets: 4, reps: '8-10' },
            { name: 'Weighted Pull-ups', sets: 5, reps: '6-8' },
            { name: 'Romanian Deadlifts', sets: 4, reps: '8-10' },
            { name: 'Barbell Curls', sets: 4, reps: '8-10' }
          ]
        },
        {
          day: 'Friday',
          exercises: [
            { name: 'Bulgarian Split Squats', sets: 4, reps: '8-10 each' },
            { name: 'Incline Dumbbell Press', sets: 4, reps: '8-10' },
            { name: 'Cable Rows', sets: 4, reps: '10-12' },
            { name: 'Walking Lunges', sets: 3, reps: '12-15 each' },
            { name: 'Hammer Curls', sets: 4, reps: '10-12' }
          ]
        },
        {
          day: 'Saturday',
          exercises: [
            { name: 'Leg Curls', sets: 4, reps: '10-12' },
            { name: 'Leg Extensions', sets: 4, reps: '12-15' },
            { name: 'Calf Raises', sets: 5, reps: '15-20' },
            { name: 'Lateral Raises', sets: 4, reps: '12-15' },
            { name: 'Tricep Extensions', sets: 4, reps: '10-12' }
          ]
        }
      ],
      'recomposition': [
        {
          day: 'Monday',
          exercises: [
            { name: 'Squats', sets: 5, reps: '6-8' },
            { name: 'Bench Press', sets: 5, reps: '6-8' },
            { name: 'Barbell Rows', sets: 4, reps: '8-10' },
            { name: 'Superset: Burpees + Mountain Climbers', sets: 3, reps: '10+20' },
            { name: 'HIIT Bike', sets: 8, reps: '45s on/15s off' }
          ]
        },
        {
          day: 'Tuesday',
          exercises: [
            { name: 'Deadlifts', sets: 5, reps: '5-6' },
            { name: 'Incline Press', sets: 4, reps: '8-10' },
            { name: 'Pull-ups', sets: 4, reps: '8-12' },
            { name: 'Leg Press', sets: 4, reps: '10-12' },
            { name: 'Rowing Intervals', sets: 10, reps: '1 min on/30s off' }
          ]
        },
        {
          day: 'Thursday',
          exercises: [
            { name: 'Front Squats', sets: 4, reps: '8-10' },
            { name: 'Dumbbell Press', sets: 4, reps: '8-10' },
            { name: 'Cable Rows', sets: 4, reps: '10-12' },
            { name: 'Kettlebell Swings', sets: 4, reps: '20-25' },
            { name: 'Battle Ropes', sets: 5, reps: '30 sec' }
          ]
        },
        {
          day: 'Friday',
          exercises: [
            { name: 'Romanian Deadlifts', sets: 4, reps: '8-10' },
            { name: 'Overhead Press', sets: 4, reps: '8-10' },
            { name: 'Weighted Dips', sets: 4, reps: '8-12' },
            { name: 'Box Jumps', sets: 4, reps: '8-10' },
            { name: 'Assault Bike', sets: 1, reps: '20 min steady' }
          ]
        },
        {
          day: 'Saturday',
          exercises: [
            { name: 'Circuit Training', sets: 1, reps: '45 min' },
            { name: 'Functional Movements', sets: 4, reps: '10-12 each' },
            { name: 'Plyometric Training', sets: 4, reps: '8-10' },
            { name: 'Core Complex', sets: 3, reps: '45 sec each' },
            { name: 'Long Cardio', sets: 1, reps: '30-45 min' }
          ]
        }
      ]
    }
  };

  static generatePlan(profile: UserProfile): WorkoutPlan {
    const planKey = `${profile.experienceLevel}` as keyof typeof this.exercises;
    const goalKey = profile.fitnessGoal as keyof typeof this.exercises[typeof planKey];
    
    const selectedPlan = this.exercises[planKey][goalKey];
    
    return {
      weeklyPlan: selectedPlan,
      totalDays: selectedPlan.length
    };
  }
}
