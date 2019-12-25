const { Ipsums } = require("../models");

module.exports = {
  findAll: () => {
    return new Promise((resolve, reject) => {
      Ipsums.find()
        .then(resolve)
        .catch(reject);
    });
  },

  findCharacters: () => {
    return new Promise((resolve, reject) => {
      Ipsums.find()
        .distinct("character")
        .then(resolve)
        .catch(reject);
    });
  },

  findIpsums: conditions => {
    const { choosen, limit } = conditions;
    return new Promise((resolve, reject) => {
      Ipsums.find({ character: { $in: choosen } })
        .then(ipsums => {
          const cleaned = ipsums.map(ip => ip.quote);

          const randomIpsums = [];
          while (randomIpsums.length < limit) {
            const rand = Math.floor(Math.random() * cleaned.length);
            if (!randomIpsums.includes(cleaned[rand])) {
              randomIpsums.push(cleaned[rand]);
            }
          }

          resolve(randomIpsums);
        })
        .catch(reject);
    });
  },

  create: body => {
    return new Promise((resolve, reject) => {
      Ipsums.create(body)
        .then(resolve)
        .catch(reject);
    });
  }
};
