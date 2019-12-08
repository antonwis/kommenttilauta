<template>
  <article class="message">
    <div class="message-header">
      <h2>{{ character.name }}</h2>
    </div>
    <div class="message-body">
      <p>Class: {{ character.class }}</p> 
      <p>Level: {{ character.level }}</p> 
      <p>League: {{ character.league }}</p> 
      <ul>
          <li v-for="(item, index) in items" :item="item" :key="index">
              <h4>{{ item.name }} {{ item.typeLine }}</h4>
              <img :src="item.icon">
              <p id="enchant" v-if="item.enchantMods">{{ item.enchantMods[0] }}</p>
              <p id="implicit" v-if="item.implicitMods">{{ item.implicitMods[0] }}</p>
              <p v-for="(mod, index) in item.explicitMods" :mod="mod" :key="index">{{ mod }}</p>
              <p id="crafted" v-if="item.craftedMods">{{ item.craftedMods[0] }}</p>
          </li>
      </ul>
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


</style>