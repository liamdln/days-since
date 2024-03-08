import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { GetAllBoards } from "../../wailsjs/go/main/App"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}