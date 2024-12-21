const TextIndexer = require('./dist/textIndexer');

// Create a new TextIndexer instance with the stopwords file
const indexer = new TextIndexer('stopwort.txt');

// Generate index from input text file
indexer.generateIndex('input.txt', 'output-index.txt');

console.log('Index generated successfully!');