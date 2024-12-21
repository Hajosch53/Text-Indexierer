const TextIndexer = require('./textIndexer');

// Create instance with stopwords file
const indexer = new TextIndexer('stopwort.txt');

// Generate index from input text
indexer.generateIndex('input.txt', 'index.txt');