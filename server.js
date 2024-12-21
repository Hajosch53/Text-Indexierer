const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const TextIndexer = require('./dist/textIndexer');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(fileUpload());

app.post('/generate-index', async (req, res) => {
  try {
    if (!req.files || !req.files.textFile) {
      return res.status(400).send('Keine Datei hochgeladen.');
    }

    const textFile = req.files.textFile;
    const uploadPath = path.join(__dirname, 'uploads', textFile.name);
    const outputPath = path.join(__dirname, 'uploads', `index-${Date.now()}.txt`);

    // Ensure uploads directory exists
    if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
      fs.mkdirSync(path.join(__dirname, 'uploads'));
    }

    // Save uploaded file
    await textFile.mv(uploadPath);

    // Generate index
    const indexer = new TextIndexer('stopwort.txt');
    const indexContent = indexer.generateIndex(uploadPath, outputPath);

    // Clean up uploaded file
    fs.unlinkSync(uploadPath);

    res.json({
      success: true,
      indexContent,
      downloadPath: path.basename(outputPath)
    });
  } catch (error) {
    res.status(500).send(`Fehler: ${error.message}`);
  }
});

app.get('/download/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  res.download(filePath, 'index.txt', (err) => {
    if (!err) {
      // Clean up file after download
      fs.unlinkSync(filePath);
    }
  });
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});