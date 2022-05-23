const { json } = require('express');
const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));

const savedNotes = require('./db/db.json');
var notes = [];

// Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. Need to give each note a unique id
app.post("/api/notes", (req, res) =>{
    fs.readFile('./db/db.json', (err, data) =>{
        if (err){
            throw err;
        }
        var notes = JSON.parse(data);
        let newNote = req.body; 

        let id = notes.length;
        newNote.id = id + 1;

        notes.push(newNote);

        fs.writeFile(path.join(__dirname, './db/db.json'), JSON.stringify(notes), (err, data) =>{
            res.json(newNote)
        });

        return newNote;
    });
});

// Delete request to delete note
// Should receive a query paramater containing the ID of a note to delete. read all notes from db.json file, remove the note with the given id property then rewrite the notes to the db.json file.
app.delete("/api/notes/:id", (req, res) =>{
    let deleteId = (req.params.id);

    for(let i = 0; i < notes.length; i++){
        if (deleteId === notes[i].id){
            notes.splice(i, 1);

            let updatedNotes = JSON.stringify(notes);

            fs.writeFile('./db/db.json', updatedNotes);
        }
    }
    res.json(notes);
})

// Reads the db.json file and returns all saved notes as JSON
app.get("/api/notes", (req, res) =>{
    fs.readFile('./db/db.json', (err, data) =>{
        if(err){
            throw err;
        }
        var notes = JSON.parse(data);
        res.json(notes);
    });
});

app.get("/notes", (req, res) =>{
    res.sendFile(path.join(__dirname, "public", "notes.html"))
});

app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, './public/index.html' ))
})

app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname, './public/index.html'))
});

app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
});
