const { Quotes } = require("../models");
const { IpsumSet } = require("../classes");

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
      return [];
    }
  },

  /**
   * @param {Object} body Data to add to db
   * @return {Object} new Db item
   */
  create: body => Quotes.create(body),

  /**
   * @param {String} _id ID of item to delete
   * @returns {Integer} Item Deleted
   */
  delete: _id => Quotes.deleteOne({ _id })
};
