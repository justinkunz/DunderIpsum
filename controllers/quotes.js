const { Quotes } = require("../models");

class IpsumSet {
  constructor(dbResults) {
    this.quotes = dbResults.map(ip => ip.quote) || [];
  }

  shuffle() {
    for (let i = 0; i < this.quotes.length; i++) {
      const target = this.quotes[i];
      const swapIndex = Math.floor(Math.random() * this.quotes.length);
      this.quotes[i] = this.quotes[swapIndex];
      this.quotes[swapIndex] = target;
    }
    return this;
  }

  makeParagraphs(paraLength, max) {
    const arr = this.quotes;
    const para = [];
    let i = 0;

    while (i < arr.length && para.length < max) {
      let combinedIpsumStr = arr[i];
      while (combinedIpsumStr.length < paraLength && i < arr.length) {
        i++;
        combinedIpsumStr += ` ${arr[i]}`;
      }
      para.push(combinedIpsumStr);
    }
    return para;
  }
}

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
   * @param {Object} conditions Conditions to find quotes on
   * @return {String[]} Random Ipsums matching conditions
   */
  generateIpsums: async conditions => {
    try {
      const { choosen, limit, nsfw } = conditions;
      const filters = {
        character: { $in: choosen }
      };
      if (!nsfw) {
        filters.NSFW = false;
      }

      const dbResults = await Quotes.find(filters);
      const ipsums = new IpsumSet(dbResults)
        .shuffle()
        .makeParagraphs(300, limit);
      return ipsums;
    } catch (err) {
      console.log("An error occurred", err);
    }
  },

  /**
   * @param {Object} body Data to add to db
   * @return {Object} new Db item
   */
  create: body => Quotes.create(body)
};
