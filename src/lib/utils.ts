import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function sanitizeUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    const paramsToRemove = [
      'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content',
      'fbclid', 'gclid', 'ttclid', 'irclickid', 'wickedid', 'yxclid'
    ]
    paramsToRemove.forEach(param => urlObj.searchParams.delete(param))
    return urlObj.toString()
  } catch {
    return url // Return original if invalid URL
  }
}

export function sanitizeUrls(urls: string): string {
  return urls.split('\n')
    .map(line => line.trim())
    .filter(line => line)
    .map(sanitizeUrl)
    .join('\n')
}