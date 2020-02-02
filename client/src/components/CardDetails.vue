<template>
  <div class="container-fluid card-details">
    <div class="row">
      <div class="col">
        <div class="row">
          <div
            class="modal fade"
            data-backdrop
            id="cardDetailsModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="cardDetailsModalLabel"
            aria-hidden="true"
          >
            <div
              class="modal-dialog row"
              v-bind:class="{'full-width-modal': editing}"
              role="document"
            >
              <div class="modal-content col">
                <div class="row">
                  <div class="col">
                    <div class="modal-header text-center">
                      <h5 class="modal-title" id="activeCardModalLabel">{{ activeCard.name }}</h5>
                      <!-- shows the card roughly as it will be rendered -->
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                        @click="flipped=false"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div v-bind:class="{col:!editing, 'col-6':editing}">
                    <div class="modal-body row">
                      <div class="col-9">
                        <!-- card code -->
                        <div class="card" style="width: 20rem; height: 28rem;" v-if="!flipped">
                          <div class="card-body d-inline-flex justify-content-between p-2">
                            <h5 class="card-title text-wrap">{{ activeCard.name }}</h5>
                            <h5 class="card-title text-wrap">{{ activeCard.category }}</h5>
                          </div>
                          <div class="card-body image-centering pt-0 pb-0">
                            <!-- card face image (top half of card) -->
                            <img
                              :src="activeCard.imgFace"
                              id="card-face-img"
                              style="max-width: 100%; max-height:100%"
                              placeholder
                            />
                          </div>
                          <div class="card-body p-2">
                            <p class="card-text text-left text-wrap">{{ activeCard.content }}</p>
                          </div>
                        </div>
                        <div
                          class="card"
                          id="card-back-img"
                          style="width: 20rem; height: 28rem;"
                          v-else
                          :style="'background-image: url('+activeCard.imgBack+'); background-size: cover'"
                        ></div>
                      </div>
                      <!-- column of buttons -->
                      <div class="col-3">
                        <button class="btn btn-primary btn-block" @click="flip">Flip</button>
                        <button class="btn btn-primary btn-block">Copy</button>
                        <button class="btn btn-primary btn-block" @click="editing = !editing">Edit</button>
                        <button
                          class="btn btn-primary btn-block"
                          @click="deleteCard"
                          data-dismiss="modal"
                        >Delete</button>
                      </div>
                    </div>
                  </div>
                  <div class="col-6 mt-1" v-if="editing">
                    <!-- form code -->
                    <form @submit.prevent="editCard">
                      <div class="form-group text-left">
                        <label for="activeCardName">Card Name</label>
                        <input
                          v-model="activeCard.name"
                          type="text"
                          class="form-control"
                          id="activeCardTitle"
                          placeholder="Name your card"
                          required
                        />
                      </div>
                      <div class="form-group text-left">
                        <label for="activeCardCategory">Card Category</label>
                        <input
                          v-model="activeCard.category"
                          type="text"
                          class="form-control"
                          id="activeCardCategory"
                          placeholder="Category..."
                        />
                      </div>
                      <div class="form-group text-left">
                        <label for="activeCardContent">Card Content</label>
                        <textarea
                          v-model="activeCard.content"
                          class="form-control"
                          id="activeCardContent"
                          placeholder="Share some details about your Card..."
                          required
                        ></textarea>
                      </div>
                      <div class="form-group text-left">
                        <input
                          v-model="activeCard.imgFace"
                          type="text"
                          class="form-control"
                          id="cardImgFace"
                          placeholder="Place Card Face Image URL Here..."
                        />
                        <label class="form-group-label" for="cardImgFace">Choose file, optional</label>
                      </div>
                      <div class="form-group text-left">
                        <input
                          v-model="activeCard.imgBack"
                          type="text"
                          class="form-control"
                          id="cardImgBack"
                          placeholder="Place Card Back Image URL Here..."
                        />
                        <label class="form-group-label" for="cardImgBack">Choose file, optional</label>
                      </div>

                      <div class="modal-footer d-flex justify-content-right">
                        <button
                          type="button"
                          class="btn btn-secondary"
                          @click="editing = !editing"
                        >Cancel</button>
                        <button
                          type="submit"
                          class="btn btn-primary d-flex justify-content-right"
                        >Save changes</button>
                      </div>
                    </form>
                    <!-- end Form code -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "CardDetails",
  props: ["deckId"],
  data() {
    return {
      flipped: false,
      editing: false
    };
  },
  computed: {
    activeCard() {
      return this.$store.state.activeCard;
    }
  },
  methods: {
    flip() {
      this.flipped = !this.flipped;
    },
    editCard() {
      this.$store.dispatch("editCard", {
        deckId: this.deckId,
        activeCard: this.activeCard
      });
    },
    deleteCard() {
      this.$store.dispatch("deleteCard", {
        deckId: this.deckId,
        cardId: this.activeCard._id
      });
    }
  }
};
</script>
<style scoped>
label {
  /* margin-top: 0.5rem; */
  margin-bottom: 0rem;
}
.full-width-modal {
  max-width: 1000px;
}

#card-face-img {
  border-radius: 0.85em;
}
#card-back-img {
  border: 1em;
}
</style>