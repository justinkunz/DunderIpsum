require("dotenv").config();
require("./dbConfig");

const express = require("express");
const path = require("path");

const routes = require("./routes");
const { NODE_ENV } = process.env;

const app = express();
const PORT = process.env.PORT || 3001;

app.use([express.urlencoded({ extended: true }), express.json()]);

if (NODE_ENV === "production") {
  console.log("YOU ARE IN THE PRODUCTION ENV");
  app.use(
    "/static",
    express.static(path.join(__dirname, "./client/build/static"))
  );
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/build"));
  });
}
routes(app);
app.listen(PORT);
