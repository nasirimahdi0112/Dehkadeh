
# DehkadehQuiz: Architecture & Roadmap

DehkadehQuiz is a specialized AI-powered application designed for English language teachers at Dehkadeh-e-Zaban. It automates the creation of high-quality pop quizzes from established English learning series.

## 🏗️ Technical Architecture Overview

The app is built using **Next.js 15 (App Router)** and **Genkit** for GenAI orchestration.

### 1. JSON-Based Architecture (Source of Truth)
To ensure fast performance and stable deployment on platforms like Vercel, the app uses a lightweight JSON-based data structure instead of real-time PDF processing.

- **`src/books-json/`**: Contains pre-processed text content of textbooks in JSON format.
- **Lightweight**: The entire book library is ~20MB, far below deployment limits.
- **Speed**: Reading JSON is nearly instantaneous, preventing server timeouts during question generation.

### 2. Genkit AI Intelligence (`src/ai`)
- **Genkit Flows**: Decouples AI logic from the UI.
- **Gemini 3.5 Flash**: Uses the latest fast and efficient model.
- **Grounding Tool**: The `getBookContentTool` allows the AI to "read" specific pages from the JSON store to ensure questions are pedagogicaly accurate and grounded in the textbook.

### 3. Professional Export Engines
- **PDF Engine**: High-resolution (3x scale) capture using `jspdf` and `html2canvas`. Guaranteed separation of questions and answer key.
- **Word Engine**: Expertly typeset `.docx` files using native XML structures, supporting proper list numbering and professional styles.

### 4. Roadmap
- **Batch Processing**: A script to automatically convert more PDFs into the required JSON schema.
- **Interactive Quizzes**: A student portal for digital quiz taking.
- **Teacher Dashboard**: Save and manage previously generated quizzes.
