import { add, differenceInMilliseconds, format } from "date-fns";
import { toZonedTime } from "date-fns-tz";

const millisecondsPerDay = 1000 * 60 * 60 * 24; // Number of milliseconds in a day

export const getFormattedDate = (date: Date): string => {
  const zonedDate = toZonedTime(date, "UTC"); // Converts the date to UTC timezone
  return format(zonedDate, "yyyy-MM-dd");
};
export const getShortFormattedDate = (date: Date): string => {
  const zonedDate = toZonedTime(date, "UTC"); // Converts the date to UTC timezone
  return format(zonedDate, "dd-MM");
};

export const getDateFromDayNumber = (dayNum: number): Date => {
  const epochTimeInMs = dayNum * millisecondsPerDay;
  return new Date(epochTimeInMs);
};
export const getDaysSinceEpoch = (date: Date): number => {
  const timestamp = date.getTime(); // Get the timestamp in milliseconds
  return Math.floor(timestamp / millisecondsPerDay); // Convert to days and remove fractional days
};
export const interpolate = (start: Date, end: Date, K: number): Date[] => {
  const totalDuration = differenceInMilliseconds(end, start);

  // Calculate the step interval
  const step = totalDuration / (K + 1);

  const dates: Date[] = [];

  // Generate K interpolated dates
  for (let i = 1; i <= K; i++) {
    const interpolatedDate = new Date(start.getTime() + step * i);
    dates.push(interpolatedDate);
  }

  return dates;
};
