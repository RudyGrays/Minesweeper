import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getChance(probability: number) {
  if (probability < 0 || probability > 1) {
    throw new Error("Вероятность должна быть в диапазоне от 0 до 1");
  }

  const randomValue = Math.random();

  return randomValue <= probability;
}
