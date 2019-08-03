const dbConnection = require("./helpers/dbConnection");
const expressValidator = require("express-validator");
const express = require("express");
require("express-async-errors");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const app = express();

// Database Connection
dbConnection();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(expressValidator());

// Routes
app.use("/api", require("./routes/auth"));
app.use("/api/teacher", require("./routes/teacher"));
app.use("/api/student", require("./routes/student"));

// Error handling middleware
app.use(function(err, req, res, next) {
  console.log(err);
  res
    .status(500)
    .json({ message: err._message || err.errmsg || "Something went wrong" });
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
