require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require('cors')

//accessing routes
const authRoutes = require("./routes/authRoutes");

//express app
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors(
  {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "credentials": true,
    "optionsSuccessStatus": 204
  }
))



//routes
app.use("/api/users", authRoutes);

//connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listening on port once connection build
    app.listen(process.env.PORT, () => {
      console.log("listening on port", process.env.PORT);
    });
  })
  .catch((err) => console.log(err));