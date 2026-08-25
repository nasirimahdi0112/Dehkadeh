
"use client";

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Wand2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SidebarContent } from "@/components/ui/sidebar";
import { Slider } from "@/components/ui/slider";
import { quizConfigSchema, type FormValues } from '@/lib/schemas';
import type { Book } from "@/lib/types";

interface SidebarContentWrapperProps {
  availableBooks: Book[];
  isLoading: boolean;
  onSubmit: (data: FormValues) => Promise<void>;
}

export function SidebarContentWrapper({ availableBooks, isLoading, onSubmit }: SidebarContentWrapperProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(quizConfigSchema),
    defaultValues: {
      bookTitle: "",
      questionType: "multiple choice",
      numberOfQuestions: 5,
      pageRange: "",
      questionDifficulty: "medium",
      topic: "",
    },
  });

  const handleBookChange = (fileName: string) => {
    form.setValue("bookTitle", fileName);
  };

  useEffect(() => {
    if (availableBooks.length > 0 && !form.getValues("bookTitle")) {
      const firstBook = availableBooks[0];
      if (firstBook) {
        handleBookChange(firstBook.fileName);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableBooks, form.setValue]);

  return (
    <SidebarContent>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full">
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-4">
              <FormField
                control={form.control}
                name="bookTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Book Title</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a book" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {availableBooks.length > 0 ? (
                          availableBooks.map(book => (
                            <SelectItem key={book.fileName} value={book.fileName}>{book.displayName}</SelectItem>
                          ))
                        ) : (
                          <SelectItem value="loading" disabled>Loading books...</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="questionType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Question Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select question type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="multiple choice">Multiple Choice</SelectItem>
                        <SelectItem value="fill in the blank">Fill in the Blank</SelectItem>
                        <SelectItem value="true/false">True/False</SelectItem>
                        <SelectItem value="short answer">Short Answer</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numberOfQuestions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Questions ({field.value})</FormLabel>
                    <FormControl>
                      <Slider
                        min={1}
                        max={20}
                        step={1}
                        value={[field.value]}
                        onValueChange={(values) => field.onChange(values[0])}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pageRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Page Range</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 1-10" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="questionDifficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="easy">Easy</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="hard">Hard</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Specific Topic (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Verb tenses" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </ScrollArea>
          <div className="p-4 mt-auto border-t">
            <Button size="lg" type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {'Generating Quiz...'}
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Quiz
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </SidebarContent>
  );
}
