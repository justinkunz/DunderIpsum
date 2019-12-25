const db = require("../controllers/ipsums");

module.exports = app => {
  // Get characters[] route
  app.get("/api/characters", async (req, res) => {
    res.json(await db.findCharacters());
  });

  // Save new ipsum route
  app.post("/api/new", async (req, res) => {
    res.json(await db.create(req.body));
  });

  // Get Ipsums on condition route
  app.post("/api/ipsums", async (req, res) => {
    const { choosen } = req.body;
    const chars = Object.keys(choosen).filter(sel => choosen[sel]);

    const conditions = {
      choosen: chars,
      limit: 10
    };

    res.json(await db.findIpsums(conditions));
  });
};
