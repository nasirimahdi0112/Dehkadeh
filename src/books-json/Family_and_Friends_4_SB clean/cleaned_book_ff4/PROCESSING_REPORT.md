# Processing Report — Cleaned Learning Dataset

- **Book:** Family and Friends 4 Student Book (American)
- **Pipeline:** ocr_json_repair_ff4_v1
- **Generated:** 2026-08-18T07:16:07.478758+00:00
- **Duration:** 2.8s

## Counts

| Metric | Value |
|--------|-------|
| PDF pages (input) | 128 |
| Input JSON pages | 128 |
| Output JSON pages | 128 |
| Pages verified against PDF | 37 |
| Pages needing review | 1 |

## Repairs applied (totals)

| Repair | Count |
|--------|-------|
| charfix | 1 |
| dialoguesSplit | 240 |
| garbageExcluded | 167 |
| grammarTopicInferred | 25 |
| grammarTopicOverride | 30 |
| multiword | 12 |
| phrase | 3 |
| songsExtractedFromText | 12 |
| vocabFromLabels | 169 |
| vocabPdfVerified | 36 |

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
| page_005.json | 5 | 4 | lesson | 0 | 0 | 1 |
| page_006.json | 6 | 5 | grammar | 0 | 2 | 1 |
| page_007.json | 7 | 6 | lesson | 6 | 1 | 1 |
| page_008.json | 8 | 7 | lesson | 12 | 2 | 1 |
| page_009.json | 9 | 8 | lesson | 12 | 0 | 1 |
| page_010.json | 10 | 9 | grammar | 0 | 0 | 1 |
| page_011.json | 11 | 10 | grammar | 0 | 1 | 1 |
| page_012.json | 12 | 11 | phonics | 6 | 2 | 0 |
| page_013.json | 13 | 12 | skills_time | 0 | 2 | 1 |
| page_014.json | 14 | 13 | listening_speaking_writing | 0 | 7 | 0 |
| page_015.json | 15 | 14 | fluency_time | 0 | 3 | 1 |
| page_016.json | 16 | 15 | page | 0 | 2 | 1 |
| page_017.json | 17 | 16 | lesson | 10 | 0 | 1 |
| page_018.json | 18 | 17 | grammar | 0 | 3 | 0 |
| page_019.json | 19 | 18 | grammar | 0 | 4 | 1 |
| page_020.json | 20 | 19 | phonics | 9 | 3 | 0 |
| page_021.json | 21 | 20 | skills_time | 0 | 3 | 1 |
| page_022.json | 22 | 21 | listening_speaking_writing | 0 | 3 | 1 |
| page_023.json | 23 | 22 | social_studies_time | 6 | 4 | 1 |
| page_024.json | 24 | 23 | page | 0 | 3 | 0 |
| page_025.json | 25 | 24 | lesson | 10 | 0 | 1 |
| page_026.json | 26 | 25 | grammar | 0 | 2 | 0 |
| page_027.json | 27 | 26 | grammar | 0 | 4 | 1 |
| page_028.json | 28 | 27 | phonics | 6 | 2 | 0 |
| page_029.json | 29 | 28 | skills_time | 0 | 3 | 0 |
| page_030.json | 30 | 29 | listening_speaking_writing | 0 | 3 | 1 |
| page_031.json | 31 | 30 | review | 0 | 2 | 0 |
| page_032.json | 32 | 31 | review | 0 | 2 | 0 |
| page_033.json | 33 | 32 | lesson | 10 | 0 | 1 |
| page_034.json | 34 | 33 | grammar | 0 | 3 | 1 |
| page_035.json | 35 | 34 | grammar | 0 | 0 | 1 |
| page_036.json | 36 | 35 | phonics | 5 | 3 | 0 |
| page_037.json | 37 | 36 | skills_time | 0 | 4 | 0 |
| page_038.json | 38 | 37 | listening_speaking_writing | 0 | 2 | 1 |
| page_039.json | 39 | 38 | fluency_time | 0 | 1 | 1 |
| page_040.json | 40 | 39 | page | 0 | 0 | 1 |
| page_041.json | 41 | 40 | lesson | 10 | 0 | 1 |
| page_042.json | 42 | 41 | grammar | 0 | 2 | 0 |
| page_043.json | 43 | 42 | grammar | 0 | 1 | 0 |
| page_044.json | 44 | 43 | phonics | 7 | 0 | 0 |
| page_045.json | 45 | 44 | skills_time | 0 | 2 | 0 |
| page_046.json | 46 | 45 | listening_speaking_writing | 0 | 1 | 0 |
| page_047.json | 47 | 46 | geography_time | 6 | 3 | 1 |
| page_048.json | 48 | 47 | page | 0 | 1 | 0 |
| page_049.json | 49 | 48 | lesson | 10 | 0 | 1 |
| page_050.json | 50 | 49 | grammar | 0 | 4 | 0 |
| page_051.json | 51 | 50 | grammar | 0 | 2 | 0 |
| page_052.json | 52 | 51 | phonics | 5 | 2 | 0 |
| page_053.json | 53 | 52 | skills_time | 0 | 3 | 1 |
| page_054.json | 54 | 53 | listening_speaking_writing | 0 | 2 | 0 |
| page_055.json | 55 | 54 | review | 0 | 0 | 1 |
| page_056.json | 56 | 55 | review | 0 | 3 | 1 |
| page_057.json | 57 | 56 | lesson | 10 | 1 | 1 |
| page_058.json | 58 | 57 | grammar | 0 | 4 | 1 |
| page_059.json | 59 | 58 | song | 0 | 3 | 0 |
| page_060.json | 60 | 59 | phonics | 8 | 1 | 0 |
| page_061.json | 61 | 60 | lesson | 0 | 2 | 1 |
| page_062.json | 62 | 61 | listening_speaking_writing | 0 | 3 | 1 |
| page_063.json | 63 | 62 | fluency_time | 0 | 2 | 1 |
| page_064.json | 64 | 63 | page | 0 | 0 | 1 |
| page_065.json | 65 | 64 | lesson | 10 | 0 | 1 |
| page_066.json | 66 | 65 | grammar | 0 | 3 | 1 |
| page_067.json | 67 | 66 | grammar | 0 | 3 | 1 |
| page_068.json | 68 | 67 | phonics | 6 | 1 | 0 |
| page_069.json | 69 | 68 | skills_time | 0 | 2 | 0 |
| page_070.json | 70 | 69 | listening_speaking_writing | 0 | 4 | 0 |
| page_071.json | 71 | 70 | science_time | 6 | 3 | 0 |
| page_072.json | 72 | 71 | page | 0 | 1 | 1 |
| page_073.json | 73 | 72 | lesson | 10 | 0 | 1 |
| page_074.json | 74 | 73 | grammar | 0 | 5 | 1 |
| page_075.json | 75 | 74 | grammar | 0 | 3 | 1 |
| page_076.json | 76 | 75 | phonics | 6 | 3 | 0 |
| page_077.json | 77 | 76 | skills_time | 0 | 2 | 0 |
| page_078.json | 78 | 77 | listening_speaking_writing | 0 | 3 | 1 |
| page_079.json | 79 | 78 | review | 0 | 3 | 1 |
| page_080.json | 80 | 79 | review | 0 | 1 | 1 |
| page_081.json | 81 | 80 | lesson | 9 | 1 | 1 |
| page_082.json | 82 | 81 | grammar | 0 | 4 | 1 |
| page_083.json | 83 | 82 | song | 0 | 2 | 0 |
| page_084.json | 84 | 83 | phonics | 6 | 3 | 0 |
| page_085.json | 85 | 84 | skills_time | 0 | 4 | 1 |
| page_086.json | 86 | 85 | listening_speaking_writing | 0 | 3 | 0 |
| page_087.json | 87 | 86 | fluency_time | 0 | 2 | 1 |
| page_088.json | 88 | 87 | page | 0 | 2 | 1 |
| page_089.json | 89 | 88 | lesson | 10 | 0 | 1 |
| page_090.json | 90 | 89 | grammar | 0 | 3 | 1 |
| page_091.json | 91 | 90 | grammar | 0 | 2 | 0 |
| page_092.json | 92 | 91 | phonics | 7 | 2 | 0 |
| page_093.json | 93 | 92 | skills_time | 0 | 4 | 0 |
| page_094.json | 94 | 93 | listening_speaking_writing | 0 | 1 | 1 |
| page_095.json | 95 | 94 | art_time | 6 | 2 | 0 |
| page_096.json | 96 | 95 | page | 0 | 1 | 0 |
| page_097.json | 97 | 96 | lesson | 9 | 0 | 1 |
| page_098.json | 98 | 97 | grammar | 0 | 3 | 0 |
| page_099.json | 99 | 98 | grammar | 0 | 3 | 1 |
| page_100.json | 100 | 99 | phonics | 8 | 2 | 0 |
| page_101.json | 101 | 100 | skills_time | 0 | 0 | 1 |
| page_102.json | 102 | 101 | listening_speaking_writing | 0 | 5 | 1 |
| page_103.json | 103 | 102 | review | 0 | 3 | 1 |
| page_104.json | 104 | 103 | review | 0 | 2 | 1 |
| page_105.json | 105 | 104 | lesson | 10 | 0 | 0 |
| page_106.json | 106 | 105 | grammar | 0 | 3 | 1 |
| page_107.json | 107 | 106 | grammar | 0 | 5 | 0 |
| page_108.json | 108 | 107 | phonics | 7 | 2 | 0 |
| page_109.json | 109 | 108 | skills_time | 0 | 3 | 0 |
| page_110.json | 110 | 109 | listening_speaking_writing | 0 | 2 | 0 |
| page_111.json | 111 | 110 | fluency_time | 0 | 1 | 1 |
| page_112.json | 112 | 111 | page | 0 | 2 | 1 |
| page_113.json | 113 | 112 | lesson | 8 | 2 | 1 |
| page_114.json | 114 | 113 | grammar | 0 | 3 | 1 |
| page_115.json | 115 | 114 | grammar | 0 | 2 | 1 |
| page_116.json | 116 | 115 | phonics | 5 | 3 | 0 |
| page_117.json | 117 | 116 | skills_time | 0 | 2 | 1 |
| page_118.json | 118 | 117 | listening_speaking_writing | 0 | 6 | 1 |
| page_119.json | 119 | 118 | page | 6 | 2 | 0 |
| page_120.json | 120 | 119 | page | 0 | 2 | 0 |
| page_121.json | 121 | 120 | lesson | 10 | 2 | 1 |
| page_122.json | 122 | 121 | grammar | 0 | 2 | 0 |
| page_123.json | 123 | 122 | grammar | 0 | 3 | 1 |
| page_124.json | 124 | 123 | phonics | 6 | 4 | 0 |
| page_125.json | 125 | 124 | skills_time | 0 | 2 | 0 |
| page_126.json | 126 | 125 | listening_speaking_writing | 0 | 0 | 0 |
| page_127.json | 127 | 126 | review | 0 | 1 | 1 |
| page_128.json | 128 | 127 | review | 0 | 1 | 0 |

