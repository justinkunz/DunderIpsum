const PORT = 3001;

require("./dbConfig");
const express = require("express");
const app = express();
const routes = require("./routes");

app.use([express.urlencoded({ extended: true }), express.json()]);
routes(app);
app.listen(PORT);
