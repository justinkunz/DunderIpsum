require("dotenv").config();
require("./dbConfig");

const express = require("express");
// const { createProxyMiddleware } = require("http-proxy-middleware");

const routes = require("./routes");

const app = express();

app.use([
  express.urlencoded({ extended: true }),
  express.json()
  //   createProxyMiddleware("/api/*", { target: "localhost:3001" })
]);
const PORT = process.env.PORT || 3001;

routes(app);
app.listen(PORT);
