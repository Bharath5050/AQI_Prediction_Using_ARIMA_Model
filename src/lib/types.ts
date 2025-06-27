export interface Pollutant {
  name: 'PM2.5' | 'PM10' | 'O3' | 'NO2' | 'SO2' | 'CO';
  value: number;
  unit: string;
}

export interface AqiDataPoint {
  date: string;
  aqi: number;
}

export interface CityAqiData {
  city: string;
  country: string;
  currentAqi: number;
  mainPollutant: Pollutant['name'];
  pollutants: Pollutant[];
  historical: AqiDataPoint[];
  forecast: AqiDataPoint[];
}
