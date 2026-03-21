const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require('./config/database');


//database connection
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
    console.log("Connection established successfully!!");
  })
  .catch((err) => console.error("MongoDB Connection failed",err));

