// Handles word counting functionality
const countWords = (words) => {
  const wordCount = {};
  words.forEach(word => {
    wordCount[word] = (wordCount[word] || 0) + 1;
  });
  return wordCount;
};

module.exports = { countWords };