const Band = require('./band');

class BandList {
  constructor() {
    this.bands = [
      new Band('Linkin Park'),
      new Band('Green Day'),
    ];
  }

  addBand(name) {
    const newBand = new Band(name);
    this.bands.push(newBand);
    return this.bands;
  }

  deleteBand(id) {
    this.bands = this.bands.filter((band) => band.id !== id);
  }

  getBands() {
    return this.bands;
  }

  increaseVote(id) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        // eslint-disable-next-line no-param-reassign
        band.votes += 1;
      }
      return band;
    });
  }

  changeBandName(id, name) {
    this.bands = this.bands.map((band) => {
      if (band.id === id) {
        // eslint-disable-next-line no-param-reassign
        band.name = name;
      }
      return band;
    });
  }
}

module.exports = BandList;
