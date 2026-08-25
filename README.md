
# Task: High-Fidelity OCR Extraction of Scanned PDF Books to JSON

## Context
You are processing scanned PDF books (image-based, not text-based) for an English language learning application. Each book has approximately 150-200 pages and contains:
- English text (lessons, dialogues, exercises)
- Tables (vocabulary lists, grammar charts)
- Images with embedded text (speech bubbles, labels)
- Page numbers (printed on the actual book pages, not PDF page numbers)
- Watermarks/advertisements from scanning websites (MUST BE IGNORED)

## Objective
Extract EVERY page of the PDF with 99%+ accuracy and output as individual JSON files, packaged in a ZIP archive.

## Input
- Single PDF file (scanned, image-based)
- Approximately 150-200 pages per book

## Output
- ZIP file containing N JSON files (one per page)
- Example: `Family_and_Friends_1_SB.zip` containing:
  - `page_001.json`
  - `page_002.json`
  - ...
  - `page_200.json`

## Technical Requirements

### 1. OCR Engine Selection
Use the BEST available OCR solution for maximum accuracy:

**Priority Order:**
1. **Google Cloud Vision API** (Document Text Detection) - HIGHEST ACCURACY
2. **Tesseract.js** with LSTM model + English language pack
3. **pdf.js** + **Tesseract** combination

**Configuration:**
- Language: English (`eng`)
- DPI: 300 (upscale if source is lower)
- Pre-processing: Auto-rotation, deskew, noise reduction

### 2. Content Extraction Scope
Extract ALL content types:

✅ **Text:**
- Paragraphs (maintain reading order)
- Headings (detect by font size/weight)
- Dialogues (speaker labels + speech)
- Exercise instructions
- Vocabulary words + definitions

✅ **Tables:**
- Preserve row/column structure
- Include headers
- Convert to nested arrays or objects

✅ **Images with Text:**
- Speech bubbles (extract text + position)
- Labels and captions
- Diagrams with text annotations

✅ **Page Number:**
- Detect the ACTUAL book page number (usually bottom-center or bottom-corner)
- NOT the PDF page number
- Format: integer (e.g., 1, 2, 3... not "Page 1" or "i, ii, iii")

❌ **IGNORE (Do Not Extract):**
- Watermarks from scanning websites (e.g., "Scan by XYZ", website URLs)
- Advertisements
- QR codes
- Barcodes
- Scanner metadata

### 3. Page Number Detection Algorithm
The PDF page number ≠ Book page number. Use this logic:

```
For each page:
1. Extract text from bottom 10% of the page
2. Look for standalone numbers (1-3 digits)
3. Common positions: bottom-center, bottom-right, bottom-left
4. Ignore numbers that are part of sentences
5. If multiple numbers found, prefer the one that:
   - Is isolated (surrounded by whitespace)
   - Matches sequential pattern (previous page + 1)
6. If no page number detected:
   - Use PDF page number as fallback
   - Add flag: "pageNumberDetected": false
```

### 4. Watermark/Advertisement Detection
Identify and exclude scanning website artifacts:

