const { socketActions } = require('../constant');
const BandList = require('./band-list');

const {
  ON_CONNECTION,
  CURRENT_BANDS,
  VOTE_BANDS,
  ADD_BAND,
  CHANGE_BAND_NAME,
  DELETE_BAND,
} = socketActions;

class Sockets {
  constructor(io) {
    this.io = io;
    this.bandList = new BandList();
    this.socketEvents();
  }

  socketEvents() {
    this.io.on(ON_CONNECTION, (socket) => {
      // eslint-disable-next-line no-console
      console.log('connected');

      // emit all bands
      socket.emit(CURRENT_BANDS, this.bandList.getBands());

      socket.on(VOTE_BANDS, ({ id }) => {
        this.bandList.increaseVote(id);
        this.io.emit(CURRENT_BANDS, this.bandList.getBands());
      });
      socket.on(DELETE_BAND, ({ id }) => {
        this.bandList.deleteBand(id);
        this.io.emit(CURRENT_BANDS, this.bandList.getBands());
      });
      socket.on(CHANGE_BAND_NAME, ({ id, name }) => {
        this.bandList.changeBandName(id, name);
        this.io.emit(CURRENT_BANDS, this.bandList.getBands());
      });
      socket.on(ADD_BAND, ({ name }) => {
        this.bandList.addBand(name);
        this.io.emit(CURRENT_BANDS, this.bandList.getBands());
      });
    });
  }
}

module.exports = Sockets;
