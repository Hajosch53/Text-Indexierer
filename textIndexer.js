const fs = require('fs');

class TextIndexer {
  constructor(stopwordsPath) {
    this.stopwords = new Set(
      fs.readFileSync(stopwordsPath, 'utf8')
        .split('\n')
        .map(word => word.trim().toLowerCase())
    );
  }

  // Clean and tokenize text
  tokenizeText(text) {
    return text
      .toLowerCase()
      .replace(/[^a-zäöüß\s]/gi, ' ')
      .split(/\s+/)
      .filter(word => 
        word.length > 1 && // Filter out single characters
        !this.stopwords.has(word.toLowerCase()) // Filter out stopwords
      );
  }

  // Count word frequencies
  countWords(words) {
    const wordCount = {};
    words.forEach(word => {
      wordCount[word] = (wordCount[word] || 0) + 1;
    });
    return wordCount;
  }

  // Generate index from text file
  generateIndex(inputPath, outputPath, minFrequency = 4) {
    try {
      // Read input text
      const text = fs.readFileSync(inputPath, 'utf8');
      
      // Process text
      const words = this.tokenizeText(text);
      const wordCount = this.countWords(words);
      
      // Filter words by minimum frequency and sort alphabetically
      const indexEntries = Object.entries(wordCount)
        .filter(([_, count]) => count >= minFrequency)
        .sort(([wordA], [wordB]) => wordA.localeCompare(wordB));
      
      // Generate index content
      const indexContent = indexEntries
        .map(([word, count]) => `${word}: ${count}`)
        .join('\n');
      
      // Write to output file
      fs.writeFileSync(outputPath, indexContent);
      
      console.log(`Index successfully generated at ${outputPath}`);
    } catch (error) {
      console.error('Error generating index:', error.message);
    }
  }
}

module.exports = TextIndexer;