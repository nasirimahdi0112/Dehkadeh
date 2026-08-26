'use server';

import fs from 'fs/promises';
import path from 'path';
import type { Book } from '@/lib/types';

const booksJsonDirectory = path.join(process.cwd(), 'src', 'books-json');
const contentCache = new Map<string, string>();
const maxPageSpan = 50;
const maxContentLength = 100_000;
const maxCacheEntries = 100;

interface BookPage {
  pageNumber: number;
  text: string;
}

interface StoredPage {
  page?: number;
  pdfPage?: number;
  pageNumberDetected?: boolean;
  book?: string;
  content?: unknown;
}

interface IndexedPage extends BookPage {
  pdfPage: number;
}

/**
 * Formats a raw JSON filename into a readable book title.
 * Must be async because it is exported from a 'use server' file.
 */
export async function formatBookName(fileName: string): Promise<string> {
  return fileName
    .replace(/\.json$/, '')
    .replace(/_compact$/, '')
    .replace(/_SB$/, ' Student Book')
    .replace(/_CB$/, ' Course Book')
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
    .replace('Sb', 'Student Book')
    .replace('Wb', 'Workbook')
    .trim();
}

/**
 * Retrieves the list of available books from the local JSON store.
 */
export async function getBooksList(): Promise<{ fileName: string; name: string }[]> {
  try {
    const entries = await fs.readdir(booksJsonDirectory, { withFileTypes: true });
    const books = await Promise.all(
      entries
        .filter(entry => entry.isDirectory())
        .map(async entry => {
          try {
            const pageFiles = await getPageFiles(entry.name);
            if (pageFiles.length === 0) {
              return null;
            }

            const firstPage = await readPage(entry.name, pageFiles[0]);
            const name = typeof firstPage.book === 'string'
              ? await formatBookName(firstPage.book)
              : await formatBookName(entry.name);

            return { fileName: entry.name, name };
          } catch (error) {
            console.warn(`Skipping invalid book directory "${entry.name}".`, error);
            return null;
          }
        })
    );

    return books.filter((book): book is { fileName: string; name: string } => book !== null);
  } catch (error) {
    console.error('Error reading books directory:', error);
    return [];
  }
}

/**
 * Returns a list of books formatted for the UI selection.
 */
export async function getAvailableBooks(): Promise<Book[]> {
    const list = await getBooksList();
    return list.map(b => ({
        fileName: b.fileName,
        displayName: b.name
    }));
}

/**
 * Retrieves specific content from a book based on page range.
 */
