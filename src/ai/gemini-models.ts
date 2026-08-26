import {googleAI} from '@genkit-ai/google-genai';

export const QUESTION_GENERATION_MODEL_NAMES = [
  'gemini-2.5-flash',
  'gemini-3.7-flash',
  'gemini-3.6-flash',
  'gemini-2.0-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.1-flash-lite',
  'gemini-1.5-flash',
] as const;

export type QuestionGenerationModelName =
  (typeof QUESTION_GENERATION_MODEL_NAMES)[number];

export async function runWithQuestionGenerationModelFallback<T>(
  generate: (model: ReturnType<typeof googleAI.model>) => Promise<T>,
  generationLabel = 'question generation'
): Promise<T> {
  const errors: string[] = [];

  for (const modelName of QUESTION_GENERATION_MODEL_NAMES) {
    try {
      return await generate(googleAI.model(modelName));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      errors.push(`${modelName}: ${message}`);
      console.warn(
        `${generationLabel} failed with ${modelName}; trying the next Gemini model.`,
        error
      );
    }
  }

  throw new Error(
    `Failed to complete ${generationLabel} with all configured Gemini models. Attempts: ${errors.join(
      ' | '
    )}`
  );
}
