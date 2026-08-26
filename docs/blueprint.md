# DehkadehQuiz: Product Blueprint

## Current Features

- **Book library**: Use the processed page JSON files in `src/books-json` for the Family and Friends, Four Corners, and Viewpoint series.
- **Quiz configuration**: Select a book, printed page range, question type, difficulty, question count, and optional topic.
- **Question generation**: Retrieve selected pages through the Genkit `getBookContent` tool and generate grounded questions with Gemini.
- **Question preview**: Review answers, show or hide answers, edit questions, and regenerate individual questions.
- **Quiz export**: Download a structured Word document or a print-ready PDF with a separate answer-key section.

## Operational Constraints

- Requests are limited to 20 questions and 50 printed pages.
- Retrieved content is limited to 100,000 characters.
- Each Gemini model has up to 120 seconds to respond before fallback.
- Invalid model output is rejected and the next configured model is tried.
- Page records use printed page numbers; unverified OCR numbers are inferred from nearby verified offsets.

## Future Features

- Secure book-upload and processing workflow.
- Student-facing interactive quizzes.
- Teacher dashboard for saved quizzes.
- CSV or other machine-readable export.