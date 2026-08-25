'use server';

import fs from 'fs/promises';
import path from 'path';
import type { Book } from '@/lib/types';

const booksJsonDirectory = path.join(process.cwd(), 'src', 'books-json');
const contentCache = new Map<string, string>();

interface BookPage {
  pageNumber: number;
  text: string;
}

interface BookContent {
  fileName: string;
  bookName: string;
  totalPages: number;
  pages: BookPage[];
  processedAt: string;
}

/**
 * Formats a raw JSON filename into a readable book title.
 * Must be async because it is exported from a 'use server' file.
 */
export async function formatBookName(fileName: string): Promise<string> {
  return fileName
    .replace('.json', '')
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
    const files = await fs.readdir(booksJsonDirectory);
    const jsonFiles = files.filter(file => file.endsWith('.json'));
    
    // formatBookName is now async, so we use Promise.all to resolve names
    const books = await Promise.all(
      jsonFiles.map(async (file) => ({
        fileName: file,
        name: await formatBookName(file)
      }))
    );

    return books;
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
  const cacheKey = `${bookFileName}-${pageRange}-json-v1`;
  if (contentCache.has(cacheKey)) {
    return contentCache.get(cacheKey)!;
  }

  const filePath = path.join(booksJsonDirectory, bookFileName);

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

    const jsonContent = await fs.readFile(filePath, 'utf-8');
    const bookData: BookContent = JSON.parse(jsonContent);

    const selectedPages = bookData.pages.filter(
      page => page.pageNumber >= startPageRaw && page.pageNumber <= endPageRaw
    );

    if (selectedPages.length === 0) {
      throw new Error(`No pages found in range ${pageRange} for ${bookFileName}`);
    }

    const fullText = selectedPages
      .map(page => `[Page ${page.pageNumber}]\n${page.text}`)
      .join('\n\n');

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
  const filePath = path.join(booksJsonDirectory, bookFileName);
  
  try {
    const jsonContent = await fs.readFile(filePath, 'utf-8');
    const bookData: BookContent = JSON.parse(jsonContent);
    return bookData.totalPages;
  } catch (error) {
    console.error(`Error getting page count for "${bookFileName}":`, error);
    return 0;
  }
}