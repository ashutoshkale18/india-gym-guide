
import { UserProfile, DietPlan, WorkoutPlan, MacroNutrients } from '@/types/UserProfile';

export class PDFGenerator {
  static async generateCompletePlan(
    profile: UserProfile, 
    dietPlan: DietPlan, 
    workoutPlan: WorkoutPlan, 
    macros: MacroNutrients
  ): Promise<void> {
    // Create HTML content for the PDF
    const htmlContent = this.generateHTMLContent(profile, dietPlan, workoutPlan, macros);
    
    // Create a new window for printing
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      throw new Error('Unable to open print window');
    }

    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load then print
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  }

  private static generateHTMLContent(
    profile: UserProfile, 
    dietPlan: DietPlan, 
    workoutPlan: WorkoutPlan, 
    macros: MacroNutrients
  ): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <title>FitTrack - Personal Fitness Plan</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #2563eb; padding-bottom: 20px; }
        .header h1 { color: #2563eb; font-size: 2.5em; margin-bottom: 10px; }
        .profile-section { background: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 30px; }
        .section { margin-bottom: 30px; }
        .section h2 { color: #1e40af; border-bottom: 2px solid #2563eb; padding-bottom: 10px; margin-bottom: 20px; }
        .macro-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 15px; margin-bottom: 20px; }
        .macro-item { text-align: center; padding: 15px; background: #f1f5f9; border-radius: 8px; }
        .macro-item .number { font-size: 1.8em; font-weight: bold; color: #2563eb; }
        .macro-item .label { font-size: 0.9em; color: #64748b; }
        .meal-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 20px; }
        .meal-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; }
        .meal-card h3 { color: #1e40af; margin-bottom: 10px; text-transform: capitalize; }
        .meal-item { margin-bottom: 8px; padding-left: 10px; border-left: 2px solid #3b82f6; }
        .meal-item .food { font-weight: bold; }
        .meal-item .quantity { color: #64748b; font-size: 0.9em; }
        .meal-item .macros { color: #64748b; font-size: 0.8em; }
        .workout-day { background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 15px; margin-bottom: 15px; }
        .workout-day h3 { color: #1e40af; margin-bottom: 10px; }
        .exercise-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .exercise { background: #f8fafc; padding: 10px; border-radius: 6px; text-align: center; }
        .exercise .name { font-weight: bold; font-size: 0.9em; }
        .exercise .sets-reps { color: #2563eb; font-weight: bold; }
        .exercise .notes { color: #64748b; font-size: 0.8em; }
        @media print { .container { max-width: none; } }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>FitTrack</h1>
            <p>Personalized Fitness Plan for ${profile.name}</p>
            <p>Generated on ${new Date().toLocaleDateString()}</p>
        </div>

        <div class="profile-section">
            <h2>Profile Summary</h2>
            <p><strong>Name:</strong> ${profile.name}</p>
            <p><strong>Age:</strong> ${profile.age} years</p>
            <p><strong>Gender:</strong> ${profile.gender}</p>
            <p><strong>Weight:</strong> ${profile.weight} kg</p>
            <p><strong>Height:</strong> ${profile.height} cm</p>
            <p><strong>Fitness Goal:</strong> ${profile.fitnessGoal.replace('-', ' ')}</p>
            <p><strong>Experience Level:</strong> ${profile.experienceLevel}</p>
        </div>

        <div class="section">
            <h2>Daily Macro Targets</h2>
            <div class="macro-grid">
                <div class="macro-item">
                    <div class="number">${Math.round(macros.calories)}</div>
                    <div class="label">Calories</div>
                </div>
                <div class="macro-item">
                    <div class="number">${Math.round(macros.protein)}g</div>
                    <div class="label">Protein</div>
                </div>
                <div class="macro-item">
                    <div class="number">${Math.round(macros.carbs)}g</div>
                    <div class="label">Carbs</div>
                </div>
                <div class="macro-item">
                    <div class="number">${Math.round(macros.fats)}g</div>
                    <div class="label">Fats</div>
                </div>
                <div class="macro-item">
                    <div class="number">${Math.round(macros.fiber)}g</div>
                    <div class="label">Fiber</div>
                </div>
            </div>
        </div>

        <div class="section">
            <h2>Daily Meal Plan</h2>
            <div class="meal-grid">
                ${this.generateMealHTML('Breakfast', dietPlan.breakfast)}
                ${this.generateMealHTML('Lunch', dietPlan.lunch)}
                ${this.generateMealHTML('Snack', dietPlan.snack)}  
                ${this.generateMealHTML('Dinner', dietPlan.dinner)}
            </div>
        </div>

        <div class="section">
            <h2>Weekly Workout Plan (${workoutPlan.totalDays} Days/Week)</h2>
            ${workoutPlan.weeklyPlan.map(day => `
                <div class="workout-day">
                    <h3>${day.day}</h3>
                    <div class="exercise-grid">
                        ${day.exercises.map(exercise => `
                            <div class="exercise">
                                <div class="name">${exercise.name}</div>
                                <div class="sets-reps">${exercise.sets} × ${exercise.reps}</div>
                                ${exercise.notes ? `<div class="notes">${exercise.notes}</div>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="section">
            <h2>Weekly Summary</h2>
            <p><strong>Total Weekly Calories:</strong> ${Math.round(dietPlan.dailyTotals.calories * 7)}</p>
            <p><strong>Weekly Protein:</strong> ${Math.round(dietPlan.dailyTotals.protein * 7)}g</p>
            <p><strong>Workout Days:</strong> ${workoutPlan.totalDays} days per week</p>
            <p><strong>Rest Days:</strong> ${7 - workoutPlan.totalDays} days per week</p>
        </div>
    </div>
</body>
</html>`;
  }

  private static generateMealHTML(mealName: string, meal: any): string {
    return `
        <div class="meal-card">
            <h3>${mealName}</h3>
            <p style="margin-bottom: 10px; color: #64748b;"><strong>${Math.round(meal.totalMacros.calories)} cal</strong> | ${Math.round(meal.totalMacros.protein)}p ${Math.round(meal.totalMacros.carbs)}c ${Math.round(meal.totalMacros.fats)}f</p>
            ${meal.items.map((item: any) => `
                <div class="meal-item">
                    <div class="food">${item.food}</div>
                    <div class="quantity">${item.quantity}</div>
                    <div class="macros">${Math.round(item.calories)}cal • ${Math.round(item.protein)}p • ${Math.round(item.carbs)}c • ${Math.round(item.fats)}f</div>
                </div>
            `).join('')}
        </div>`;
  }
}
