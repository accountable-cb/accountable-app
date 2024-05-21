import { food } from "../data/food";
import { getDateFromDayNumber, getFormattedDate } from "../utils/date";

export interface User {
  id: string;
  email: string;
  name?: string;
  onboarded: boolean;
}

type Foods = keyof typeof food;

export type FoodLog = {
  id: string;
} & {
  [K in Foods]: number;
};

export const daysSinceEpoch = (log: FoodLog): number => {
  return Number(log.id);
};

export const logDate = (log: FoodLog): string => {
  return getFormattedDate(getDateFromDayNumber(daysSinceEpoch(log)));
};
