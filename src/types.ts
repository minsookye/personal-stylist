export type Gender = 'female' | 'male' | 'unisex';

export type BmiCategory = 'low' | 'normal' | 'slightlyHigh' | 'high' | 'veryHigh';

export interface UserInput {
  photoUrl: string | null;
  photoFile: File | null;
  heightCm: number;
  weightKg: number;
  gender: Gender;
}

export interface ColorSwatch {
  name: string;
  hex: string;
}

export interface StyleRecommendation {
  bmi: number;
  category: BmiCategory;
  categoryLabel: string;
  emoji: string;
  headline: string;
  keywords: string[];
  colors: ColorSwatch[];
  fitTips: string[];
  items: string[];
  avoid: string[];
  aiAdvice?: string;
}
