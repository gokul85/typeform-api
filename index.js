const express = require('express');
const app = express();
const dotenv = require('dotenv');

app.get('/',(req, res)=>{
    res.status(200).send("Backend");
})

app.get('/test',(req, res)=>{
    res.status(200).send("Test");
})

app.listen("5000",()=>{
    console.log("Backend is Running");
})