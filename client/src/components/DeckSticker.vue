<template>
  <div class="deck-sticker">
    <router-link :to="{name: 'deckDetails', params: { id: deckData._id} }">
      <div class="card" style="width: 20vh; height: 28vh;">
        <div class="inner" style="width: 93%; height: 95%;  display: block">
          <div class="card-body">
            <h3 class="card-title text-wrap">{{ deckData.title }}</h3>
            <p class="card-text text-left text-wrap">{{ deckData.description }}</p>
          </div>
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
  justify-content: center;
  align-items: center;
  background-color: white;
}
.inner {
  display: flex;
  border-radius: 0.4em;
  border: solid 2px;
  background-color: white;
}
a {
  text-decoration: none;
}
</style>