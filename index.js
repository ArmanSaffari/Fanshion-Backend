const express = require("express");
require('dotenv').config()
const env = process.env;
const pageRoutes = require("./routes/page.js");
const path = require('path');

// create an express app for back-end:
const app = express();

// set ejs engine and views:
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// alllow access to files inside public folder:
app.use(express.static("public"));

// use to access to json data within router:
app.use(express.json());

// use files in routes folder to handle url routing:
app.use("/", pageRoutes);

//listent to the specified port:
app.listen(env.APP_PORT, async () => {
  try {
    console.log(`listening on http://localhost:${env.APP_PORT} successfully!`);
    console.log("Connection has been established successfully!");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
});