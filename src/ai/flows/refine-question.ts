'use server';

/**
 * @fileOverview Allows a user to regenerate a specific question if they are not satisfied with the initial generation.
 *
 * - regenerateQuestion - A function that handles the question regeneration process.
 * - RegenerateQuestionInput - The input type for the regenerateQuestion function.
 * - RegenerateQuestionOutput - The return type for the regenerateQuestion function.
 */

import {ai, assertGoogleApiKey} from '@/ai/genkit';
import {runWithQuestionGenerationModelFallback} from '@/ai/gemini-models';
import {z} from 'genkit';
import {getBookContentTool} from '../tools/getBookContentTool';
import {acquireAiRequest} from '@/lib/ai-request-limit';

const PageRangeSchema = z.string()
  .trim()
  .regex(/^\d+\s*-\s*\d+$/, 'Page range must be in format X-Y.')
  .refine(value => {
    const [start, end] = value.split('-').map(Number);
    return end >= start && end - start < 50;
  }, 'Page range cannot contain more than 50 pages.');

const RegenerateQuestionInputSchema = z.object({
  bookTitle: z.string().describe('The file name of the book the question is based on.'),
  pageRange: PageRangeSchema.describe('The page range in the book to focus on.'),
  questionType: z.enum(['multiple choice', 'fill in the blank', 'true/false', 'short answer']),
  originalQuestion: z.string().trim().min(1).max(1000).describe('The original question that needs to be regenerated.'),
});
export type RegenerateQuestionInput = z.infer<typeof RegenerateQuestionInputSchema>;

const RegenerateQuestionOutputSchema = z.object({
  question: z.string().describe('The regenerated question.'),
  options: z.array(z.string()).optional().describe('An array of 4 options for a multiple-choice question.'),
  answer: z.string().describe('The answer to the regenerated question.'),
});
export type RegenerateQuestionOutput = z.infer<typeof RegenerateQuestionOutputSchema>;

export async function regenerateQuestion(input: RegenerateQuestionInput): Promise<RegenerateQuestionOutput> {
  assertGoogleApiKey();
  const releaseAiRequest = acquireAiRequest();
  try {
    return await regenerateQuestionFlow(input);
  } finally {
    releaseAiRequest();
  }
}

const prompt = ai.definePrompt({
  name: 'regenerateQuestionPrompt',
  input: {schema: RegenerateQuestionInputSchema},
  output: {schema: RegenerateQuestionOutputSchema},
  tools: [getBookContentTool],
  config: {
    temperature: 0.2,
  },
  prompt: `You are an AI quiz generator. You are given the title of a book, a page range within that book, a question type, and an original question. Your task is to regenerate the question based on the provided information and also provide the answer for it.

First, call the 'getBookContent' tool to retrieve the relevant text from the book for the page range: {{{pageRange}}}.

Use the retrieved text as the source of truth. Do not rely on general book knowledge when the retrieved text is available.

Book Title: {{{bookTitle}}}
Page Range: {{{pageRange}}}
Question Type: {{{questionType}}}
Original Question: {{{originalQuestion}}}

Generate a new, different question of the same type, grounded in the retrieved page content, and provide its corresponding answer.
- If the question type is "multiple choice", you must provide exactly 4 options in the 'options' array: one correct answer and three incorrect distractors. The 'answer' field should contain the correct option's text.
- If the question type is "true/false", the 'answer' field must be either "True" or "False". Do not provide options.
- For all other question types, the 'options' field should be omitted.
`, 
});

const regenerateQuestionFlow = ai.defineFlow(
  {
    name: 'regenerateQuestionFlow',
    inputSchema: RegenerateQuestionInputSchema,
    outputSchema: RegenerateQuestionOutputSchema,
  },
  async input => {
    const output = await runWithQuestionGenerationModelFallback(
      async (model) => {
        const result = await prompt(input, {model});
        if (!result.output) {
          throw new Error('The AI model did not return a question.');
        }
        validateQuestion(result.output, input.questionType);
        return result.output;
      },
      'question regeneration'
    );

    return output;
  }
);

function validateQuestion(
  question: RegenerateQuestionOutput,
  questionType: RegenerateQuestionInput['questionType']
) {
  if (!question.question.trim() || !question.answer.trim()) {
    throw new Error('The AI returned a question or answer with no text.');
  }

  if (questionType === 'multiple choice') {
    if (question.options?.length !== 4 || !question.options.includes(question.answer)) {
      throw new Error('The AI returned invalid multiple-choice options.');
    }
  } else if (question.options && question.options.length > 0) {
    throw new Error(`The AI returned options for a ${questionType} question.`);
  }

  if (questionType === 'true/false' && !['True', 'False'].includes(question.answer)) {
    throw new Error('The AI returned an invalid true/false answer.');
  }
}
