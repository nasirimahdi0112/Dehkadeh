
'use server';
/**
 * @fileOverview Generates quiz questions from a book.
 *
 * - generateQuestions - A function that handles the question generation process.
 * - GenerateQuestionsInput - The input type for the generateQuestions function.
 * - GenerateQuestionsOutput - The return type for the generateQuestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { getBookContentTool } from '../tools/getBookContentTool';

const GenerateQuestionsInputSchema = z.object({
  bookTitle: z.string().describe('The title of the book to generate questions from.'),
  questionType: z.enum(['multiple choice', 'fill in the blank', "true/false", "short answer"]).describe('The type of questions to generate.'),
  numberOfQuestions: z.number().min(1).max(100).describe('The number of questions to generate.'),
  pageRange: z.string().describe('The page range of the book to cover in the questions (e.g., 1-10).'),
  questionDifficulty: z.enum(['easy', 'medium', 'hard']).describe('The difficulty of the questions.'),
  topic: z.string().optional().describe('The specific topic to focus on in the questions.'),
});
export type GenerateQuestionsInput = z.infer<typeof GenerateQuestionsInputSchema>;

const QuestionAnswerPairSchema = z.object({
  question: z.string().describe('The generated quiz question. This must be a real question based on the content, not a sample or placeholder.'),
  options: z.array(z.string()).optional().describe('An array of 4 options for a multiple-choice question.'),
  answer: z.string().describe('The answer to the generated question.'),
});

const GenerateQuestionsOutputSchema = z.object({
  questions: z.array(QuestionAnswerPairSchema).describe('The generated quiz questions and their answers.'),
});
export type GenerateQuestionsOutput = z.infer<typeof GenerateQuestionsOutputSchema>;

export async function generateQuestions(input: GenerateQuestionsInput): Promise<GenerateQuestionsOutput> {
  return generateQuestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateQuestionsPrompt',
  input: {schema: GenerateQuestionsInputSchema},
  output: {schema: GenerateQuestionsOutputSchema},
  tools: [getBookContentTool],
  config: {
    temperature: 0.2,
  },
  prompt: `You are an expert quiz question generator for English learning books. Your task is to generate questions that are not just about the examples in the book, but about the underlying concepts they teach. For each question, you MUST provide a concise and accurate answer. The style of your questions should adapt based on the book's title and its level within a series.

Book Title: "{{bookTitle}}"

Level Guidance for Book Series:
- "Family and Friends" series is for beginners. Questions should be direct and closely related to the text.
- "Four Corners" series is for intermediate learners. Questions should require some inference and application of the concepts.
- "Viewpoint" series is for advanced learners. Questions should be more abstract, focusing on core principles and requiring analysis, with less dependence on specific examples.

You must also consider the level *within* the series, which is often indicated by a number in the book title (e.g., "Four Corners 1" is lower intermediate, while "Four Corners 4" is upper intermediate). As the level number increases, your questions should become progressively less dependent on direct examples from the text and more focused on the abstract concepts being taught.

First, call the 'getBookContent' tool to retrieve the relevant text from the book for the page range: {{pageRange}}.

Use the retrieved text to generate {{numberOfQuestions}} {{questionType}} questions.
The difficulty of the questions should be: {{questionDifficulty}}.
The questions should be appropriate for the page range: {{pageRange}}.
{{#if topic}}
Focus the questions on the topic: {{topic}}.
{{/if}}

For each question, provide a corresponding answer. You must not generate placeholder or sample questions. All questions must be real and based on your knowledge of the book.
- If the question type is "multiple choice", you must provide exactly 4 options in the 'options' array: one correct answer and three incorrect distractors. The 'answer' field should contain the correct option's text. VERY IMPORTANT: Do not include any lettered prefixes (like "A.", "B)", etc.) in the option strings themselves.
- If the question type is "true/false", the 'answer' field must be either "True" or "False". Do not provide options.
- For all other question types ("fill in the blank", "short answer"), the 'options' field should be omitted.
Generate questions that test the student's understanding of the English concepts taught, not just their ability to recall examples from the text.
  `,
});

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const generateQuestionsFlow = ai.defineFlow(
  {
    name: 'generateQuestionsFlow',
    inputSchema: GenerateQuestionsInputSchema,
    outputSchema: GenerateQuestionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    
    if (!output || !output.questions) {
      throw new Error("Failed to generate questions. The AI model did not return a valid response.");
    }

    const randomizedQuestions = output.questions.map((q) => {
      if (q.options && q.options.length > 0) {
        return { ...q, options: shuffleArray(q.options) };
      }
      return q;
    });

    return { questions: randomizedQuestions };
  }
);
