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
    });
  }
}

module.exports = Sockets;
