import _lobbyService from "../services/LobbyService";
import express from "express";
import socket from "../socket/SocketService";

//PUBLIC
export default class LobbyController {
  constructor() {
    this.router = express
      // No auth needed for lobby currently
      .Router()
      .post("", this.createLobby)
      .get("/:id", this.getById)
      .put("/:oldZoneId/cards", this.moveCard)
      .put("/:id", this.edit)
      .put("/:id/shuffle", this.shuffleCards)
      .delete("/:id", this.delete)
      .use(this.defaultRoute);
  }

  // this is pretty neat

  defaultRoute(req, res, next) {
    next({ status: 404, message: "No Such Route" });
  }

  async createLobby(req, res, next) {
    try {
      let data = await _lobbyService.createLobby(req.body);
      return res.status(201).send(data);
    } catch (error) {
      next(error);
    }
  }
  async getById(req, res, next) {
    try {
      let data = await _lobbyService.getById(req.params.id);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  // moveCard requires newZoneId, cardId. oldZoneId used in params to create a unique route for moving cards but should be passed in body as well
  async moveCard(req, res, next) {
    try {
      let data = await _lobbyService.moveCard(req.params.oldZoneId, req.body);
      socket.notifyMoveCard(data);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  // TODO will be used to delete the lobby once all players leave
  async delete(req, res, next) {
    try {
      await _lobbyService.delete(req.params.id);
      return res.send("Successfully Deleted");
    } catch (error) {
      next(error);
    }
  }

  // not currently in-use, but could be used to add player to lobby
  async edit(req, res, next) {
    try {
      let data = await _lobbyService.edit(req.params.id, req.body);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async shuffleCards(req, res, next) {
    try {
      let data = await _lobbyService.shuffleCards(req.body);
      let newData = { cards: data, room: req.body.room }
      socket.notifyShuffleDeck(newData);
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
