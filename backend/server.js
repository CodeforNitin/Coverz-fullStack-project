require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require('cors')



//express app
const app = express();

app.use(express.json());
app.use(cookieParser());

app.listen(process.env.PORT, ()=>{
    console.log("listening on port", process.env.PORT);
})
