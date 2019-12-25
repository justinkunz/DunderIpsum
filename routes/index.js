const db = require("../controllers/ipsums");

module.exports = app => {
  // Get characters[] route
  app.get("/api/characters", async (req, res) => {
    const chars = await db.findCharacters();
    res.json(chars);
  });

  // Save new ipsum route
  app.post("/api/new", async (req, res) => {
    console.log("reached new");
    const resp = await db.create(req.body);
    console.log(resp);
    res.json(resp);
  });

  // Get Ipsums on condition route
  app.post("/api/ipsums", async (req, res) => {
    const { choosen } = req.body;
    const chars = Object.keys(choosen).filter(sel => choosen[sel]);

    const conditions = {
      choosen: chars,
      limit: 10
    };

    const ipsums = await db.findIpsums(conditions);
    res.json(ipsums);
  });
};
