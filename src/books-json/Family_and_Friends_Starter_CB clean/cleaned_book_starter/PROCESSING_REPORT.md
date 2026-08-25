# Processing Report — Cleaned Learning Dataset

- **Book:** Family and Friends Starter Class Book (American)
- **Pipeline:** ocr_json_repair_starter_v1
- **Generated:** 2026-08-18T07:57:47.315109+00:00
- **Duration:** 0.8s

## Counts

| Metric | Value |
|--------|-------|
| PDF pages (input) | 83 |
| Input JSON pages | 83 |
| Output JSON pages | 83 |
| Pages verified against PDF | 47 |
| Pages needing review | 10 |

## Repairs applied (totals)

| Repair | Count |
|--------|-------|
| dialoguesSplit | 19 |
| garbageExcluded | 234 |
| grammarTopicOverride | 10 |
| phrase | 2 |
| vocabFromLabels | 83 |
| vocabPdfVerified | 40 |

## Validation

- countMatch: **True**
- duplicatePdfPageNumbers: none
- duplicateBookPageNumbers: none
- criticalIssues: none

## Page index

| File | pdf | book | type | vocab | ex | dial |
|------|-----|------|------|-------|----|------|
| page_001.json | 1 | None | cover | 0 | 0 | 0 |
| page_002.json | 2 | None | front_matter | 0 | 0 | 0 |
| page_003.json | 3 | 2 | scope_and_sequence | 0 | 0 | 0 |
| page_004.json | 4 | 3 | scope_and_sequence | 0 | 0 | 0 |
| page_005.json | 5 | 4 | lesson | 5 | 0 | 0 |
| page_006.json | 6 | 5 | grammar | 0 | 1 | 0 |
| page_007.json | 7 | 6 | lesson | 2 | 0 | 0 |
| page_008.json | 8 | 7 | lesson | 2 | 2 | 0 |
| page_009.json | 9 | 8 | lesson | 2 | 1 | 0 |
| page_010.json | 10 | 9 | lesson | 0 | 1 | 0 |
| page_011.json | 11 | 10 | lesson | 5 | 2 | 0 |
| page_012.json | 12 | 11 | grammar | 0 | 1 | 0 |
| page_013.json | 13 | 12 | lesson | 2 | 0 | 0 |
| page_014.json | 14 | 13 | lesson | 2 | 2 | 0 |
| page_015.json | 15 | 14 | lesson | 2 | 2 | 0 |
| page_016.json | 16 | 15 | lesson | 0 | 1 | 0 |
| page_017.json | 17 | 16 | lesson | 5 | 1 | 0 |
| page_018.json | 18 | 17 | grammar | 0 | 1 | 0 |
| page_019.json | 19 | 18 | lesson | 2 | 2 | 0 |
| page_020.json | 20 | 19 | lesson | 2 | 3 | 0 |
| page_021.json | 21 | 20 | lesson | 2 | 1 | 0 |
| page_022.json | 22 | 21 | lesson | 0 | 1 | 0 |
| page_023.json | 23 | 22 | lesson | 5 | 2 | 0 |
| page_024.json | 24 | 23 | grammar | 0 | 2 | 0 |
| page_025.json | 25 | 24 | lesson | 2 | 3 | 0 |
| page_026.json | 26 | 25 | lesson | 2 | 1 | 0 |
| page_027.json | 27 | 26 | lesson | 3 | 1 | 0 |
| page_028.json | 28 | 27 | lesson | 0 | 1 | 0 |
| page_029.json | 29 | 28 | values_time | 1 | 2 | 0 |
| page_030.json | 30 | 29 | page | 0 | 3 | 0 |
| page_031.json | 31 | 30 | review | 0 | 0 | 0 |
| page_032.json | 32 | 31 | review | 0 | 3 | 0 |
| page_033.json | 33 | 32 | lesson | 6 | 1 | 0 |
| page_034.json | 34 | 33 | grammar | 0 | 2 | 0 |
| page_035.json | 35 | 34 | lesson | 2 | 1 | 0 |
| page_036.json | 36 | 35 | lesson | 2 | 2 | 0 |
| page_037.json | 37 | 36 | lesson | 4 | 2 | 0 |
| page_038.json | 38 | 37 | lesson | 0 | 2 | 0 |
| page_039.json | 39 | 38 | lesson | 6 | 1 | 0 |
| page_040.json | 40 | 39 | grammar | 0 | 0 | 0 |
| page_041.json | 41 | 40 | lesson | 2 | 1 | 0 |
| page_042.json | 42 | 41 | lesson | 2 | 2 | 0 |
| page_043.json | 43 | 42 | lesson | 4 | 2 | 0 |
| page_044.json | 44 | 43 | lesson | 0 | 2 | 1 |
| page_045.json | 45 | 44 | lesson | 5 | 1 | 0 |
| page_046.json | 46 | 45 | grammar | 0 | 2 | 0 |
| page_047.json | 47 | 46 | lesson | 2 | 1 | 0 |
| page_048.json | 48 | 47 | lesson | 2 | 1 | 0 |
| page_049.json | 49 | 48 | lesson | 4 | 3 | 0 |
| page_050.json | 50 | 49 | lesson | 0 | 2 | 1 |
| page_051.json | 51 | 50 | values_time | 1 | 1 | 1 |
| page_052.json | 52 | 51 | page | 0 | 1 | 0 |
| page_053.json | 53 | 52 | review | 0 | 0 | 1 |
| page_054.json | 54 | 53 | review | 0 | 3 | 0 |
| page_055.json | 55 | 54 | lesson | 5 | 1 | 0 |
| page_056.json | 56 | 55 | grammar | 0 | 2 | 1 |
| page_057.json | 57 | 56 | lesson | 2 | 2 | 0 |
| page_058.json | 58 | 57 | lesson | 2 | 2 | 0 |
| page_059.json | 59 | 58 | lesson | 3 | 2 | 0 |
| page_060.json | 60 | 59 | lesson | 0 | 1 | 1 |
| page_061.json | 61 | 60 | lesson | 5 | 1 | 0 |
| page_062.json | 62 | 61 | grammar | 0 | 1 | 1 |
| page_063.json | 63 | 62 | lesson | 2 | 2 | 1 |
| page_064.json | 64 | 63 | lesson | 2 | 2 | 0 |
| page_065.json | 65 | 64 | lesson | 4 | 3 | 1 |
| page_066.json | 66 | 65 | lesson | 0 | 0 | 1 |
| page_067.json | 67 | 66 | lesson | 5 | 1 | 0 |
| page_068.json | 68 | 67 | grammar | 0 | 2 | 1 |
| page_069.json | 69 | 68 | lesson | 2 | 1 | 0 |
| page_070.json | 70 | 69 | lesson | 2 | 2 | 0 |
| page_071.json | 71 | 70 | lesson | 2 | 3 | 0 |
| page_072.json | 72 | 71 | lesson | 0 | 2 | 1 |
| page_073.json | 73 | 72 | values_time | 1 | 2 | 0 |
| page_074.json | 74 | 73 | page | 0 | 2 | 1 |
| page_075.json | 75 | 74 | review | 0 | 1 | 0 |
| page_076.json | 76 | 75 | review | 0 | 3 | 0 |
| page_077.json | 77 | 76 | page | 4 | 1 | 1 |
| page_078.json | 78 | 77 | song | 0 | 1 | 0 |
| page_079.json | 79 | 78 | picture_dictionary | 24 | 0 | 0 |
| page_080.json | 80 | 79 | picture_dictionary | 21 | 0 | 0 |
| page_081.json | 81 | 80 | picture_dictionary | 20 | 0 | 0 |
| page_082.json | 82 | None | publisher_metadata | 0 | 0 | 0 |
| page_083.json | 83 | None | back_cover | 0 | 0 | 0 |

