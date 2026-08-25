'use server';

/**
 * @fileOverview Allows a user to regenerate a specific question if they are not satisfied with the initial generation.
 *
 * - regenerateQuestion - A function that handles the question regeneration process.
 * - RegenerateQuestionInput - The input type for the regenerateQuestion function.
 * - RegenerateQuestionOutput - The return type for the regenerateQuestion function.
 */

import {ai} from '@/ai/genkit';
import {runWithQuestionGenerationModelFallback} from '@/ai/gemini-models';
import {z} from 'genkit';
import {getBookContentTool} from '../tools/getBookContentTool';

const RegenerateQuestionInputSchema = z.object({
  bookTitle: z.string().describe('The file name of the book the question is based on.'),
  pageRange: z.string().describe('The page range in the book to focus on.'),
  questionType: z.string().describe('The type of question to generate (e.g., multiple choice, fill in the blank).'),
  originalQuestion: z.string().describe('The original question that needs to be regenerated.'),
});
export type RegenerateQuestionInput = z.infer<typeof RegenerateQuestionInputSchema>;

const RegenerateQuestionOutputSchema = z.object({
  question: z.string().describe('The regenerated question.'),
  options: z.array(z.string()).optional().describe('An array of 4 options for a multiple-choice question.'),
  answer: z.string().describe('The answer to the regenerated question.'),
});
export type RegenerateQuestionOutput = z.infer<typeof RegenerateQuestionOutputSchema>;

export async function regenerateQuestion(input: RegenerateQuestionInput): Promise<RegenerateQuestionOutput> {
  return regenerateQuestionFlow(input);
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
    const {output} = await runWithQuestionGenerationModelFallback(
      (model) => prompt(input, {model}),
      'question regeneration'
    );

    if (!output) {
      throw new Error('Failed to regenerate the question. The AI model did not return a valid response.');
    }

    return output;
  }
);
