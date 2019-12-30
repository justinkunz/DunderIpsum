const { Quotes } = require("../models");

module.exports = {
  /**
   * @returns {Object[]} All Ipsums
   */
  findAll: () => Quotes.find(),

  /**
   * @returns {String[]} Unique characters Ipsums are saved for
   */
  findCharacters: () => Quotes.find().distinct("character"),

  /**
   * @param {Object} conditions Conditions to find Ipsums on
   * @return {String[]} Random Ipsums matching conditions
   */
  generateIpsums: conditions => {
    const { choosen, limit, nsfw } = conditions;
    const filters = {
      character: { $in: choosen }
    };
    if (!nsfw) {
      filters.NSFW = false;
    }
    return new Promise((resolve, reject) => {
      Quotes.find(filters)
        .then(ipsums => {
          const randomized = ipsums
            .map(ip => ip.quote)
            .sort(() => 0.5 - Math.random());

          const combined = [];
          let i = 0;
          while (i < randomized.length) {
            let combinedIpsumStr = randomized[i];
            while (combinedIpsumStr.length < 500 && i < randomized.length) {
              i++;
              combinedIpsumStr += ` ${randomized[i]}`;
            }
            combined.push(combinedIpsumStr);
          }

          const max = combined.length > limit ? limit : combined.length;
          resolve(combined.slice(0, max));
        })
        .catch(reject);
    });
  },

  /**
   * @param {Object} body Data to add to db
   * @return {Object} new Db item
   */
  create: body => {
    return Quotes.create(body);
  }
};
