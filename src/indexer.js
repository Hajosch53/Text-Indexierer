import { tokenizeText } from './tokenizer.js';
import { STOPWORDS } from './stopwords.js';

export async function generateIndex(text, minFrequency = 3) {
    try {
        const words = tokenizeText(text, STOPWORDS);
        const wordCount = {};
        
        // Count word frequencies
        words.forEach(word => {
            wordCount[word] = (wordCount[word] || 0) + 1;
        });
        
        // Filter by minimum frequency
        return Object.fromEntries(
            Object.entries(wordCount)
                .filter(([_, count]) => count >= minFrequency)
        );
    } catch (error) {
        throw new Error(`Fehler bei der Index-Generierung: ${error.message}`);
    }
}