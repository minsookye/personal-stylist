import type { StyleRecommendation } from '../types';

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export async function generateAiAdvice(
  recommendation: StyleRecommendation,
  heightCm: number,
  weightKg: number,
  gender: string,
  photoFile?: File | null,
): Promise<string> {
  const imageBase64 = photoFile ? await fileToBase64(photoFile) : null;

  const response = await fetch('/api/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      bmi: recommendation.bmi,
      categoryLabel: recommendation.categoryLabel,
      keywords: recommendation.keywords,
      heightCm,
      weightKg,
      gender,
      imageBase64,
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const data = await response.json() as { advice?: string; error?: string };
  if (data.error) throw new Error(data.error);
  return data.advice ?? '';
}
