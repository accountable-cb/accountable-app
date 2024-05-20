import { getDaysSinceEpoch } from "./date";

export const emptyFoodLog = (date: Date) => {
  return {
    id: getDaysSinceEpoch(date).toString(),
    beef: 0,
    chicken: 0,
    plant: 0,
  };
};
