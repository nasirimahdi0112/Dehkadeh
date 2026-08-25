'use server';

import { createWorker } from 'tesseract.js';

/**
 * Performs OCR on an image buffer.
 * @param imageBuffer The image data as a Buffer.
 * @param width The width of the image.
 * @param height The height of the image.
 * @returns The extracted text as a string.
 */
export async function performOCR(imageBuffer: Buffer, width: number, height: number): Promise<string> {
  const worker = await createWorker('eng');
  try {
    // Tesseract.js can work with raw pixel data (a buffer of RGBA values)
    const { data: { text } } = await worker.recognize(imageBuffer, {
        width,
        height,
    });
    return text;
  } catch (error) {
    console.error('OCR failed:', error);
    // In case of an OCR error, return an empty string to avoid breaking the flow.
    return '';
  } finally {
    await worker.terminate();
  }
}
