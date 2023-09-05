// Importing express, path, fs, and uuid
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./public/assets/js/uuid.js');

// Setting exppress and port for the server
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

app.get('/api/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'db/db.json'));
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  console.log(newNote);
  newNote.id = uuid();
  const notes = JSON.parse(fs.readFileSync('./db/db.json'));
  notes.push(newNote);
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));
  res.sendFile(path.join(__dirname, 'db/db.json'));
  console.log(`Saving note:\n${newNote.title}\n${newNote.text}`);
});

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const notes = JSON.parse(fs.readFileSync('./db/db.json'));
  const newNotes = notes.filter(note => note.id !== id);
  fs.writeFileSync('./db/db.json', JSON.stringify(newNotes));
  res.sendFile(path.join(__dirname, 'db/db.json'));
  console.log(`Deleting note with id ${id}`);
});

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

// Starting the server on the port
app.listen(PORT, () =>
  console.log(`Listening at http://localhost:${PORT}`)
);