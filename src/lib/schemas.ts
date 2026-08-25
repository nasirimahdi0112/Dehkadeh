import { z } from "zod";

export const quizConfigSchema = z.object({
  bookTitle: z.string().min(1, { message: "Please select a book." }),
  questionType: z.enum(["multiple choice", "fill in the blank", "true/false", "short answer"]),
  numberOfQuestions: z.number().min(1).max(20),
  pageRange: z.string().min(1, { message: "Page range is required." }).regex(/^\s*\d+\s*-\s*\d+\s*$/, "Page range must be in format '1-10'."),
  questionDifficulty: z.enum(["easy", "medium", "hard"]),
  topic: z.string().optional(),
});

export type FormValues = z.infer<typeof quizConfigSchema>;
