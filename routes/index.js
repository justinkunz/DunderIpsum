require("dotenv").config();
const db = require("../controllers");
const { DB_ADD_ADMIN_KEY, ALLOW_NEW } = process.env;

/**
 * Determines if user is authorized to perform actions in route
 *
 * @param {Object} req Request body
 */
const isAuthorized = req => {
  const { authorization } = req.headers;
  return DB_ADD_ADMIN_KEY === authorization && ALLOW_NEW === "1";
};

module.exports = app => {
  // Get Ipsums on condition
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
  // Get characters[]
  app.get("/api/characters", async (req, res) => {
    res.json(await db.quotes.findCharacters());
  });

  // Get all quotes in db
  app.get("/api/all", async (req, res) => {
    res.json(await db.quotes.findAll());
  });

  // Save new quote
  app.post("/api/new", async (req, res) => {
    if (isAuthorized(req)) {
      res.json(await db.quotes.create(req.body));
    } else {
      res.status(401).send("Unauthorized");
    }
  });

  // Delete existing quote
  app.delete("/api/ipsum", async (req, res) => {
    const { _id } = req.body;
    if (isAuthorized(req)) {
      res.json(await db.quotes.delete(_id));
    } else {
      res.status(401).send("Unauthorized");
    }
  });
};
