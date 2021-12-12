const BandList = require('./band-list');

class Sockets {
  constructor(io) {
    this.io = io;
    this.bandList = new BandList();
    this.socketEvents();
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      // eslint-disable-next-line no-console
      console.log('connected');

      // emit all bands
      socket.emit('current-bands', this.bandList.getBands());

      socket.on('vote-band', ({ id }) => {
        this.bandList.increaseVote(id);
        this.io.emit('current-bands', this.bandList.getBands());
      });
      socket.on('delete-band', ({ id }) => {
        this.bandList.deleteBand(id);
        this.io.emit('current-bands', this.bandList.getBands());
      });
      socket.on('change-name', ({ id, name }) => {
        this.bandList.changeBandName(id, name);
        this.io.emit('current-bands', this.bandList.getBands());
      });
      socket.on('add-band', ({ name }) => {
        this.bandList.addBand(name);
        this.io.emit('current-bands', this.bandList.getBands());
      });
    });
  }
}

module.exports = Sockets;
