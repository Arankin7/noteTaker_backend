const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));

app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, './public/index.html' ))
})

app.get("/notes", (req, res) =>{
    res.sendFile(path.join(__dirname, "public", "notes.html"))
});

// Reads the db.json file and returns all saved notes as JSON
app.get("/api/notes", (req, res) =>{

})

// Function to create a new note
function newNote (){

}

// post request for new note
// Should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. Need to give each note a unique id
app.post("/api/notes", (req, res) =>{

})

// Function to update a note
function updateNote (){

}

// PUT request to update note
app.put("/notes/:id", (req, res) =>{

})

// Function to delete a note
function deleteNote () {

}

// Delete request to delete note
app.delete("/notes/:id", (req, res) =>{

})


app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
});
