export function tokenizeText(text, stopwords) {
    return text
        .toLowerCase()
        // Replace special characters with spaces
        .replace(/[^a-zäöüß\s]/gi, ' ')
        // Split into words
        .split(/\s+/)
        // Filter words
        .filter(word => 
            word.length > 1 && // Filter out single characters
            !stopwords.has(word.toLowerCase()) // Filter out stopwords
        );
}