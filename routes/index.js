require("dotenv").config();
const db = require("../controllers/ipsums");
const { ALLOW_NEW_ENTERIES } = process.env;
module.exports = app => {
  // Get characters[] route
  app.get("/api/characters", async (req, res) => {
    res.json(await db.findCharacters());
  });

  // Save new ipsum route
  app.post("/api/new", async (req, res) => {
    if (ALLOW_NEW_ENTERIES) {
      res.json(await db.create(req.body));
    } else {
      res.json({ status: "error", msg: "No new enteries allowed" });
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

    res.json(await db.findIpsums(conditions));
  });
};