## Notes

- `rawEvidence` = untouched OCR audit trail; `verifiedContent` = source-faithful reconstruction; `learningContent` = quiz-gen input.
- Definitions/translations/answer keys left `null` (no-hallucination policy).
---

## Verification methodology (FF4)

**All 37 vocabulary-teaching pages were verified against the actual PDFs.**
The agent in this environment has no human-vision capability, so instead of
eyeballing rendered pages, the verification was done by **independent OCR
cross-check against the source PDFs**:

1. Rendered each vocabulary page from the original scanned PDFs at ~3× scale.
2. Ran a **fresh RapidOCR pass on the raw rendered pixels** (`work/verify_pages.py`),
   independent of the upstream pipeline that produced the input JSONs.
3. Cross-checked every target word against this independent pass **and** the
   existing 4-engine audit (`RapidOCR + 3 Tesseract PSMs`) already in the
   input (`work/finalize_verification.py`).
4. Promoted a page to verified only when **its entire word list** was
   corroborated. Result: **37 / 37 pages fully corroborated**, 0 words missing.

Corroborated pages carry:
- `quality.verifiedAgainstPdf = true`
- `quality.verificationMethod = "independent_ocr_crosscheck"`
- vocabulary `evidence: "pdf_verified"` (confidence 0.99)

**Resolutions applied during cross-check** (no invention — all read from the page):
- Multi-line word cards matched word-by-word (e.g. "memory" + "stick" →
  "memory stick"; "a sore" + "throat" → "a sore throat").
- `eather` → **weather** (unit 11 phonics "ea" sound; stylized "w" dropped by
  every OCR engine).

**Still flagged for human review:** `page_116.json` (Unit 14 phonics) — its
"math competition" poster produced 13/36 garbage text elements. Its 5 target
words are verified present, but the page's non-vocabulary text is noisy, so
`needsReview` stays true.

**Caveat:** this is OCR-to-OCR corroboration (5 engines total), which is strong
but is not the same as human visual confirmation. If a vision-capable agent
re-verifies any page by eye, its words should match — the plumbing for that
(`pdf_verified_vocab` + `verification_method: "vision"`) is unchanged.

**No-hallucination policy upheld:** no word, definition, translation, speaker,
or answer key was invented. Definitions/translations/answer keys remain `null`.
