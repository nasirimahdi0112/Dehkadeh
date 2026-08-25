# QuizGenius (DehkadehQuiz) 🎓

An AI-powered web application that automatically generates English language learning quizzes from digitized textbooks. Designed for educators to quickly create pedagogically-appropriate quizzes tailored to students' proficiency levels.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Genkit](https://img.shields.io/badge/Google%20Genkit-AI-green?logo=google)

## ✨ Features

### 📚 Book Library
- **12 Pre-processed English Textbooks** including:
  - Family and Friends series (Levels 1-6)
  - Four Corners series (Levels 1-3)
  - Viewpoint series (Levels 1-3)
- OCR-extracted content stored in structured JSON format
- Page-by-page content with metadata

### 🤖 AI-Powered Question Generation
- **Adaptive Difficulty**: Questions adjust based on selected book level
- **Smart Content Analysis**: AI analyzes textbook content to generate relevant questions
- **Multiple Question Types**:
  - Multiple Choice
  - Fill in the Blank
  - True/False
  - Short Answer

### ⚙️ Quiz Configuration
- Select from available textbooks
- Choose question type(s)
- Specify number of questions
- Define page ranges
- Set difficulty levels

### 👁️ Preview & Edit
- Review generated questions before finalizing
- Toggle answer key visibility
- Edit questions as needed
- Validate question quality

### 📤 Export Options
- **PDF Export**: Professional formatting with jsPDF & html2canvas
- **Word Document Export**: Editable .docx files using docx library
- Ready-to-print classroom materials

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 15, React 18 |
| **Language** | TypeScript |
| **AI/ML** | Google Genkit, Generative AI |
| **UI Components** | Radix UI, Tailwind CSS |
| **Forms** | React Hook Form, Zod Validation |
| **OCR** | Tesseract.js |
| **Export** | jsPDF, html2canvas, docx |
| **Styling** | Tailwind CSS, Class Variance Authority |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Google Cloud API key (for Genkit AI features)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd quizgenius

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Google Cloud API key to .env.local
```

### Development

```bash
# Run the development server
npm run dev

# Open http://localhost:3000 in your browser
```

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📖 How It Works

1. **Select Book**: Choose from the library of 12 pre-processed English textbooks
2. **Configure Quiz**: Set question type, count, page range, and difficulty
3. **Generate Questions**: AI analyzes book content and creates adaptive questions
4. **Preview & Edit**: Review questions with optional answer key display
5. **Export**: Download as PDF or Word document for classroom use

## 📁 Project Structure

```
quizgenius/
├── src/
│   ├── app/                  # Next.js App Router pages
│   ├── components/           # Reusable React components
│   ├── lib/                  # Utility functions and configurations
│   ├── hooks/                # Custom React hooks
│   └── types/                # TypeScript type definitions
├── public/                   # Static assets
├── books/                    # Pre-processed textbook JSON files
└── docs/                     # Documentation
```

## 🎯 Use Cases

- **English Teachers**: Create customized quizzes in minutes
- **Schools**: Standardize assessment materials across classes
- **Tutors**: Generate practice exercises for individual students
- **Curriculum Developers**: Prototype question banks quickly

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
GOOGLE_GENAI_API_KEY=your_api_key_here
```

### Adding New Books

1. Process PDF textbook using OCR (see `docs/ocr-guide.md`)
2. Convert to JSON format following the schema
3. Place in `books/` directory
4. Update book registry in `src/lib/books.ts`

## 📄 Export Formats

### PDF Export
- Professional layout
- Includes answer key option
- Print-ready formatting

### Word Export
- Fully editable documents
- Compatible with Microsoft Word & Google Docs
- Preserves formatting and structure

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Genkit team for the AI framework
- Radix UI for accessible components
- Next.js team for the amazing framework
- All textbook publishers for educational content

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Contact: support@quizgenius.com

---

**Built with ❤️ for English educators worldwide**
