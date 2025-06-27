// src/ai/flows/suggest-health-recommendations.ts
'use server';

/**
 * @fileOverview This file defines a Genkit flow for suggesting personalized health recommendations based on the AQI forecast.
 *
 * - suggestHealthRecommendations - A function that takes an AQI forecast and user preferences as input and returns personalized health recommendations.
 * - SuggestHealthRecommendationsInput - The input type for the suggestHealthRecommendations function.
 * - SuggestHealthRecommendationsOutput - The return type for the suggestHealthRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestHealthRecommendationsInputSchema = z.object({
  aqiForecast: z
    .number()
    .describe('The AQI forecast for the user\u2019s location.'),
  userPreferences: z
    .object({
      sensitivity: z
        .enum(['high', 'medium', 'low'])
        .describe('The user\u2019s sensitivity to air pollution.'),
      age: z.number().describe('The age of the user.'),
      healthConditions: z
        .string()
        .describe('Any pre-existing health conditions of the user.'),
    })
    .describe('The user\u2019s preferences and health information.'),
});

export type SuggestHealthRecommendationsInput = z.infer<
  typeof SuggestHealthRecommendationsInputSchema
>;

const SuggestHealthRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A list of personalized health recommendations based on the AQI forecast and user preferences.'
    ),
});

export type SuggestHealthRecommendationsOutput = z.infer<
  typeof SuggestHealthRecommendationsOutputSchema
>;

export async function suggestHealthRecommendations(
  input: SuggestHealthRecommendationsInput
): Promise<SuggestHealthRecommendationsOutput> {
  return suggestHealthRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestHealthRecommendationsPrompt',
  input: {schema: SuggestHealthRecommendationsInputSchema},
  output: {schema: SuggestHealthRecommendationsOutputSchema},
  prompt: `You are a health expert specializing in air quality and its impact on health.

Based on the AQI forecast and user preferences, provide personalized health recommendations.

AQI Forecast: {{{aqiForecast}}}
User Preferences: {{{userPreferences}}}

Consider the user's sensitivity, age, and any pre-existing health conditions when generating recommendations.

Provide specific and actionable advice to help the user protect their health.`,
});

const suggestHealthRecommendationsFlow = ai.defineFlow(
  {
    name: 'suggestHealthRecommendationsFlow',
    inputSchema: SuggestHealthRecommendationsInputSchema,
    outputSchema: SuggestHealthRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
