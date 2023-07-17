const express = require("express");
require('dotenv').config()
const env = process.env;
const routes = require("./routes");

// create an express app for back-end:
const app = express();


app.use(express.json());

// use index.js in routes folder to handle url routing:
app.use("/api", routes);

//listent to the specified port:
app.listen(env.APP_PORT, async () => {
  try {
    console.log(`listening on http://localhost:${env.APP_PORT} successfully!`);
    console.log("Connection has been established successfully!");
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
});