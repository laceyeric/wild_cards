<template>
  <div class="profile container">
    <div class="row">
      <div class="col-3">
        <!-- injecting a card for profile image and name -->
        <div class="card d-flex align-items-center" style="width: 15rem; height: 21rem;">
          <img id="profile-image" :src="profile.imgURL" />
          <div class="card-body">
            <h5 class="card-title">{{profile.name}}</h5>
          </div>
          <!-- edit profile button -->
          <div class="card-body" v-if="user._id==profile.userId">
            <button class="btn btn-primary" v-if="editing" @click="startEditing">Edit Profile</button>
            <button v-else class="btn btn-success" @click="submitEdits">Done</button>
          </div>
        </div>
        <!-- end of card code -->
      </div>
      <div class="col-9 border">
        <div class="row">
          <div class="col d-inline-flex mt-3">
            <h4 class="text-left" v-if="!editing">User Name:&nbsp;</h4>
            <h3 class="text-left" v-if="editing">{{profile.name}}</h3>
            <!-- Didn't use a form, not necessarily needed, we could add a @submit on each of the text fields to make it function similar to a form  -->
            <input v-else type="text" v-model="profile.name" />
          </div>
        </div>
        <div class="row">
          <div class="col d-inline-flex mt-3">
            <h4 class="text-left">About Me:&nbsp;&nbsp;</h4>
            <h4 class="text-left" v-if="editing">{{profile.description}}</h4>
            <textarea v-else name id cols="60" rows="5" v-model="profile.description"></textarea>
          </div>
        </div>
        <div class="row">
          <div class="col d-inline-flex mt-3">
            <h4 class="text-left" v-if="!editing">Image URL:&nbsp;</h4>
            <input v-if="!editing" type="text" v-model="profile.imgURL" />
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <deck-sticker
        class="col-2 mt-5"
        v-for="profileDeck in profileDecks"
        :key="profileDeck._id"
        :deckData="profileDeck"
      ></deck-sticker>
    </div>
  </div>
</template>
<script>
import deckSticker from "../components/DeckSticker";
export default {
  name: "Profile",
  components: {
    deckSticker
  },
  data() {
    return {
      editing: true
    };
  },
  mounted() {
    this.$store.dispatch("getProfileById", this.$route.params.profileId);
    // this.$store.dispatch("getPublicDecksByUserId", this.profile.userId);
  },
  methods: {
    startEditing() {
      // editing boolean that gives to DOM access to different elements if they're attempting to edit
      this.editing = !this.editing;
    },
    submitEdits() {
      this.$store.dispatch("editProfile", {
        id: this.profile._id,
        name: this.profile.name,
        description: this.profile.description,
        imgURL: this.profile.imgURL
      });
      this.editing = !this.editing;
    }
  },
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    user() {
      return this.$store.state.user;
    },
    profileDecks() {
      return this.$store.state.profileDecks;
    }
  }
};
</script>
<style>
#profile-image {
  max-width: 200px;
  max-height: 300px;
}
.border {
  text-shadow: 2px 2px 2px #000;
  color: white;
  background: linear-gradient(rgba(34, 33, 33, 0.7), rgba(0, 0, 0, 0.7));
}
.profile {
  background-repeat: repeat;
  background-size: cover;

  height: 100%;
}
</style>
