const db = require("../controllers/ipsums");

module.exports = app => {
  app.get("/api/characters", async (req, res) => {
    console.log("reached");
    const chars = await db.findCharacters();
    console.log(chars);
    res.json(chars);
  });

  app.post("/api/new", async (req, res) => {
    console.log("reached new");
    const resp = await db.create(req.body);
    console.log(resp);
    res.json(resp);
  });

  app.post("/api/ipsums", async (req, res) => {
    const { choosen } = req.body;
    const chars = Object.keys(choosen).filter(sel => choosen[sel]);
    console.log(chars);

    const conditions = {
      choosen: chars,
      limit: 10
    };

    const ipsums = await db.findIpsums(conditions);
    console.log(ipsums);
    res.json(ipsums);
  });
};
