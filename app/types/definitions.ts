export interface User {
  id: string;
  email: string;
  name?: string;
  onboarded: boolean;
}

export interface FoodLog {
  id: number;
  date: string;
  beef: number;
  chicken: number;
  plant: number;
}
