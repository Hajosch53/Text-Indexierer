import { generateIndex } from './indexer.js';

document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    const fileInput = document.getElementById('textFile');
    
    if (fileInput.files.length === 0) {
        alert('Bitte wählen Sie eine Datei aus.');
        return;
    }
    
    const file = fileInput.files[0];
    
    // Show loading indicator
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('result').classList.add('hidden');
    
    try {
        const text = await file.text();
        const index = await generateIndex(text);
        
        // Format index entries - Fixed sorting logic
        const formattedIndex = Object.entries(index)
            .sort(([wordA, countA], [wordB, countB]) => {
                // Primary sort by count (descending)
                if (countB !== countA) {
                    return countB - countA;
                }
                // Secondary sort alphabetically
                return wordA.localeCompare(wordB);
            })
            .map(([word, count]) => `${word} [${count}];`)
            .join('\n');
        
        // Display results
        document.getElementById('indexContent').textContent = formattedIndex;
        document.getElementById('result').classList.remove('hidden');
        
        // Setup download button
        const downloadBtn = document.getElementById('downloadBtn');
        downloadBtn.onclick = () => {
            const blob = new Blob([formattedIndex], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'index.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };
    } catch (error) {
        alert('Fehler: ' + error.message);
    } finally {
        document.getElementById('loading').classList.add('hidden');
    }
});