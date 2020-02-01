<template>
  <div class="player-hand">
    <div class="scroll-x">
      <div
        v-if="zoneData!=undefined"
        class="d-flex flex-direction-row"
        style="width: 100%; height: 100%;"
      >
        <div
          v-if="activeCard._id"
          class="drop-zone"
          @click.prevent="moveCard"
          dropzone="zone"
          @dragover.prevent
          @drop.prevent="moveCard"
        ></div>
        <card-sticker-two
          class="col-2"
          v-for="(card, index) in zoneData.cards"
          :key="card._id"
          :cardId="zoneData.cards[index]"
        ></card-sticker-two>
      </div>
    </div>
  </div>
</template>
<script>
import CardStickerTwo from "../components/CardSticker2";
export default {
  name: "playerHand",
  data() {
    return {};
  },
  components: {
    CardStickerTwo
  },
  props: ["zoneData"],
  methods: {
    moveCard() {
      let card = this.$store.state.activeCard;
      if (card._id) {
        let oldZone = {};
        this.$store.state.lobby.zones.forEach(z => {
          let found = z.cards.findIndex(c => c == card._id);
          if (found != -1) {
            oldZone = z;
          }
        });
        let zoneChange = {
          oldZoneId: oldZone._id,
          newZoneId: this.zoneData._id,
          cardId: card._id,
          room: this.$route.params.id
        };
        this.$store.dispatch("moveCard", zoneChange);
        this.$store.dispatch("setActiveCard", {});
      }
    }
  },
  computed: {
    activeCard() {
      return this.$store.state.activeCard;
    }
  }
};
</script>
<style>
.scroll-x {
  overflow-x: auto;
  white-space: nowrap;
  flex-wrap: nowrap;
  width: 81.5vw;
}

.scroll-x::-webkit-scrollbar {
  height: 8px;
}

.scroll-x::-webkit-scrollbar-thumb {
  background-color: rgba(100, 100, 100, 0.7);
  border-radius: 4px;
}

.scroll-x::-webkit-scrollbar-thumb:hover {
  background-color: rgba(100, 100, 100, 0.9);
}
</style>
