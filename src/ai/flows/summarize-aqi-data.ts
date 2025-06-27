// SummarizeAQIData.ts
'use server';
/**
 * @fileOverview Summarizes AQI data for a given location, highlighting key pollutants and their potential health impacts.
 *
 * - summarizeAqiData - A function that generates a summarized report of the AQI.
 * - SummarizeAqiDataInput - The input type for the summarizeAqiData function.
 * - SummarizeAqiDataOutput - The return type for the summarizeAqiData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeAqiDataInputSchema = z.object({
  location: z.string().describe('The location for which to summarize AQI data.'),
  aqiData: z.string().describe('The AQI data for the specified location, as a JSON string.'),
});
export type SummarizeAqiDataInput = z.infer<typeof SummarizeAqiDataInputSchema>;

const SummarizeAqiDataOutputSchema = z.object({
  summary: z.string().describe('A summarized report of the AQI for the specified location.'),
});
export type SummarizeAqiDataOutput = z.infer<typeof SummarizeAqiDataOutputSchema>;

export async function summarizeAqiData(input: SummarizeAqiDataInput): Promise<SummarizeAqiDataOutput> {
  return summarizeAqiDataFlow(input);
}

const summarizeAqiDataPrompt = ai.definePrompt({
  name: 'summarizeAqiDataPrompt',
  input: {schema: SummarizeAqiDataInputSchema},
  output: {schema: SummarizeAqiDataOutputSchema},
  prompt: `You are an environmental expert providing air quality reports.

  Summarize the AQI data for the given location, highlighting key pollutants and their potential health impacts. Use a tone appropriate for informing the general public. Be concise but informative.

  Location: {{{location}}}
  AQI Data: {{{aqiData}}}
  `,
});

const summarizeAqiDataFlow = ai.defineFlow(
  {
    name: 'summarizeAqiDataFlow',
    inputSchema: SummarizeAqiDataInputSchema,
    outputSchema: SummarizeAqiDataOutputSchema,
  },
  async input => {
    try {
      // Attempt to parse the aqiData string as JSON.  If it fails, that is ok.
      JSON.parse(input.aqiData);
    } catch (e) {
      // If it's not JSON, pass it through as a string.
    }

    const {output} = await summarizeAqiDataPrompt(input);
    return output!;
  }
);