export async function getBookContent(
  bookFileName: string,
  pageRange: string
): Promise<string> {
  try {
    const rangeMatch = pageRange.match(/^\s*(\d+)\s*-\s*(\d+)\s*$/);
    if (!rangeMatch) {
         throw new Error(`Invalid page range format: ${pageRange}. Expected 'X-Y'.`);
    }

    const startPageRaw = parseInt(rangeMatch[1], 10);
    const endPageRaw = parseInt(rangeMatch[2], 10);

    if (isNaN(startPageRaw) || isNaN(endPageRaw) || startPageRaw <= 0 || endPageRaw < startPageRaw) {
      throw new Error(`Invalid page range values: ${pageRange}`);
    }
    if (endPageRaw - startPageRaw + 1 > maxPageSpan) {
      throw new Error(`Page range cannot contain more than ${maxPageSpan} pages.`);
    }

    const cacheKey = `${bookFileName}-${startPageRaw}-${endPageRaw}-pages-v3`;
    if (contentCache.has(cacheKey)) {
      return contentCache.get(cacheKey)!;
    }

    const pages = await readIndexedPages(bookFileName);
    const selectedPages = pages.filter(
      page => page.pageNumber >= startPageRaw && page.pageNumber <= endPageRaw
    );

    if (selectedPages.length === 0) {
      throw new Error(`No pages found in range ${pageRange} for ${bookFileName}`);
    }

    const fullText = selectedPages
      .map(page => `[Page ${page.pageNumber}]\n${page.text}`)
      .join('\n\n');

    if (fullText.length > maxContentLength) {
      throw new Error(`Selected content exceeds the ${maxContentLength}-character limit.`);
    }

    if (contentCache.size >= maxCacheEntries) {
      const oldestKey = contentCache.keys().next().value;
      if (oldestKey) {
        contentCache.delete(oldestKey);
      }
    }
    contentCache.set(cacheKey, fullText);
    return fullText;

  } catch (error: unknown) {
    console.error(`Error reading book "${bookFileName}":`, error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Could not retrieve content for "${bookFileName}". Reason: ${errorMessage}`);
  }
}

/**
 * Returns the total page count for a given book JSON.
 */
export async function getBookPageCount(bookFileName: string): Promise<number> {
  try {
    const pages = await readIndexedPages(bookFileName);
    return Math.max(0, ...pages.map(page => page.pageNumber));
  } catch (error) {
    console.error(`Error getting page count for "${bookFileName}":`, error);
    return 0;
  }
}

async function getPageFiles(bookDirectory: string): Promise<string[]> {
  if (!/^[A-Za-z0-9][A-Za-z0-9_-]*$/.test(bookDirectory)) {
    throw new Error(`Invalid book directory: ${bookDirectory}`);
  }

  const directoryPath = path.join(booksJsonDirectory, bookDirectory);
  const entries = await fs.readdir(directoryPath, { withFileTypes: true });
  return entries
    .filter(entry => entry.isFile() && /^page_\d+\.json$/.test(entry.name))
    .map(entry => entry.name)
    .sort((left, right) => getFilePageNumber(left) - getFilePageNumber(right));
}

async function readPage(bookDirectory: string, pageFile: string): Promise<StoredPage> {
  const pagePath = path.join(booksJsonDirectory, bookDirectory, pageFile);
  return JSON.parse(await fs.readFile(pagePath, 'utf-8')) as StoredPage;
}

async function readIndexedPages(bookDirectory: string): Promise<IndexedPage[]> {
  const pageFiles = await getPageFiles(bookDirectory);
  const pageResults = await Promise.all(pageFiles.map(async file => {
    try {
      return { file, page: await readPage(bookDirectory, file) };
    } catch (error) {
      console.warn(`Skipping invalid page "${bookDirectory}/${file}".`, error);
      return null;
    }
  }));
  const sourcePages = pageResults.filter(
    (result): result is { file: string; page: StoredPage } => result !== null
  );
  const verifiedPages = sourcePages
    .map(({ page, file }) => ({ page, pdfPage: getFilePageNumber(file) }))
    .filter(({ page }) => page.pageNumberDetected === true && typeof page.page === 'number');

  return sourcePages.map(({ page, file }) => {
    const pdfPage = getFilePageNumber(file);
    return {
      pdfPage,
      pageNumber: getPrintedPageNumber(page, pdfPage, verifiedPages),
      text: extractText(page.content)
    };
  });
}

function getPrintedPageNumber(
  page: StoredPage,
  pdfPage: number,
  verifiedPages: { page: StoredPage; pdfPage: number }[]
): number {
  if (page.pageNumberDetected === true && typeof page.page === 'number') {
    return page.page;
  }

  const nearestVerifiedPage = verifiedPages.reduce((nearest, candidate) => {
    if (!nearest || Math.abs(candidate.pdfPage - pdfPage) < Math.abs(nearest.pdfPage - pdfPage)) {
      return candidate;
    }
    return nearest;
  }, undefined as { page: StoredPage; pdfPage: number } | undefined);

  if (!nearestVerifiedPage || typeof nearestVerifiedPage.page.page !== 'number') {
    return Math.max(1, page.page ?? pdfPage);
  }

  const inferredPage = pdfPage + (nearestVerifiedPage.page.page - nearestVerifiedPage.pdfPage);
  return Math.max(1, inferredPage);
}

function getFilePageNumber(pageFile: string): number {
  return Number(pageFile.match(/\d+/)?.[0] ?? 0);
}

function extractText(value: unknown): string {
  if (typeof value === 'string') {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map(extractText).filter(Boolean).join('\n');
  }
  if (value && typeof value === 'object') {
    return Object.values(value).map(extractText).filter(Boolean).join('\n');
  }
  return '';
}