const express = require("express");
const app = express();
const dbConnection = require("./helpers/dbConnection");
require("dotenv").config();

// Database Connection
dbConnection();

app.get("/", (req, res) => {
    res.send("hello from node");
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});