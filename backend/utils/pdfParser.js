import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const pdfParse = require('pdf-parse');

import fetch from 'node-fetch';

export const extractTextFromPDF = async (filePath) => {
    try {
        let buffer;

        if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
            const response = await fetch(filePath);
            const arrayBuffer = await response.arrayBuffer();
            buffer = Buffer.from(arrayBuffer);
        } else {
            const fs = await import('fs/promises');
            buffer = await fs.readFile(filePath);
        }

        const data = await pdfParse(buffer);
        return {
            text: data.text,
            numPages: data.numpages,
            info: data.info
        };

    } catch (err) {
        console.log("PDF parsing error", err);
        throw new Error("Failed to extract text from PDF");
    }
}