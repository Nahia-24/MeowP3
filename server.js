const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use('/music', express.static(path.join(__dirname, 'public/music')));

app.get('/api/songs', (req, res) => {
  const musicDir = path.join(__dirname, 'public/music');
  
  fs.readdir(musicDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'No se pudo leer la carpeta' });
    
    const songs = files
      .filter(f => f.endsWith('.mp3') || f.endsWith('.wav') || f.endsWith('.ogg'))
      .map((f, i) => ({
        id: i + 1,
        title: f.replace(/\.(mp3|wav|ogg)$/, '').replace(/-/g, ' ').replace(/_/g, ' '),
        artist: 'Local',
        src: `http://localhost:4000/music/${f}`,
        filePath: path.join(__dirname, 'public/music', f),
      }));
    
    res.json(songs);
  });
});

app.delete('/api/songs', (req, res) => {
  const { filePath } = req.body;
  try {
    fs.unlinkSync(filePath);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(4000, () => console.log('Servidor música corriendo en puerto 4000'));