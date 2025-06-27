import { NextResponse } from 'next/server';
import type { CityAqiData, Pollutant } from '@/lib/types';
import { generateHistoricalData, generateForecastData } from '@/lib/data-utils';

const mapPollutantName = (apiName: string): Pollutant['name'] | null => {
  const name = apiName.toLowerCase();
  if (name === 'pm2.5' || name === 'pm25') return 'PM2.5';
  if (name === 'pm10') return 'PM10';
  if (name === 'o3') return 'O3';
  if (name === 'no2') return 'NO2';
  if (name === 'so2') return 'SO2';
  if (name === 'co') return 'CO';
  return null;
}

const getPollutantUnit = (name: Pollutant['name']): string => {
    switch (name) {
        case 'CO': return 'ppm';
        case 'NO2':
        case 'O3':
        case 'SO2':
            return 'ppb';
        case 'PM10':
        case 'PM2.5':
        default:
            return 'µg/m³';
    }
}

export async function GET(
  request: Request,
  { params }: { params: { city: string } }
) {
  const city = params.city;
  const token = process.env.AQI_API_KEY;

  if (!token) {
    return NextResponse.json({ error: 'API key is missing' }, { status: 500 });
  }
  
  if (!city) {
     return NextResponse.json({ error: 'City parameter is missing' }, { status: 400 });
  }

  try {
    const response = await fetch(`https://api.waqi.info/feed/${city}/?token=${token}`);
    const data = await response.json();

    if (data.status !== 'ok') {
      return NextResponse.json({ error: 'City not found or API error', details: data.data }, { status: 404 });
    }

    const apiData = data.data;
    const mainPollutantName = mapPollutantName(apiData.dominentpol);
    if (!mainPollutantName) {
         return NextResponse.json({ error: 'Could not determine main pollutant' }, { status: 500 });
    }

    const pollutants: Pollutant[] = Object.entries(apiData.iaqi).map(([key, value]: [string, any]) => {
        const name = mapPollutantName(key);
        if(name && value.v !== undefined) {
            return {
                name,
                value: parseFloat(value.v),
                unit: getPollutantUnit(name),
            }
        }
        return null;
    }).filter((p): p is Pollutant => p !== null);

    const transformedData: CityAqiData = {
      city: apiData.city.name.split(',')[0],
      country: '',
      currentAqi: apiData.aqi,
      mainPollutant: mainPollutantName,
      pollutants,
      historical: generateHistoricalData(apiData.aqi),
      forecast: generateForecastData(apiData.aqi),
    };
    
    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('AQI API fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch AQI data' }, { status: 500 });
  }
}
