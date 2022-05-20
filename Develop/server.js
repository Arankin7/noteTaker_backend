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

app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, './public/index.html' ))
})

app.get("/notes", (req, res) =>{
    res.sendFile(path.join(__dirname, "public", "notes.html"))
});

// Reads the db.json file and returns all saved notes as JSON
app.get("/api/notes", (req, res) =>{
    res.json(savedNotes);
})

app.get("*", (req, res) =>{
    res.sendFile(path.join(__dirname, './public/index.html'))
});

// Function to create a new note
function addNote (body, notes){
    const note = body;

    if(!notes){
        notes = [];
    }
    // body.id = notes[0];
    // notes[0]++;

    // for(let i = 0; i < notes.length; i++){
    
    notes.push(note);
    
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(notes)
    );
    // }
    return note;
}

// Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. Need to give each note a unique id
app.post("/api/notes", (req, res) =>{

    const newNote = addNote(req.body, savedNotes);
    res.json(newNote);

})

// Function to delete a note
function deleteNote () {

}

// Delete request to delete note
// Should receive a query paramater containing the ID of a note to delete. read all notes from db.json file, remove the note with the given id property then rewrite the notes to the db.json file.
app.delete("/api/notes/:id", (req, res) =>{

})


app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
});
