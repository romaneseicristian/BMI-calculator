
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export enum ActivityLevel {
  SEDENTARY = 'sedentary',
  LIGHTLY_ACTIVE = 'lightly_active',
  MODERATELY_ACTIVE = 'moderately_active',
  VERY_ACTIVE = 'very_active',
}

export enum BmiCategory {
    UNDERWEIGHT = 'underweight',
    NORMAL = 'normal',
    OVERWEIGHT = 'overweight',
    OBESE = 'obese',
}

export interface UserData {
  weight: string;
  height: string;
  age: string;
  gender: Gender;
  activityLevel: ActivityLevel;
  desiredWeight: string;
}

export interface CalculationResults {
  bmi: number;
  bmiCategory: BmiCategory;
  bmr: number;
  tdee: number;
  macros: {
    protein: number;
    carbs: number;
    fats: number;
  };
}
