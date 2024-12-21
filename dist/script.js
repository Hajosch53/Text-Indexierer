document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    const fileInput = document.getElementById('textFile');
    
    if (fileInput.files.length === 0) {
        alert('Bitte wählen Sie eine Datei aus.');
        return;
    }
    
    formData.append('textFile', fileInput.files[0]);
    
    // Show loading indicator
    document.getElementById('loading').style.display = 'block';
    document.getElementById('result').style.display = 'none';
    
    try {
        const response = await fetch('/generate-index', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error('Fehler beim Generieren des Index');
        }
        
        const data = await response.json();
        
        // Display results
        document.getElementById('indexContent').textContent = data.indexContent;
        document.getElementById('result').style.display = 'block';
        
        // Setup download button
        const downloadBtn = document.getElementById('downloadBtn');
        downloadBtn.onclick = () => {
            window.location.href = `/download/${data.downloadPath}`;
        };
    } catch (error) {
        alert('Fehler: ' + error.message);
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
});