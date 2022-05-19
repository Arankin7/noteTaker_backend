const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));



app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT}`)
});
