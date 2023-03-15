const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const cros = require('cors');

dotenv.config();
app.use(express.json());
app.use(cros());
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use("/auth", authRoute);
app.get('/',(req,res)=>{
    res.status(200).send("Backend is Running and Mongodb Connected")
})

app.listen("5000",()=>{
    console.log("Backend is Running");
})