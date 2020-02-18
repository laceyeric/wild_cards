<template>
  <div class="deck-sticker">
    <router-link :to="{name: 'deckDetails', params: { id: deckData._id} }">
      <div class="card" style="width: 20vh; height: 28vh;">
        <div class="card-body">
          <h5 class="card-title text-wrap">{{ deckData.title }}</h5>
          <p class="card-text text-left text-wrap">{{ deckData.description }}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "DeckSticker",
  mounted() {},
  data() {
    return {};
  },
  props: ["deckData"],
  methods: {}
};
</script>

<style scoped>
.card {
  color: #2c3e50;
}
a {
  text-decoration: none;
}
</style>