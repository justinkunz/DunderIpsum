require("dotenv").config();
require("./dbConfig");

const express = require("express");
const routes = require("./routes");
const app = express();

app.use([express.urlencoded({ extended: true }), express.json()]);
const PORT = process.env.PORT || 3001;

routes(app);
app.listen(PORT);
