import React, { useState, useCallback } from 'react';
import { UserData, CalculationResults, BmiCategory, Gender } from './types.ts';
import { ACTIVITY_MULTIPLIERS } from './constants.ts';
import CalculatorForm from './components/CalculatorForm.tsx';
import ResultsDisplay from './components/ResultsDisplay.tsx';

function App() {
  const [results, setResults] = useState<CalculationResults | null>(null);

  const handleCalculate = useCallback((data: UserData) => {
    const weight = parseFloat(data.weight);
    const height = parseFloat(data.height);
    const age = parseFloat(data.age);

    if (isNaN(weight) || isNaN(height) || isNaN(age) || weight <= 0 || height <= 0 || age <= 0) {
      alert("Vă rugăm să introduceți valori valide pentru greutate, înălțime și vârstă.");
      return;
    }
    
    // 1. BMI Calculation
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    
    let bmiCategory: BmiCategory;
    if (bmi < 18.5) {
        bmiCategory = BmiCategory.UNDERWEIGHT;
    } else if (bmi < 25) {
        bmiCategory = BmiCategory.NORMAL;
    } else if (bmi < 30) {
        bmiCategory = BmiCategory.OVERWEIGHT;
    } else {
        bmiCategory = BmiCategory.OBESE;
    }

    // 2. BMR (Mifflin-St Jeor) Calculation
    let bmr: number;
    if (data.gender === Gender.MALE) {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // 3. TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * ACTIVITY_MULTIPLIERS[data.activityLevel];

    // 4. Macros Calculation
    const macros = {
        protein: (tdee * 0.30) / 4,
        carbs: (tdee * 0.40) / 4,
        fats: (tdee * 0.30) / 9,
    };

    setResults({
        bmi,
        bmiCategory,
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        macros: {
            protein: Math.round(macros.protein),
            carbs: Math.round(macros.carbs),
            fats: Math.round(macros.fats),
        },
    });
  }, []);

  const handleReset = useCallback(() => {
    setResults(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-800">
            Calculator Fitness & Sănătate
          </h1>
          <p className="mt-2 text-lg text-slate-600 max-w-2xl mx-auto">
            Introduceți datele pentru a calcula Indicele de Masă Corporală (IMC), Rata Metabolică Bazală (BMR) și necesarul zilnic de calorii.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <CalculatorForm onCalculate={handleCalculate} onReset={handleReset} hasResults={!!results} />
          </div>
          <div className="lg:col-span-3">
             <ResultsDisplay results={results} />
          </div>
        </main>

        <footer className="text-center mt-12 text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Health & Fitness Calculator. Toate drepturile rezervate.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
