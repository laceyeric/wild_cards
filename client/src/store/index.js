import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router/index";
import AuthService from "../AuthService";
import profileModule from "./ProfileModule";
import deckModule from "./DeckModule";
import cardModule from "./CardModule";
import lobbyModule from "./LobbyModule";
import socketModule from "./SocketModule";

Vue.use(Vuex);

//Allows axios to work locally or live
let base = window.location.host.includes("localhost:")
  ? "//localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: base + "api/",
  // timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  modules: {
    profileModule,
    deckModule,
    cardModule,
    lobbyModule,
    socketModule
  },
  state: {
    user: {},
    profile: {},
    activeProfile: {},
    userDecks: [],
    publicDecks: [],
    activeDeck: {},
    profileDecks: [],
    activeCard: {},
    lobby: {},
    player: 0
    // activeCards: {}
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setResource(state, payload) {
      state[payload.name] = payload.data;
    },
    resetState(state) {
      state.user = {};
      state.profile = {};
      state.activeProfile = {};
      state.userDecks = [];
      state.activeDeck = {};
      state.activeCard = {};
      state.lobby = {};
      state.profileDecks = [];
      state.player = 0;
    },
    addUserDeck(state, payload) {
      state.userDecks.push(payload);
    },
    addCard(state, changedDeck) {
      state.activeDeck = changedDeck;
      // Vue.set(state.activeDeck, "cards", [...state.activeDeck.cards, card]);
    },
    // addLobby(state, payload) {
    //   state.lobby.push(payload);
    // },
    clearActiveDeck(state) {
      state.activeDeck = {};
    },
    deleteCard(state, payload) {
      let index = state.activeDeck.cards.findIndex(
        card => card._id == payload.cardId
      );
      state.activeCard = {};
      state.activeDeck.cards.splice(index, 1);
    },
    moveCard(state, payload) {
      // let z1 = state.lobby.zones.find(oz => oz._id == payload.oldZoneId);
      // let z2 = state.lobby.zones.find(nz => nz._id == payload.newZoneId);
      // let card = z1.cards.find(c => c == payload.cardId);

      // z1.cards.splice(z1.cards.indexOf(card), 1);
      // z2.cards.unshift(card);

      let oldZoneIndex = state.lobby.zones.findIndex(
        oz => oz._id == payload.oldZoneId
      );
      let cardIndex = state.lobby.zones[oldZoneIndex].cards.findIndex(
        card => card == payload.cardId
      );
      state.lobby.zones[oldZoneIndex].cards.splice(cardIndex, 1);
      let newZoneIndex = state.lobby.zones.findIndex(
        z => z._id == payload.newZoneId
      );

      state.lobby.zones[newZoneIndex].cards.unshift(payload.cardId);
    },
    shuffle(state, payload) {
      state.lobby.zones[2].cards = payload.cards;
    },

    addPlayer(state, payload) {
      state.player = payload;
    },

    reroutePlayer(state) {
      console.log("reroute player");
      router.push({ name: "home" })
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    async register({ commit, dispatch }, creds) {
      try {
        0;
        let user = await AuthService.Register(creds);
        commit("setUser", user);
        router.go(0);
      } catch (e) {
        console.warn(e.message);
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds);
        commit("setUser", user);
        router.go(0);
      } catch (e) {
        console.warn(e.message);
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout();
        if (!success) {
        }
        commit("resetState");
        router.go(0);
      } catch (e) {
        console.warn(e.message);
      }
    },
    async getResourceById({ commit, dispatch }, payload) {
      try {
        let res = await api.get(payload.name + "/" + payload.id);
        commit("setResource", { name: payload.name, data: res.data });
      } catch (error) {
        console.error(error);
      }
    }
  }
});
