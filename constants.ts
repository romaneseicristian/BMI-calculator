
import { ActivityLevel, BmiCategory, Gender } from './types';

export const ACTIVITY_MULTIPLIERS: { [key in ActivityLevel]: number } = {
  [ActivityLevel.SEDENTARY]: 1.2,
  [ActivityLevel.LIGHTLY_ACTIVE]: 1.375,
  [ActivityLevel.MODERATELY_ACTIVE]: 1.55,
  [ActivityLevel.VERY_ACTIVE]: 1.725,
};

export const GENDER_OPTIONS = [
  { value: Gender.MALE, label: 'Masculin' },
  { value: Gender.FEMALE, label: 'Feminin' },
];

export const ACTIVITY_LEVEL_OPTIONS = [
  { value: ActivityLevel.SEDENTARY, label: 'Sedentar (puțin sau deloc exercițiu)' },
  { value: ActivityLevel.LIGHTLY_ACTIVE, label: 'Ușor Activ (exerciții ușoare 1-3 zile/săptămână)' },
  { value: ActivityLevel.MODERATELY_ACTIVE, label: 'Moderat Activ (exerciții moderate 3-5 zile/săptămână)' },
  { value: ActivityLevel.VERY_ACTIVE, label: 'Foarte Activ (exerciții intense 6-7 zile/săptămână)' },
];

export const ROMANIAN_EXPLANATIONS: { [key in BmiCategory]: { title: string, text: string, color: string } } = {
  [BmiCategory.UNDERWEIGHT]: {
    title: "Subponderal",
    text: "Un IMC sub 18.5 indică faptul că sunteți subponderal. Acest lucru poate fi un semn că nu mâncați suficient sau poate indica o afecțiune medicală. Este recomandat să discutați cu un medic sau un dietetician pentru a stabili un plan de creștere în greutate sănătos.",
    color: "text-blue-600"
  },
  [BmiCategory.NORMAL]: {
    title: "Greutate Normală",
    text: "Felicitări! IMC-ul dumneavoastră se încadrează în intervalul de greutate normală și sănătoasă. Menținerea unei greutăți sănătoase reduce riscul de a dezvolta probleme grave de sănătate. Continuați cu o dietă echilibrată și activitate fizică regulată.",
    color: "text-green-600"
  },
  [BmiCategory.OVERWEIGHT]: {
    title: "Supraponderal",
    text: "Un IMC între 25 și 29.9 indică faptul că sunteți supraponderal. Acest lucru poate crește riscul de a dezvolta anumite boli, cum ar fi diabetul de tip 2, bolile de inimă și hipertensiunea arterială. Luați în considerare adoptarea unui stil de viață mai sănătos.",
    color: "text-yellow-600"
  },
  [BmiCategory.OBESE]: {
    title: "Obezitate",
    text: "Un IMC de 30 sau mai mare indică obezitate. Obezitatea este asociată cu un risc semnificativ mai mare de probleme grave de sănătate. Este foarte important să consultați un medic pentru a discuta despre opțiunile de management al greutăți.",
    color: "text-red-600"
  }
};
