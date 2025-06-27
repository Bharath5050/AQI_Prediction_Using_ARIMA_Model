'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { suggestHealthRecommendations } from '@/ai/flows/suggest-health-recommendations';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';

interface HealthRecommendationsProps {
  aqiForecast: number;
}

export function HealthRecommendations({
  aqiForecast,
}: HealthRecommendationsProps) {
  const [recommendations, setRecommendations] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const getRecommendations = async () => {
    setIsLoading(true);
    setRecommendations('');
    try {
      const result = await suggestHealthRecommendations({
        aqiForecast,
        userPreferences: {
          sensitivity: 'medium',
          age: 35,
          healthConditions: 'None',
        },
      });
      setRecommendations(result.recommendations);
    } catch (error) {
      console.error('Failed to get health recommendations:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch health recommendations.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          AI Health Advisory
        </CardTitle>
        <CardDescription>
          Get personalized health tips based on the AQI forecast.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center rounded-md border border-dashed p-8">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : recommendations ? (
          <div className="prose prose-sm dark:prose-invert rounded-md border bg-muted/50 p-4 text-sm">
            {recommendations}
          </div>
        ) : (
           <div className="text-center text-sm text-muted-foreground py-4">
            Click the button to generate your personal health recommendations.
          </div>
        )}
        <Button onClick={getRecommendations} disabled={isLoading} className="mt-4 w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate Health Tips'
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
