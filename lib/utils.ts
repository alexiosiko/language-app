import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const stringToArray = (str: string): string[] => {
	const arr: string[] = str.split(" ");
	return arr;
}

export function getMousePos(canvas: HTMLCanvasElement, e:  React.PointerEvent<HTMLButtonElement>): {x: number, y: number} {
	const rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for x
    scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for y

	return {
		x: (e.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
		y: (e.clientY - rect.top) * scaleY     // been adjusted to be relative to element
	}
}
  
export const getButtonCenter = (button: HTMLButtonElement) => {
	const rect = button.getBoundingClientRect();
	const centerX = rect.left + rect.width / 2;
	const centerY = rect.top + rect.height / 2;
	return { x: centerX, y: centerY };
};