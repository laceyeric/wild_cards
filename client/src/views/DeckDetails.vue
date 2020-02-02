<template>
  <div class="container-fluid deck-details">
    <div class="row">
      <div class="col-2">
        <rules class="rules" id="rule-enable" :deckData="activeDeck">Rules</rules>
      </div>
      <div class="col-2">
        <button class="btn btn-success" @click.prevent="createLobby">Start Game</button>
      </div>
      <div class="col-4">
        <h2 class="text-center" id="deck-title">{{ activeDeck.title }}</h2>
        <p id="deck-desc">{{ activeDeck.description }}</p>
      </div>
      <div class="col-2"></div>
      <div class="col-2" id="deck-options">
        <edit-deck
          class="edit-deck"
          :deckData="activeDeck"
          v-if="this.$store.state.user._id === this.activeDeck.authorId"
        ></edit-deck>
        <button
          class="btn btn-danger text-white"
          id="deck-delete"
          v-if="this.$store.state.user._id === this.activeDeck.authorId"
          @click.prevent="removeDeck"
        >Delete</button>
      </div>
      <div class="col-12">
        <h4 class="text-left" id="deck-detail-header">Cards</h4>
        <div class="row">
          <!-- plug in spot to create a card -->
          <new-card class="col-2" id="deck-new-card"></new-card>
          <!-- plug in all cards in deck -->
          <card-sticker
            class="col-2"
            id="deck-cards"
            v-for="card in activeDeck.cards"
            :key="card._id"
            :cardData="card"
          ></card-sticker>
        </div>
      </div>
    </div>
    <card-details :deckId="activeDeck._id"></card-details>
  </div>
</template>

<script>
import notificationService from "../utils/NotificationService.js";
import cardSticker from "../components/CardSticker";
import rules from "../components/Rules";
import newCard from "../components/NewCard";
import editDeck from "../components/EditDeck";
import cardDetails from "../components/CardDetails";

export default {
  name: "deckDetails",
  components: {
    cardSticker,
    rules,
    newCard,
    editDeck,
    cardDetails
  },
  mounted() {
    this.$store.dispatch("getDeckById", this.$route.params.id);
  },
  computed: {
    activeDeck() {
      return this.$store.state.activeDeck;
    }
  },
  methods: {
    async removeDeck() {
      if (
        await notificationService.confirmAction(
          "Are you sure you want to delete this deck?"
        )
      ) {
        this.$store.dispatch("removeDeck", this.activeDeck._id);
      }
    },
    async createLobby() {
      await this.$store.dispatch("createLobby", this.activeDeck);
    }
  }
};
</script>

<style>
.rules:hover {
  cursor: pointer;
}
#rule-enable {
  margin-top: 1rem;
  color: white;
  text-align: center;
  border-bottom: 1px solid white;
}
#add-card {
  font-size: 4rem;
}
#deck-desc {
  color: white;
}
#deck-title {
  color: white;
  margin-top: 1rem;
}
#deck-options {
  display: flex;
  justify-content: space-around;
  height: fit-content;
}
#deck-detail-header {
  color: white;
}

#deck-cards {
  padding-bottom: 1rem;
}
#deck-new-card {
  padding-bottom: 1rem;
}
</style>
