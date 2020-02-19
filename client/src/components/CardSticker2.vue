<template>
  <div class="card-sticker-two" v-if="cardId">
    <div
      class="card"
      @click="setActiveCard"
      @drag="setActiveCard"
      draggable="true"
      :class="{ active: activeCard == card }"
      style="width: 7.5rem; height: 10.5rem; "
      :style="(zone.position==0)?'background-image: url('+card.imgBack+');':''"
    >
      <div class="card-body" v-if="zone.position&&zone.position!='0'">
        <img :src="card.imgFace" alt style="max-height: 4rem; max-width: 4.7rem;" />

        <h5 class="card-title text-wrap">{{ card.name }}</h5>
        <!-- <p class="card-text text-left text-wrap">
          {{ lobby.deck.cards.content }}
        </p>-->
      </div>
      <div v-else class="card-body"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardStickerTwo",
  mounted() {},
  props: ["cardId", "zone"],
  methods: {
    setActiveCard() {
      this.$store.dispatch("setActiveCard", this.card);
    }
  },
  computed: {
    card() {
      return this.$store.state.lobby.deck.cards.find(c => c._id == this.cardId);
    },
    activeCard() {
      return this.$store.state.activeCard;
    }
  }
};
</script>

<style>
.card-sticker-two {
  user-select: none;
}

.active {
  border: 3px solid red;
}
</style>
