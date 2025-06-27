import { subDays, addDays, format } from 'date-fns';

export const generateHistoricalData = (baseAqi: number): { date: string, aqi: number }[] => {
  const data = [];
  const today = new Date();
  for (let i = 30; i > 0; i--) {
    const date = subDays(today, i);
    const aqi = baseAqi + Math.round((Math.random() - 0.5) * 40);
    data.push({ date: format(date, 'MMM dd'), aqi: Math.max(0, aqi) });
  }
  return data;
};

export const generateForecastData = (baseAqi: number): { date: string, aqi: number }[] => {
  const data = [];
  const today = new Date();
  for (let i = 1; i <= 7; i++) {
    const date = addDays(today, i);
    const aqi = baseAqi + Math.round((Math.random() - 0.4) * 30);
     data.push({ date: format(date, 'MMM dd'), aqi: Math.max(0, aqi) });
  }
  return data;
};
