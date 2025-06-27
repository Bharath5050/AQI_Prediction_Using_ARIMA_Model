import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type AqiInfo = {
  level: string;
  className: string;
  description: string;
};

export const getAqiInfo = (aqi: number): AqiInfo => {
  if (aqi <= 50) {
    return {
      level: 'Good',
      className: 'good',
      description: 'Air quality is considered satisfactory, and air pollution poses little or no risk.',
    };
  }
  if (aqi <= 100) {
    return {
      level: 'Moderate',
      className: 'moderate',
      description: 'Air quality is acceptable; however, for some pollutants there may be a moderate health concern.',
    };
  }
  if (aqi <= 150) {
    return {
      level: 'Unhealthy for Sensitive Groups',
      className: 'unhealthy-sensitive',
      description: 'Members of sensitive groups may experience health effects. The general public is not likely to be affected.',
    };
  }
  if (aqi <= 200) {
    return {
      level: 'Unhealthy',
      className: 'unhealthy',
      description: 'Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.',
    };
  }
  if (aqi <= 300) {
    return {
      level: 'Very Unhealthy',
      className: 'very-unhealthy',
      description: 'Health alert: everyone may experience more serious health effects.',
    };
  }
  return {
    level: 'Hazardous',
    className: 'hazardous',
    description: 'Health warnings of emergency conditions. The entire population is more likely to be affected.',
  };
};
