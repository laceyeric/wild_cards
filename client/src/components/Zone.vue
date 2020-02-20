<template>
  <div v-if="zoneData" class="Zone">
    <div class="card fake-card" style="width: 8rem; height: 11.2rem;">
      <div
        v-if="activeCard._id"
        class="drop-zone"
        dropzone="zone"
        @dragover.prevent
        @drop.prevent="moveCard"
        @click.prevent="moveCard"
      ></div>
      <card-sticker-two :cardId="zoneData.cards[0]" :zone="zoneData"></card-sticker-two>
    </div>
  </div>
</template>
<script>
import CardStickerTwo from "../components/CardSticker2";
export default {
  name: "Zone",
  data() {
    return {};
  },
  props: ["zoneData"],
  components: {
    CardStickerTwo
  },
  computed: {
    activeCard() {
      return this.$store.state.activeCard;
    }
  },
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
  }
};
</script>
<style>
.drop-zone {
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 2;
  position: absolute;
  background-color: rgba(255, 255, 255, 0.068);
}
.Zone {
  position: relative;
}
.fake-card {
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  border: 2px solid rgba(0, 0, 0, 0.37);
  background-color: transparent;
}
</style>
