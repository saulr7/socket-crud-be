const express = require('express');

const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const Sockets = require('./socket');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;
    this.server = http.createServer(this.app);
    this.io = socketIO(this.server);
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, '../public')));
  }

  boostUpSocket() {
    // eslint-disable-next-line no-new
    new Sockets(this.io);
  }

  serve() {
    this.middlewares();
    this.boostUpSocket();

    this.server.listen(this.port);
  }
}

module.exports = Server;
