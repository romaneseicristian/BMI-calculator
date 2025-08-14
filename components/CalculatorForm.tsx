
import React, { useState } from 'react';
import { UserData, Gender, ActivityLevel } from '../types';
import { GENDER_OPTIONS, ACTIVITY_LEVEL_OPTIONS } from '../constants';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  unit?: string;
  optional?: boolean;
}

const FormInput: React.FC<InputProps> = ({ label, id, unit, optional, ...props }) => (
  <div>
    <label htmlFor={id} className="flex justify-between items-baseline text-sm font-medium text-slate-700">
      <span>{label}</span>
      {optional && <span className="text-xs text-slate-500">Opțional</span>}
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <input
        id={id}
        {...props}
        className="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md placeholder-slate-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      />
      {unit && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-slate-500 sm:text-sm">{unit}</span>
        </div>
      )}
    </div>
  </div>
);


interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  id: string;
  options: { value: string; label: string }[];
}

const FormSelect: React.FC<SelectProps> = ({ label, id, options, ...props }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">{label}</label>
        <select
            id={id}
            {...props}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md"
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
);


interface CalculatorFormProps {
  onCalculate: (data: UserData) => void;
  onReset: () => void;
  hasResults: boolean;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({ onCalculate, onReset, hasResults }) => {
  const [formData, setFormData] = useState<UserData>({
    weight: '',
    height: '',
    age: '',
    gender: Gender.MALE,
    activityLevel: ActivityLevel.SEDENTARY,
    desiredWeight: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCalculate(formData);
  };
  
  const handleResetClick = () => {
      setFormData({
        weight: '',
        height: '',
        age: '',
        gender: Gender.MALE,
        activityLevel: ActivityLevel.SEDENTARY,
        desiredWeight: '',
      });
      onReset();
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 h-full">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Introduceți Datele Dvs.</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <FormInput label="Greutate" id="weight" name="weight" type="number" value={formData.weight} onChange={handleChange} required unit="kg" placeholder="70" />
            <FormInput label="Înălțime" id="height" name="height" type="number" value={formData.height} onChange={handleChange} required unit="cm" placeholder="175" />
        </div>
        
        <FormInput label="Vârstă" id="age" name="age" type="number" value={formData.age} onChange={handleChange} required placeholder="30" />
        
        <FormSelect label="Gen" id="gender" name="gender" value={formData.gender} onChange={handleChange} options={GENDER_OPTIONS} />

        <FormSelect label="Nivel de Activitate" id="activityLevel" name="activityLevel" value={formData.activityLevel} onChange={handleChange} options={ACTIVITY_LEVEL_OPTIONS} />

        <FormInput label="Greutate Dorită" id="desiredWeight" name="desiredWeight" type="number" value={formData.desiredWeight} onChange={handleChange} unit="kg" placeholder="68" optional />

        <div className="pt-2 flex flex-col sm:flex-row gap-4">
          <button type="submit" className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
            {hasResults ? 'Recalculează' : 'Calculează'}
          </button>
           {hasResults && (
             <button type="button" onClick={handleResetClick} className="w-full inline-flex justify-center py-3 px-4 border border-slate-300 shadow-sm text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                Resetează
            </button>
           )}
        </div>
      </form>
    </div>
  );
};

export default CalculatorForm;
