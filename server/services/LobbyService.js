import mongoose from "mongoose";
import Lobby from "../models/Lobby";
import ApiError from "../utils/ApiError";

const _repository = mongoose.model("Lobby", Lobby);

class LobbyService {
  async getLobbyByUserId(id) {
    let lobby = await _repository.findOne({ userId: id });
    return lobby;
  }
  async createLobby(lobbyInfo) {
    let lobby = await _repository.create(lobbyInfo);
    // creates zones for player hands
    // position -2 is Player 2, position -1 Player 1
    let tempSet = [{ position: "-2" }, { position: "-1" }];
    // pushes all card Id's into deck zone
    let cardIds = [];
    for (let i = 0; i < lobbyInfo.deck.cards.length; i++) {
      cardIds.push(lobbyInfo.deck.cards[i]._id);
    }
    // for (let i = 0; i < cardIds.length; i++) {
    //   let tempCardId = cardIds[i];
    //   let randCardIndex = Math.floor(Math.random() * cardIds.length);
    //switches around the position of two cards randomly O(n)
    //   cardIds[i] = cardIds[randCardIndex];
    //   cardIds[randCardIndex] = tempCardId;

    let m = cardIds.length,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = cardIds[m];
      cardIds[m] = cardIds[i];
      cardIds[i] = t;
    }
    // }
    // pushes player hands and deck zone into tempSet
    tempSet.push({ position: "0", cards: cardIds });
    // pushes remaining zones into tempSet
    for (let i = 1; i <= 18; i++) {
      tempSet.push({ position: `${i}` });
    }
    // update lobby's zones by $pushing the entirety of tempSet into lobby's zones
    let zoneData = await _repository.findOneAndUpdate(
      { _id: lobby._id },
      { $push: { zones: tempSet } },
      { new: true }
    );
    return zoneData;
  }
  async getById(lobbyId) {
    let lobby = await _repository.findOne({ _id: lobbyId });
    return lobby;
  }
  async delete(id) {
    let data = await _repository.findOneAndRemove({ _id: id });
    if (!data) {
      throw new ApiError("Invalid Id", 400);
    }
  }

  // TODO we may be able to specify the appropriate lobby in findOneAndUpdate (see editCard in DeckService), shouldnt benecessary all zones have a unique ID, the entire lobby is actually still being found by the zoneID
  async moveCard(oldZoneId, updateInfo) {
    let newZone = await _repository.findOneAndUpdate(
      // finds new zone where element _id matches the newZoneId being passed
      { zones: { $elemMatch: { _id: updateInfo.newZoneId } } },
      // pushes cardId the current zone specified in line above, into its cards array
      { $push: { "zones.$.cards": updateInfo.cardId } },
      { new: true }
    );
    if (!newZone) {
      throw new ApiError("InvalidId", 400);
    }
    let oldZone = await _repository.findOneAndUpdate(
      //this findOneAndUpdate works the same as the one above, except to pull the cardId from the old zone
      { zones: { $elemMatch: { _id: oldZoneId } } },
      { $pull: { "zones.$.cards": updateInfo.cardId } },
      { new: true }
    );
    if (!oldZone) {
      throw new ApiError("Invalid ID", 400);
    }
    // should return oldZoneId, newZoneId, cardId
    return updateInfo;
  }
  async edit(id, update) {
    let data = await _repository.findOneAndUpdate({ _id: id }, update, {
      new: true
    });
    if (!data) {
      throw new ApiError("Invalid ID or you do not own this board", 400);
    }
    return data;
  }
  async shuffleCards(update) {
    //NOTE takes in card array and shuffles the ids within the array
    let m = update.cards.length,
      shuffledUpdate = update.cards,
      t,
      i;
    while (m) {
      i = Math.floor(Math.random() * m--);
      t = shuffledUpdate[m];
      shuffledUpdate[m] = shuffledUpdate[i];
      shuffledUpdate[i] = t;
    }
    let data = await _repository.findOneAndUpdate(
      // finds new zone where element _id matches the deck zone
      { zones: { $elemMatch: { _id: update._id } } },
      // pushes cardId the current zone specified in line above, into its cards array
      { $set: { "zones.$.cards": shuffledUpdate } },
      { new: true }
    );
    return shuffledUpdate;
  }

}

const _lobbyService = new LobbyService();
export default _lobbyService;