## Notes

- `rawEvidence` = untouched OCR audit trail; `verifiedContent` = source-faithful reconstruction; `learningContent` = quiz-gen input.
- Definitions/translations/answer keys left `null` (no-hallucination policy).
---

## Verification methodology (Starter)

**All 47 vocabulary-teaching pages were verified against the actual PDFs** via
independent OCR cross-check (the agent in this environment has no human
vision, so it rendered each page from the scanned PDFs and OCRed it fresh):

1. Rendered each vocabulary page from the original PDFs at ~3x scale.
2. Ran a **fresh RapidOCR pass on the raw pixels** (`work/verify_pages.py`),
   independent of the upstream pipeline that produced the input JSONs.
3. Cross-checked every target word against this pass **and** the existing
   4-engine audit (`work/finalize_verification.py`).
4. Promoted a page only when its **entire word list** was corroborated.
   Result: **47 / 47 pages fully corroborated**, 0 words unresolved.

Two picture-dictionary entries were OCR'd poorly on the dictionary page but are
confirmed on their unit pages (cross-page evidence, recorded in the data):
- `cold` (dictionary p.79) — printed on Unit 5 words page (pdf 39)
- `pupil` (dictionary p.80) — OCR reads it as "I!dnd"; Unit 7 summary line
  reads "pupil, teacher, waiter, vet, builder"

Corroborated pages carry `verifiedAgainstPdf=true`,
`verificationMethod="independent_ocr_crosscheck"`, vocabulary
`evidence:"pdf_verified"` (confidence 0.99).

## Book structure (Family and Friends Starter)

- Starter unit + 9 units, each with 6 lessons: **Words → Grammar & song →
  Sounds & letters → Numbers → Sounds & letters → Story**
- Plus Values Time (x3), Reviews (x3), Culture, and a 3-page Picture Dictionary
- Vocabulary-teaching pages: 10 Words + 20 Sounds & letters + 10 Numbers + 3
  Values + 1 Culture + 3 Picture Dictionary = **47 pages**
- Letter sounds recorded under `learningContent.pronunciation`
  (Aa, Bb, Cc, ... Zz)
- Grammar pages carry the Q&A pattern as `grammar[].topic`
  ("What's this?", "I've got a ...", etc.)

## Review flags

10 pages are marked `needsReview` (threshold calibrated to 0.70 for this
book's stylized fonts): pages 6, 9, 12, 19, 27, 46, 48, 64, 67, 70. Of these,
7 are vocabulary pages whose target words are already independently verified
(the flag concerns the surrounding instruction/dialogue text); 3 are grammar
pages (6, 12, 46) with noisy page text. The Starter book's decorative fonts
OCR noticeably worse than the higher-level books (many pages 0.65–0.75
average confidence), which is why these pages are flagged for optional
human review.

**No-hallucination policy upheld:** no word, definition, translation, speaker,
or answer key was invented. Definitions/translations/answer keys remain `null`.
