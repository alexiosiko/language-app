import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const stringToArray = (str: string): string[] => {
	const arr: string[] = str.split(" ");
	return arr;
}