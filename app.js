const dbConnection = require("./helpers/dbConnection");
const express = require("express");
require("express-async-errors");
require("dotenv").config();
const app = express();

// Database Connection
dbConnection();

//Middlewares
app.use(express.json());

// Routes
app.use("/api", require("./routes/teacher"));

// Error handling middleware
app.use(function(err, req, res, next) {
 console.log(err);
 res.status(500).json({message: err._message || err.errmsg});
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});