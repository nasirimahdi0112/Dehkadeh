
# DehkadehQuiz: Architecture & Roadmap

DehkadehQuiz is a specialized AI-powered application designed for English language teachers at Dehkadeh-e-Zaban. It automates the creation of high-quality pop quizzes from established English learning series.

## Technical Architecture Overview

The app is built using **Next.js 15 (App Router)** and **Genkit** for GenAI orchestration.

### 1. JSON-Based Architecture (Source of Truth)
To ensure fast performance and stable deployment on platforms like Vercel, the app uses a lightweight JSON-based data structure instead of real-time PDF processing.

- **`src/books-json/`**: Contains one directory per textbook, with one structured JSON file per scanned page.
- **Printed page mapping**: Each page stores its PDF position and printed page number. Unverified numbers use the nearest verified offset pattern for that book.
- **Retrieval**: The inventory service extracts structured content, supports printed page ranges, and bounds request size and cache growth.

### 2. Genkit AI Intelligence (`src/ai`)
- **Genkit Flows**: Decouple AI logic from the UI.
- **Gemini fallback**: `src/ai/gemini-models.ts` tries configured models in order, with response validation and a per-model timeout.
- **Grounding Tool**: The `getBookContentTool` allows the AI to read selected pages from the JSON store so questions stay grounded in the textbook.

### 3. Professional Export Engines
- **PDF Engine**: Per-question capture using `jspdf` and `html2canvas`, with questions and answer key on separate sections.
- **Word Engine**: Expertly typeset `.docx` files using native XML structures, supporting proper list numbering and professional styles.

### 4. Roadmap
- **Book ingestion**: Define and document a repeatable process for converting additional PDFs into the current page JSON schema.
- **Interactive Quizzes**: A student portal for digital quiz taking.
- **Teacher Dashboard**: Save and manage previously generated quizzes.
