import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
});

export function assertGoogleApiKey() {
  if (!process.env.GOOGLE_API_KEY?.trim()) {
    throw new Error('AI service is not configured. Add GOOGLE_API_KEY to .env.local.');
  }
}
