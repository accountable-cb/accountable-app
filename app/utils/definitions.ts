import { food } from "../data/food";
import { FoodLog } from "../types/definitions";
import { getDaysSinceEpoch } from "./date";

export const emptyFoodLog = (date: Date = new Date()): FoodLog => {
  const entries = Object.keys(food);
  const log: Partial<FoodLog> = {
    id: getDaysSinceEpoch(date).toString(),
  }; // Use Partial<FoodLog> to initially allow an incomplete type

  for (const key of entries) {
    log[key] = 0;
  }

  return log as FoodLog;
};
