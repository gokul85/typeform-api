const express = require('express');
const app = express();
const dotenv = require('dotenv');

app.get('/',(req, res)=>{
    res.status(200).send("Backend");
})

app.post('/',(req, res)=>{
    res.status(200).send("Test Data");
})

app.listen("5000",()=>{
    console.log("Backend is Running");
})