
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { FormValues } from "@/lib/schemas";
import { regenerateQuestion } from "@/ai/flows/refine-question";
import type { RegenerateQuestionOutput } from "@/ai/flows/refine-question";
import type { Question } from "@/lib/types";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

interface QuestionItemProps {
  question: Question;
  index: number;
  onQuestionUpdate: (index: number, newQuestion: Question) => void;
  quizConfig: FormValues | null;
  showAnswers: boolean;
}

export function QuestionItem({ question, index, onQuestionUpdate, quizConfig, showAnswers }: QuestionItemProps) {
  const [isRegenerating, setIsRegenerating] = useState(false);
  const { toast } = useToast();

  const handleRegenerate = async () => {
    if (!quizConfig) {
        toast({
            variant: "destructive",
            title: "Cannot Regenerate Question",
            description: "Quiz configuration is not available.",
        });
        return;
    }
    
    setIsRegenerating(true);
    try {
      const result: RegenerateQuestionOutput = await regenerateQuestion({
        bookTitle: quizConfig.bookTitle,
        pageRange: quizConfig.pageRange,
        questionType: quizConfig.questionType,
        originalQuestion: question.question,
      });

      if (result && result.question) {
        onQuestionUpdate(index, { question: result.question, answer: result.answer, options: result.options || [] });
        toast({
          title: "Question Regenerated",
          description: "The selected question has been updated.",
        });
      } else {
         toast({
          variant: "destructive",
          title: "Error Regenerating Question",
          description: "The AI did not return a new question.",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An unexpected error occurred",
        description: "Failed to regenerate question. Please try again.",
      });
    } finally {
      setIsRegenerating(false);
    }
  };

  return (
    <li className="group flex flex-col items-start gap-2">
        <div className="flex items-start gap-4 w-full">
            <div className="flex-1 text-base leading-relaxed pt-1">{question.question}</div>
            <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity print:hidden"
                onClick={handleRegenerate}
                disabled={isRegenerating}
                aria-label="Regenerate question"
            >
                {isRegenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                <RefreshCw className="h-4 w-4" />
                )}
            </Button>
        </div>
        {question.options && question.options.length > 0 && (
          <ol className="list-[upper-alpha] list-inside w-full pl-4 space-y-2 mt-2">
            {question.options.map((option, i) => (
              <li key={i} className={cn("text-muted-foreground", showAnswers && option === question.answer ? 'font-semibold text-foreground' : '')}>
                {option}
              </li>
            ))}
          </ol>
        )}
        {showAnswers && (
            <div className="flex items-center gap-2 pl-1 pt-2">
                <Badge variant="secondary" className="text-xs">Answer</Badge>
                <p className="text-sm text-muted-foreground">{question.answer}</p>
            </div>
        )}
    </li>
  );
}
