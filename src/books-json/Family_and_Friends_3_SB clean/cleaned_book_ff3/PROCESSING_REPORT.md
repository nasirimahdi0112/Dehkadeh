# Processing Report: Family and Friends 3 Student Book (American)

## Book
- **Title:** Family and Friends 3 Student Book (American)
- **Publisher:** Oxford University Press
- **Source PDFs:**
  - `Family and Friends 3 SB_Part1.pdf` (91 pages)
  - `Family and Friends 3 SB_Part2.pdf` (42 pages)

## Counts
| Metric | Value |
|--------|------:|
| PDF page count | 133 |
| Input OCR JSON files | 133 |
| Output cleaned JSON files | 133 |
| Pages processed | 133 |
| Pages verified against PDF | 37 |
| Pages needing review | 8 |

## Processing summary
| Item | Count |
|------|------:|
| Pages repaired | 131 |
| Vocabulary items | 1185 |
| Dialogues reconstructed | 90 |
| Exercises reconstructed | 463 |
| OCR text repairs | 1461 |
| Garbage excluded | 279 |
| Grammar sections | 29 |
| Tables | 22 |
| PDF-verified vocab pages | 37 |

## Methodology
1. Reused existing OCR JSON (no full-book re-OCR).
2. Preserved original OCR under `rawEvidence`.
3. Built `verifiedContent` (spacing repair, OCR fixes, garbage exclusion, dialogue/exercise reconstruction).
4. Built `learningContent` for quiz generation without invented definitions/translations/answers.
5. PDF visual verification on unit Words/phonics/skills vocabulary pages (37 pages).

## Known issues flagged for review
Part2 early pages appear to **reprint** some Part1 book page numbers (89–92), producing duplicate `pageNumber` values across:
- page_090 / page_095 (book 89)
- page_091 / page_094 (book 90)
- page_092 / page_096 (book 91)
- page_093 / page_097 (book 92)

These are flagged with `needsReview=true`. PDF page indices remain unique and authoritative via `pdfPageNumber`.

## Validation
- PDF == input == output counts: **True**
- UTF-8 JSON parse: **True**
- Duplicate printed page numbers: **4 groups (flagged)**
- Spot-checks (Starter My family, Unit 1 Countries) vs PDF: **PASS**

## Deliverables
```text
cleaned_book_ff3/
├── manifest.json
├── PROCESSING_REPORT.md
├── page_001.json
└── ... page_133.json
```
