require("dotenv").config();
const db = require("../controllers");
const { DB_ADD_ADMIN_KEY } = process.env;

module.exports = app => {
  // Get characters[] route
  app.get("/api/characters", async (req, res) => {
    res.json(await db.quotes.findCharacters());
  });

  // Get all quotes in db
  app.get("/api/all", async (req, res) => {
    res.json(await db.quotes.findAll());
  });

  // Save new quote route
  app.post("/api/new", async (req, res) => {
    const { authorization } = req.headers;

    if (DB_ADD_ADMIN_KEY === authorization) {
      res.json(await db.quotes.create(req.body));
    } else {
      res.status(401).send("Unauthorized");
    }
  });

  // Get Ipsums on condition route
  app.post("/api/ipsums", async (req, res) => {
    const { choosen, limit, nsfw } = req.body;
    const chars = Object.keys(choosen).filter(sel => choosen[sel]);

    const conditions = {
      choosen: chars,
      limit,
      nsfw
    };

    res.json(await db.quotes.generateIpsums(conditions));
  });
};
