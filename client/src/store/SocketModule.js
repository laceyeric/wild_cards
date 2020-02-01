import io from "socket.io-client";

let socket = {};

export default {
  actions: {
    initializeSocket({ commit, dispatch }, lobbyId) {
      //establish connection with socket
      socket = io("//localhost:3000");
      //Handle any on connection events
      socket.on("connect", () => {
        socket.emit('join', lobbyId);
      });

      // register all listeners\
      // NOTE do we need this?
      socket.on("moveCard", data => {
        commit("moveCard", data);
      });
      socket.on("shuffle", data => {
        commit("shuffle", data);
      })

      socket.on("player", data => {
        commit("addPlayer", data);
      })

      socket.on("reroutePlayer", () => {

        { commit("reroutePlayer") };
      })
    }
  }
};
