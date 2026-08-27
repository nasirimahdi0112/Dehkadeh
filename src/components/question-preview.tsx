"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { QuestionItem } from "./question-item";
import type { FormValues } from "@/lib/schemas";
import { Button } from "./ui/button";
import { Eye, EyeOff, FileText, Loader2 } from "lucide-react";
import { useState, useRef } from "react";
import type { Question, Book } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Document, Packer, Paragraph, Numbering, PageBreak, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';

interface QuestionPreviewProps {
  questions: Question[];
  isLoading: boolean;
  onQuestionUpdate: (index: number, newQuestion: Question) => void;
  quizConfig: FormValues | null;
  availableBooks: Book[];
}

export function QuestionPreview({ questions, isLoading, onQuestionUpdate, quizConfig, availableBooks }: QuestionPreviewProps) {
  const [showAnswers, setShowAnswers] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { toast } = useToast();
  const questionsRef = useRef<HTMLDivElement>(null);
  const answerKeyRef = useRef<HTMLDivElement>(null);
  
  const getBookDisplayName = (fileName: string) => {
    return availableBooks.find(b => b.fileName === fileName)?.displayName || fileName;
  };

  const getQuizFileName = (extension: string) => {
    if (!quizConfig) return `quiz.${extension}`;
    const bookName = getBookDisplayName(quizConfig.bookTitle).replace(/[^a-z0-9]/gi, '-').toLowerCase();
    return `quiz-${bookName}-pages-${quizConfig.pageRange}.${extension}`;
  }

  const getAnswerDisplay = (question: Question) => {
    if (quizConfig?.questionType !== 'multiple choice' || !question.options || question.options.length === 0) {
      return question.answer;
    }
    const correctIndex = question.options.findIndex(opt => opt === question.answer);
    if (correctIndex !== -1) {
      return `${String.fromCharCode(65 + correctIndex)}. ${question.answer}`;
    }
    return question.answer;
  };

  const handleExportWord = async () => {
        if (!quizConfig || questions.length === 0) {
            toast({
                variant: "destructive",
                title: "Cannot Export Word File",
                description: "Generate at least one question before exporting.",
            });
            return;
        }
    setIsExporting(true);

    try {
                const quizChildren: Paragraph[] = [
            new Paragraph({ text: `${getBookDisplayName(quizConfig.bookTitle)} Quiz`, heading: HeadingLevel.HEADING_1, alignment: AlignmentType.CENTER }),
            new Paragraph({ text: `Pages: ${quizConfig.pageRange}`, heading: HeadingLevel.HEADING_3, alignment: AlignmentType.CENTER }),
            new Paragraph({ text: "" }),
        ];

        questions.forEach((q) => {
            quizChildren.push(new Paragraph({
                text: q.question,
                numbering: { reference: "quiz-numbering", level: 0 },
                keepNext: true,
            }));

            if (q.options && q.options.length > 0) {
                q.options.forEach(option => {
                     quizChildren.push(new Paragraph({
                        text: option,
                        numbering: { reference: "quiz-numbering", level: 1 },
                        keepNext: option !== q.options?.[q.options.length - 1],
                    }));
                });
            }
             quizChildren.push(new Paragraph({ text: "" }));
        });
        
        quizChildren.push(new Paragraph({ children: [new PageBreak()] }));

        quizChildren.push(new Paragraph({ text: "Answer Key", heading: HeadingLevel.HEADING_2, alignment: AlignmentType.CENTER }));
        quizChildren.push(new Paragraph(""));

        questions.forEach((q, index) => {
            quizChildren.push(new Paragraph({
                text: `${index + 1}. ${getAnswerDisplay(q)}`,
                style: "AnswerKey"
            }));
        });

        const doc = new Document({
            numbering: {
                config: [
                    {
                        reference: "quiz-numbering",
                        levels: [
                            {
                                level: 0,
                                format: "decimal",
                                text: "%1.",
                                style: { paragraph: { indent: { left: 720, hanging: 360 } } },
                            },
                            {
                                level: 1,
                                format: "upperLetter",
                                text: "%2.",
                                style: { paragraph: { indent: { left: 1440, hanging: 360 } } },
                            },
                        ],
                    },
                ],
            },
            styles: {
                paragraphStyles: [
                     {
                        id: "Normal",
                        name: "Normal",
                        basedOn: "Normal",
                        next: "Normal",
                        quickFormat: true,
                        run: {
                            font: "Calibri",
                            size: 24,
                        },
                    },
                    {
                        id: "AnswerKey",
                        name: "Answer Key",
                        basedOn: "Normal",
                        next: "Normal",
                        quickFormat: true,
                        run: {
                            font: "Calibri",
                            size: 20,
                        },
                    },
                     {
                        id: "Heading1",
                        name: "Heading 1",
                        basedOn: "Normal",
                        next: "Normal",
                        quickFormat: true,
                        run: {
                            font: "Calibri",
                            size: 32,
                            bold: true,
                        },
                        paragraph: {
                            spacing: { after: 240 },
                        },
                    },
                    {
                        id: "Heading2",
                        name: "Heading 2",
                        basedOn: "Normal",
                        next: "Normal",
                        quickFormat: true,
                        run: {
                            font: "Calibri",
                            size: 28,
                            bold: true,
                        },
                        paragraph: {
                           spacing: { before: 240, after: 240 },
                        },
                    },
                    {
                        id: "Heading3",
                        name: "Heading 3",
                        basedOn: "Normal",
                        next: "Normal",
                        quickFormat: true,
                        run: {
                            font: "Calibri",
                            size: 24,
                            bold: true,
                        },
                        paragraph: {
                           spacing: { after: 240 },
                        },
                    }
                ]
            },
            sections: [{
                children: quizChildren,
            }],
        });

        const blob = await Packer.toBlob(doc);
        saveAs(blob, getQuizFileName('docx'));

        toast({
            title: "Export Successful",
            description: "Your quiz has been downloaded as a Word file.",
        });

    } catch (error) {
        console.error("Failed to export DOCX", error);
        toast({
            variant: "destructive",
            title: "Word Export Failed",
            description: "An error occurred while generating the .docx file.",
        });
    } finally {
        setIsExporting(false);
    }
  };

    const addElementsToPdf = async (pdf: jsPDF, elements: HTMLElement[]) => {
        const margin = 15;
        const gap = 5;
        const contentWidth = pdf.internal.pageSize.getWidth() - (margin * 2);
        const pageHeight = pdf.internal.pageSize.getHeight();
        let cursorY = margin;

        for (const element of elements) {
            const canvas = await html2canvas(element, {
                scale: 2,
                backgroundColor: "#FFFFFF",
                useCORS: true,
            });

            if (canvas.width === 0 || canvas.height === 0) {
                throw new Error("Export content produced an empty image.");
            }

            const imageWidth = contentWidth;
            const imageHeight = imageWidth * (canvas.height / canvas.width);

            if (cursorY > margin && cursorY + imageHeight > pageHeight - margin) {
                pdf.addPage();
                cursorY = margin;
            }

            let sourceY = 0;
            while (sourceY < canvas.height) {
                const availableHeight = pageHeight - margin - cursorY;
                const sourceSliceHeight = Math.min(
                    canvas.height - sourceY,
                    Math.max(1, Math.floor((availableHeight / imageWidth) * canvas.width))
                );
                const slice = document.createElement('canvas');
                slice.width = canvas.width;
                slice.height = sourceSliceHeight;
                const sliceContext = slice.getContext('2d');
                if (!sliceContext) {
                    throw new Error("Could not prepare PDF content.");
                }
                sliceContext.drawImage(
                    canvas,
                    0, sourceY, canvas.width, sourceSliceHeight,
                    0, 0, slice.width, slice.height
                );

                const sliceHeight = imageWidth * (sourceSliceHeight / canvas.width);
                pdf.addImage(
                    slice.toDataURL('image/png'),
                    'PNG',
                    margin,
                    cursorY,
                    imageWidth,
                    sliceHeight,
                    undefined,
                    'FAST'
                );
                sourceY += sourceSliceHeight;

                if (sourceY < canvas.height) {
                    pdf.addPage();
                    cursorY = margin;
                } else {
                    cursorY += sliceHeight + gap;
                }
            }
        }
  };

  const handleExportPdf = async () => {
        if (!questionsRef.current || !answerKeyRef.current || !quizConfig || questions.length === 0) {
            toast({
                variant: "destructive",
                title: "Cannot Export PDF File",
                description: "Generate at least one question before exporting.",
            });
            return;
        }
    setIsExporting(true);

    try {
        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: 'a4',
            putOnlyUsedFonts: true,
            compress: true
        });

                const questionElements = [
                    questionsRef.current.querySelector<HTMLElement>('.pdf-questions-header'),
                    ...Array.from(questionsRef.current.querySelectorAll<HTMLElement>('.pdf-question')),
                ].filter((element): element is HTMLElement => element !== null);
                const answerElements = [
                    answerKeyRef.current.querySelector<HTMLElement>('.pdf-answer-header'),
                    ...Array.from(answerKeyRef.current.querySelectorAll<HTMLElement>('.pdf-answer')),
                ].filter((element): element is HTMLElement => element !== null);

                if (questionElements.length === 0 || answerElements.length === 0) {
                    throw new Error("Export content is unavailable.");
                }

                await addElementsToPdf(pdf, questionElements);
                pdf.addPage();
                await addElementsToPdf(pdf, answerElements);

        pdf.save(getQuizFileName('pdf'));
         toast({
            title: "Export Successful",
            description: "Your quiz has been downloaded as a PDF file.",
        });
    } catch (error) {
        console.error("Failed to export PDF", error);
        toast({
            variant: "destructive",
            title: "PDF Export Failed",
            description: "An error occurred while generating the PDF.",
        });
    } finally {
        setIsExporting(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-start space-x-4 rounded-lg p-4">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (questions.length > 0 && quizConfig) {
      return (
        <>
          <ol className="list-decimal list-outside space-y-6 pl-5">
              {questions.map((question, index) => (
              <QuestionItem
                  key={`${index}-${question.question.substring(0, 10)}`}
                  question={question}
                  index={index}
                  onQuestionUpdate={onQuestionUpdate}
                  quizConfig={quizConfig}
                  showAnswers={showAnswers}
              />
              ))}
          </ol>
          
           <div className="absolute -left-[9999px] top-auto w-[8.5in]" aria-hidden="true">
              <div ref={questionsRef} className="pdf-export-content bg-white">
                                    <div className="pdf-questions-header">
                                        <h1>{getBookDisplayName(quizConfig.bookTitle)} Quiz</h1>
                                        <p className="quiz-subtitle">Pages: {quizConfig.pageRange}</p>
                                    </div>

                  <ol className="quiz-questions-list">
                      {questions.map((q, index) => (
                                                    <li key={`pdf-q-${index}`} className="pdf-question">
                              <p className="question-text">{index + 1}. {q.question}</p>
                              {q.options && q.options.length > 0 && (
                                  <ol className="question-options-list">
                                      {q.options.map((option, i) => (
                                          <li key={`pdf-q-${index}-o-${i}`}>
                                              {option}
                                          </li>
                                      ))}
                                  </ol>
                              )}
                          </li>
                      ))}
                  </ol>
              </div>
               <div ref={answerKeyRef} className="pdf-export-content bg-white">
                  <div className="answer-key">
                      <div className="pdf-answer-header">
                        <h2>Answer Key</h2>
                      </div>
                      <ol className="answer-key-list">
                          {questions.map((q, i) => (
                              <li key={`pdf-a-${i}`} className="pdf-answer">{i + 1}. {getAnswerDisplay(q)}</li>
                          ))}
                      </ol>
                  </div>
              </div>
          </div>
        </>
      );
    }
    
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center bg-card">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
            <FileText className="h-10 w-10 text-muted-foreground" />
        </div>
        <h3 className="mt-6 text-xl font-semibold">Your Quiz Awaits</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Select a book and generate questions to get started.
        </p>
      </div>
    );
  };
  
  return (
    <Card className="shadow-lg rounded-xl">
        <CardHeader className="flex-row items-center justify-between">
            <div>
              <CardTitle>Quiz Preview</CardTitle>
              <CardDescription>
                {quizConfig ? `Showing ${questions.length} questions for ${getBookDisplayName(quizConfig.bookTitle)}` : 'Review and refine your generated questions.'}
              </CardDescription>
            </div>
             {questions.length > 0 && (
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowAnswers(!showAnswers)}>
                        {showAnswers ? <EyeOff className="mr-2 h-4 w-4" /> : <Eye className="mr-2 h-4 w-4" />}
                        {showAnswers ? 'Hide Answers' : 'Show Answers'}
                    </Button>
                    <Button variant="outline" onClick={handleExportWord} aria-label="Export to Word" disabled={isExporting}>
                        {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
                        Word
                    </Button>
                    <Button onClick={handleExportPdf} aria-label="Export to PDF" disabled={isExporting}>
                        {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileText className="mr-2 h-4 w-4" />}
                        PDF
                    </Button>
                </div>
            )}
        </CardHeader>
        <CardContent>
            {renderContent()}
        </CardContent>
    </Card>
  );
}
