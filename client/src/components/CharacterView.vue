<template>
  <article class="message">
    <div id="charactername" class="message-header">
      <h2 class="is-size-5">{{ character.name }}</h2>
    </div>
    <div id="characterinfo" class="message-body">
      <p class="is-size-5">Class: {{ character.class }}</p> 
      <p class="is-size-5">Level: {{ character.level }}</p> 
      <p class="is-size-5">Exp: {{ character.experience }}</p> 
      <p class="is-size-5">League: {{ character.league }}</p> 
    </div>
    <div class="notification is-dark">
    <h1 class="title is-size-3">Inventory</h1>
    <div class="columns is-mobile is-multiline is-centered">
      <div class="column is-narrow is-one-quarter" v-for="(item, index) in items" :item="item" :key="index">
        <div id="itemcard" class="card">
          <div id="cardimg" class="card-image is-flex">
            <figure class="image">
              <img :src="item.icon">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div id="itemheader" v-if="item.explicitMods" class="media-content">
                <h4 id="itemtitlerare" v-if="item.explicitMods.length > 3 && !item.flavourText" class="title is-size-4">{{ item.name }}</h4>
                <h4 id="itemtitleunique" v-if="item.explicitMods.length > 3 && item.flavourText" class="title is-size-4">{{ item.name }}</h4>
                <h4 id="itemtitleuniqueflask" v-if="item.explicitMods.length <= 3 && item.name" class="title is-size-4">{{ item.name }}</h4>
                <h4 id="itemtitlemagic" v-if="item.explicitMods.length <= 3 && !item.name" class="title is-size-4">{{ item.typeLine }}</h4>
            
                <h6 id="itembase" v-if="item.explicitMods.length > 3" class="subtitle is-size-6">{{ item.typeLine }}</h6>
                <h6 id="itembase" v-if="item.explicitMods.length <= 3 && item.name" class="subtitle is-size-6">{{ item.typeLine }}</h6>
              </div>
              <div id="itemheader" v-if="!item.explicitMods" class="media-content">
                <h6 id="itembase" v-if="item.typeLine" class="subtitle is-size-6">{{ item.typeLine }}</h6>
              </div>
            </div>
            <div class="content">
              <p class="is-size-6" id="enchant" v-if="item.enchantMods">{{ item.enchantMods[0] }}</p>
              <p class="is-size-6" id="implicit" v-if="item.implicitMods">{{ item.implicitMods[0] }}</p>
              <p class="is-size-6" id="affix" v-for="(mod, index) in item.explicitMods" :mod="mod" :key="index">{{ mod }}</p>
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
#charactername {
  color: #e0e0e0;
}
#characterinfo {
  background-color:#000;
  color: orange;
}
p#enchant {
    color: #99ccff;
}
p#affix {
  color:#0066ff;
}
p#crafted {
    color:#99ccff;
}
p#implicit {
  color:#6666ff;
}
#itemcard {
  background-color: black;
}
#itembase {
  color: #ffffff;
}
#itemheader {
  color:#0066ff;
}
#itemtitlerare {
  color:gold;
}
#itemtitleunique {
  color:rgb(82, 25, 4);
}
#itemtitleuniqueflask {
  color:rgb(82, 25, 4);
}
#itemtitlemagic {
  color:blue;
}
#itemtitlenormal {
  color: #ffffff;
}
#cardimg {
  background-color: #111111;
}
.card {
  background-color: #f4f4f4;
}
.card-image {
  justify-content: center;
}
</style>