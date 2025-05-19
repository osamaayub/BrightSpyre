
import { differenceInDays } from "date-fns";
import he from "he";
import striptags from "striptags";




export function cleanDescription(html: string) {
    return he.decode(striptags(html));
  }

// Function to parse "DD/MM/YYYY" format into a Date object
export const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split("/").map(Number);
  return new Date(year, month - 1, day); // Months are zero-based in JS
};

// Function to estimate equity based on salary
export const estimateEquity = (salary: number): string => {
  if (salary > 90000) return "0.1% – 0.3%";
  if (salary > 75000) return "0.3% – 0.5%";
  if (salary > 50000) return "0.5% – 1%";
  return "1% – 2%"; // Lower salary typically offers more equity
};

// Function to calculate "Posted X days ago"
export const getPostedDaysAgo = (endDate: string): string => {
  const daysAgo = differenceInDays(new Date(), parseDate(endDate));
  return `Posted ${daysAgo} days ago`;
};