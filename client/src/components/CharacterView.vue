<template>
  <article class="message">
    <div class="message-header">
      <h2 class="is-size-5">{{ character.name }}</h2>
    </div>
    <div class="message-body">
      <p class="is-size-5">Class: {{ character.class }}</p> 
      <p class="is-size-5">Level: {{ character.level }}</p> 
      <p class="is-size-5">League: {{ character.league }}</p> 
    </div>
    <div class="notification is-dark">
    <h1 class="title is-size-3">Inventory</h1>
    <div class="columns is-mobile is-multiline is-centered">
      <div class="column is-narrow is-one-third" v-for="(item, index) in items" :item="item" :key="index">
        <div class="card">
          <div class="card-image">
            <figure class="image">
              <img :src="item.icon">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-content">
                <h4 class="title is-size-4">{{ item.name }}</h4>
                <h6 class="subtitle is-size-6">{{ item.typeLine }}</h6>
              </div>
            </div>
            <div class="content">
              <p class="is-size-6" id="enchant" v-if="item.enchantMods">{{ item.enchantMods[0] }}</p>
              <p class="is-size-6" id="implicit" v-if="item.implicitMods">{{ item.implicitMods[0] }}</p>
              <p class="is-size-6" v-for="(mod, index) in item.explicitMods" :mod="mod" :key="index">{{ mod }}</p>
              <p class="is-size-6" id="crafted" v-if="item.craftedMods">{{ item.craftedMods[0] }}</p>
            </div>
          </div>
        </div>
  </div>
</div>
    </div>

  </article>
</template>

<script>
import axios from "axios";
  export default {
    name: 'CharacterView',
    data() {
        return {
            error: null,
            character: [],
            items: []
        };
    },
    beforeCreate() {
        document.body.className = "body-bg-no-image";
    },
    async created() {
        try {
            const res = await axios.get(
                `/api/poe/account/${this.$route.params.accountName}/${this.$route.params.charName}/items`
            );
            this.items = res.data.items;
            this.character = res.data.character;
            console.log(this.items);
       
        } catch (err) {
     
            this.error = err.response.data.message;
        }
    }
  }
</script>

<style scoped>
p#enchant {
    color: teal;
}

p#crafted {
    color:teal;
}
img {
  width: auto;
  justify-content: center;
}
.card {
  background-color: #f4f4f4;
}
.card-image {
  justify-content: center;
}
</style>