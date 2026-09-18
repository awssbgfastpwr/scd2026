import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Parses an event target date string (ISO or standard format) into a timestamp.
 */
export function parseEventDate(targetDate: string): number {
  if (!targetDate) return NaN;

  let targetTime = new Date(targetDate).getTime();
  const match = targetDate.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})([+-]\d{2}):(\d{2})$/);
  if (match) {
    const [, year, month, day, hours, minutes, seconds, offsetHours, offsetMinutes] = match;
    const offsetMs = (parseInt(offsetHours, 10) * 60 + (offsetHours.startsWith('-') ? -1 : 1) * parseInt(offsetMinutes, 10)) * 60 * 1000;
    targetTime = Date.UTC(+year, +month - 1, +day, +hours, +minutes, +seconds) - offsetMs;
  }

  return targetTime;
}

/**
 * Determines whether registration is open:
 * 1. Checks if the event date has already passed.
 * 2. Checks the settings.registrationOpen flag.
 */
export function isEventRegistrationOpen(targetDate: string, registrationSetting: boolean = true): boolean {
  if (!registrationSetting) return false;

  const eventTime = parseEventDate(targetDate);
  if (isNaN(eventTime)) return registrationSetting;

  // Registration closes once the event has started or passed
  return Date.now() < eventTime;
}
