"use client";

import { useState, useEffect } from 'react';
import type { GenerateQuestionsOutput } from '@/ai/flows/generate-questions';
import { generateQuestions } from '@/ai/flows/generate-questions';
import { useToast } from '@/hooks/use-toast';
import { SidebarProvider, Sidebar, SidebarInset, SidebarTrigger, SidebarHeader } from '@/components/ui/sidebar';
import type { Question, Book } from '@/lib/types';
import { ThemeToggle } from '@/components/theme-toggle';
import Logo from '@/components/logo';
import { QuestionPreview } from '@/components/question-preview';
import type { FormValues } from '@/lib/schemas';
import { getAvailableBooks } from '@/services/book-inventory';
import { SidebarContentWrapper } from '@/components/sidebar-content-wrapper';

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState<FormValues | null>(null);
  const [availableBooks, setAvailableBooks] = useState<Book[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const books = await getAvailableBooks();
        setAvailableBooks(books);
      } catch (error) {
        console.error("Failed to fetch available books", error);
        toast({
            variant: "destructive",
            title: "Error loading books",
            description: "Could not load the list of available books.",
        });
      }
    };
    fetchBooks();
  }, [toast]);


  const handleGenerateQuiz = async (data: FormValues) => {
    setIsLoading(true);
    setQuestions([]);
    setFormState(data);
    try {
      const result: GenerateQuestionsOutput = await generateQuestions({
        bookTitle: data.bookTitle,
        questionType: data.questionType,
        numberOfQuestions: data.numberOfQuestions,
        pageRange: data.pageRange,
        questionDifficulty: data.questionDifficulty,
        topic: data.topic,
      });
      if (result && result.questions) {
        setQuestions(result.questions.map(q => ({...q, options: q.options || []})));
      } else {
        toast({
          variant: "destructive",
          title: "Error Generating Quiz",
          description: "The AI did not return any questions. Please try again.",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "An unexpected error occurred",
        description: "Something went wrong while generating the quiz. Please check the console for more details.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <Sidebar side="left" className="print:hidden border-r bg-sidebar text-sidebar-foreground" collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center gap-3 p-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg">
                <Logo className="h-10 w-10" />
            </div>
            <h1 className="text-xl font-bold tracking-tight font-headline">DehkadehQuiz</h1>
          </div>
        </SidebarHeader>
        <SidebarContentWrapper 
          availableBooks={availableBooks}
          isLoading={isLoading}
          onSubmit={handleGenerateQuiz}
        />
      </Sidebar>
      <SidebarInset className="print-quiz-container">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:h-[60px] sm:px-6 print:hidden">
            <SidebarTrigger className="md:hidden" aria-label="Toggle sidebar" />
            <h2 className="flex-1 text-xl font-semibold font-headline">Generated Quiz</h2>
            <div className="flex items-center gap-2">
              <ThemeToggle />
            </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
            <QuestionPreview
              questions={questions}
              isLoading={isLoading}
              onQuestionUpdate={(index, newQuestion) => {
                  setQuestions(currentQuestions => {
                    const newQuestions = [...currentQuestions];
                    newQuestions[index] = newQuestion;
                    return newQuestions;
                  });
              }}
              quizConfig={formState}
              availableBooks={availableBooks}
            />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
