const fs = require('fs');
const { tokenizeText } = require('./tokenizer');
const { countWords } = require('./counter');

class TextIndexer {
  constructor(stopwordsPath) {
    this.stopwords = new Set(
      fs.readFileSync(stopwordsPath, 'utf8')
        .split('\n')
        .map(word => word.trim().toLowerCase())
    );
  }

  generateIndex(inputPath, outputPath, minFrequency = 4) {
    try {
      const text = fs.readFileSync(inputPath, 'utf8');
      const words = tokenizeText(text, this.stopwords);
      const wordCount = countWords(words);
      
      const indexEntries = Object.entries(wordCount)
        .filter(([_, count]) => count >= minFrequency)
        .sort(([wordA], [wordB]) => wordA.localeCompare(wordB));
      
      const indexContent = indexEntries
        .map(([word, count]) => `${word}: ${count}`)
        .join('\n');
      
      fs.writeFileSync(outputPath, indexContent);
      
      return indexContent;
    } catch (error) {
      throw new Error(`Error generating index: ${error.message}`);
    }
  }
}

module.exports = TextIndexer;