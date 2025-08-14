import React from 'react';
import { CalculationResults } from '../types.ts';
import { ROMANIAN_EXPLANATIONS } from '../constants.ts';

interface ResultsDisplayProps {
  results: CalculationResults | null;
}

const ResultCard: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`bg-white p-6 rounded-xl shadow-lg border border-slate-200 ${className}`}>
        {children}
    </div>
);

const MacroBar: React.FC<{ name: string; grams: number; percentage: string; color: string }> = ({ name, grams, percentage, color }) => (
    <div>
        <div className="flex justify-between items-baseline mb-1">
            <span className="text-sm font-medium text-slate-700">{name}</span>
            <span className="text-sm text-slate-500">{grams}g</span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2.5">
            <div className={`${color} h-2.5 rounded-full`} style={{ width: percentage }}></div>
        </div>
    </div>
);

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results }) => {
  if (!results) {
    return (
      <div className="flex items-center justify-center bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 h-full text-center">
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <h3 className="mt-4 text-xl font-medium text-slate-800">Rezultatele vor apărea aici</h3>
            <p className="mt-1 text-sm text-slate-500">Completați formularul pentru a vă vedea rezultatele personalizate.</p>
        </div>
      </div>
    );
  }

  const { bmi, bmiCategory, tdee, macros } = results;
  const explanation = ROMANIAN_EXPLANATIONS[bmiCategory];

  return (
    <div className="space-y-8 animate-fade-in">
        <ResultCard>
            <h3 className="text-lg font-semibold text-slate-800 mb-1">Indicele de Masă Corporală (IMC)</h3>
            <p className="flex items-baseline gap-2">
                <span className="text-5xl font-bold text-primary">{bmi.toFixed(1)}</span>
                <span className={`text-xl font-semibold ${explanation.color}`}>{explanation.title}</span>
            </p>
            <p className="mt-4 text-sm text-slate-600 leading-relaxed">{explanation.text}</p>
        </ResultCard>
        
        <ResultCard>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Necesar Caloric Zilnic</h3>
             <p className="text-slate-600 text-sm mb-4">Acestea sunt caloriile estimate de care aveți nevoie zilnic pentru a vă menține greutatea actuală.</p>
            <p className="text-center">
                <span className="text-5xl font-bold text-primary">{tdee.toLocaleString('ro-RO')}</span>
                <span className="text-xl text-slate-600 ml-2">kcal/zi</span>
            </p>
        </ResultCard>

        <ResultCard>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Distribuția Macronutrienților</h3>
            <p className="text-slate-600 text-sm mb-6">O distribuție echilibrată recomandată (40% Carbohidrați, 30% Proteine, 30% Grăsimi) bazată pe necesarul dvs. caloric.</p>
            <div className="space-y-4">
                <MacroBar name="Carbohidrați" grams={macros.carbs} percentage="40%" color="bg-sky-500" />
                <MacroBar name="Proteine" grams={macros.protein} percentage="30%" color="bg-rose-500" />
                <MacroBar name="Grăsimi" grams={macros.fats} percentage="30%" color="bg-amber-500" />
            </div>
        </ResultCard>
    </div>
  );
};

export default ResultsDisplay;
