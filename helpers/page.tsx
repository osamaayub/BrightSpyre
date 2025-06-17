import { differenceInDays, isValid, parseISO } from "date-fns";
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

export const getPostedDaysAgo = (start_date: string): string => {
  // Ensure input is a non-empty string
  if (!start_date || typeof start_date !== "string") {
    return "Invalid Date";
  }

  const parsedDate = parseISO(start_date);

  // Proper validation of the parsed date
  if (!isValid(parsedDate)) {
    return "Invalid Date";
  }

  const daysAgo = differenceInDays(new Date(), parsedDate);

  return `Posted ${daysAgo} days ago`;
};

//for sorting the jobs based on the start date
export const getPostedDaysAgoNumber = (start_date: string): number => {
  return differenceInDays(new Date(), new Date(start_date));
};

// Limit displayed cities to maximum 3 and removed extra separators
const maxCitiesToShow = 3;
export const formatCities = (cityString: string): string => {
  const cityList = cityString
    ?.split(/[,.]/)
    .map((city) => city.trim())
    .filter((city) => city != "");
  return cityList.length > maxCitiesToShow
    ? `${cityList.slice(0, maxCitiesToShow).join(" • ")} +${cityList.length - maxCitiesToShow} more`
    : cityList.join(" • ");
};
