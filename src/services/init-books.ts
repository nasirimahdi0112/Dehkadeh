'use server';

import fs from 'fs/promises';
import path from 'path';

/**
 * Utility to verify and list the currently active book library.
 */
export async function verifyBookLibrary() {
  const booksDir = path.join(process.cwd(), 'src', 'books-json');
  try {
    const files = await fs.readdir(booksDir);
    return {
      status: 'success',
      count: files.filter(f => f.endsWith('.json')).length,
      books: files.filter(f => f.endsWith('.json'))
    };
  } catch (error) {
    return { status: 'error', message: 'Books directory not found' };
  }
}
