class IpsumSet {
  constructor(dbResults) {
    this.quotes = dbResults.map(ip => ip.quote);
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

  makeParagraphs(paraCharLimit, max) {
    const arr = this.quotes;
    const para = [];
    let i = 0;

    while (i < arr.length && para.length < max) {
      let combinedIpsumStr = arr[i];
      i++;
      while (combinedIpsumStr.length < paraCharLimit && i < arr.length) {
        combinedIpsumStr += ` ${arr[i]}`;
        i++;
      }
      para.push(combinedIpsumStr);
    }
    return para;
  }
}

module.exports = IpsumSet;
