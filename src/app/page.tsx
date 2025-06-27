'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { CityAqiData } from '@/lib/types';
import { getAqiInfo } from '@/lib/utils';
import { AqiTrendsChart } from '@/components/dashboard/aqi-trends-chart';
import { PollutantsChart } from '@/components/dashboard/pollutants-chart';
import { HealthRecommendations } from '@/components/dashboard/health-recommendations';
import { DashboardHeader } from '@/components/dashboard/header';
import { Thermometer, Wind, AlertTriangle, CloudFog } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

function DashboardSkeleton() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current AQI</CardTitle>
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-24 mb-2" />
            <Skeleton className="h-4 w-20" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Main Pollutant</CardTitle>
             <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-20 mb-2" />
            <Skeleton className="h-4 w-24" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Health Impact</CardTitle>
             <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
             <Skeleton className="h-6 w-32 mb-2" />
             <Skeleton className="h-4 w-full" />
             <Skeleton className="h-4 w-4/5 mt-1" />
          </CardContent>
        </Card>
        <Card>
           <CardHeader>
            <CardTitle className="text-base">AI Health Advisory</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-16 w-full mb-4" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>AQI Trends</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Skeleton className="h-[300px] w-full" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pollutant Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-[350px] w-full" />
          </CardContent>
        </Card>
      </div>
    </>
  );
}


export default function DashboardPage() {
  const [selectedCityData, setSelectedCityData] = React.useState<CityAqiData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const { toast } = useToast();

  const fetchCityData = async (city: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/aqi/${city}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || 'City not found');
      }
      const data: CityAqiData = await response.json();
      setSelectedCityData(data);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error fetching data',
        description: `Could not find data for "${city}". Please try another city.`,
      });
      if (selectedCityData === null) {
          setSelectedCityData(null);
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  React.useEffect(() => {
    fetchCityData('New York');
  }, []);

  const handleSearch = (city: string) => {
    if (city && city.trim()) {
      fetchCityData(city.trim());
    }
  };

  const aqiInfo = selectedCityData ? getAqiInfo(selectedCityData.currentAqi) : null;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <DashboardHeader onSearch={handleSearch} />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {isLoading ? (
          <DashboardSkeleton />
        ) : selectedCityData && aqiInfo ? (
          <>
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
              <Card
                className={`bg-card border-l-4 border-l-aqi-${aqiInfo.className}`}
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current AQI in {selectedCityData.city}</CardTitle>
                  <Thermometer
                    className={`h-4 w-4 text-aqi-${aqiInfo.className}`}
                  />
                </CardHeader>
                <CardContent>
                  <div className="text-5xl font-bold">
                    {selectedCityData.currentAqi}
                  </div>
                  <p
                    className={`text-xs text-aqi-${aqiInfo.className}-foreground font-bold`}
                  >
                    {aqiInfo.level}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Main Pollutant
                  </CardTitle>
                  <Wind className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {selectedCityData.mainPollutant}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {
                      selectedCityData.pollutants.find(
                        (p) => p.name === selectedCityData.mainPollutant
                      )?.value
                    }{' '}
                    {
                      selectedCityData.pollutants.find(
                        (p) => p.name === selectedCityData.mainPollutant
                      )?.unit
                    }
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Health Impact
                  </CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold">{aqiInfo.level}</div>
                  <p className="text-xs text-muted-foreground">
                    {aqiInfo.description}
                  </p>
                </CardContent>
              </Card>
              <HealthRecommendations aqiForecast={selectedCityData.currentAqi} />
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
              <Card className="xl:col-span-2">
                <CardHeader>
                  <CardTitle>AQI Trends</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <AqiTrendsChart
                    historicalData={selectedCityData.historical}
                    forecastData={selectedCityData.forecast}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pollutant Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <PollutantsChart data={selectedCityData.pollutants} />
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
           <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-8">
            <div className="flex flex-col items-center gap-2 text-center">
              <CloudFog className="h-16 w-16 text-muted-foreground" />
              <h3 className="text-2xl font-bold tracking-tight">
                Could not load data
              </h3>
              <p className="text-sm text-muted-foreground">
                We couldn't fetch the air quality data. Please try searching for a different city.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
