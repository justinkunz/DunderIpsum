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
          const randomIpsums = [];
          const max = ipsums.length > limit ? limit : ipsums.length;

          while (randomIpsums.length < max) {
            const rand = Math.floor(Math.random() * ipsums.length);
            if (!randomIpsums.includes(ipsums[rand].quote)) {
              randomIpsums.push(cleaned[rand].quote);
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
