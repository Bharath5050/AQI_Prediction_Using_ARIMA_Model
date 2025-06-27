'use client';

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { Pollutant } from '@/lib/types';
import * as React from 'react';

interface PollutantsChartProps {
  data: Pollutant[];
}

type ChartData = Pollutant & { fill: string };


export function PollutantsChart({ data }: PollutantsChartProps) {
  const [chartData, setChartData] = React.useState<ChartData[]>([]);

  React.useEffect(() => {
    setChartData(
      data.map((p, i) => ({
        ...p,
        fill: `hsl(var(--chart-${(i % 5) + 1}))`,
      }))
    );
  }, [data]);

  if (!chartData.length) {
    return <div className="h-[350px] w-full" />;
  }
  
  return (
    <div className="h-[350px] w-full">
      <ResponsiveContainer>
        <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <XAxis type="number" hide />
            <YAxis 
              type="category" 
              dataKey="name" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12} 
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              cursor={{ fill: 'hsl(var(--muted))' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Pollutant
                          </span>
                          <span className="font-bold text-muted-foreground">
                            {payload[0].payload.name}
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[0.70rem] uppercase text-muted-foreground">
                            Value
                          </span>
                          <span className="font-bold">
                            {payload[0].value} {payload[0].payload.unit}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                }

                return null
              }}
            />
            <Bar dataKey="value" radius={[4, 4, 4, 4]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
