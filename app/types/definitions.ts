import { getDateFromDayNumber, getFormattedDate } from "../utils/date";

export interface User {
  id: string;
  email: string;
  name?: string;
  onboarded: boolean;
}

export interface FoodLog {
  id: string;
  beef: number;
  chicken: number;
  plant: number;
}

export const daysSinceEpoch = (log: FoodLog): number => {
  return Number(log.id);
};

export const logDate = (log: FoodLog): string => {
  return getFormattedDate(getDateFromDayNumber(daysSinceEpoch(log)));
};