**Common Patterns:**
- Repeated text across multiple pages (e.g., "Downloaded from www.example.com")
- URLs (http://, www.)
- Email addresses in footer
- "Scan by [Name]" signatures
- Logos in corners

**Detection Method:**
```
1. Extract text from all pages
2. Find strings that appear in >80% of pages
3. Classify as watermark if:
   - Contains URL pattern
   - Contains email pattern
   - Contains "scan", "download", "www" keywords
   - Located in corners (top 5% or bottom 5% of page)
4. Exclude these strings from JSON output
```

### 5. JSON Schema (Per Page)

Each `page_XXX.json` must follow this structure:

```json
{
  "pageNumber": 42,
  "pageNumberDetected": true,
  "pdfPageNumber": 45,
  "content": {
    "text": [
      {
        "type": "heading",
        "content": "Unit 5: My Family",
        "confidence": 0.98
      },
      {
        "type": "paragraph",
        "content": "This is my family. My father is a doctor. My mother is a teacher.",
        "confidence": 0.95
      },
      {
        "type": "dialogue",
        "speaker": "Anna",
        "content": "Hello! My name is Anna.",
        "confidence": 0.97
      }
    ],
    "tables": [
      {
        "headers": ["Word", "Meaning", "Example"],
        "rows": [
          ["doctor", "a person who helps sick people", "My father is a doctor."],
          ["teacher", "a person who teaches students", "My mother is a teacher."]
        ]
      }
    ],
    "images": [
      {
        "description": "Family photo with labels",
        "text": ["Father", "Mother", "Sister", "Brother"],
        "position": {
          "x": 150,
          "y": 200,
          "width": 400,
          "height": 300
        }
      }
    ]
  },
  "metadata": {
    "ocrEngine": "Google Cloud Vision",
    "processingTime": "2.3s",
    "averageConfidence": 0.96,
    "watermarksRemoved": [
      "Downloaded from www.example.com"
    ]
  }
}
```

### 6. Quality Assurance Checklist

Before delivering the ZIP, verify:

- [ ] **Completeness:** Number of JSON files = Number of PDF pages
- [ ] **Page Numbers:** Sequential and logical (1, 2, 3... or 45, 46, 47...)
- [ ] **No Empty Pages:** Every JSON has at least some content
- [ ] **Watermark Removal:** Common scanning site text excluded
- [ ] **Table Integrity:** Tables preserved as structured data, not plain text
- [ ] **Text Accuracy:** Spot-check 5 random pages for OCR errors
- [ ] **Image Text:** All visible text in images extracted

### 7. Error Handling

**If OCR confidence < 80%:**
- Flag the page in metadata: `"lowConfidence": true`
- Attempt re-processing with different settings (higher DPI, different engine)
- If still low confidence, include raw OCR output with warning

**If page number not detected:**
- Use PDF page number as fallback
- Set `"pageNumberDetected": false`
- Log warning: "Could not detect book page number for PDF page 45"

**If table structure unclear:**
- Extract as plain text with table markers
- Set `"tableStructureConfidence": "low"`
- Suggest manual review

### 8. Delivery Format

**File Naming:**
- ZIP: `{book_name}.zip` (e.g., `Family_and_Friends_1_SB.zip`)
- JSON files: `page_XXX.json` (zero-padded to 3 digits)
  - `page_001.json`
  - `page_002.json`
  - `page_100.json`

**ZIP Structure:**
```
Family_and_Friends_1_SB.zip
├── page_001.json
├── page_002.json
├── ...
└── page_200.json
```

### 9. Implementation Steps

1. **Load PDF:**
   - Use `pdf.js` or `PyMuPDF` to iterate through pages
   - Get total page count

2. **Process Each Page:**
   - Convert page to image (PNG, 300 DPI)
   - Run OCR (Google Vision or Tesseract)
   - Extract text with confidence scores
   - Detect page number (bottom region)
   - Detect watermarks (compare with other pages)
   - Extract tables (detect grid lines or structured text)
   - Extract images with text

3. **Build JSON:**
   - Structure content according to schema
   - Add metadata
   - Validate JSON syntax

4. **Package:**
   - Write all JSON files to temp directory
   - Create ZIP archive
   - Delete temp files
   - Return ZIP file path

### 10. Success Criteria

✅ **MUST HAVE:**
- All pages extracted (no missing pages)
- Page numbers correctly detected (or flagged as fallback)
- Watermarks excluded
- JSON files valid and parseable
- Tables preserved as structured data

✅ **NICE TO HAVE:**
- Average OCR confidence > 90%
- Images with text fully extracted
- Dialogue speakers correctly identified
- Headings detected by font size

## Tools You Can Use

- **Google Cloud Vision API** (if API key available)
- **Tesseract.js** (Node.js) or **pytesseract** (Python)
- **pdf.js** or **PyMuPDF** for PDF rendering
- **sharp** or **jimp** for image processing
- **adm-zip** or **archiver** for ZIP creation

## Example Command

```
Input: /path/to/Family_and_Friends_1_SB.pdf
Output: /path/to/Family_and_Friends_1_SB.zip
```

## Final Notes

- Take your time for accuracy (better slow than wrong)
- If unsure about page number, use PDF page number and flag it
- If watermark detection is uncertain, err on the side of exclusion
- Log all processing steps for debugging
- This data will be used to generate English learning questions, so accuracy is CRITICAL

Please process the PDF and deliver the ZIP file.
# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.
