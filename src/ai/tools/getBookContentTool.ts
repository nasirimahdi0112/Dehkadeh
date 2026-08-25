
'use server';

import {ai} from '@/ai/genkit';
import {getBookContent} from '@/services/book-inventory';
import {z} from 'genkit';

export const getBookContentTool = ai.defineTool(
    {
        name: 'getBookContent',
        description: 'Retrieves the text content of a book for a given page range.',
        inputSchema: z.object({
            bookTitle: z.string().describe('The JSON file name of the book to retrieve content from (e.g. "viewpoint-1-sb.json").'),
            pageRange: z.string().describe("The page range to get content from (e.g. '1-10')."),
        }),
        outputSchema: z.string().describe('The text content of the book for the specified pages.'),
    },
    async (input) => {
        return await getBookContent(input.bookTitle, input.pageRange);
    }
);
