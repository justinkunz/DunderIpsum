const { Ipsums } = require("../models");

module.exports = {
  /**
   * @returns {Object[]} All Ipsums
   */
  findAll: () => {
    return new Promise((resolve, reject) => {
      Ipsums.find()
        .then(resolve)
        .catch(reject);
    });
  },

  /**
   * @returns {String[]} Unique characters Ipsums are saved for
   */
  findCharacters: () => {
    return new Promise((resolve, reject) => {
      Ipsums.find()
        .distinct("character")
        .then(resolve)
        .catch(reject);
    });
  },

  /**
   * @param {Object} conditions Conditions to find Ipsums on
   * @return {String[]} Random Ipsums matching conditions
   */
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

  /**
   * @param {Object} body Data to add to db
   * @return {Object} new Db item
   */
  create: body => {
    return new Promise((resolve, reject) => {
      Ipsums.create(body)
        .then(resolve)
        .catch(reject);
    });
  }
};
