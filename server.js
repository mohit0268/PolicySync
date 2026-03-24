require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require('./config/database');
const fileUpload = require("./src/routes/upload");
const policyUpload = require("./src/routes/policy")

app.use(express.json());

//api routes
app.use('/upload', fileUpload);
app.use("/policy", policyUpload)


//database connection
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  })
  .catch((err) => console.error("MongoDB Connection failed",err));

