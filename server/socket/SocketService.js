class Socket {
  setIO(io) {
    this.io = io;
    this.rooms = {};
    //Server listeners
    io.sockets.on("connection", socket => {
      socket.on("join", room => {
        socket.join(room)
        this.io.in(room).clients((error, clients) => {
          if (error) throw new Error(error);
          if (clients.length < 3) {
            socket.emit("player", clients.length)
          } else {
            socket.emit("reroutePlayer")
            socket.disconnect();
          }
        })
      });
      // if (io.sockets.clients(room).length == 1) {
      //   socket.emit("player", 1);
      // } else if (io.socket.clients(room).length == 2) {
      //   socket.emit("player", 2);
      // } else {
      //   socket.emit("reroutePlayer");
      //   socket.disconnect();
      // }
    });
  }
  newConnection(socket) {
    //Handshake / Confirmation of Connection
    socket.emit("CONNECTED", {
      socket: socket.id,
      message: "Successfully Connected"
    });
    // passes data to notifyMoveCard after receiving signal from emetCard on client
    // socket.on("emitCard", data => {
    //   this.notifyMoveCard(data);
    // });
  }

  // runs when called by socket.on
  notifyMoveCard(data) {
    this.io.sockets.in(data.room).emit("moveCard", data);
  }

  notifyShuffleDeck(data) {
    this.io.sockets.in(data.room).emit("shuffle", data);
  }
}

const socket = new Socket();

module.exports = socket;
