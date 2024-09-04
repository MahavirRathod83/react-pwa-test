const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDatabase = require("./db/db");
const app = express();
const routes = require("./routes/routes.js");

app.use(cors());

connectDatabase();
app.use(express.json());

app.use("/", routes);

app.listen(5000, () => {
    console.log("TODO-App backend server running on: " + 5000);
});
