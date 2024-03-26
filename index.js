// this file is the entry point to launch the server

const express = require('express');
// create an instance of express to create the server
const app = express();
//connect the db
const db = require('./database').connect_db;

db();

app.use(express.json());
app.listen(3000, () =>{
    console.log("server is runner on port 3000" );
    
})
