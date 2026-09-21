export function computeBmi(heightCm: number, weightKg: number): number {
  const h = heightCm / 100;
  if (!h || !weightKg) return 0;
  return weightKg / (h * h);
}

export type BmiCategory = "under" | "normal" | "over" | "obese";

export function bmiCategory(bmi: number): BmiCategory {
  if (bmi < 18.5) return "under";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "over";
  return "obese";
}

export const BMI_CATEGORY_LABEL: Record<BmiCategory, string> = {
  under: "Abaixo do peso",
  normal: "Normal",
  over: "Sobrepeso",
  obese: "Obesidade",
};

/** Position along the 15–35 BMI gauge scale, clamped 0–100 (%). */
export function bmiGaugePosition(bmi: number): number {
  const min = 15;
  const max = 35;
  const pct = ((bmi - min) / (max - min)) * 100;
  return Math.max(2, Math.min(98, pct));
}
