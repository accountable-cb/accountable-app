import { format } from "date-fns";

const millisecondsPerDay = 1000 * 60 * 60 * 24; // Number of milliseconds in a day

export const getFormattedDate = (date: Date) => {
  return format(date, "yyyy-MM-dd");
};
export const getDateFromDayNumber = (dayNum: number) => {
  const epochTimeInMs = dayNum * millisecondsPerDay;
  return new Date(epochTimeInMs);
};
export const getDaysSinceEpoch = (date: Date) => {
  const timestamp = date.getTime(); // Get the timestamp in milliseconds
  return Math.floor(timestamp / millisecondsPerDay); // Convert to days and remove fractional days
};
