# DehkadehQuiz

DehkadehQuiz is a Next.js quiz-generation app for English teachers at **Dehkadeh-e-Zaban**. It turns pre-processed textbook content into printable, editable quizzes using Genkit and the Gemini API.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Genkit](https://img.shields.io/badge/Genkit-AI-orange?logo=google)
![Gemini](https://img.shields.io/badge/Gemini-API-blue?logo=google)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)

## What the app does

- **Generates textbook-based quizzes** from selected books, page ranges, difficulty levels, question types, and optional topics.
- **Uses a Gemini fallback chain** for question generation and regeneration:
  1. `gemini-3.7-flash`
  2. `gemini-3.6-flash`
  3. `gemini-3.5-flash-lite`
  4. `gemini-3.1-flash-lite`
- **Falls back automatically** if a model call fails, so the app tries the next configured Gemini model before returning an error.
- **Grounds questions in local book content** using pre-processed JSON files in `src/books-json` and the Genkit `getBookContent` tool.
- **Supports multiple question formats**: multiple choice, fill in the blank, true/false, and short answer.
- **Exports generated quizzes** as PDF, Word (`.docx`), or CSV.
- **Allows question regeneration** when a teacher wants a different version of a specific question.

## Tech stack

| Area | Technology |
| --- | --- |
| App framework | Next.js 15 App Router |
| UI | React 18, Tailwind CSS, Radix UI |
| AI orchestration | Genkit |
| AI provider | Google Gemini API via `@genkit-ai/google-genai` |
| Book content | Local pre-processed JSON files |
| Exports | `jspdf`, `html2canvas`, `docx`, CSV generation |
| OCR helper | `tesseract.js` |

## Project structure

```text
src/
├── ai/
│   ├── flows/              # Genkit flows for quiz generation and question regeneration
│   ├── tools/              # Genkit tools, including getBookContent
│   ├── gemini-models.ts    # Ordered Gemini fallback configuration
│   └── genkit.ts           # Shared Genkit instance and Google AI plugin setup
├── app/                    # Next.js App Router entry points
├── books-json/             # Pre-processed textbook JSON content
├── components/             # UI components for the quiz builder and preview
├── hooks/                  # Shared React hooks
├── lib/                    # Types, schemas, and utilities
└── services/               # Book inventory and OCR services
```

- **AI-Generated Questions**: Uses the Gemini API through Genkit with an ordered fallback chain (`gemini-3.7-flash` → `gemini-3.6-flash` → `gemini-3.5-flash-lite` → `gemini-3.1-flash-lite`) to create context-aware questions based on specific textbook pages.
- **Multiple Question Types**: Supports Multiple Choice, Fill-in-the-Blank, True/False, and Short Answer formats.
- **Smart Book Indexing**: Pre-processed JSON content from major ESL series (*Family and Friends*, *Four Corners*, *Viewpoint*) ensures fast retrieval without heavy OCR latency during generation.
- **Customizable Quizzes**: Filter by book, unit, page range, difficulty level, and topic focus.
- **Multi-Format Export**: Download quizzes instantly as:
  - 📄 **PDF** (Print-ready layout)
  - 📝 **Word (.docx)** (Editable format)
  - 📊 **CSV** (Data import)

- Node.js 18 or newer
- npm
- A Gemini API key from Google AI Studio

- **Framework**: Next.js 15 (App Router)
- **AI Engine**: Genkit with Google Gemini API model fallback
- **Styling**: Tailwind CSS + Radix UI primitives
- **Export Libraries**: `jspdf`, `html2canvas`, `docx`
- **State Management**: React Context + Hooks

Create `.env.local` in the repository root:

```env
GENKIT_ENV=dev
GOOGLE_API_KEY=your-gemini-api-key
```

## 🏃 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Gemini API key from Google AI Studio

## Getting started

1. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   GENKIT_ENV=dev
   GOOGLE_API_KEY=your-gemini-api-key
   ```

4. **Run the Development Servers**
   
   You need to run both the Next.js app and the Genkit AI server.

   ```bash
   npm run genkit:dev
   ```

3. **Start the Next.js app in another terminal**

   ```bash
   npm run dev
   ```

4. **Open the app**

   Visit [http://localhost:3000](http://localhost:3000).

## How quiz generation works

1. A teacher selects a book and enters a page range such as `10-15`.
2. The app sends the quiz settings to the `generateQuestions` Genkit flow.
3. The flow asks the model to call `getBookContent` for the selected book and page range.
4. The retrieved textbook text is used to create structured quiz output.
5. The flow tries the configured Gemini models in order. If one model fails, the next model is used automatically.
6. The UI displays the questions and answers, and the teacher can export the quiz.

## Question regeneration flow

When a teacher regenerates one question:

1. The app sends the original question and quiz settings to the `regenerateQuestion` flow.
2. The flow retrieves the same source pages with `getBookContent`.
3. The Gemini fallback chain is used again.
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

1. **Selection**: The teacher selects a textbook (e.g., *Four Corners Level 2*) and defines the scope (Unit 3, Pages 10-15).
2. **Retrieval**: The system uses `getBookContentTool` to fetch the pre-processed text for the specified pages from the `books-json` directory.
3. **Generation**: This content is sent to Gemini via a Genkit flow that tries `gemini-3.7-flash`, `gemini-3.6-flash`, `gemini-3.5-flash-lite`, and `gemini-3.1-flash-lite` in order until one model returns valid structured output.
4. **Refinement**: Regenerating a question uses the same retrieved page content and Gemini fallback chain, then returns structured JSON containing the new question, options when needed, and the correct answer.
5. **Export**: The user previews the quiz, makes manual edits if needed, and exports to PDF/Word.

## Notes for deployment

- Firebase App Hosting settings live in `apphosting.yaml`.
- The production environment must include a valid Gemini API key.
- The configured model IDs must be available to the Gemini API key used by the deployment. If the first model is unavailable, the app will try the next model in the fallback chain.

## License

This project is proprietary software developed for Dehkadeh-e-Zaban. All rights reserved.

## Support

For internal support, contact the Dehkadeh-e-Zaban development team.
