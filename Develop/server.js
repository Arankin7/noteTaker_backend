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

// Function to create a new note
function newNote (){

}

// post request for new note
app.post("/notes", (req, res) =>{

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
