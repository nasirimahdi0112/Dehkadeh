# DehkadehQuiz

An AI-powered quiz generation tool designed for English language teachers at **Dehkadeh-e-Zaban**. Automatically create pedagogically sound pop quizzes from your textbooks using Google's Gemini AI.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![Genkit](https://img.shields.io/badge/Genkit-AI-orange?logo=google)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?logo=tailwind-css)

## 🚀 Features

- **AI-Generated Questions**: Leverages Google Gemini 1.5 Flash to create context-aware questions based on specific textbook pages.
- **Multiple Question Types**: Supports Multiple Choice, Fill-in-the-Blank, True/False, and Short Answer formats.
- **Smart Book Indexing**: Pre-processed JSON content from major ESL series (*Family and Friends*, *Four Corners*, *Viewpoint*) ensures fast retrieval without heavy OCR latency during generation.
- **Customizable Quizzes**: Filter by book, unit, page range, difficulty level, and topic focus.
- **Multi-Format Export**: Download quizzes instantly as:
  - 📄 **PDF** (Print-ready layout)
  - 📝 **Word (.docx)** (Editable format)
  - 📊 **CSV** (Data import)

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **AI Engine**: Genkit with Google Gemini 1.5 Flash
- **Styling**: Tailwind CSS + Radix UI primitives
- **Export Libraries**: `jspdf`, `html2canvas`, `docx`
- **State Management**: React Context + Hooks

## 📂 Project Structure

```bash
src/
├── ai/                 # Genkit flows, prompts, and tools
│   ├── flows/          # Main quiz generation logic
│   └── tools/          # Custom tools (e.g., getBookContentTool)
├── books-json/         # Pre-processed textbook content (JSON)
├── components/         # Reusable React UI components
├── services/           # Business logic (Book inventory, OCR helpers)
└── app/                # Next.js App Router pages
```

## 🏃 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- A Google Cloud project with Vertex AI enabled (for Genkit)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd DehkadehQuiz
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory:
   ```env
   GENKIT_ENV=dev
   # Add any required Google Cloud credentials here if not using default auth
   GOOGLE_APPLICATION_CREDENTIALS=./path/to/service-account.json
   ```

4. **Run the Development Servers**
   
   You need to run both the Next.js app and the Genkit AI server.

   **Terminal 1 (Genkit):**
   ```bash
   npm run genkit:dev
   ```

   **Terminal 2 (Next.js App):**
   ```bash
   npm run dev
   ```

5. **Open the App**
   Navigate to [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 How It Works

1. **Selection**: The teacher selects a textbook (e.g., *Four Corners Level 2*) and defines the scope (Unit 3, Pages 10-15).
2. **Retrieval**: The system uses `getBookContentTool` to fetch the pre-processed text for the specified pages from the `books-json` directory.
3. **Generation**: This content is sent to Gemini via a Genkit flow with a prompt engineered to act as an expert ESL teacher.
4. **Refinement**: The AI returns structured JSON containing questions, options, correct answers, and explanations.
5. **Export**: The user previews the quiz, makes manual edits if needed, and exports to PDF/Word.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add some amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

## 📄 License

This project is proprietary software developed for Dehkadeh-e-Zaban. All rights reserved.

## 📞 Support

For internal support, please contact the development team at Dehkadeh-e-Zaban.
