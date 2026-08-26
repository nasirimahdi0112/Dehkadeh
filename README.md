# DehkadehQuiz

DehkadehQuiz is a Next.js quiz-generation app for English teachers at **Dehkadeh-e-Zaban**. It turns processed textbook page data into printable, editable quizzes using Genkit and the Gemini API.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Genkit](https://img.shields.io/badge/Genkit-AI-orange?logo=google)
![Gemini](https://img.shields.io/badge/Gemini-API-blue?logo=google)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)

## What the app does

- **Generates textbook-based quizzes** from selected books, page ranges, difficulty levels, question types, and optional topics.
- **Uses a Gemini fallback chain** for question generation and regeneration. The configured models are listed in `src/ai/gemini-models.ts`; failed or invalid responses are retried with the next model.
- **Grounds questions in local book content** using page JSON files in `src/books-json` and the Genkit `getBookContent` tool.
- **Supports multiple question formats**: multiple choice, fill in the blank, true/false, and short answer.
- **Exports generated quizzes** as PDF or Word (`.docx`).
- **Allows question regeneration** when a teacher wants a different version of a specific question.
- **Uses printed page numbers** from each page record. Unverified OCR page numbers are inferred from the nearest verified PDF-to-printed-page offset for that book.

## Tech stack

| Area | Technology |
| --- | --- |
| App framework | Next.js 15 App Router |
| UI | React 18, Tailwind CSS, Radix UI |
| AI orchestration | Genkit |
| AI provider | Google Gemini API via `@genkit-ai/google-genai` |
| Book content | Local page-level JSON files |
| Exports | `jspdf`, `html2canvas`, `docx` |

## Project structure

```text
src/
├── ai/
│   ├── flows/              # Genkit flows for quiz generation and question regeneration
│   ├── tools/              # Genkit tools, including getBookContent
│   ├── gemini-models.ts    # Ordered Gemini fallback configuration
│   └── genkit.ts           # Shared Genkit instance and Google AI plugin setup
├── app/                    # Next.js App Router entry points
├── books-json/             # One directory of page JSON files per textbook
├── components/             # UI components for the quiz builder and preview
├── hooks/                  # Shared React hooks
├── lib/                    # Types, schemas, and utilities
└── services/               # Book inventory and page-content retrieval
```

- **AI-Generated Questions**: Uses the Gemini API through Genkit with the ordered fallback chain in `src/ai/gemini-models.ts`.
- **Multiple Question Types**: Supports Multiple Choice, Fill-in-the-Blank, True/False, and Short Answer formats.
- **Book Library**: Page JSON content from *Family and Friends*, *Four Corners*, and *Viewpoint* is loaded directly from `src/books-json` without runtime OCR.
- **Customizable Quizzes**: Select a book, printed page range, difficulty level, question type, and optional topic.
- **Export**: Download print-ready PDF files or editable Word documents. PDF questions are captured individually to avoid one oversized canvas.

## Requirements

- Node.js 18 or newer
- npm
- A Gemini API key from Google AI Studio

## Configuration

Copy `.env.example` to `.env.local` and add a valid key:

```env
GENKIT_ENV=dev
GOOGLE_API_KEY=your-gemini-api-key
```

The server fails clearly when `GOOGLE_API_KEY` is missing. Do not commit `.env.local` or a real API key.

## Getting started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the Genkit server** in one terminal:

   ```bash
   npm run genkit:dev
   ```

3. **Start the Next.js app** in another terminal:

   ```bash
   npm run dev
   ```

4. **Open the app**:

   Visit [http://localhost:3000](http://localhost:3000).

## How quiz generation works

1. A teacher selects a book and enters a page range such as `10-15`.
2. The app sends the quiz settings to the `generateQuestions` Genkit flow.
3. The flow calls `getBookContent` for the selected book and printed page range.
4. The retrieved textbook text is used to create structured quiz output.
5. The flow validates the response and tries the next configured Gemini model if generation fails or violates the requested question format.
6. The UI displays the questions and answers, and the teacher can export the quiz.

Requests are limited to 20 questions, 50 pages, and 100,000 extracted characters. Each model gets up to 120 seconds to respond. A process-level guard permits three concurrent AI requests and 30 requests per minute.

## Question regeneration flow

When a teacher regenerates one question:

1. The app sends the original question and quiz settings to the `regenerateQuestion` flow.
2. The flow retrieves the same source pages with `getBookContent`.
3. The Gemini fallback chain and output validation are used again.
4. A new question, answer, and multiple-choice options when applicable are returned to the UI.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server with Turbopack. |
| `npm run genkit:dev` | Start the Genkit developer server for local AI flows. |
| `npm run genkit:watch` | Start Genkit in watch mode. |
| `npm run build` | Build the production Next.js app. |
| `npm run start` | Start the production Next.js server after a build. |
| `npm run lint` | Run the project ESLint checks. |
| `npm run typecheck` | Run TypeScript type checking without emitting files. |

## Validation checklist

Before opening a pull request, run:

```bash
npm run typecheck
npm run lint
npm run build
```

1. **Selection**: The teacher selects a textbook and defines a printed page range.
2. **Retrieval**: The system uses `getBookContentTool` to fetch the selected page text from `src/books-json`.
3. **Generation**: This content is sent to Gemini through the configured fallback chain until one model returns valid structured output.
4. **Refinement**: Regenerating a question uses the same retrieved page content and Gemini fallback chain, then returns structured JSON containing the new question, options when needed, and the correct answer.
5. **Export**: The user previews the quiz, makes manual edits if needed, and exports to PDF or Word.

## Notes for deployment

- Firebase App Hosting settings live in `apphosting.yaml`.
- The production environment must include a valid Gemini API key.
- The configured model IDs must be available to the Gemini API key used by the deployment. If the first model is unavailable, the app will try the next model in the fallback chain.

## License

This project is proprietary software developed for Dehkadeh-e-Zaban. All rights reserved.

## Support

For internal support, contact the Dehkadeh-e-Zaban development team.
