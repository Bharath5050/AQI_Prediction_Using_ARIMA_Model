'use client';

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AqiDataPoint } from '@/lib/types';
import { getAqiInfo } from '@/lib/utils';
import { Card, CardContent } from '../ui/card';

interface AqiTrendsChartProps {
  historicalData: AqiDataPoint[];
  forecastData: AqiDataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const aqi = payload[0].value;
    const aqiInfo = getAqiInfo(aqi);
    return (
      <Card className="text-sm">
        <CardContent className="p-2">
            <p className="font-bold">{`${label}`}</p>
            <p>
              <span className="font-semibold">AQI:</span>{' '}
              <span className={`font-bold text-aqi-${aqiInfo.className}-foreground`}>{aqi}</span>
            </p>
            <p className={`font-semibold text-aqi-${aqiInfo.className}-foreground`}>{aqiInfo.level}</p>
        </CardContent>
      </Card>
    );
  }
  return null;
};

export function AqiTrendsChart({ historicalData, forecastData }: AqiTrendsChartProps) {
  return (
    <Tabs defaultValue="forecast">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="historical">Historical (30 Days)</TabsTrigger>
        <TabsTrigger value="forecast">Forecast (7 Days)</TabsTrigger>
      </TabsList>
      <TabsContent value="historical">
        <div className="h-[300px] w-full">
          <ResponsiveContainer>
            <LineChart data={historicalData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="aqi" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
      <TabsContent value="forecast">
         <div className="h-[300px] w-full">
          <ResponsiveContainer>
            <LineChart data={forecastData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false}/>
              <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))"/>
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="aqi" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </TabsContent>
    </Tabs>
  );
}
